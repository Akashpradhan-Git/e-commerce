let API = "";

if (process.env.NODE_ENV === "development") {
    API = "http://localhost:8050/e-commerce/api";
} else if (process.env.NODE_ENV === "production") {
    API = "http://209.97.136.18:8080/ecommerce/api";
}

export const API_HOST = API;