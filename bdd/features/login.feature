@bdd @login @unauthenticated 
Feature: Admin authentication

    Background:
        Given the admin open login page

    @smoke @tc01
    Scenario: TC-01 Valid admin login
        When the admin login with "valid credentials"
        Then the dashboard page is displayed

    @negative @tc02
    Scenario: TC-02 Invalid password login
        When the admin login with "invalid password"
        Then the login page displays "Fail" message

    @negative @tc03
    Scenario: TC-03 Required field validation
        When the admin login with "no credentials"
        Then login required field messages are displayed

    @smoke @tc04
    Scenario: TC-04 Logout successfully
        When the admin login with "valid credentials"
        Then the dashboard page is displayed
        And the admin logout
        Then the login page is displayed
        And the login page displays "Success" message