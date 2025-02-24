import React, { useRef, useState } from 'react'
import { productModel } from '../../pages/Products/types';
import { Controller, useForm, useWatch, setValue } from 'react-hook-form';
import { useDropzone } from 'react-dropzone';
import { UploadSingleFile } from '../../lib/endPointes/File/UploadSingleFile';
import { Viewer } from '../viewer/viewer';
import { convertImageUrl } from '../../lib/convertImageUrl';
import { Button } from '../ui/button';
import Icon from '../../lib/icon';
import { ScrollArea, ScrollBar } from '../ui/scroll-area';
import { FormField } from '../ViewDocuments';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import TooltipProvider from '../../common/Tooltips';
import Toast from '../Toast/Toast';
import { Modal } from '../../common/Modal/Modal';
import { divide } from 'lodash';
import { Input } from '../ui/input';
import EventListener from 'react-event-listener'
import ImageGalleryCompoent from '../ImageGallery/ImageGallery';

interface ProductFormProps {
    mode: 'add' | 'edit' | "view";
    initialData?: productModel | any;
    categoryId?: number;
    categoryName: string,
    wageTypes?: any;
    onSubmit?: (data: productModel) => Promise<void>;
    onClose: () => void;
    onDeleteImage?: (fileCode: string, productId: number) => void;
    onAddImage?: (fileCode: string, productId: number) => void;
    onEditSuccess?: (updatedProduct: productModel) => void;
    onAddSuccess?: (newProduct: productModel) => void;

}

const quiddityProductCategory = [
    { value: 1, label: "آب شده" },
    { value: 2, label: "مسکوکات" },
    { value: 3, label: "ساخته شده" },
    { value: 4, label: "متفرقه" },
    { value: 5, label: "شمش" },
];

const productCollection = [
    { value: 1, label: "بچه گانه" },
    { value: 2, label: "زنانه" },
    { value: 3, label: "مردانه" },
    { value: 4, label: "اسپرت" },
];


