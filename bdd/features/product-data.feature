@bdd @product-data
Feature: Product data management

    Background:
        Given the admin is on the Products list page

    @regression @tc16
    Scenario Outline: TC-16 Create multiple products using the data factory
        When the admin creates <productCount> products using the data factory
        Then all generated products are visible and unique
        When the admin cleans up all generated products
        Then all generated products are removed

        Examples:
            | productCount |
            | 3            |