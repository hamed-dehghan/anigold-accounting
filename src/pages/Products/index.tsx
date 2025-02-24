import { useEffect, useMemo, useState } from "react";
import { DataTable } from "../../components/table/Table";
import { getColumns } from "./column";
import { productModel } from "./types";
import SearchCom from "../../components/search/search";
import { fetchAllProduct } from "../../lib/endPointes/Products/Products";
import TreeStructure from "../../components/TreeStructure/TreeStructure";
import { AllCategorys } from "../../lib/endPointes/Categorys/AllCategorys";
import { ScrollArea, ScrollBar } from "../../components/ui/scroll-area";
import { SearchCategor } from "../../lib/endPointes/Categorys/SearchCategory";

import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "../../components/ui/resizable";
import { Modal } from "../../common/Modal/Modal";
import { Button } from "../../components/ui/button";
import Icon from "../../lib/icon";
import ProductForm from "../../components/ProductForm/ProductForm";
import { AddProduct } from "../../lib/endPointes/Products/AddProducts";

interface TreeItem {
    id: number;
    name: string;
    isLeaf: boolean;
    children: TreeItem[];
    parentId?: number | null;
}

const Products = () => {
    const [searchValue, setSearchValue] = useState<string>("");
    const [products, setProducts] = useState<productModel[]>([]);
    const [Category, setCategory] = useState<TreeItem[]>([]);
    const [IsLoading, setIsLoading] = useState(true);
    const [IsLoadingCategory, setIsLoadingCategory] = useState(true);
    const [IsModalAddProductsOpen, setIsModalAddProductsOpen] = useState(false) //track for modal create products
    const [IsModalTreeStructure, setIsModalTreeStructure] = useState(false)  //track for modal tree structure for mobile mode
    const [CategoryID, setCategoryID] = useState<number>(() => {
        if (typeof window !== "undefined") {
            const storedCategoryID = localStorage.getItem("setCategoryID");
            if (storedCategoryID) {
                return JSON.parse(storedCategoryID);
            }
        }
        return 1; // fallback default category ID
    });

    // Persisted panel sizes
    const [leftPanelSize, setLeftPanelSize] = useState<number>(() => {
        const saved = localStorage.getItem("leftPanelSize");
        return saved ? parseFloat(saved) : 25;
    });
    const [rightPanelSize, setRightPanelSize] = useState<number>(() => {
        const saved = localStorage.getItem("rightPanelSize");
        return saved ? parseFloat(saved) : 75;
    });

    // This callback is fired when the panels are resized.
    // The 'sizes' parameter is assumed to be an array of numbers for each panel.
    const handleResizable = (sizes: number[]) => {
        setLeftPanelSize(sizes[0]);
        setRightPanelSize(sizes[1]);
        localStorage.setItem("leftPanelSize", sizes[0].toString());
        localStorage.setItem("rightPanelSize", sizes[1].toString());
    };

    const [expandedNodes, setExpandedNodes] = useState<Record<number, boolean>>({});
    const [pagination, setPagination] = useState({
        currentPage: 1,
        pageSize: 150,
        totalPages: 1,
        totalCount: 0,
        hasNextPage: false,
        hasPreviousPage: false,
    });
  
    // Generate fake categories
    const generateFakeCategories = (count: number): TreeItem[] => {
        const fakeCategories: TreeItem[] = [];
        for (let i = 1; i <= count; i++) {
            const category: TreeItem = {
                id: i,
                name: `Category ${i}`,
                isLeaf: i > 5, // Make some categories leaf nodes
                children: [],
                parentId: i > 1 ? Math.floor(Math.random() * (i - 1)) + 1 : null, // Random parent for nesting
                isEditable:true,
                isDeletable:true
            };
            fakeCategories.push(category);
        }

        // Build the tree structure by assigning children
        const buildTree = (categories: TreeItem[], parentId: number | null = null): TreeItem[] => {
            return categories
                .filter((category) => category.parentId === parentId)
                .map((category) => ({
                    ...category,
                    children: buildTree(categories, category.id),
                }));
        };

        return buildTree(fakeCategories);
    };

    const storeFakeCategoriesLocally = () => {
        const fakeCategories = generateFakeCategories(20);
        localStorage.setItem("fakeCategories", JSON.stringify(fakeCategories));
    };

    const fetchCategory = async (searchValue: string) => {
        try {
            setIsLoadingCategory(true);
            const storedCategories = localStorage.getItem("fakeCategories");
            if (storedCategories) {
                const fakeCategories = JSON.parse(storedCategories);
                setCategory(fakeCategories);
            } else {
                let response;
                if (searchValue.length === 0) {
                    response = await AllCategorys();
                } else {
                    response = await SearchCategor(searchValue);
                }
                if (Array.isArray(response?.data?.data)) {
                    setCategory(response.data.data);
                } else {
                    console.error("Unexpected API response format:", response?.data?.data);
                }
            }
            setIsLoadingCategory(false);
        } catch (error) {
            console.error("Error fetching categories:", error);
            setIsLoadingCategory(false);
        }
    };

    useEffect(() => {
        storeFakeCategoriesLocally();
        fetchCategory(""); // load all categories initially
    }, []);

    const handleSearch = () => {
        fetchCategory(searchValue);
    };

    //fake data for table
    const generateFakeProducts = (count: number): productModel[] => {
        const fakeProducts: productModel[] = [];
        for (let i = 1; i <= count; i++) {
            fakeProducts.push({
                id: i,
                code: `CODE${i}`,
                name: `Product ${i}`,
                weight: Math.floor(Math.random() * 1000) / 100,
                carat: Math.floor(Math.random() * 24) + 1,
                gramWage: Math.floor(Math.random() * 1000) / 100,
                percentageWage: Math.floor(Math.random() * 100),
                productImages: [
                    { fileCode: `image${i}_1`, isMain: true },
                    { fileCode: `image${i}_2`, isMain: false },
                ],
            });
        }
        return fakeProducts;
    };

    const storeFakeDataLocally = () => {
        const fakeProducts = generateFakeProducts(5);
        localStorage.setItem("fakeProducts", JSON.stringify(fakeProducts));
    };

    const fetchProducts = async () => {
        try {
            setIsLoading(true);
            const storedProducts = localStorage.getItem("fakeProducts");
            if (storedProducts) {
                const fakeProducts = JSON.parse(storedProducts);
                setProducts(fakeProducts);
                setPagination((prev) => ({
                    ...prev,
                    currentPage: 1,
                    totalPages: 1,
                    totalCount: fakeProducts.length,
                    hasNextPage: false,
                    hasPreviousPage: false,
                }));
            } else {
                const response = await fetchAllProduct({
                    page: pagination.currentPage,
                    pageSize: pagination.pageSize,
                    CategoryID: CategoryID,
                });
                const apiData = response.data.data;
                if (Array.isArray(apiData?.data)) {
                    setProducts(apiData.data);
                    setPagination((prev) => ({
                        ...prev,
                        currentPage: apiData.currentPage,
                        totalPages: apiData.totalPages,
                        totalCount: apiData.totalCount,
                        hasNextPage: apiData.hasNextPage,
                        hasPreviousPage: apiData.hasPreviousPage,
                    }));
                } else {
                    setProducts([]);
                    console.error("Unexpected API response format:", apiData);
                }
            }
            setIsLoading(false);
        } catch (error) {
            console.error("Error fetching products:", error);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        storeFakeDataLocally()
        if (CategoryID !== null) {
            fetchProducts();
        }
    }, [CategoryID, pagination.currentPage, pagination.pageSize]);

    // Callbacks for edit, delete, add product, and category changes...
    const handleEditSuccess = (updatedProduct: productModel) => {
        setProducts((prevProducts) =>
            prevProducts.map((product) =>
                product.id === updatedProduct.id ? updatedProduct : product
            )
        );
    };

    const handleDeleteSuccess = (deletedProductId: number) => {
        setProducts((prevProducts) =>
            prevProducts.filter((product) => product.id !== deletedProductId)
        );
        setPagination((prev) => ({
            ...prev,
            totalCount: prev.totalCount - 1,
        }));
    };

    const handleAddSuccess = (newProduct: productModel) => {
        setProducts((prevProducts) => [...prevProducts, newProduct]);
        // fetchProducts();
    };

    const handleDeleteCategory = (categoryId: number) => {
        const removeCategory = (categories: TreeItem[], idToRemove: number): TreeItem[] => {
            return categories
                .filter((category) => category.id !== idToRemove)
                .map((category) => ({
                    ...category,
                    isLeaf: category.children.length === 0,
                    children: removeCategory(category.children, idToRemove),
                }));
        };
        const updatedCategories = removeCategory(Category, categoryId);
        setCategory(updatedCategories);
    };

    const handleAddCategory = (newCategory: TreeItem) => {
        setCategory((prevCategories) => {
            const addCategoryRecursively = (categories: TreeItem[]): TreeItem[] => {
                return categories.map((category) => {
                    if (category.id === newCategory.parentId) {
                        return {
                            ...category,
                            isLeaf: false,
                            children: [...category.children, newCategory],
                        };
                    } else if (category.children.length > 0) {
                        return {
                            ...category,
                            children: addCategoryRecursively(category.children),
                        };
                    }
                    return category;
                });
            };
    
            const updatedCategories =
                newCategory.parentId === null
                    ? [...prevCategories, newCategory]
                    : addCategoryRecursively(prevCategories);
    
            // Update localStorage
            localStorage.setItem("fakeCategories", JSON.stringify(updatedCategories));
    
            return updatedCategories;
        });
    
        if (newCategory.parentId !== null) {
            setExpandedNodes((prev) => ({ ...prev, [newCategory.parentId]: true }));
        }
    };
    

    const handleEditCategory = (updatedCategory: { id: number; name: string }) => {
        const updateCategory = (categories: TreeItem[]): TreeItem[] => {
            return categories.map((category) => {
                if (category.id === updatedCategory.id) {
                    return { ...category, name: updatedCategory.name };
                }
                if (category.children.length > 0) {
                    return {
                        ...category,
                        children: updateCategory(category.children),
                    };
                }
                return category;
            });
        };
        setCategory((prev) => updateCategory(prev));
    };

    const handleChangeCategory = (idCategory: number) => {
        localStorage.setItem("setCategoryID", JSON.stringify(idCategory));
        setCategoryID(idCategory);
    };

    const handlePageChange = (newPage: number, newPageSize?: number) => {
        setPagination((prev) => ({
            ...prev,
            currentPage: newPage,
            pageSize: newPageSize || prev.pageSize,
        }));
    };

    const handleDeletePicture = (fileCode: any, productId: any) => {
        setProducts((preProducts) =>
            preProducts.map((product) =>
                product.id === productId
                    ? {
                        ...product,
                        productImages: product.productImages.filter((img: any) => img.fileCode !== fileCode),
                    }
                    : product
            )
        );
    };

    const handleAddImage = (fileCode: any, productId: any) => {
        setProducts((preProducts) =>
            preProducts.map((product) =>
                product.id === productId
                    ? {
                        ...product,
                        productImages: [...product.productImages, { fileCode: fileCode, isMain: false }],
                    }
                    : product
            )
        );
    };

    const findCategoryNameById = (Category: any, targetId: any) => {
        for (const category of Category) {
            if (category.id === targetId) {
                return category.name;
            }
            if (category.children && category.children.length > 0) {
                const found = findCategoryNameById(category.children, targetId);
                if (found) return found;
            }
        }
    };

    const CategoryName = findCategoryNameById(Category, CategoryID) || "دسته‌بندی نامشخص";

    const columns = useMemo(() => getColumns(handleEditSuccess, handleDeleteSuccess, handleDeletePicture, handleAddImage, CategoryName), [CategoryName]);
    const data = useMemo(() => products, [products]);
    const items = useMemo(() => Category, [Category]);


    //handle for modal add products
    const handleOpenModalProducts = () => {
        setIsModalAddProductsOpen(!IsModalAddProductsOpen)
    }
    //handle for modal tree structure
    const handleOpenModalTreeStructure = () => {
        setIsModalTreeStructure(!IsModalTreeStructure)
    }
    const title = `محصولاتِ "${CategoryName}"`
    return (
        <div className="flex gap-4 justify-center items-center h-full   relative">
            {/* Left side: Tree structure and search */}
            <ResizablePanelGroup direction="horizontal" className="w-full gap-1" onLayout={handleResizable}>
                <ResizablePanel
                    defaultSize={leftPanelSize}
                    minSize={15}
                    maxSize={40}
                    className="border bg-white  flex-shrink-0 rounded-[15px]   flex-col gap-5 hidden lg:flex"
                >
                    <TreeSection
                        searchValue={searchValue}
                        setSearchValue={setSearchValue}
                        handleSearch={handleSearch}
                        items={items}
                        expandedNodes={expandedNodes}
                        setExpandedNodes={setExpandedNodes}
                        handleDeleteCategory={handleDeleteCategory}
                        handleAddCategory={handleAddCategory}
                        handleEditCategory={handleEditCategory}
                        handleChangeCategory={handleChangeCategory}
                        IsLoadingCategory={IsLoadingCategory}
                    />
                </ResizablePanel>
                <ResizableHandle withHandle className="hidden lg:flex " />
                <ResizablePanel defaultSize={rightPanelSize} minSize={60}>
                    {/* Right side: Table and profile info */}
                    <div className="w-full h-full bg-white rounded-[15px] ">
                        <div className="bg-content h-full flex flex-col gap-2 rounded-[15px]">
                            <div
                                className='flex justify-between lg:flex-row gap-5 items-start lg:items-center pr-5 pl-2 flex-wrap pt-6'
                            >
                                <div className="h-[29px] w-fit text-start flex-shrink-0 truncate">
                                    <span className="text-gray_45 text-[18px]">{title}</span>
                                </div>
                                <div className="grid grid-cols-2 gap-6 lg:flex lg:justify-end w-full ">
                                    <Modal
                                        isOpen={IsModalTreeStructure}
                                        onClose={handleOpenModalTreeStructure}
                                        trigger={
                                            <Button className=' ml-[8px] self-center w-[107px] rounded-[5px] h-[41px] flex lg:hidden justify-center items-end flex-shrink-0 bg-blue_5 hover:bg-blue_5 '>
                                                <div >
                                                    <span className='text-white text-[14px] font-[400] leading-[21px] h-[30px] w-[69px]'>انتخاب  دسته بندی</span>
                                                </div>
                                            </Button>
                                        }
                                        contentClass="flex lg:hidden !overflow-x-scroll w-fit"

                                    >
                                        <TreeSection searchValue={searchValue} setSearchValue={setSearchValue} handleSearch={handleSearch} items={items} expandedNodes={expandedNodes} setExpandedNodes={setExpandedNodes} handleDeleteCategory={handleDeleteCategory} handleAddCategory={handleAddCategory} handleEditCategory={handleEditCategory} handleChangeCategory={handleChangeCategory} IsLoadingCategory={IsLoadingCategory} handleOpenModalTreeStructure={handleOpenModalTreeStructure} />
                                    </Modal>

                                    <div className="flex justify-end absolute top-4">
                                        <Modal
                                            isOpen={IsModalAddProductsOpen}
                                            onClose={handleOpenModalProducts}
                                            trigger={
                                                <Button className=' ml-[8px] self-center w-[107px] rounded-[5px] h-[41px] flex justify-center items-end flex-shrink-0 bg-blue_5 hover:bg-blue_5 '>
                                                    <div >
                                                        <span className='text-white text-[14px] font-[400] leading-[21px] h-[30px] w-[69px]'>+ محصول جدید</span>
                                                    </div>
                                                </Button>
                                            }
                                        >
                                            <ProductForm mode="add" categoryName={CategoryName} categoryId={CategoryID} onSubmit={AddProduct} onClose={handleOpenModalProducts} onAddSuccess={handleAddSuccess}/>
                                        </Modal>
                                    </div>

                                </div>
                            </div>
                            <div className="font-Poppins mt-0">
                                <DataTable columns={columns} data={data} IsLoading={IsLoading} pagination={pagination} onPageChange={handlePageChange} />
                            </div>
                        </div>
                    </div>
                </ResizablePanel>
            </ResizablePanelGroup>
        </div>
    );
};

