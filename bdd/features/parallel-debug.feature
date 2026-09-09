@bdd @parallel-debug
Feature: Parallel execution and debugging

    @parallel @tc19
    Scenario Outline: TC-19 Run independent product tests in parallel
        Given the admin create product via api
        And the admin go to product list page
        Then the admin search and verify generated product
        And the admin delete product via api

        Examples:
            | worker |
            | A      |
            | B      |

    @debugging @tc20
    Scenario: TC-20 Capture trace, screenshot, and video on failure
        When the admin go to dashboard page
        Then a controlled debugging failure is enabled