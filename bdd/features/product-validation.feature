@bdd @product-validation
Feature: Product validation

    Background:
        Given the admin go to create product page
        
    @negative @tc14
    Scenario: TC-14 Validate required fields on product creation
        When the admin submits a product with "empty name"
        Then the product "name" validation message is displayed

    @negative @tc15
    Scenario: TC-15 Validate an invalid product price
        When the admin submits a product with "invalid price"
        Then the product "price" validation message is displayed