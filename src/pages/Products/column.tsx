import { ColumnDef } from "@tanstack/react-table";
import Icon from "../../lib/icon";
import { Button } from "../../components/ui/button";
import { Checkbox } from "../../components/ui/checkbox";
import { productModel, WagesTypeResponseApi } from "./types";
import { useState } from "react";
import { DeleteProducts } from "../../lib/endPointes/Products/DeleteProducts";
import Toast from "../../components/Toast/Toast";
import { Modal } from "../../common/Modal/Modal";
import ViewProdoct from "./Modals/viewProduct/ViewProduct";
import EditeProduct from "./Modals/editProduct/EditeProduct";
import AlertDialogModal from "../../components/AlertDialog/AlertDialog";
import Trash from "../../components/Trash/Trash";
import { formatPrice } from "../../lib/formatPrice";
import { convertImageUrl } from "../../lib/convertImageUrl";
import ProductForm from "../../components/ProductForm/ProductForm";
import { UpdateProducts } from "../../lib/endPointes/Products/UpdateProducts";


const ActionButtons = ({ rowInfo, onEditSuccess, onDeleteSuccess, onDeleteImage, onAddImage, WageTypes, CategoryName }: { rowInfo: productModel; onEditSuccess: (updatedProduct: productModel) => void; onDeleteSuccess: (deletedProductId: number) => void; onDeleteImage: (fileCode: string, productId: number) => void; WageTypes: any; CategoryName: any }) => {
    const [isOpenModalViewProduct, setIsOpenModalViewProduct] = useState(false);
    const [isOpenModalEditProduct, setIsOpenModalEditProduct] = useState(false);
    const handleCloseModalViewProduct = () => {
        setIsOpenModalViewProduct((prev) => !prev);
    };
    const handleCloseModalEditProduct = () => {
        setIsOpenModalEditProduct((prev) => !prev);
    };
    const handleDelete = async () => {
        onDeleteSuccess(rowInfo.id); // Call the onDeleteSuccess callback with the deleted product ID
        Toast({
            message: 'حذف با موفقیت انجام شد',
            type: 'success'
        })
        // try {
        //     const response = await DeleteProducts({ id: rowInfo?.id });
        //     if (response.data.isSuccessful) {
        //         response?.data?.getMessageText.map((message: string) => {
        //             Toast({
        //                 message: message,
        //                 type: 'success'
        //             })
        //         })
        //     }

        // } catch (error: any) {
        //     console.error("Error deleting product:", error);
        //     Toast({
        //         message: error?.message,
        //         type: 'error'
        //     })
        // }
    };
    return (
        <div className="inline-flex h-[30px] justify-center items-start gap-[5px] flex-shrink-0 pt-[4px] pr-[0px] pb-[4px] pl-[5px]">
            <Modal
                isOpen={isOpenModalViewProduct}
                onClose={handleCloseModalViewProduct}
                trigger={
                    <Button
                        variant="ghost"
                        size="icon"
                        className="w-[22px] h-[22px] flex-shrink-0 rounded-[8px] py-[2px]"
                    >
                        <i className="icon-view text-black"></i>
                    </Button>
                }
            >
                <ProductForm
                    mode="view"
                    initialData={rowInfo}
                    categoryName={CategoryName}
                    onSubmit={UpdateProducts}
                    onClose={handleCloseModalViewProduct}
                    onEditSuccess={onEditSuccess}
                />
            </Modal>

            <Modal
                isOpen={isOpenModalEditProduct}
                onClose={handleCloseModalEditProduct}
                trigger={
                    <Button
                        variant="ghost"
                        size="icon"
                        className="w-[23px] h-[22px] flex-shrink-0 rounded-[8px] py-[2px]"
                    >
                        <i className="icon-edite text-black"></i>
                    </Button>
                }
            >

                <ProductForm
                    mode="edit"
                    initialData={rowInfo}
                    categoryName={CategoryName}
                    onSubmit={UpdateProducts}
                    onClose={handleCloseModalEditProduct}
                    onDeleteImage={onDeleteImage}
                    onEditSuccess={onEditSuccess}
                />
            </Modal>

            <AlertDialogModal
                trigger={
                    <Button
                        variant="ghost"
                        size="icon"
                        className="w-[23px] h-[22px] flex-shrink-0 rounded-[8px] py-[2px]"
                    >
                        <i className="icon-trash text-black"></i>
                    </Button>
                }
                cancelText="انصراف"
                confirmText="حذف"
                onConfirm={handleDelete}
            >
                <Trash
                    describtion={
                        <span className="text-[14px]"> آیا از حذف محصول <span> "{rowInfo?.name}" </span>مطمئن هستید؟</span>
                    }
                />
            </AlertDialogModal>
        </div>
    );
};

