@bdd
Feature: Parallel execution and debugging

    @parallel @tc19
    Scenario Outline: Create an independent product in parallel
        Given the admin is on the Products list page
        When parallel worker "<worker>" saves a generated product
        Then the generated product is visible in the list
        When the admin cleans up the generated product
        Then a product deleted notification is displayed

        Examples:
        | worker |
        | A      |
        | B      |

    @debugging @tc20
    Scenario: Capture artifacts for a controlled debugging failure
        Given the admin is logged in
        And the dashboard page is displayed
        When a controlled debugging failure is enabled