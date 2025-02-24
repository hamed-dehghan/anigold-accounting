import axiosInstance from "../axiosInstance";


export const AllCategorys = async () => {
    const config = {
        url: `productcategory/getallproductcategory`
    };
    const response = await axiosInstance(config)
    return response
}