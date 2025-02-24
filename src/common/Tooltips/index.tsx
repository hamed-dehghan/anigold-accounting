import {
    Tooltip,
    TooltipContent,
    TooltipProvider as ShadcnTooltipProvider,
    TooltipTrigger,
} from "../../components/ui/tooltip";

type TooltipProps = {
    children: React.ReactNode; // Corrected prop name
    content: string; // Content to display in the tooltip
    isShowTooltip?: boolean; // If true, do not show the tooltip
    delay?: number; // If true, do not show the tooltip
};

const TooltipProvider = ({ children, content, isShowTooltip=false ,delay=1500}: TooltipProps) => {
    // If isShowTooltip is true, skip rendering the Tooltip and only render children
    if (isShowTooltip) {
        return <>{children}</>;
    }

    // Otherwise, render the Tooltip with the content
    return (
        <ShadcnTooltipProvider delayDuration={delay}>
            <Tooltip>
                <TooltipTrigger asChild>{children}</TooltipTrigger>
                <TooltipContent className="bg-white text-headerTitle ">
                    <>{content}</> {/* Display the full text as tooltip content */}
                </TooltipContent>
            </Tooltip>
        </ShadcnTooltipProvider>
    );
};

export default TooltipProvider;