const ProductForm: React.FC<ProductFormProps> = ({
    mode,
    initialData,
    categoryId,
    categoryName,
    wageTypes,
    onSubmit,
    onClose,
    onDeleteImage,
    onAddImage,
    onEditSuccess,
    onAddSuccess
}) => {
    const [currentMode, setCurrentMode] = useState<'add' | 'edit' | 'view'>(mode);
    const [isOpenModalTotalWages, setIsOpenModalTotalPages] = useState(false) // state for modal total wage
    const [totalWageInput, setTotalWageInput] = useState('');
    const [isImageGalleryOpen, setIsImageGalleryOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState<any>(null) // State for selected image

    // Function to handle image click
    const handleImageClick = () => {
        const productImages = initialData?.productImages?.map((item: any) => ({
            original: convertImageUrl(item.fileCode),
            thumbnail: convertImageUrl(item.fileCode),
        }));
        setSelectedImage(productImages);
        setIsImageGalleryOpen(true);
    };


    // Function to switch to edit mode
    const handleEdit = () => {
        setCurrentMode('edit');
    };


    //states
    const quiddityProductRef = useRef<HTMLButtonElement>(null);
    const productCollectionRef = useRef<HTMLButtonElement>(null);
    const submitRef = useRef<HTMLButtonElement>(null);

    const [open, setOpen] = useState(false);

    //react-hook-form
    const { control, handleSubmit, reset, trigger, formState: { errors }, setValue } = useForm<productModel>({
        defaultValues: {
            weight: initialData?.weight,
            name: initialData?.name,
            code: initialData?.code,
            carat: initialData?.carat,
            wages: initialData?.wages,
            wageTypeId: initialData?.wageTypeId,
            productCollection: initialData?.productCollection, // Ensure default value is set
            quiddityProduct: initialData?.quiddityProduct,
            percentageWage: initialData?.percentageWage,// Ensure default value is set
            gramWage: initialData?.gramWage // Ensure default value is set
        },
    })

    //upload image state
    const [files, setFiles] = useState<File[]>([]);
    const uploadedFileRefs = useRef<{ [key: string]: string }>({});

    //watcher for weightField
    const weightValue = useWatch({ control, name: 'weight', defaultValue: initialData?.weight || '' })
    const percentageWageValue = useWatch({ control, name: 'percentageWage', defaultValue: initialData?.percentageWage || '' })
    const gramWageValue = useWatch({ control, name: 'gramWage', defaultValue: initialData?.gramWage || '' })

    //handle for toggle modal total wages
    const handleToggleModalTotalWages = () => {
        if (weightValue && !percentageWageValue && !gramWageValue) {
            setIsOpenModalTotalPages(!isOpenModalTotalWages)
            setTotalWageInput('')
        }

    }
    //handle dropZone
    const { getRootProps, getInputProps } = useDropzone({
        accept: { 'image/jpeg': ['.jpeg', '.jpg'], 'image/png': ['.png'] },
        onDrop: async (acceptedFiles) => {
            if (currentMode === 'view') return;

            setFiles([...files, ...acceptedFiles]);

            for (const file of acceptedFiles) {
                const formData = new FormData();
                formData.append("Content", file);
                Toast({
                    message: 'آپلود عکس با موفقیت انجام شد',
                    type: 'success'
                })

                // try {
                //     const response = await UploadSingleFile(formData);
                //     response.data.getMessageText.map((message: string) => {
                //         uploadedFileRefs.current[file.name] = response.data.data.fileId;
                //         // onAddImage?.(response.data.data.fileId, initialData?.id || 0);
                //         Toast({
                //             message: message,
                //             type: 'success'
                //         })
                //     })
                // } catch (error: any) {
                //     Toast({ message: error.message, type: 'error' });
                // }
            }
        },
        disabled: currentMode === 'view',
    });

    const removeFile = (file: File) => {
        setFiles(files.filter(f => f !== file));
        delete uploadedFileRefs.current[file.name];
    }

    //handle submite form
    const handleFormSubmit = async (data: productModel) => {

        //filter out field with empty value
        const filteredData = Object.fromEntries(
            Object.entries(data).filter(([_, value]) => {
                return value !== "" && value !== null && value !== undefined;
            })
        )

        const formData = {
            ...filteredData,
            id: initialData?.id,
            productCategoryId: initialData?.productCategoryId || categoryId,
            productImages: Object.values(uploadedFileRefs.current).map(fileCode => ({
                fileCodes: fileCode,
                isMain: 'false'
            })),
        };
        onAddSuccess && onAddSuccess(formData)
        onEditSuccess && onEditSuccess(formData)
        Toast({
            message: `${onAddSuccess ? "افزودن محصول با موفقیت انجام شد" : 'ویرایش محصول با موفقیت انجام شد'}`,
            type: 'success'
        })
        onClose();
        // try {
        //     if (response.data.isSuccessful) {
        //         const response = await onSubmit(formData);
        //         reset();

        //         setFiles([]);
        //         uploadedFileRefs.current = {};
        //         response.data.getMessageText.map((message: string) => {
        //             Toast({
        //                 message: message ,
        //                 type: 'success'
        //             })
        //         })
        //     }
        //     else {
        //         response.data.message.map((message: any) => {
        //             Toast({
        //                 message: message?.messageText,
        //                 type: 'error'
        //             })
        //         })
        //     }
        // } catch (error: any) {

        // }
    };

    //function for create header title
    const getHeaderTitle = () => {
        const action = {
            add: `ایجاد محصولِ دسته بندیِ "${categoryName}"`,
            edit: `ویرایش محصولِ دسته بندیِ "${categoryName}"`,
            view: `مشاهدهِ محصولِ دسته بندیِ "${categoryName}"`,
        }
        return action[mode]
    }
    // Custom render for the left (previous) navigation button
    const renderLeftNav = (onClick: () => void, disabled: boolean) => (
        <Button
            className="image-gallery-custom-left-nav w-8 h-8 rounded-[50%] bg-content absolute -left-24 top-2/4 -translate-y-2/4 z-20"
            size='icon'
            variant='ghost'
            disabled={disabled}
            onClick={onClick}
        >
            <i className="icon-Vector text-black stroke-black fill-black" ></i>
        </Button>
    );

    // Custom render for the right (next) navigation button
    const renderRightNav = (onClick: () => void, disabled: boolean) => (
        <Button
            className="image-gallery-custom-right-nav w-8 h-8 rounded-[50%] bg-content absolute -right-24 top-2/4 -translate-y-2/4 z-20"
            disabled={disabled}
            size='icon'
            variant='ghost'
            onClick={onClick}
        >
            <i className="icon-Vector-1 text-black stroke-black fill-black" ></i>
        </Button>
    );


    //render jsx
    return (
        <Viewer
            SpecificationShow={false}
            HeaderShow={false}
            sepratorShow={false}
            headerTitlePrefix={getHeaderTitle()}
            onClose={onClose}
        >
            <div className={`max-w-xs md:max-w-full lg:w-full mx-auto md:mx-0`}>
                <div
                    className=' text-gray_45 flex flex-col items-center justify-center md:flex md:flex-row md:justify-between h-[63px] pt-9 md:pt-3 pr-3  md:items-start  mt-2'
                >
                    <div className='flex  justify-between items-start gap-2 '>
                        <span className='truncate'>{getHeaderTitle()}</span>
                        <TooltipProvider content={'کنید'} isShowTooltip={false}>
                            <Icon
                                icon="question"
                                className="w-6 h-6 border p-1 rounded-[50px] fill-white text-blue"
                            />
                        </TooltipProvider>
                    </div>
                    <div className='flex   gap-3'>
                        {currentMode === 'view' && (
                            <Button
                                variant="ghost"
                                size="icon"
                                className="w-[21px] h-[20px] bg-yellow_5 hover:bg-yellow_5 rounded-[8px] py-[2px]"
                                onClick={handleEdit}
                            >
                                <Icon icon="edite" />
                            </Button>
                        )}

                        <Button
                            variant="ghost"
                            size="icon"
                            className="w-[21px] h-[20px]  md:hover:bg-MainColor rounded-[20px] px-[5px] py-[10px] order-2"
                            onClick={onClose}
                        >
                            <Icon icon="xmark" size={13} />
                        </Button>
                    </div>
                </div>
                <div className="w-full border mt-4 md:mt-0"></div>
                {/* Image upload section */}
                {/* {!isView && ( */}
                <div className={`${currentMode === 'edit' && 'border-dashed border'} flex max-w-[90%] md:max-w-full    gap-4 mt-2 border p-3 rounded-[4px] border-boderFileUploader border-dashed h-[150px] cursor-pointer`}>
                    <ScrollArea dir='rtl' className='max-w-xs lg:max-w-3xl'>
                        <div className='flex gap-2'>
                            {initialData?.productImages?.map((item: any, index: number) => (
                                <div key={index} className='relative'>
                                    <img
                                        src={convertImageUrl(item.fileCode)}
                                        alt={`Product ${index}`}
                                        className='h-[115px] max-w-[140px] object-cover rounded-[8px] in '
                                        onClick={() => handleImageClick()}
                                    />
                                    {currentMode === 'edit' || currentMode === 'add' && (
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="absolute top-[95px] left-[118px] bg-red-500 hover:bg-red-600 w-5 h-5 text-white rounded-full p-1"
                                            onClick={() => onDeleteImage?.(item.fileCode, initialData.id)}
                                        >
                                            <Icon icon="trash" size={13} />
                                        </Button>
                                    )}
                                </div>
                            ))}
                            {files.length > 0 && (
                                files?.map((item: any, index: any) => (
                                    <div key={item.name} className="relative ">
                                        <img
                                            src={URL.createObjectURL(item)}
                                            alt={item.name}
                                            className="h-[115px] max-w-[140px] object-cover rounded-[8px]"
                                            onClick={() => handleImageClick()}

                                        />
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="absolute top-[95px] left-[118px] bg-red-500 hover:bg-red-600 w-5 h-5 text-white rounded-full p-1"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                removeFile(item);
                                            }}
                                        >
                                            <Icon icon="trash" size={13} />
                                        </Button>
                                    </div>
                                ))
                            )}
                        </div>
                        <ScrollBar orientation="horizontal" />
                    </ScrollArea>
                    {currentMode !== 'view' && (
                        <div
                            {...getRootProps()}
                            className="min-w-[130px] lg:min-w-[140px] h-[117px] border border-dashed border-boderFileUploader flex items-center justify-between pt-5 rounded-[8px] flex-col"
                        >
                            <input {...getInputProps()} />
                            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" width="80" height="512" x="0" y="0" viewBox="0 0 512 512" xml:space="preserve" className=""><g><g fill="#fff"><path d="M247.53 48.36c2.73.79 5.42 1.58 8.15 2.26-2.78-.62-5.53-1.28-8.15-2.26zM339.03 55.35c1.47-.05 2.95-.16 4.47-.21-1.45.15-2.91.12-4.47.21zM360.44 53.83c-5.01.5-10.22.99-15.3 1.21 5.07-.41 10.13-.8 15.3-1.21z" fill="#ffffff" opacity="1" data-original="#ffffff"></path></g><path fill="#231f20" d="M382.79 417.05c-.47.16-.95.32-1.47.47.58-.16 1.16-.37 1.68-.53-.11.01-.16.01-.21.06zm-135.15-6.26c5.69 3.74 12.66 5.95 19.4 7.57-9.2-2.36-15.67-5.15-19.4-7.57zm135.15 6.26c-.47.16-.95.32-1.47.47.58-.16 1.16-.37 1.68-.53-.11.01-.16.01-.21.06zm-43.18 17.41c1.84-.06 3.83-.18 5.68-.37-1.89.16-3.78.26-5.68.37zm-17.14.47c-3.42 0-6.84-.05-10.25-.16 6.97.29 13.54.29 20.51 0-3.42.11-6.84.16-10.26.16zm-19.93-.68c-1.11-.09-2.2-.15-3.31-.21 3.73.39 7.62.56 11.31.68-2.69-.11-5.37-.26-8-.47zm-58.69-13.68v.05c1.47.89 3.1 1.74 4.84 2.52-1.74-.83-3.37-1.67-4.84-2.57zm3.79-9.78c5.69 3.74 12.66 5.95 19.4 7.57-9.2-2.36-15.67-5.15-19.4-7.57zM343.66 423.68c-.1 0-.26 0-.37.05.42 0 .89-.05 1.31-.11-.31 0-.62 0-.94.06zm-43.33-.06c14.93 1.11 28.38 1.13 42.96.11-13.09.93-29.98.88-42.96-.11z" opacity="1" data-original="#231f20" className=""></path><g fill="#231f20"><path d="M357.86 178.39c.86 1.04 1.9 1.95 3.05 2.63-.84-.95-1.89-1.85-3.05-2.63zm-74.41 3.2c1.84-.92 3.56-2.39 4.73-4.05-1.89 1.27-3.47 2.58-4.73 4.05z" fill="#231f20" opacity="1" data-original="#231f20" className=""></path><path d="M376.74 159.42c-6.45-5.79-17.7-3.15-20.93 4.84-.9-8.91-7.04-14.67-20.04-9.78-6.87-16.88-19.72-16.87-26.66 0-12.73-4.75-18.59.54-19.98 8.94-5.87-11.72-24.35-8-25.24 5.1-.59 16.52 20.58 19.96 26.29 5 .21.79.47 1.63.74 2.47-13.62 7.67-16.09 20.8 0 29.34-5.12 14.83.03 28.07 18.2 21.51 6.98 16.84 19.73 16.89 26.66 0 18.19 6.56 23.34-6.68 18.2-21.51 15.75-7.85 13.86-22.43 0-29.34.42-1.16.74-2.31 1-3.42 1.35 6.31 7.83 11.19 14.25 10.52 11.6-.59 16.66-16.5 7.51-23.67zm-96.55 10.52c-.32 3.83-6.12 3.3-5.84-.47.39-3.79 6.09-3.38 5.84.47zm42.07-17.51c.42.21 1.58 1.26 2.89 4.05-1.79-.2-3.66-.25-5.42.05 1.32-2.79 2.37-3.89 2.53-4.1zm-24.35 44.54c-10.22-4.87-10.18-7.73 0-12.67-.55 4.05-.55 8.59 0 12.67zm2.05 20.93c-.63-.68-.95-3.79 1-9.52 1.37 3.16 3.05 5.94 5.05 8.31-4.05 1.84-5.89 1.42-6.05 1.21zm1.05-44.96c-2-5.73-1.68-8.89-1.05-9.57.16-.16 2-.63 6.05 1.26-2 2.37-3.68 5.15-5 8.31zm21.67 55.9c-.42-.16-1.58-1.26-2.94-4.05 1.76.3 3.63.25 5.42.05-1.27 2.79-2.32 3.84-2.48 4zm-.21-14.36c-19.03-1.15-19.02-46.53 0-47.64 19.03 1.12 19.02 46.5 0 47.64zm22.45 3.47c-.11.16-1.95.58-6.05-1.26 2.05-2.37 3.73-5.15 5.05-8.31 1.95 5.73 1.64 8.89 1 9.57zm-.99-45.07c-1.37-3.16-3.05-5.94-5.05-8.31 4.1-1.84 5.94-1.37 6.1-1.21.58.69.89 3.79-1.05 9.52zm10.72 17.78c0 1.52-2.42 4.05-7.63 6.31.55-4.08.55-8.54 0-12.62 5.21 2.21 7.63 4.78 7.63 6.31zm15.67-19.09c-2.38 2.92-6.99-.91-4.47-3.73 2.45-2.95 6.93.78 4.47 3.73z" fill="#231f20" opacity="1" data-original="#231f20" className=""></path></g><path fill="#231f20" d="M407.35 147.59c-4.39-19.12-32.62-13.15-29.08 6 4.48 19.06 32.61 13.27 29.08-6zm-10.89 5.36c-3.15 4.75-10.35 0-7.26-4.73 3.13-4.78 10.3.03 7.26 4.73zM357.86 178.39c.86 1.04 1.9 1.95 3.05 2.63-.84-.95-1.89-1.85-3.05-2.63z" opacity="1" data-original="#231f20" className=""></path><path fill="#231f20" d="m507.84 162.16-64.95-47.91c10.87-2.16 17.14-14.44 12.46-24.51-7.71-17.46-34.19-11.25-33.76 7.52-10.01-9.59-14.38-37.61-18.62-50.27-3.21-14.88-59.53-16.51-84.19-16.51-24.83.1-81.39 1.41-84.35 16.88-2.19 6.75-9 35.77-12.67 41.44-6.15-12.85-26.4-12.32-31.76.95-3.79 8.36-.42 18.14 7.41 22.56-22.56 16.57-45.17 33.24-67.68 49.85-1.68 1.31-2.47 3.47-1.95 5.57 15.18 67.72 83.86 153.38 167.86 168.54v42.7c-19.43 2.02-61.56 7.74-62.32 27.35v46.59c0 18.77 44.86 28.61 89.14 28.61 42.91 0 89.08-8.94 89.08-28.61v-46.59c-.54-19.59-42.87-25.35-62.26-27.35V334.8c81.43-19.39 145.09-100.71 160.55-167.07.54-2.05-.25-4.26-1.99-5.57zm-71.47-71.73c8.55-3.58 14.34 9.06 5.78 13.04-8.62 3.71-14.32-9.09-5.78-13.04zm-13.67 32.55c2.49 7.07-8.62 10.77-10.83 3.58-2.43-7.1 8.53-10.69 10.83-3.58zM318.79 40.99c38.81 0 62.63 4.15 71.2 7.36-19.95 6.52-42.18 6.4-63.05 7.36-26.57.08-53.78.37-79.41-7.36 8.52-3.2 32.4-7.36 71.26-7.36zM199.57 94.06c4-8.56 16.75-2.81 13.04 5.84-3.95 8.44-16.65 2.8-13.04-5.84zm201.47 358.86c0 6.15-27.71 18.09-78.57 18.09s-78.62-11.94-78.62-18.09v-32.29c.16 2.1 10.99 4.89 12.41 5.31 32.62 9.09 67.09 11.6 100.65 6.94 14.83-2 31.03-4.26 44.12-12.1v32.14zm-30.82-60.38c72.98 15.72-4.79 30.93-32.66 31.55-46.31 5.45-159.23-18.81-41.91-34.55v16.3c0 2.79 2.21 5.1 5 5.26 6.78.32 13.94.53 21.82.53 7.94 0 15.09-.21 21.82-.53 2.79-.16 5-2.47 5-5.26v-16.3c.74.01 19.09 2.64 20.93 3zm-64.05 8.26v-63.21c10.96.13 21.74.69 32.6-.84v64.05c-10.1.37-22.24.37-32.6 0zm131.15-129c-36.1 34.28-84.76 62.56-136.31 54.59-78.54-11.12-147.4-94.61-162.13-157.92 26.2-19.53 52.87-38.62 78.99-58.37 15.59-11.52 19.72-35.23 24.66-52.69 13.6 5.98 30.11 6.82 44.81 7.99 35.63 1.79 73.5 3.75 107.65-7.99 4.75 16.55 8.72 39.85 23.03 51.17-17.24-1-23.56 23.15-7.99 30.71 12.15 6.71 27.43-6.31 22.72-19.41l65.95 48.59c-8 28.24-25.09 67.94-61.38 103.33z" opacity="1" data-original="#231f20" className=""></path><path fill="#f8d275" d="M422.44 127.34c-3.61 6.68-13.44 1.71-10.31-5.15 3.48-6.65 13.55-1.56 10.31 5.15zM442.16 103.47c-8.63 3.71-14.33-9.09-5.78-13.04 8.55-3.58 14.34 9.06 5.78 13.04zM212.61 99.89c-3.96 8.45-16.65 2.81-13.04-5.84 4-8.55 16.75-2.8 13.04 5.84z" opacity="1" data-original="#f8d275" className=""></path><path fill="#85b9ad" d="M389.99 48.36c-19.97 6.19-42.19 6.57-63.05 7.36-26.45-.06-54.03-.01-79.41-7.36 8.52-3.21 32.39-7.36 71.26-7.36 38.81-.01 62.63 4.15 71.2 7.36zM432.75 119.88c4.71 13.09-10.57 26.11-22.72 19.4-15.57-7.56-9.24-31.71 7.99-30.71-14.29-11.27-18.3-34.68-23.03-51.17-34.15 11.74-72.02 9.79-107.65 8-14.69-1.17-31.2-2.01-44.81-8-4.94 17.46-9.1 41.22-24.66 52.69-26.11 19.76-52.79 38.85-78.99 58.37 14.65 63.3 84.13 147.42 162.71 157.97 91.11 14.03 180.6-85.61 197.1-157.97zm-204.68 21.14c-24.94-1.44-19-38.23 5.15-31.66 17.29 5.74 12.99 31.7-5.15 31.66zm33.77 21.08c-10.32 8.84-26.88-1.23-23.82-14.51 1.63-7.99 9.57-13.15 17.51-11.52 12.06 2.01 16.04 18.86 6.31 26.03zm116.53 16.25c-4.15 5.06-11.97 6.31-17.46 2.68 8.08 8.44 4.14 18.75-6.94 24.3 5.14 14.82 0 28.07-18.2 21.51-6.92 16.87-19.67 16.86-26.66 0-18.16 6.56-23.32-6.67-18.2-21.51-10.76-5.45-14.77-15.19-7.47-23.72-9 5-20.7-2.81-19.56-13.09.9-13.1 19.37-16.82 25.24-5.1 1.39-8.39 7.24-13.69 19.98-8.94 6.94-16.85 19.78-16.9 26.66 0 12.99-4.88 19.14.87 20.04 9.78 9.04-18.14 34.91-2 22.57 14.09zm26.87-19.61c-7.7 12.23-27.52 6.28-27.29-8.15-.43-11.32 13.63-18.99 23.03-12.41 6.74 4.27 8.77 13.98 4.26 20.56z" opacity="1" data-original="#85b9ad" className=""></path><g fill="#f8d275"><path d="M371.01 169.47c.33 3.75-5.59 4.22-5.84.47-.29-3.82 5.53-4.28 5.84-.47zM396.46 152.95c-3.15 4.75-10.35 0-7.26-4.73 3.13-4.78 10.3.03 7.26 4.73zM280.19 169.73c-.03 3.98-6.12 3.65-5.84-.26.36-3.65 5.87-3.47 5.84.26zM306.01 164.63c-2 2.37-3.68 5.15-5 8.31-2-5.73-1.68-8.89-1.05-9.57.16-.16 2-.63 6.05 1.26zM297.49 190.66c0 2.16.16 4.26.42 6.31-10.22-4.87-10.18-7.73 0-12.67-.26 2.05-.42 4.15-.42 6.36zM306.01 216.69c-4.05 1.84-5.89 1.42-6.05 1.21-.63-.68-.95-3.79 1-9.52 1.37 3.16 3.05 5.94 5.05 8.31zM325.15 224.84c-1.26 2.79-2.31 3.84-2.47 4-.42-.16-1.58-1.26-2.94-4.05 1.75.3 3.62.25 5.41.05zM344.92 217.95c-.11.16-1.95.58-6.05-1.26 2.05-2.37 3.73-5.15 5.05-8.31 1.95 5.73 1.64 8.89 1 9.57zM354.65 190.66c0 1.52-2.42 4.05-7.63 6.31.55-4.08.55-8.54 0-12.62 5.21 2.21 7.63 4.78 7.63 6.31zM343.93 172.88c-1.37-3.16-3.05-5.94-5.05-8.31 4.1-1.84 5.94-1.37 6.1-1.21.58.69.89 3.79-1.05 9.52zM325.15 156.48c-1.79-.2-3.66-.25-5.42.05 1.31-2.79 2.37-3.89 2.52-4.1.43.21 1.59 1.26 2.9 4.05zM336.93 190.66c-.9 31.47-28.02 31.47-28.92 0 .88-31.48 28.04-31.47 28.92 0z" fill="#f8d275" opacity="1" data-original="#f8d275" className=""></path></g><path fill="#85b9ad" d="M400.93 406.38c-.79 5.52-11.1 8.03-15.2 9.78-27.17 8.48-57.21 9.23-85.4 7.47 13.04.99 24.59 1.05 37.23.47-25.66 1.41-51.64.13-76.41-7.31 1.84.58 3.79 1.1 5.89 1.58-9.2-2.37-15.67-5.15-19.4-7.57 1.16.79 2.47 1.58 4.21 2.42-29.67-13.34 34.94-23.44 43.81-23.66v16.3c0 2.79 2.21 5.1 5 5.26 6.78.32 13.94.53 21.82.53 7.94 0 15.09-.21 21.82-.53 2.79-.16 5-2.47 5-5.26v-16.3c9.56 1.17 26.98 3.45 36.5 7.1 4.57 1.69 13.92 3.94 15.13 9.72z" opacity="1" data-original="#85b9ad" className=""></path><path fill="#85b9ad" d="M401.04 420.78v32.13c0 6.15-27.71 18.09-78.57 18.09s-78.62-11.94-78.62-18.09v-32.29c.16 2.1 10.99 4.89 12.41 5.31 14.93 4.16 30.31 6.98 45.75 8.26-.95-.05-1.84-.11-2.79-.16 19.17 1.78 38.59 1.51 57.69-1.16 14.83-1.99 31.03-4.25 44.13-12.09z" opacity="1" data-original="#85b9ad" className=""></path><path fill="#4b6f90" d="M338.77 336.75v64.05c-10.1.37-22.24.37-32.6 0v-63.21c10.96.13 21.74.69 32.6-.84z" opacity="1" data-original="#4b6f90"></path><path fill="#231f20" d="M233.23 109.36c-20.54-6.24-30.43 23.52-10.25 30.82 20.42 6.29 30.37-23.57 10.25-30.82zm.31 17.19c-2.44 7.09-13.21 3.5-10.89-3.63 2.47-7.09 13.3-3.42 10.89 3.63z" opacity="1" data-original="#231f20" className=""></path><path fill="#f8d275" d="M233.86 124.77c-.47 8.73-13.61 6.6-11.2-1.84 2.02-6.11 11.32-4.49 11.2 1.84z" opacity="1" data-original="#f8d275" className=""></path><path fill="#231f20" d="M255.52 136.07c-19.28-3.37-24.99 24.51-5.99 29.08 19.29 3.3 25.13-24.61 5.99-29.08zm-3.83 18.78c-5.52-1.23-3.83-9.52 1.74-8.52 5.5 1.26 3.8 9.51-1.74 8.52z" opacity="1" data-original="#231f20" className=""></path><path fill="#f8d275" d="M256.79 151.48c-1.24 5.52-9.6 3.76-8.47-1.79 1.23-5.51 9.56-3.76 8.47 1.79z" opacity="1" data-original="#f8d275" className=""></path><path fill="#231f20" d="M283.45 181.59c1.84-.92 3.56-2.39 4.73-4.05-1.89 1.27-3.47 2.58-4.73 4.05zM37.07 329.37c.02.28.13.48.26.68-.1-.21-.2-.47-.26-.68zM131.94 384.5h.06l16.46-44.91zm0 0h.06l16.46-44.91zm0 0h.06l16.46-44.91zM225.44 386.27l-.26-.26c.26.26.47.53.63.79-.1-.22-.21-.38-.37-.53z" opacity="1" data-original="#231f20" className=""></path><path fill="#231f20" d="M226.6 388.71c1.47-.4-23.7-27.97-24.09-28.82-1-1.16-2.47-1.84-4-1.84h-30.66l20.82-26.92c1.62-1.78 1.83-4.52.42-6.52v-.05c-.12-.17-27.15-35.04-27.29-35.23 0-.05-.05-.05-.05-.11-.05 0-.05-.05-.05-.05-1.04-1.27-2.55-2.08-4.21-2.1H69.31c-1.68 0-3.21.79-4.21 2.1 0 .05-.05.05-.05.11l-27.24 35.08c-.05.11-.16.21-.16.32-.16.21-.26.37-.37.58-.05 0-.05 0 0 .05-.98 1.83-.61 4.31.79 5.84l20.77 26.92h-30.6c-1.52 0-2.94.68-3.94 1.79L1.63 385.92c-1 1.08-1.59 2.36-1.63 3.84v60.16c0 8.94 7.26 16.2 16.2 16.2h194.36c8.94 0 16.14-7.26 16.14-16.2v-60.16c.01-.37-.05-.74-.1-1.05zm-30.45-20.15 13.78 15.93h-62.47l12.31-15.93zm-36.49-64.84 14.41 18.62h-19.83zm14.46 29.14c-9.96 12.89-30.05 38.82-39.97 51.64h-2.21c1.59-4.33 17.96-48.84 18.98-51.64zm-53.38 51.64h-14.78l-18.93-51.64h52.69zm29.71-86.93-5.73 19.77-19.04-19.77zm-15.56 24.77H91.82l21.51-22.4zm-33.92-24.77-18.93 19.77-5.73-19.77zm-33.87 6.15 5.42 18.62H52.69zm-14.41 29.14h23.14l18.93 51.64h-2.21c-9.89-12.77-29.97-38.78-39.86-51.64zm-22.03 35.7h36.29L79.3 384.5H16.83zm185.53 81.36c0 3.16-2.52 5.68-5.63 5.68H16.2c-3.1 0-5.68-2.52-5.68-5.68v-54.9h205.67z" opacity="1" data-original="#231f20" className=""></path><path fill="#f8d275" d="M79.3 384.5H16.83l13.83-15.94h36.28zM209.93 384.5h-62.47l12.3-15.94h36.39zM216.19 395.02v54.9c0 3.16-2.52 5.68-5.63 5.68H16.2c-3.1 0-5.68-2.52-5.68-5.68v-54.9z" opacity="1" data-original="#f8d275" className=""></path><g fill="#8bb3f5"><path d="m100.97 297.57-18.93 19.77-5.73-19.77zM174.07 322.34h-19.83l5.42-18.62zM150.45 297.57l-5.73 19.77-19.03-19.77zM134.89 322.34H91.82l21.51-22.4zM72.52 322.34H52.69l14.41-18.62zM94.76 384.5h-2.21c-9.9-12.76-29.97-38.78-39.86-51.64h23.14zM139.73 332.86l-18.99 51.64h-14.78l-18.93-51.64zM174.12 332.86c-9.96 12.89-30.05 38.82-39.97 51.64H132c1.59-4.33 17.9-48.84 18.93-51.64z" fill="#8bb3f5" opacity="1" data-original="#8bb3f5"></path></g></g></svg>
                            <span className="text-[10px] text-white px-4 mb-2 bg-blue_5">
                                + بارگزاری تصویر
                            </span>
                        </div>
                    )}

                </div>
                {/* {isImageGalleryOpen && (
                    <EventListener target="window" onClick={handleCloseImageGallery} />
                )} */}
                {isImageGalleryOpen && selectedImage && (
                    <ImageGalleryCompoent
                        items={selectedImage}
                        onClickOutSide={setIsImageGalleryOpen}
                        renderLeftNav={renderLeftNav}
                        renderRightNav={renderRightNav}

                    />
                )}

                {/* FormFields */}
                <form onSubmit={handleSubmit(handleFormSubmit)} className='gap-5 my-3'>
                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-2 *:mb-5'>
                        {currentMode !== 'add' && (
                            <FormField
                                name="code"
                                control={control}
                                label="کد محصول"
                                errors={errors}
                                disabled={true}
                            />
                        )}

                        <FormField
                            trigger={trigger}
                            name="name"
                            control={control}
                            label="نام محصول"
                            errors={errors}
                            rules={{ required: "وارد کردن نام اجباری است" }}
                            disabled={currentMode === 'view'}
                            requrid={true}
                            autoFocus={true}

                        />
                        <FormField
                            trigger={trigger}
                            name="carat"
                            control={control}
                            label="عیار"
                            errors={errors}
                            disabled={currentMode === 'view'}
                        />
                        <FormField
                            trigger={trigger}
                            name="weight"
                            control={control}
                            label="وزن"
                            errors={errors}
                            disabled={currentMode === 'view'}
                        />

                        {weightValue && (
                            <>
                                <div className={`transition-all duration-300  gap-5 ${weightValue ? 'opacity-100' : 'hidden'}`}>
                                    <FormField
                                        trigger={trigger}
                                        name="percentageWage"
                                        control={control}
                                        label="اجرت درصدی"
                                        type="tel"
                                        errors={errors}
                                        disabled={currentMode === 'view'}
                                    />

                                </div>
                                <div className={`transition-all duration-300  gap-5 ${weightValue ? 'opacity-100' : 'hidden'}`}>
                                    <Modal
                                        isOpen={isOpenModalTotalWages}
                                        onClose={handleToggleModalTotalWages}
                                        trigger={
                                            <div onKeyDown={(e) => {
                                                if (e.key === 'Enter') {
                                                    handleToggleModalTotalWages()
                                                }
                                            }}>
                                                <FormField
                                                    trigger={trigger}
                                                    name="gramWage"
                                                    control={control}
                                                    label="اجرت گرمی"
                                                    errors={errors}
                                                // readOnly={true}
                                                />
                                            </div>
                                        }
                                        contentClass={"!max-w-md"}
                                    >
                                        <div className="my-4 ">
                                            <div className={`border  rounded-[5px] flex back  border-blue_3 focus-within:border-[#9a732e] max-w-[90%] max-w-md`}>
                                                <label className={` bg-blue_2 rounded-l-none rounded-[5px] text-headerTitle w-[125px] h-[37px] flex items-center justify-center self-center text-center `}>
                                                    اجرت کل
                                                </label>
                                                <div className={`border-r  rounded-l-[5px] border-[inherit] bg-white rounded-br-[18px] w-[calc(100%-115px)] mr-[-20px] input`}>
                                                    <Input
                                                        value={totalWageInput}
                                                        onChange={(e) => setTotalWageInput(e.target.value)}
                                                        placeholder="مقدار اجرت کل"
                                                        className="focus-visible:ring-0 border-0 shadow-none"
                                                        autoFocus
                                                    />
                                                </div>

                                            </div>
                                            <div className="w-full border my-5"></div>
                                            {/* Form Actions */}
                                            <div className="justify-center lg:justify-end flex  gap-2">
                                                <Button
                                                    type='button'
                                                    variant="outline"
                                                    className="w-[129px] h-[37px] hover:bg-gray_40 text-puple_1"
                                                    onClick={handleToggleModalTotalWages}
                                                >
                                                    انصراف
                                                </Button>


                                                <Button
                                                    type="submit"
                                                    variant="outline"
                                                    className="bg-green_1 text-white hover:bg-green-600"
                                                    onClick={() => {
                                                        const gramWage = document.getElementsByName("gramWage")[0].value
                                                        const percentageWage = document.getElementsByName("percentageWage")[0].value
                                                        const totalWage = parseFloat(totalWageInput);
                                                        const weight = parseFloat(weightValue);
                                                        if (!gramWage && !percentageWage && weight) {
                                                            const calculatedGramWage = totalWage / weight || 0;
                                                            setValue('gramWage', calculatedGramWage);
                                                        }
                                                        setIsOpenModalTotalPages(false);
                                                        setTotalWageInput('');
                                                    }}
                                                >
                                                    ذخیره
                                                </Button>



                                            </div>
                                        </div>
                                    </Modal>
                                </div>

                            </>
                        )}

                        {/* collection and category selectors */}
                        <div>
                            <div className={`border max-w-[90%] md:max-w-full border-blue_3 ${errors.quiddityProduct && '!border-red_5'} focus-within:border-[#9a732e] flex items-center justify-center  rounded-[5px]`}>
                                <label className={`min-w-[125px] text-gray_45 h-[37px] border-1 !border-blue_3 flex justify-center items-center rounded-[5px] rounded-l-none ${errors.productCollection ? 'bg-errorInput' : 'bg-blue_2'}`}>
                                    نوع
                                </label>
                                <Controller
                                    name="quiddityProduct"
                                    control={control}
                                    render={({ field }) => (
                                        <Select
                                            open={open}
                                            onOpenChange={setOpen}
                                            onValueChange={(value) => field.onChange(value ? parseInt(value) : undefined)}
                                            value={field.value?.toString() || ""}
                                            disabled={currentMode === 'view'}
                                            dir='ltr'
                                        >
                                            <SelectTrigger
                                                onKeyDown={async (e) => {
                                                    if (e.key === 'Enter') {
                                                        e.preventDefault();
                                                        productCollectionRef.current?.focus();
                                                        productCollectionRef.current?.click();
                                                    }
                                                }}
                                                ref={quiddityProductRef}
                                                className="border-t-0 border-b-0 border-l-0  border-r-1 border-[inherit] rounded-none rounded-l-[5px] rounded-br-[18px] shadow-none focus:ring-0 bg-white mr-[-12px]"
                                            >
                                                <SelectValue >
                                                    {quiddityProductCategory.find((q) => q.value === field.value)?.label}
                                                </SelectValue>
                                            </SelectTrigger>
                                            <SelectContent>
                                                {quiddityProductCategory?.map((quiddity) => (
                                                    <SelectItem
                                                        className="px-1 text-black_5 text-[14px]"
                                                        key={quiddity.value}
                                                        value={quiddity.value.toString()}
                                                    >
                                                        {quiddity.value} - {quiddity.label}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    )}
                                />
                            </div>

                        </div>

                        <div>
                            <div className={`max-w-[90%] md:max-w-full border border-blue_3 focus-within:border-[#9a732e] flex items-center justify-center ${errors.productCollection && '!border-red_5'} rounded-[5px]`}>
                                <label className={`min-w-[125px] text-gray_45 px-3 h-[37px] flex justify-center items-center rounded-[5px] ${errors.productCollection ? 'bg-errorInput' : 'bg-blue_2'}`}>
                                    اکسسوری
                                </label>
                                <Controller
                                    name="productCollection"
                                    control={control}
                                    render={({ field }) => (
                                        <Select
                                            onValueChange={(value) => field.onChange(value ? parseInt(value) : undefined)}
                                            value={field.value?.toString() || ""}
                                            disabled={currentMode === 'view'}
                                            dir='ltr'
                                        >
                                            <SelectTrigger
                                                onKeyDown={async (e) => {
                                                    if (e.key === 'Enter') {
                                                        e.preventDefault();
                                                        submitRef.current?.focus();
                                                    }
                                                }}
                                                ref={productCollectionRef}
                                                className="border-t-0 border-b-0 border-l-0 border-r-1 rounded-none border-[inherit] rounded-l-[5px] rounded-br-[18px] shadow-none focus:ring-0 bg-white mr-[-12px]"
                                            >
                                                <SelectValue >
                                                    {productCollection.find((c) => c.value === field.value)?.label}
                                                </SelectValue>
                                            </SelectTrigger>
                                            <SelectContent>
                                                {productCollection?.map((collection) => (
                                                    <SelectItem
                                                        className="px-1 text-black_5 text-[14px]"
                                                        key={collection.value}
                                                        value={collection.value.toString()}
                                                    >
                                                        {collection.value} - {collection.label}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    )}
                                />
                            </div>
                            {errors.productCollection && (
                                <span className="text-red_5 text-right text-[10px] mt-1">{errors.productCollection.message}</span>
                            )}
                        </div>
                    </div>
                    <div className="w-full border my-5"></div>
                    {/* Form Actions */}
                    <div className="justify-center lg:justify-end flex  gap-2">
                        <Button
                            type='button'
                            variant="outline"
                            className="h-[37px] hover:bg-gray_40 text-puple_1"
                            onClick={onClose}
                        >
                            انصراف
                        </Button>

                        {currentMode !== 'view' && (
                            <Button
                                type="submit"
                                variant="outline"
                                className="bg-green_1 !text-white hover:bg-green-700"
                            >
                               ذخیره
                            </Button>
                        )}
                    </div>
                </form>
            </div>
        </Viewer>
    )
}
export default ProductForm

