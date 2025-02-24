export const convertImageUrl = (code) => {
    const url = new URL(`${import.meta.env.VITE_BASE_URL}/datafile/downloadfile`);
    url.searchParams.set("Code", code);
    return url.toString();
}