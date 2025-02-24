import axiosInstance from "../axiosInstance"

export const UpdateCategory = async(body)=>{
    const config = {
        method:'POST',
        url:'productcategory/updateproductcategory',
        data:body,
    }

    const response = await axiosInstance(config)
    return response
}