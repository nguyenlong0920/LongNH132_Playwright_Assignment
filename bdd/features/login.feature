@bdd @login
Feature: Admin authentication

    @smoke @tc01
    Scenario: TC-01 Valid admin login
        Given the admin login page is open
        When the admin signs in with valid credentials
        Then the dashboard page is displayed

    @negative @tc02
    Scenario: TC-02 Invalid password login
        Given the admin login page is open
        When the admin signs in with an invalid password
        Then an invalid credentials notification is displayed

    @negative @tc03
    Scenario: TC-03 Required field validation
        Given the admin login page is open
        When the admin submits the login form without credentials
        Then login required field messages are displayed

    @smoke @tc04
    Scenario: TC-04 Logout successfully
        Given the admin is logged in
        When the admin logs out
        Then the admin login page is displayed
        And a logout notification is displayed