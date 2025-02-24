import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Button } from "../../../../components/ui/button";
import { AddCategorys } from "../../../../lib/endPointes/Categorys/AddCategory";
import Icon from "../../../../lib/icon";
import { Dialog, DialogContent, DialogHeader, DialogOverlay, DialogTitle, DialogTrigger } from "../../../../components/ui/dialog";
import Toast from "../../../../components/Toast/Toast";
import { Viewer } from "../../../../components/viewer/viewer";
import { FormField } from "../../../../components/FormField/FormField";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../../components/ui/select";

interface AddCategoryProps {
    info: TreeItem;
    onAddCategory: (newCategory: TreeItem) => void;
}

const AddCategory: React.FC<AddCategoryProps> = ({ info, onAddCategory }) => {
    const [isOpenModalAddCategory, setIsOpenModalAddCategory] = useState(false); //state for track status modal add category

    const handleCloseModalAddCategory = () => {
        setIsOpenModalAddCategory(!isOpenModalAddCategory);
    };

    const {
        control,
        handleSubmit,
        reset,
        trigger,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data: any) => {
        const dataForApi = {
            ...data,
            parentId: info?.id,
            quiddityProductCategory: data.quiddityProductCategory,
        };
        handleCloseModalAddCategory();
        reset();
        onAddCategory({
            // id: response.data.data.id, // Ensure this matches your API response
            // parentId: response.data.data.parentId,
            parentId: info?.id,
            name: data.name,
            isLeaf: true,
            // code: response.data.data.code,
            // fullCode: response.data.data.fullCode,
            children: [],
        });
        Toast({
            message: 'دسته با موفقیت افزوده شد',
            type: "success"
        })
        // try {
        //     const response = await AddCategorys(dataForApi);

        //     if (response.data.isSuccessful) {
        //         response.data?.getMessageText?.map((item: string) => {
        //             Toast({
        //                 message: item,
        //                 type: "success"
        //             })
        //         })
        //         console.log(response.data.data.id);

        //     } else {
        //         response.data?.getMessageText?.map((item: string) => {
        //             Toast({
        //                 message: item,
        //                 type: "error"
        //             })
        //         })
        //     }
        // } catch (error) {
        //     // toast.error("افزودن دسته جدید با مشکلی روبرو شد");
        //     const message = Object.values(error.response.data.errors).map((item: any) => {
        //         Toast({
        //             message: item,
        //             type: 'error'
        //         })
        //     })
        // }
    };
    const title = `افزودن زیرمجموعه به دسته "${info?.name}"`
    const quiddityProductCategory = [
        { value: 1, label: "آب شده" },
        { value: 2, label: "مسکوکات" },
        { value: 3, label: "ساخته شده" },
        { value: 4, label: "متفرقه" },
        { value: 5, label: "شمش" },
    ]

    return (
        <Dialog open={isOpenModalAddCategory} onOpenChange={handleCloseModalAddCategory}>
            <DialogTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    className="w-[22px]  h-[19px] flex-shrink-0 rounded-[7px] "
                >
                    <span className="text-black text-lg">+</span>
                </Button>
            </DialogTrigger>
            <DialogOverlay >
                <DialogContent className="overflow-y-auto overflow-x-hidden  lg:overflow-hidden max-h-[95%]   lg:h-auto   max-w-screen-sm  lg:max-w-screen-lg    rounded-[4px] flex-shrink-0 bg-white  !py-0  ">
                    <DialogHeader className="hidden">
                        <DialogTitle></DialogTitle>
                    </DialogHeader>
                    <Viewer
                        onClose={handleCloseModalAddCategory}
                        classes={{
                            specifications: "flex justify-between",
                            specItem: "text-[14px] leading-[21px] gap-1 flex items-center truncate",
                        }}
                        SpecificationShow={false}
                        HeaderShow={false}
                        sepratorShow={false}
                    >
                        <div>
                            <div className="h-[76px] flex flex-col-reverse justify-center items-center md:justify-between md:flex md:flex-row md:items-center gap-2 text-gray_45 pr-3">
                                <span>{title}</span>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="w-[21px] h-[20px] md:hover:bg-MainColor rounded-[20px] py-[7px]"
                                    onClick={handleCloseModalAddCategory}
                                >
                                    <Icon icon="xmark" size={13} />
                                </Button>
                            </div>
                            <div className="w-full border"></div>
                            <form onSubmit={handleSubmit(onSubmit)} className="gap-5 my-3 text-gray_45 text-[14px] pr-[7px]">
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-2 mb-[30px] ml-2">
                                    <FormField
                                        trigger={trigger}
                                        name="name"
                                        control={control}
                                        rules={{ required: "وارد کردن نام اجباری است" }}
                                        label="نام"
                                        errors={errors}
                                        autoFocus={true}
                                        requrid={true}
                                    />
                                    <div>
                                        <div className='max-w-[90%] md:max-w-full flex items-center justify-center  border border-blue_3 rounded-[5px]'>
                                            <label className='w-[115px] h-[37px] flex justify-center items-center rounded-[5px] bg-blue_2'>نوع</label>
                                            <Controller
                                                name="quiddityProductCategory"
                                                control={control}
                                                render={({ field }) => (
                                                    <Select
                                                        onValueChange={(value) => field.onChange(value ? parseInt(value) : undefined)}
                                                        value={field.value?.toString() || ""}
                                                        dir='ltr'>
                                                        <SelectTrigger className="border-t-0 border-b-0 border-l-0  border-r-1 border-[inherit] rounded-none rounded-l-[5px] rounded-br-[18px] shadow-none focus:ring-0 bg-white mr-[-12px]">
                                                            <SelectValue placeholder="نوع" >{quiddityProductCategory.find((quiddity) => quiddity.value === field.value)?.label || 'نوع'}</SelectValue>
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {quiddityProductCategory?.map((quiddity) => (
                                                                <SelectItem className={`px-1 text-black_5 text-[14px]`} key={quiddity.value} value={quiddity.value} >
                                                                    {quiddity.value} - {quiddity.label}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                )}
                                            />
                                        </div>
                                        {errors.quiddityProduct && (
                                            <span className="text-red_5 text-right text-[10px] mt-1">{errors.quiddityProduct.message}</span>
                                        )}
                                    </div>
                                </div>
                                <div className="w-full border my-5"></div>
                                <div className="justify-center lg:justify-end flex">
                                    <Button
                                        variant="outline"
                                        className="h-[37px] text-white hover:text-white text-[14px] text-center bg-green_1 hover:bg-green_1"
                                        type="submit"
                                    >
                                        افزودن
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </Viewer>
                </DialogContent>
            </DialogOverlay>
        </Dialog>
    );
};

export default AddCategory;