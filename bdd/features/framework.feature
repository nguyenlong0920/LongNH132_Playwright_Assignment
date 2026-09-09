@bdd @framework
Feature: Framework component and fixture management

    @tc17
    Scenario: TC-17 Use shared Notification component to verify messages
        When the admin go to create product page
        And the admin submits invalid product details
        Then the product "name" validation message is displayed
        And the product "price" validation message is displayed
        And the admin input and save the generated product
        Then a product "Created" notification is displayed
        And the admin search for the generated product to edit
        And the admin update the price to "200.00"
        Then a product "Updated" notification is displayed
        And the admin search and verify generated product
        And the admin delete the generated product
        Then a product "Deleted" notification is displayed

    @tc18
    Scenario: TC-18 Use fixture-injected page objects in tests
        When the admin go to dashboard page
        And the dashboard header is displayed
        And the left navigation menu is displayed
        Then the admin opens "Products" from the "Ecommerce" menu
        And the admin choose to create "physical" product
        And the admin input and save the generated product
        Then a product "Created" notification is displayed
        And the admin delete the generated product
        Then a product "Deleted" notification is displayed