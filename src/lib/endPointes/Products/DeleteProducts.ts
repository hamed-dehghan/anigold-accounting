import axiosInstance from "../axiosInstance"

export const DeleteProducts = async (body) => {
    const config = {
        method: 'POST',
        url: "product/deleteproduct",
        data: body
    }
    const response = await axiosInstance(config)
    return response
}