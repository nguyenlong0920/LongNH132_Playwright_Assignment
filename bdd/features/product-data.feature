@bdd @data
Feature: Product data management

    @regression @tc16
    Scenario Outline: Create multiple products using the data factory
        Given the admin is on the Products list page
        When the admin creates <productCount> products using the data factory
        Then all generated products are visible and unique
        When the admin cleans up all generated products
        Then all generated products are removed

        Examples:
        | productCount |
        | 3            |