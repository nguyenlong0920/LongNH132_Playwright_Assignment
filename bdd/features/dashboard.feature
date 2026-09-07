@bdd @dashboard
Feature: Dashboard validation

    Background:
        Given the admin is logged in

    @smoke @tc05
    Scenario: TC-05 Dashboard page loaded after login
        Then the dashboard page is displayed

    @smoke @tc06
    Scenario: TC-06 Left menu is displayed
        Then the left navigation menu is displayed

    @regression @tc07
    Scenario: TC-07 Header profile area visibility
        When the admin opens the user menu
        Then the profile menu is displayed