Feature: Ecommerce validations

    @Regression
    Scenario: Placing the order
        Given user is on the Ecommerce login page for placing the order
        When the user logs in with "ravishankar0798@gmail.com" and "Qwertyuiop@1" credentials
        When Add "zara coat 3" to Cart
        Then Verify "zara coat 3" is displayed in the Cart page
        When Enter valid details and Place the order
        Then Verify order is present in the Order History page