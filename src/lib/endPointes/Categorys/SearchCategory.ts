import axiosInstance from "../axiosInstance";


export const SearchCategor = async (searchValue) => {
    const config = {
        url: `productcategory/getcategorypath?SearchName=${searchValue}`
    };
    const response = await axiosInstance(config)
    return response
}