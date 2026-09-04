export type LogLevel = 'DEBUG' | 'INFO' | 'WARN' | 'ERROR';
export type LogContext = Record<string, unknown>;

const levelPriority: Record<LogLevel, number> = {
    DEBUG: 10,
    INFO: 20,
    WARN: 30,
    ERROR: 40,
};

const configuredLevel = (process.env.LOG_LEVEL || 'INFO').toUpperCase();
const minimumLevel: LogLevel = configuredLevel in levelPriority
    ? configuredLevel as LogLevel
    : 'INFO';

const sensitiveKeyPattern = /password|token|secret|authorization|cookie/i;

const sanitize = (value: unknown, key?: string): unknown => {
    if (key && sensitiveKeyPattern.test(key)) {
        return '[REDACTED]';
    }

    if (value instanceof Error) {
        return {
            name: value.name,
            message: value.message,
            stack: value.stack,
        };
    }

    return value;
};

const serializeContext = (context?: LogContext): string => {
    if (!context || Object.keys(context).length === 0) {
        return '';
    }

    const seen = new WeakSet<object>();

    try {
        return ` ${JSON.stringify(context, (key, value) => {
            const sanitizedValue = sanitize(value, key);

            if (sanitizedValue && typeof sanitizedValue === 'object') {
                if (seen.has(sanitizedValue)) {
                    return '[CIRCULAR]';
                }
                seen.add(sanitizedValue);
            }

            return sanitizedValue;
        })}`;
    } catch {
        return ' {"context":"[UNSERIALIZABLE]"}';
    }
};

const log = (level: LogLevel, message: string, context?: LogContext) => {
    if (levelPriority[level] < levelPriority[minimumLevel]) {
        return;
    }

    const output = `[${new Date().toISOString()}] [${level}] ${message}${serializeContext(context)}`;

    if (level === 'ERROR') {
        console.error(output);
    } else if (level === 'WARN') {
        console.warn(output);
    } else {
        console.log(output);
    }
};

export const logger = {
    debug: (message: string, context?: LogContext) => log('DEBUG', message, context),
    info: (message: string, context?: LogContext) => log('INFO', message, context),
    warn: (message: string, context?: LogContext) => log('WARN', message, context),
    error: (message: string, context?: LogContext) => log('ERROR', message, context),
};
