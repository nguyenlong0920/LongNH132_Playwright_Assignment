@bdd @framework
Feature: Framework component and fixture management

    Background:
        Given the admin is logged in

    @tc17
    Scenario Outline: TC-17 Use shared Notification component to verify messages
        When the admin opens the Products module
        And the admin opens the physical product creation form
        And the admin submits invalid mandatory product details
        Then product validation messages are displayed
        When the admin saves the generated product
        Then a product created notification is displayed
        And the generated product is visible in the list
        When the admin opens the generated product for editing
        When the admin updates the generated product price to "<updatedPrice>"
        Then a product updated notification is displayed
        And the generated product with price "<updatedPrice>" is displayed
        When the admin cleans up the generated product
        Then a product deleted notification is displayed

        Examples:
            | updatedPrice |
            | 200.00       |

    @tc18
    Scenario: TC-18 Use fixture-injected page objects in tests
        When the admin verifies the header is loaded
        And the admin verifies the left navigation menu is loaded
        And the admin opens the Products module
        And the admin opens the physical product creation form
        And the admin saves the generated product
        Then a product created notification is displayed
        And the generated product is visible in the list
        When the admin cleans up the generated product
        Then a product deleted notification is displayed