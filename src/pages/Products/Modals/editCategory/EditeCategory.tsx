import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Viewer } from "../../../../components/viewer/viewer";
import { Button } from "../../../../components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../../../../components/ui/dialog";
import Icon from "../../../../lib/icon";
import { UpdateCategory } from "../../../../lib/endPointes/Categorys/UpdateCategory";
import Toast from "../../../../components/Toast/Toast";
import { FormField } from "../../../../components/FormField/FormField";

interface EditProductProp {
    gateGoryInfo: string;
    info: { id: number; parentId?: number | null };
    onEditSuccess: (updatedCategory: { id: number; name: string }) => void;
}

const EditCategory: React.FC<EditProductProp> = ({ gateGoryInfo, info, onEditSuccess }) => {
    const [isOpenModalEditeCategory, setIsOpenModalEditeCategory] = useState(false); //state for track status modal edite category

    //fun for change state modal edit
    const handleCloseModalEditeCategory = () => {
        setIsOpenModalEditeCategory(!isOpenModalEditeCategory)
    }

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            name: gateGoryInfo,
        },
    });

    const onSubmit = async (data: { name: string }) => {
        try {
            const dataForApi = {
                ...data,
                id: info.id,
                parentId: info.parentId,
            };
            onEditSuccess({
                id: info.id,
                name: data.name,
            });
            Toast({
                message: 'ویرایش دسته با موفقیت انجام شد',
                type: 'success'
            })
            handleCloseModalEditeCategory();
            const response = await UpdateCategory(dataForApi);
            // if (response.data.isSuccessful) {


            //     response?.data?.getMessageText.map((message: string) => {
            //         Toast({
            //             message: message,
            //             type: 'success'
            //         })
            //     })
            // } else {
            //     // response?.data?.getMessageText.map((message: string) => {
            //     //     Toast({
            //     //         message: message,
            //     //         type: 'error'
            //     //     })
            //     // })
            // }
        } catch (error) {
            // Object.values(error.response.data.errors).map((item: any) => {
            //     Toast({
            //         message: item,
            //         type: 'error'
            //     })
            // })
        }
    };
    const title = `ویرایش دسته "${info?.name}"`
    return (
        <Dialog open={isOpenModalEditeCategory} onOpenChange={handleCloseModalEditeCategory}>
            <DialogTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    className="w-[22px] h-[19px] py-2 flex-shrink-0 rounded-[8px] self-center"
                >
                    <i className="icon-edite text-black"></i>
                </Button>
            </DialogTrigger>
            <DialogContent className="overflow-y-auto overflow-x-hidden  lg:overflow-hidden max-h-[95%]   lg:h-auto   max-w-screen-sm  lg:max-w-screen-lg    rounded-[4px] flex-shrink-0 bg-white  !py-0 ">
                <DialogHeader className="hidden">
                    <DialogTitle></DialogTitle>
                </DialogHeader>
                <Viewer
                    onClose={handleCloseModalEditeCategory}
                    classes={{
                        specifications: "flex justify-between",
                        specItem: "text-[14px] leading-[21px] gap-1 flex items-center truncate",
                    }}
                    SpecificationShow={false}
                    HeaderShow={false}
                >
                    <div>
                        <div className="h-[76px] flex flex-col-reverse justify-center items-center md:justify-between md:flex md:flex-row md:items-center gap-2 text-gray_45 pr-3">
                            <span>{title}</span>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="w-[21px] h-[20px] md:hover:bg-MainColor rounded-[20px] py-[7px]"
                                onClick={handleCloseModalEditeCategory}
                            >
                                <Icon icon="xmark" size={13} />
                            </Button>
                        </div>
                        <div className="w-full border"></div>
                        <form onSubmit={handleSubmit(onSubmit)} className="gap-5 my-3 text-gray_45 text-[14px] pr-0 lg:pr-[7px]">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 mb-[20px]">
                                <FormField
                                    name="name"
                                    control={control}
                                    rules={{ required: "وارد کردن نام دسته بندی اجباری است" }}
                                    label="نام"
                                    errors={errors}
                                    autoFocus={true}
                                    requrid={true}
                                />
                            </div>
                            <div className="w-full border my-5"></div>
                            <div className="justify-center md:justify-end flex">
                                <Button
                                    variant="outline"
                                    className="h-[37px] text-white hover:text-white text-[14px] text-center bg-green_1 hover:bg-green_1"
                                    type="submit"
                                >
                                    ذخیره
                                </Button>
                            </div>
                        </form>
                    </div>
                </Viewer>
            </DialogContent>
        </Dialog>
    );
};

export default EditCategory;