import axiosInstance from "../axiosInstance";

export const DownloadFile = async(fileCode:string) => {
    const config = {
        url: `datafile/downloadfile?Code=${fileCode}`,
        headers: {
            "Content-Type": "application/octet-stream", 
        },
    }
    const response = await axiosInstance(config)
    return response
}