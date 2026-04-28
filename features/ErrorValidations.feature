Feature: Ecommerce validations
    @Validation1
    Scenario: Validate error message for single invalid login
        Given user is on the Ecommerce login page
        When user logs in with "ravishankar0798@gmail.com" and "Qwertyuiop@1" credentials
        Then an error message should be displayed

    @Validation
    Scenario Outline: Validate error message for multiple invalid logins
        Given user is on the Ecommerce login page
        When user logs in with "<username>" and "<password>" credentials
        Then an error message should be displayed
        Examples:
            | username                  | password     |
            | ravishankar0798@gmail.com | Qwertyuiop@1 |
            | sudheer0798@gmail.com     | Qwertyuiop@1 |