export const getColumns = (
    onEditSuccess: (updatedProduct: productModel) => void,
    onDeleteSuccess: (deletedProductId: number) => void,
    onDeleteImage: (fileCode: string, productId: number) => void,
    onAddImage: (fileCode: string, productId: number) => void,
    CategoryName: any
): ColumnDef<productModel>[] => [
        {
            id: "انتخاب",
            size: 10,
            header: ({ table }) => (
                <div className="flex justify-start pr-3">
                    <Checkbox
                        checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
                        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                        aria-label="Select all"
                        className="custom-checkbox"
                    />
                </div>
            ),
            cell: ({ row }) => (
                <div className="flex justify-start pr-3">
                    <Checkbox
                        checked={row.getIsSelected()}
                        onCheckedChange={(value) => row.toggleSelected(!!value)}
                        aria-label="Select row"
                        className="custom-checkbox"
                    />
                </div>
            ),
        },
        {
            accessorKey: "code",
            id: "کد",
            cell: (info) => info.getValue(),
            header: () => <div className="text-center"><span>کد</span></div>,
        },
        {
            accessorKey: "name",
            id: "نام",
            cell: (info) => info.getValue(),
            header: () => <div className="text-center"><span>نام</span></div>,
        },
        {
            id: 'عکس',
            accessorKey: 'productImages',
            header: () => <div className="text-center"><span>تصاویر</span></div>,
            cell: ({ row }) => {
                return (
                    <div className="flex justify-center items-center">

                        {row?.original?.productImages?.map((item: any, index: any) => (
                            <div
                                key={index}
                                className={`border w-[33px] h-[33px] rounded-[50%] z-${index + 2} ml-[-22px] cursor-pointer hover:z-50`}
                            >
                                <img src={"https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&q=80&w=2000"} alt={item.fileCode} className="w-full h-full rounded-[100%] object-contain" loading="lazy" />
                            </div>
                        ))}
                    </div>
                )
            },
        },
        {
            id: 'وزن',
            accessorKey: "weight",
            cell: (info) => info.getValue(),
            header: () => <div className="text-center"><span>وزن</span></div>,
        },
        {
            accessorKey: "carat",
            id: "عیار",
            cell: (info) => info.getValue(),
            header: () => <div className="text-center"><span>عیار</span></div>,
        },
        {
            accessorKey: "gramWage",
            id: "اجرت گرمی",
            cell: (info) => formatPrice(info.getValue() || 0).formattedNumber,
            header: () => <div className="text-center"><span>اجرت گرمی</span></div>,
        },
        {
            accessorKey: "percentageWage",
            id: "اجرت درصدی",
            cell: (info) => info.getValue() && info.getValue() + "%",
            header: () => <div className="text-center"><span>اجرت درصدی</span></div>,
        },
        {
            id: "عملیات",
            header: () => <div className="text-center"><span>عملیات</span></div>,
            cell: ({ row }) => <ActionButtons
                rowInfo={row.original}
                onEditSuccess={onEditSuccess}
                onDeleteSuccess={onDeleteSuccess}
                onDeleteImage={onDeleteImage}
                onAddImage={onAddImage}
                CategoryName={CategoryName}
            />,

        },
    ];