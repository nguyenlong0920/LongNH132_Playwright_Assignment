@bdd @dashboard
Feature: Dashboard validation

    Background:
        Given the admin go to dashboard page

    @smoke @tc05
    Scenario: TC-05 Dashboard page loaded after login
        Then the dashboard page is displayed

    @smoke @tc06
    Scenario: TC-06 Left menu is displayed
        Then the left navigation menu is displayed

    @regression @tc07
    Scenario: TC-07 Header profile area visibility
        Then the dashboard header is displayed
        And the profile menu is displayed