let API = "";

if (process.env.NODE_ENV === "development") {
    API = "http://localhost:8050/e-commerce/api";
} else if (process.env.NODE_ENV === "production") {
    API = "http://192.168.3.100:8050/e-commerce/api";
}

export const API_HOST = API;