import { useState } from "react";
import SearchCom from "./search";

const Search = () => {
    const [searchValue, setSearchValue] = useState<string | boolean>('');

    const handleSearch = () => {
        console.log('Search Value:', searchValue);
    }

    return (
        <SearchCom
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            handleSearch={handleSearch}
            placeholder="جستجو در تمام سامانه ..."
            className="custom-search-class"
            buttonIcon="Frame-5"
            inputClassName="custom-input-class"
            buttonClassName="custom-button-class"
        />
    );
};

export default Search;