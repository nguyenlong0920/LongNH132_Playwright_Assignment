@bdd @product-crud
Feature: Product CRUD management

    Background:
        Given the admin is on the Products list page

    @regression @tc09
    Scenario: TC-09 Create a product with mandatory fields
        When the admin opens the physical product creation form
        And the admin saves the generated product and exits
        Then a product created notification is displayed
        And the generated product is visible in the list
        When the admin cleans up the generated product
        Then a product deleted notification is displayed

    @data @tc10
    Scenario Outline: TC-10 Create products with dynamic product names and SKUs
        When the admin creates <productCount> products with generated data
        Then all generated products are visible and unique
        When the admin cleans up all generated products

        Examples:
            | productCount |
            | 2            |

    @regression @tc11
    Scenario: TC-11 Search product by name
        When the admin opens the physical product creation form
        And the admin saves the generated product
        Then a product created notification is displayed
        And the generated product is visible in the list
        When the admin searches for the generated product by name
        Then the search result displays the generated product
        When the admin cleans up the generated product
        Then a product deleted notification is displayed

    @regression @tc12
    Scenario Outline: TC-12 Update product price
        When the admin opens the physical product creation form
        And the admin saves the generated product
        Then a product created notification is displayed
        And the generated product is visible in the list
        When the admin opens the generated product for editing
        And the admin updates the generated product price to "<updatedPrice>"
        Then a product updated notification is displayed
        And the generated product with price "<updatedPrice>" is displayed
        When the admin cleans up the generated product
        Then a product deleted notification is displayed

        Examples:
            | updatedPrice |
            | 200.00       |

    @cleanup @tc13
    Scenario: TC-13 Delete created product
        When the admin opens the physical product creation form
        And the admin saves the generated product
        Then a product created notification is displayed
        And the generated product is visible in the list
        When the admin deletes the generated product
        Then a product deleted notification is displayed