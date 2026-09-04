@bdd @framework
Feature: Framework component and World management

    @tc17
    Scenario Outline: Display notifications throughout a product lifecycle
        Given the admin is logged in
        And the admin opens the physical product creation form
        When the admin submits invalid mandatory product details
        Then product validation messages are displayed
        When the admin creates a valid physical product
        Then a product created notification is displayed
        When the admin updates the generated product price to "<updatedPrice>"
        Then a product updated notification is displayed
        And the product price is displayed as "<updatedPrice>"
        When the admin deletes the created product
        Then a product deleted notification is displayed

        Examples:
        | updatedPrice |
        | 200.00       |

    @tc18
    Scenario: Use World-injected page objects
        Given the admin is logged in
        And the Cucumber World provides the page objects
        When the admin opens the physical product creation form
        And the admin saves a generated product
        Then a product created notification is displayed
        And the generated product is visible in the list