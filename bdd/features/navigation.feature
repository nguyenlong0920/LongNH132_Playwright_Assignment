@bdd @navigation
Feature: Product navigation

    @regression @tc08
    Scenario: Navigate to the Products module
        Given the admin is logged in
        When the admin opens the Products module
        Then the Products list page is displayed