@bdd @product-validation
Feature: Product validation

    Background:
        Given the admin is on the Products list page

    @negative @tc14
    Scenario: TC-14 Validate required fields on product creation
        Given the admin opens the physical product creation form
        When the admin submits a product without a name
        Then the product name validation message is displayed

    @negative @tc15
    Scenario Outline: TC-15 Validate an invalid product price
        Given the admin opens the physical product creation form
        When the admin submits a product with an invalid price of "<invalidPrice>"
        Then the product price validation message is displayed

        Examples:
            | invalidPrice |
            | -1           |