import { Locator, Page, expect } from '@playwright/test';
import { users } from '../data/static/users';

export class LoginPage {
    readonly page: Page;

    readonly loginForm: Locator;
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly signInButton: Locator;

    readonly usernameError: Locator;
    readonly passwordError: Locator;

    constructor(page: Page) {
        this.page = page;

        this.loginForm = page.locator('#botble-a-c-l-forms-auth-login-form');
        this.usernameInput = page.locator('#username');
        this.passwordInput = page.locator('#password');
        this.signInButton = this.loginForm.getByRole('button');

        this.usernameError = page.locator('#username-error');
        this.passwordError = page.locator('#password-error');
    }

    async open() {
        await this.page.goto('/admin');
    }

    async expectLoaded() {
        await expect(this.page).toHaveURL(/\/admin/);
        await expect(this.loginForm).toBeVisible();
        await expect(this.usernameInput).toBeVisible();
        await expect(this.passwordInput).toBeVisible();
        await expect(this.signInButton).toBeVisible();
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

    async login(username: string, password: string) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.signInButton.click();
    }

    async loginFullFlow() {
        await this.open();
        await this.expectLoaded();
        await this.login(users.admin.username, users.admin.password);
    }
}