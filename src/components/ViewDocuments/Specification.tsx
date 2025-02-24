import { DocumentInfo } from "./Types";
import TooltipProvider from "../../common/Tooltips/index"; // Import the TooltipProvider component
import doesTextFitInContainer from "../../lib/doestTextFitIncontainer"; // Import the function

const nameSpecifications = {
    date: "تاریخ",
    nameCustomer: "نام مشتری",
    numberInvoice: "شماره فاکتور",
    numberBill: "شماره قبض",
    by: "توسط",
};

type SpecificationsProps = {
    infoSectionSpeci: DocumentInfo;
};

export const Specifications = ({ infoSectionSpeci }: SpecificationsProps) => {
    return (
        <div className="text-gray_45 flex ml-2 flex-wrap h-[21px] justify-between items-center mt-3 pr-[9px]">
            {Object.entries(nameSpecifications).map(([key, value]) => {
                const text = infoSectionSpeci[key as keyof DocumentInfo] || "N/A";
                const label = `${value}: ${text}`;

                // Check if the text fits within the 105px container
                const isTextFit = doesTextFitInContainer(
                    label,
                    105, // Container width
                    "IRANSansWeb", // Font family
                    "400", // Font weight
                    "14px" // Font size
                );

                return (
                    <div key={key} className="text-[14px] leading-[21px] gap-1 flex items-center truncate w-[105px]">
                        <TooltipProvider content={label} delay={700} isShowTooltip={isTextFit}>
                            <div> {/* Wrap the spans in a single container */}
                                <span>{value}:</span>
                                <span className="truncate">{text}</span>
                            </div>
                        </TooltipProvider>
                    </div>
                );
            })}
        </div>
    );
};