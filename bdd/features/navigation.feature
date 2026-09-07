@bdd @navigation
Feature: Product navigation

    Background:
        Given the admin is logged in

    @regression @tc08
    Scenario: TC-08 Navigate to Products module from left menu
        When the admin opens the Products module
        Then the Products list page is displayed