import axiosInstance from "../axiosInstance"

export const DeleteCategory = async (body) => {
    const config = {
        method: 'POST',
        url: "productcategory/deleteproductcategory",
        data: body
    }
    const response = await axiosInstance(config)
    return response
}