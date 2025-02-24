import axiosInstance from "../axiosInstance"

export const UploadSingleFile = async(body) => {
    const config = {
        method:'POST',
        url: 'datafile/uploadfile',
        headers: {
            "Content-Type": "multipart/form-data", 
        },
        data:body,
    }
    const response = await axiosInstance(config)
    return response
}