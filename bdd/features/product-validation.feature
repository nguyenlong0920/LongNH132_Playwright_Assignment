@bdd @negative
Feature: Product validation

    @tc14
    Scenario: Validate required fields on product creation
        Given the admin opens the physical product creation form
        When the admin submits a product without a name
        Then the product name validation message is displayed

    @tc15
    Scenario Outline: Validate an invalid product price
        Given the admin opens the physical product creation form
        When the admin submits a product with an invalid price of "<invalidPrice>"
        Then the product price validation message is displayed

        Examples:
        | invalidPrice |
        | -1           |