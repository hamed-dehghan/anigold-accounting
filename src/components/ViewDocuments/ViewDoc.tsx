// import { useForm } from "react-hook-form";
// import { Button } from "../ui/button";
// import { useModal } from "../../store/modal";
// import { Header } from "./Header";
// import { Specifications } from "./Specification";
// import { FormField } from "./FormField";
// import { DocumentInfo, ViewDocProps } from "./Types";
// import { useState } from "react";

// export const ViewDoc = ({ info }: ViewDocProps) => {
//     const [IsEdit, setIsEdit] = useState<'view' | 'edit'>("view");
//     const { setIsOpen } = useModal();
//     const { control, handleSubmit, reset, formState: { errors } } = useForm<DocumentInfo>({
//         defaultValues: info,
//     });

//     const handleCloseModal = () => {
//         setIsOpen(false);
//         reset();
//     };

//     const handleEdit = () => {
//         setIsEdit(IsEdit === 'edit' ? 'view' : 'edit');
//     };

//     const onSubmit = (data: DocumentInfo) => {
//         const formattedData = {
//             ...data,
//             weight: data.weight === "" ? undefined : Number(data.weight),
//             number: data.number === "" ? undefined : Number(data.number),
//             feeGram: data.feeGram === "" ? undefined : Number(data.feeGram),
//             feeDarsad: data.feeDarsad === "" ? undefined : Number(data.feeDarsad),
//             ayar: data.ayar === "" ? undefined : Number(data.ayar),
//             ang: data.ang === "" ? undefined : Number(data.ang),
//         };
//         console.log("Form Data Saved:", formattedData);
//         setIsEdit('view');
//         setIsOpen(false);
//     };
//     const infoSpecifications :any = {
//         date: "1403/02/22",
//         nameCustomer: "حامد دهقان",
//         numberInvoice: "1153214",
//         numberBill: "1153214",
//         by: "رضا عطاران",
//     }

//     return (
//         <>
//             <Header info={info} onEdit={handleEdit} onClose={handleCloseModal} isEditMode={IsEdit === 'edit'} />
//             <div className="w-full border"></div>
//             <Specifications infoSectionSpeci={infoSpecifications} />
//             <form onSubmit={handleSubmit(onSubmit)} className="gap-5 my-3 text-gray_45 text-[14px] pr-[7px]">
//                 <div className="flex justify-between gap-6 items-center">
//                     <FormField
//                         name="typeDoc"
//                         control={control}
//                         rules={{ required: "نوع سند اجباری است" }}
//                         label="نوع سند"
//                         disabled={IsEdit === 'view'}
//                         errors={errors}
//                     />
//                     <FormField
//                         name="typeProduct"
//                         control={control}
//                         rules={{ required: "نوع محصول اجباری است" }}
//                         label="نوع محصول"
//                         disabled={IsEdit === 'view'}
//                         errors={errors}
//                     />
//                 </div>
//                 <div className="flex justify-between gap-6 items-center">
//                     <FormField
//                         name="number"
//                         control={control}
//                         rules={{ required: "وارد کردن تعداد اجباری است" }}
//                         label="تعداد"
//                         disabled={IsEdit === 'view'}
//                         errors={errors}
//                     />
//                     <FormField
//                         name="weight"
//                         control={control}
//                         rules={{ required: "وارد کردن وزن اجباری است" }}
//                         label="وزن"
//                         disabled={IsEdit === 'view'}
//                         errors={errors}
//                     />

//                 </div>
//                 <div className="flex justify-between gap-6 items-center">
//                     <FormField
//                         name="ang"
//                         control={control}
//                         label="تعداد"
//                         disabled={IsEdit === 'view'}
//                         errors={errors}
//                     />
//                     <FormField
//                         name="ayar"
//                         control={control}
//                         rules={{ required: "وارد کردن عیار اجباری است" }}
//                         label="عیار"
//                         disabled={IsEdit === 'view'}
//                         errors={errors}
//                     />

//                 </div>
//                 <div className="flex justify-between gap-6 items-center">
//                     <FormField
//                         name="feeDarsad"
//                         control={control}
//                         label="اجرت درصد"
//                         disabled={IsEdit === 'view'}
//                         errors={errors}
//                     />
//                     <FormField
//                         name="feeGram"
//                         control={control}
//                         label="اجرت گرم"
//                         disabled={IsEdit === 'view'}
//                         errors={errors}
//                     />

//                 </div>
//                 <div className="w-full border my-5"></div>
//                 <div className="justify-end flex">
//                     {IsEdit === 'view' ? (
//                         <Button
//                             variant="outline"
//                             className="w-[80px] h-[37px] text-puple_1 text-[14px] text-center bg-gray_40"
//                             onClick={handleCloseModal}
//                         >
//                             بستن
//                         </Button>
//                     ) : (
//                         <Button
//                             type="submit"
//                             variant="outline"
//                             className="w-[129px] h-[37px] rounded-[4px] text-white hover:text-white text-[14px] text-center bg-green_1 hover:bg-green_1"
//                         >
//                             ذخیره سند
//                         </Button>
//                     )}
//                 </div>
//             </form>
//         </>
//     );
// };