export default Products;


const TreeSection = (props) => {
    return (
        <div className="bg-white  pt-7 h-[calc(100vh-125px)] flex-shrink-0 rounded-[15px] p-1 flex flex-col gap-5 ">
            <div className="flex flex-col justify-center items-start gap-3 flex-wrap">
                <div className="flex justify-between items-center pr-5 w-full">
                    <p className="text-[18px] text-center font-[400] pl-2 truncate text-black_5">دسته بندی‌های محصولات</p>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="flex lg:hidden w-[21px] h-[20px] bg-MainColor  rounded-[20px] py-[7px]"
                        onClick={props?.handleOpenModalTreeStructure}
                    >
                        <Icon icon="xmark" size={13} />
                    </Button>
                </div>
                <SearchCom
                    searchValue={props?.searchValue}
                    setSearchValue={props?.setSearchValue}
                    handleSearch={props?.handleSearch}
                    placeholder="جستجو در دسته بندی ها ..."
                    className="w-full h-[42px] flex-shrink-0"
                />
            </div>
            <ScrollArea className="w-full h-full " dir="rtl">
                <TreeStructure
                    treeItems={props?.items}
                    expandedNodes={props?.expandedNodes}
                    setExpandedNodes={props?.setExpandedNodes}
                    handleDeleteCategory={props?.handleDeleteCategory}
                    handleAddCategory={props?.handleAddCategory}
                    handleEditCategory={props?.handleEditCategory}
                    changeCategory={props?.handleChangeCategory}
                    IsLoadingCategory={props?.IsLoadingCategory}
                    searchValue={props?.searchValue}
                />
                <ScrollBar orientation="horizontal" />
            </ScrollArea>
        </div>
    )
}