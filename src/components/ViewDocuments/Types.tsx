import { Control, FieldErrors } from 'react-hook-form';

export type DocumentInfo = {
    typeDoc: string;
    typeProduct: string;
    weight: number | string;
    number: number | string;
    feeGram: number | string;
    feeDarsad: number | string;
    ayar: number | string;
    ang: number | string;
};

export type ViewDocProps = {
    info: DocumentInfo;
    onClose:()=>void
};


export type FormFieldProps = {
    name: keyof DocumentInfo;
    control: Control<DocumentInfo>;
    rules?: Record<string, any>; // You can also refine this type further if needed
    label: string;
    placeholder?: string;
    disabled?: boolean;
    autoFocus?:boolean;
    errors: FieldErrors<DocumentInfo>;
    className?: {
        input?: string; // Optional input class
        container?: string; // Optional container class
        lable?: string; // Optional container class
    };
};