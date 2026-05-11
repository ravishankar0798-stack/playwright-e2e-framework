class LoginPage {
    constructor(page) {
        this.page = page;
        this.signInbutton = page.locator("[id='login']"); // Ensure this ID is correct
        this.userName = page.locator("#userEmail"); // Ensure this ID is correct
        this.password = page.locator("[id='userPassword']"); // Ensure this ID is correct
    }

    async goToLoginPage() {
        await this.page.goto("https://rahulshettyacademy.com/client"); // URL for the login page
    }

    async validLogin(username, password) {
        console.log("Filling in the username and password...");

        // Fill in the username and password
        await this.userName.fill(username);
        await this.password.fill(password);
        await this.signInbutton.click();  // Click the sign-in button
    }
}

module.exports = { LoginPage };