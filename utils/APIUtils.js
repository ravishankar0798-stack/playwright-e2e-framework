class APIUtils {
    constructor(apiContext, loginPayload) {
        this.apiContext = apiContext;
        this.loginPayload = loginPayload;
        this.token = null;
    }
    async getToken() {
        const loginResponse = await this.apiContext.post(
            "https://rahulshettyacademy.com/api/ecom/auth/login",
            {
                data: this.loginPayload
            }
        );
        //Assertion
        if (!loginResponse.ok()) {
            throw new Error("Login API failed");
        }
        const loginResponseJson = await loginResponse.json();
        console.log("=== LOGIN API DEBUG ===");
        console.log("Status:", loginResponse.status());
        console.log("Response:", loginResponseJson);
        this.token = loginResponseJson.token;
        console.log("Token:", this.token);
        return this.token;
    }

    async createOrder(orderPayload) {
        // Ensure token is available
        if (!this.token) {
            await this.getToken();
        }
        const orderResponse = await this.apiContext.post(
            "https://rahulshettyacademy.com/api/ecom/order/create-order",
            {
                data: orderPayload,
                headers: {
                    Authorization: this.token,
                    'Content-Type': 'application/json'
                }
            }
        );
        //Assertion
        if (!orderResponse.ok()) {
            throw new Error("Order creation failed");
        }
        const orderResponseJson = await orderResponse.json();
        console.log("=== ORDER API DEBUG ===");
        console.log("Status:", orderResponse.status());
        console.log("Response:", orderResponseJson);
        const orderId = orderResponseJson.orders[0];
        console.log("Order ID:", orderId);
        return orderId;
    }
}
module.exports = { APIUtils };