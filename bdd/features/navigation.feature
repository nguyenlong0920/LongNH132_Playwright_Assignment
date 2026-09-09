@bdd @navigation
Feature: Product navigation

    @regression @tc08
    Scenario: TC-08 Navigate to Products module from left menu
        Given the admin go to dashboard page
        When the admin opens "Products" from the "Ecommerce" menu
        Then the product list page is displayed