// profileInfo.tsx
import { Button } from "../../components/ui/button";
import './profile.css'
import { useState } from "react";
import { productModel } from "./types";
import { Modal } from "../../common/Modal/Modal";
import AddProducts from "./Modals/AddProduct";
import TooltipProvider from "../../common/Tooltips";
import doesTextFitInContainer from "../../lib/doestTextFitIncontainer";
import { text } from "stream/consumers";
import { ScrollArea } from "../../components/ui/scroll-area";
import TreeStructure from "../../components/TreeStructure/TreeStructure";
import SearchCom from "../../components/search/search";
import Icon from "../../lib/icon";

interface ProfileInfoProps {
    data: string;
    onAddSuccess: (newProduct: productModel) => void;
    WageTypes: any,
    treeStructureProp: any,
}

const ProfileInfo = ({ categoryID, data, onAddSuccess, WageTypes, treeStructureProp }: ProfileInfoProps) => {
    //state for modal add products
    const [IsModalAddProductsOpen, setIsModalAddProductsOpen] = useState(false)
    const [IsModalTreeStructure, setIsModalTreeStructure] = useState(false)
    //handle for modal add products
    const handleOpenModalProducts = () => {
        setIsModalAddProductsOpen(!IsModalAddProductsOpen)
    }
    //handle for modal tree structure
    const handleOpenModalTreeStructure = () => {
        setIsModalTreeStructure(!IsModalTreeStructure)
    }
    console.log('treeStructureProp', treeStructureProp);
    const title = `محصولاتِ "${data}"`
    return (
        <div
            className='flex justify-between md:flex-row gap-5 items-start md:items-center pr-5 pl-2 flex-wrap pt-6'
        >
            <div className="h-[29px] w-fit text-start flex-shrink-0 truncate">
                <span className="text-gray_45 text-[18px]">{title}</span>
            </div>
            <div className="grid grid-cols-2 gap-6 lg:flex lg:justify-end w-full ">
                <Modal
                    isOpen={IsModalTreeStructure}
                    onClose={handleOpenModalTreeStructure}
                    trigger={
                        <Button className=' ml-[8px] self-center w-[107px] rounded-[5px] h-[41px] sm:flex md:hidden justify-center items-end flex-shrink-0 bg-blue_5 hover:bg-blue_5 '>
                            <div >
                                <span className='text-white text-[14px] font-[400] leading-[21px] h-[30px] w-[69px]'>انتخاب  دسته بندی</span>
                            </div>
                        </Button>
                    }
                >
                    <div
                        className="bg-white  pt-7 h-[calc(100vh-125px)] flex-shrink-0 rounded-[15px] p-1 flex flex-col gap-5 overflow-y-auto"
                    >
                        <div className="flex flex-col justify-center items-start gap-3 flex-wrap">
                            <div className="flex justify-between    w-full items-start gap-3 flex-wrap">
                            <p className="text-[18px] text-center font-[400] pl-2 truncate text-black_5">دسته بندی‌های محصولات</p>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="w-[21px] h-[20px] bg-MainColor  rounded-[20px] py-[7px]"
                                onClick={handleOpenModalTreeStructure}
                            >
                                <Icon icon="xmark" size={13} />
                            </Button>
                            </div>
                            <SearchCom
                                searchValue={treeStructureProp?.searchValue}
                                setSearchValue={treeStructureProp?.setSearchValue}
                                handleSearch={treeStructureProp?.handleSearch}
                                placeholder="جستجو در دسته بندی ها ..."
                                className="w-full h-[42px] flex-shrink-0"
                            />
                        </div>
                        <ScrollArea className="w-full h-full " dir="rtl">
                            <TreeStructure
                                treeItems={treeStructureProp?.treeItems}
                                expandedNodes={treeStructureProp?.expandedNodes}
                                setExpandedNodes={treeStructureProp?.setExpandedNodes}
                                handleDeleteCategory={treeStructureProp?.handleDeleteCategory}
                                handleAddCategory={treeStructureProp?.handleAddCategory}
                                handleEditCategory={treeStructureProp?.handleEditCategory}
                                changeCategory={treeStructureProp?.handleChangeCategory}
                                IsLoadingCategory={treeStructureProp?.IsLoadingCategory}
                                searchValue={treeStructureProp?.searchValue}
                            />
                        </ScrollArea>
                    </div>


                </Modal>

                <Modal
                    isOpen={IsModalAddProductsOpen}
                    onClose={handleOpenModalProducts}
                    trigger={
                        <Button className='ml-[8px] self-center w-[107px] rounded-[5px] h-[41px] flex justify-center items-end flex-shrink-0 bg-blue_5 hover:bg-blue_5 '>
                            <div >
                                <span className='text-white text-[14px] font-[400] leading-[21px] h-[30px] w-[69px]'>+ محصول جدید</span>
                            </div>
                        </Button>
                    }
                >
                    <AddProducts categoryID={categoryID} onClose={handleOpenModalProducts} onAddSuccess={onAddSuccess} WageTypes={WageTypes} CategoryName={data} />
                </Modal>

            </div>
        </div>
    )
}

export default ProfileInfo