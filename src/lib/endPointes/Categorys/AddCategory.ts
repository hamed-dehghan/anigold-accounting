import axiosInstance from "../axiosInstance"

export const AddCategorys = async (body) => {
    const config = {
        method:'POST',
        url: 'productcategory/addproductcategory',
        data:body,
    }
    const response = await axiosInstance(config)
    return response
}