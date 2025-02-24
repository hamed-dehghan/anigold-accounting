import axiosInstance from "../axiosInstance";

export const AddProduct = async(body) => {
    const config = {
        method:'POST',
        url: 'product/addproduct',
        data:body,
    }
    const response = await axiosInstance(config)
    return response
}