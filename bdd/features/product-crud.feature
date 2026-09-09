@bdd @product-crud
Feature: Product CRUD management

    @regression @tc09
    Scenario: TC-09 Create a product with mandatory fields
        When the admin go to dashboard page
        And the admin opens "Products" from the "Ecommerce" menu
        And the admin choose to create "physical" product
        And the admin input and save the generated product
        Then a product "Created" notification is displayed
        And the admin delete product via api

    @data @tc10
    Scenario: TC-10 Create products with dynamic product names and SKUs
        When the admin create 2 products via api
        And the admin go to product list page
        Then all generated products are visible and unique
        And the admin delete all products via api

    @regression @tc11
    Scenario: TC-11 Search product by name
        When the admin create product via api
        And the admin go to product list page
        And the admin search and verify generated product
        Then the admin delete product via api

    @regression @tc12
    Scenario: TC-12 Update product price
        When the admin create product via api
        And the admin go to product list page
        And the admin search for the generated product to edit
        And the admin update the price to "200.00"
        Then a product "Updated" notification is displayed
        And the admin search and verify generated product
        And the admin delete product via api

    @cleanup @tc13
    Scenario: TC-13 Delete created product
        When the admin create product via api
        And the admin go to product list page
        And the admin delete the generated product
        Then a product "Deleted" notification is displayed