import Icon from "../../lib/icon";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useRef } from "react";

type SearchProps = {
    searchValue: string | boolean|any;
    setSearchValue: (value: string | boolean | any) => void;
    handleSearch: () => void;
    placeholder?: string | any;
    className?: string | any;
    buttonIcon?: string | any;
    inputClassName?: string | any;
    buttonClassName?: string | any;
};

const SearchCom = ({
    searchValue,
    setSearchValue,
    handleSearch,
    placeholder = "جستجو...",
    className = "",
    buttonIcon = "Frame-5",
    inputClassName = "",
    buttonClassName = "",
}: SearchProps) => {
    const inputRef = useRef<HTMLInputElement>(null);

    const selectText = () => {
        if (inputRef.current) {
            inputRef.current.select();
        }
    };

     // Handle Enter key press
     const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
            handleSearch(); // Trigger search when Enter is pressed
    };


    return (
        <div className={`border flex h-[38px] flex-shrink-0 rounded-[26px] bg-MainColor ${className}`}>
            <Button
                variant='ghost'
                size='icon'
                className={`hover:bg-inherit rounded-[26px] ${buttonClassName}`}
                onClick={handleSearch}
            >
                <Icon icon={buttonIcon} />
            </Button>
            <Input
                ref={inputRef}
                className={`
                    border-none rounded-[26px] focus-visible:ring-0 shadow-none   
                    max-w-full 
                    placeholder:text-[13px] placeholder:text-colorTextSidbar
                    selection:bg-blue_5 selection:text-white text-black_5
                    ${inputClassName}
                `}
                value={searchValue?.toString()}
                onChange={(e) => setSearchValue(e.target.value)}
                onFocus={selectText}
                placeholder={placeholder}
                onKeyUp={handleKeyDown}
            />
        </div>
    );
};

export default SearchCom;