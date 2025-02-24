import axiosInstance from "../axiosInstance";

export const fetchAllProduct = async ({ page, pageSize ,CategoryID }) => {
    const config = {
        url: `product/getallproductbycategoryid/?page=${page}&pageSize=${pageSize}&ProductCategoryId=${CategoryID}`,
        method: "GET",
    };
    const response = await axiosInstance(config);
    return response;
};
