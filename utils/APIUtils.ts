import { APIRequestContext } from '@playwright/test';

type LoginPayload = {
    userEmail: string;
    userPassword: string;
};

type OrderPayload = {
    orders: any[];
};

type LoginResponse = {
    token: string;
};

type OrderResponse = {
    orders: string[];
};

export class APIUtils {
    private apiContext: APIRequestContext;
    private loginPayload: LoginPayload;
    private token: string | null = null;

    constructor(apiContext: APIRequestContext, loginPayload: LoginPayload) {
        this.apiContext = apiContext;
        this.loginPayload = loginPayload;
    }

    async getToken(): Promise<string> {
        const loginResponse = await this.apiContext.post(
            "https://rahulshettyacademy.com/api/ecom/auth/login",
            {
                data: this.loginPayload
            }
        );

        if (!loginResponse.ok()) {
            throw new Error(`Login API failed: ${loginResponse.status()}`);
        }

        const loginResponseJson: LoginResponse = await loginResponse.json();
        this.token = loginResponseJson.token;
        return this.token;
    }

    async createOrder(orderPayload: OrderPayload): Promise<string> {
        if (!this.token) {
            await this.getToken();
        }

        const orderResponse = await this.apiContext.post(
            "https://rahulshettyacademy.com/api/ecom/order/create-order",
            {
                data: orderPayload,
                headers: {
                    Authorization: `Bearer ${this.token}`,
                    "Content-Type": "application/json"
                }
            }
        );

        if (!orderResponse.ok()) {
            throw new Error(`Order creation failed: ${orderResponse.status()}`);
        }

        const orderResponseJson: OrderResponse = await orderResponse.json();

        if (!this.token) {
            throw new Error("Token missing after login");
        }
        return orderResponseJson.orders[0];
    }
}