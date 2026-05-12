Feature: Ecommerce validations
    @regression
    Scenario:1:: Placing the order by clicking on Add to Cart button from dashboard page
        Given user is on the Ecommerce login page
        When user logs in with valid credentials
        When Add "zara coat 3" to Cart by clicking on Add to Cart button from dashboard page
        When Click on Cart button from dashboard page
        Then Verify "zara coat 3" is displayed in the Cart page
        When Enter valid details and Place the order
        Then Verify order is present in the Order History page
        Then Click on Home button from dashboard page
        Then Click on Sign Out button from dashboard page
