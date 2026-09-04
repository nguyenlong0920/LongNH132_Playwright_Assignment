@bdd @dashboard
Feature: Dashboard validation

    @smoke @tc05
    Scenario: Dashboard page loads after login
        Given the admin is logged in
        Then the dashboard page is displayed

    @smoke @tc06
    Scenario: Left menu is displayed
        Given the admin is logged in
        Then the left navigation menu is displayed

    @regression @tc07
    Scenario: Header profile area is visible
        Given the admin is logged in
        When the admin opens the user menu
        Then the profile menu is displayed