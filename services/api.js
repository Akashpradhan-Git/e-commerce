let API = "";

if (process.env.NODE_ENV === "development") {
    API = "http://localhost:8050/e-commerce/api";
} else if (process.env.NODE_ENV === "production") {
    API = "https://be-prepared-app-bk.herokuapp.com";
}

export const API_HOST = API;