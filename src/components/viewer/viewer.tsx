// Viewer.tsx
import { Header } from "./Header";
import { Specifications } from "./Specification";
import { ViewerProps } from "./type";

export const Viewer = ({
    info,
    onEdit,
    onClose,
    isEditMode = 'view',
    labels = {
        date: "تاریخ",
        name: "نام",
        number: "شماره",
        by: "توسط",
    },
    classes = {},
    children,
    headerTitlePrefix = "مشاهده",
    infoTooltipContent = "اینجا میتوانید جزییات را مشاهده کنید",
    SpecificationShow = true,
    HeaderShow = true,
    sepratorShow = true,
}: ViewerProps) => {
    return (
        <div className={`flex flex-col max-w-xs md:max-w-full   ${classes.root || ""} `}>
            {/* Header */}
            {HeaderShow && (
                <Header
                    info={info}
                    onEdit={onEdit}
                    onClose={onClose}
                    isEditMode={isEditMode}
                    className={classes.header}
                    headerTitlePrefix={headerTitlePrefix}
                    infoTooltipContent={infoTooltipContent}
                />
            )}
            {sepratorShow && <div className=" w-full border mt-5 md:mt-0"></div>}
            {/* Specifications */}
            {SpecificationShow && <Specifications
                info={info}
                labels={labels}
                className={classes.specifications}
                itemClassName={classes.specItem}
            />}

            {/* Custom content */}
            {children}
        </div>
    );
};

// Compound component pattern
Viewer.Header = Header;
Viewer.Specifications = Specifications;