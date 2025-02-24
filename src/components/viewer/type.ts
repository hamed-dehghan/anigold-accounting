// types.ts
export type InfoType = {
    [key: string]: string; // Flexible key-value pairs for different contexts
    type?: string; // Optional type field (e.g., typeDoc, typeItem, etc.)
  };
  
  export type ViewerProps = {
    /** Information to display */
    info?: InfoType;
    /** Callback when edit button is clicked */
    onEdit?: () => void;
    /** Callback when close button is clicked */
    onClose?: () => void;
    /** Control edit mode state */
    isEditMode?: 'edit' | 'view';
    /** Custom labels for specifications */
    labels?: Record<string, string>;
    /** Custom class names for different parts */
    classes?: {
      root?: string;
      header?: string;
      specifications?: string;
      specItem?: string;
    };
    /** Children content */
    children?: React.ReactNode;
    /** Header title prefix (e.g., "مشاهده سند") */
    headerTitlePrefix?: string;
    /** Tooltip content for the info icon */
    infoTooltipContent?: string;
    SpecificationShow?:boolean;
    HeaderShow?:boolean;
    sepratorShow?:boolean;
  };
  
  export type HeaderProps = Pick<
    ViewerProps,
    "info" | "onEdit" | "onClose" | "isEditMode" | "headerTitlePrefix" | "infoTooltipContent"
  > & {
    className?: string;
  };
  
  export type SpecificationsProps = {
    info: InfoType;
    labels: Record<string, string>;
    className?: string;
    itemClassName?: string;
  };