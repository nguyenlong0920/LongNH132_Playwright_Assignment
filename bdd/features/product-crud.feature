@bdd @crud
Feature: Product CRUD management

    @regression @tc09
    Scenario: Create a product with mandatory fields
        Given the admin opens the physical product creation form
        When the admin saves a generated product
        Then a product created notification is displayed
        And the generated product is visible in the list

    @data @tc10
    Scenario Outline: Create products with dynamic names and SKUs
        Given the admin is on the Products list page
        When the admin creates <productCount> unique products
        Then all generated products are visible and unique

        Examples:
        | productCount |
        | 2            |

    @regression @tc11
    Scenario: Search for a generated product by name
        Given the admin opens the physical product creation form
        When the admin saves a generated product
        And the admin searches for the generated product
        Then the search result displays the generated product

    @regression @tc12
    Scenario Outline: Update a generated product price
        Given the admin opens the physical product creation form
        When the admin saves a generated product
        And the admin updates the generated product price to "<updatedPrice>"
        Then the product price is displayed as "<updatedPrice>"

        Examples:
        | updatedPrice |
        | 200.00       |

    @cleanup @tc13
    Scenario: Delete a generated product
        Given the admin opens the physical product creation form
        When the admin saves a generated product
        And the admin deletes the generated product
        Then a product deleted notification is displayed