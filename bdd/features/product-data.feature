@bdd @product-data
Feature: Product data management

    @regression @tc16
    Scenario: TC-16 Create multiple products using the data factory
        When the admin create 3 products via api
        And the admin go to product list page
        Then the admin search and verify all generated product
        And the admin delete all products via api