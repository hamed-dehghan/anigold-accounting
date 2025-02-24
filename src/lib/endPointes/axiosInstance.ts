import axios, { AxiosError, AxiosResponse } from "axios";
import Toast from "../../components/Toast/Toast";
const token = localStorage.getItem('token');
const axiosInstance = axios.create({

    baseURL: import.meta.env.VITE_BASE_URL,
    headers: {
        "Content-Type": "application/json",
        "Accept-Language": 'fa-IR',
        Authorization: `Bearer ${token}`,
    },
});

interface ErrorResponseData {
    detail?: string | Array<{ msg: string }>;
    message?: string;
}

const handleError = (error: AxiosError<ErrorResponseData>) => {
    if (error.response) {
        const statusCode = error.response.status;
        const responseData = error.response.data;
        const detailMessage = responseData?.detail;
        const errorMessage = responseData?.message || error.message;

        switch (statusCode) {
            case 400:
                if (Array.isArray(detailMessage)) {
                    detailMessage.forEach((err) => {
                        console.log(err.msg || err);
                    });
                } else {
                    console.log(detailMessage || errorMessage);
                }
                break;

            case 404:
                console.log(detailMessage || errorMessage || "Resource not found");
                break;
            case 401:
                console.log('status = 401: Unauthorized');
                // localStorage.removeItem('token');
                // window.location.href = "/Login";
                break;

            case 402:
                console.log(detailMessage || errorMessage || "Payment required");
                break;

            case 500:
                console.log(detailMessage || errorMessage || "An unexpected error occurred on the server");
                break;

            default:
                console.log(detailMessage || errorMessage || "An unexpected error occurred");
                break;
        }
    } else {
        console.log(error.message || "Network error occurred");
    }

    return Promise.reject(error);
};

axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => response,
    handleError
);

export default axiosInstance;