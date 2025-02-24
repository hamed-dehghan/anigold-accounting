import axiosInstance from "../axiosInstance";

export const fetchAllWageType = async () => {
    const config = {
        url: `wagetype/getallwagetypes`,
        method: "GET",
    };
    const response = await axiosInstance(config);
    return response;
};
