import axiosInstance from "../axiosInstance"

export const UpdateProducts = async (body) => {
    const config = {
        method: 'POST',
        url: 'product/updateproduct',
        data: body,
    }
    const response = await axiosInstance(config)
    return response
}