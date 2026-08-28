import { Locator, Page, expect } from '@playwright/test';

export class LoginPage {
    readonly page: Page;

    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly signInButton: Locator;

    readonly errorToastMessage: Locator;
    readonly loginForm: Locator;
    readonly usernameError: Locator;
    readonly passwordError: Locator;

    constructor(page: Page) {
        this.page = page;

        this.usernameInput = page.getByPlaceholder('Enter your username or email address');
        this.passwordInput = page.getByPlaceholder('Enter your password');
        this.signInButton = page.getByRole('button', { name: 'Sign in' });

        this.errorToastMessage = page.locator('.toastify');
        this.loginForm = page.locator('#botble-a-c-l-forms-auth-login-form');
        this.usernameError = page.locator('#username-error');
        this.passwordError = page.locator('#password-error');
    }

    async open() {
        await this.page.goto('/admin');
    }

    async login(username: string, password: string) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.signInButton.click();
    }

    async expectLoaded() {
        await expect(this.page).toHaveURL(/\/admin/);
        await expect(this.loginForm).toBeVisible();
        await expect(this.usernameInput).toBeVisible();
        await expect(this.passwordInput).toBeVisible();
        await expect(this.signInButton).toBeVisible();
    }

    async expectInvalidCredentialsError() {
        const invalidMessage = 'These credentials do not match our records.';

        await expect(this.errorToastMessage).toBeVisible();
        await expect(this.errorToastMessage).toContainText(invalidMessage);
    }

    async expectRequiredFieldValidation() {
        const usernameRequiredMessage = 'The username field is required.';
        const passwordRequiredMessage = 'The password field is required.';

        await expect(this.loginForm).toBeVisible();
        await expect(this.usernameError).toBeVisible();
        await expect(this.usernameError).toContainText(usernameRequiredMessage);
        await expect(this.passwordError).toBeVisible();
        await expect(this.passwordError).toContainText(passwordRequiredMessage);
    }
}