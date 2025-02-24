import { ColumnDef } from "@tanstack/react-table";
import Icon from "../../../lib/icon";
import { Button } from "../../../components/ui/button";
import { userModel } from "./AllDocuments";
import { Checkbox } from "../../../components/ui/checkbox";
import { Modal } from "../../../common/Modal/Modal";

const ActionButtons = ({ rowInfo }: { rowInfo: userModel }) => {
    return (
        <div className="inline-flex h-[30px] justify-center items-start gap-[5px] flex-shrink-0 pt-[4px] pr-[0px] pb-[4px] pl-[5px]">
            <Modal content={<p>ff</p>}>
                <Button
                    variant="ghost"
                    size="icon"
                    className="w-[22px] h-[22px] flex-shrink-0 bg-blue_5 hover:bg-blue_5 rounded-[50%] py-[2px]"
                >
                    <Icon icon="view" className="fill-white stroke-inherit" />
                </Button>
            </Modal>
            <Button
                variant="ghost"
                size="icon"
                className="w-[23px] h-[22px] flex-shrink-0 bg-yellow_5 hover:bg-yellow_5 rounded-[8px] py-[2px]"
                onClick={() => console.log('row', rowInfo)}
            >
                <Icon icon="edite" />
            </Button>
            <Button
                variant="ghost"
                size="icon"
                className="w-[23px] h-[22px] flex-shrink-0 bg-red_5 hover:bg-red_5 rounded-[50%] py-[2px]"
            >
                <Icon icon="trash" />
            </Button>
        </div>
    );
};

export const getColumns = (): ColumnDef<userModel>[] => [
    {
        id: "select",
        size: 10,
        header: ({ table }) => (
            <div className="flex justify-start pr-3">
                <Checkbox
                    checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
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
        accessorKey: "typeDoc",
        cell: (info) => info.getValue(),
        header: () => <div className="text-center"><span>نوع سند</span></div>,
    },
    {
        accessorKey: "typeProduct",
        id: "typeProduct",
        cell: (info) => info.getValue(),
        header: () => <div className="text-center"><span>نوع محصول</span></div>,
    },
    {
        accessorKey: "number",
        id: "number",
        cell: (info) => info.getValue(),
        header: () => <div className="text-center"><span>تعداد</span></div>,
    },
    {
        accessorKey: "weight",
        id: "weight",
        cell: (info) => info.getValue(),
        header: () => <div className="text-center"><span>وزن</span></div>,
    },
    {
        accessorKey: "ang",
        id: "ang",
        cell: (info) => info.getValue(),
        header: () => <div className="text-center"><span>انگ</span></div>,
    },
    {
        accessorKey: "ayar",
        id: "ayar",
        cell: (info) => info.getValue(),
        header: () => <div className="text-center"><span>عیار</span></div>,
    },
    {
        accessorKey: "feeDarsad",
        id: "feeDarsad",
        cell: (info) => info.getValue(),
        header: () => <div className="text-center"><span>اجرت درصد</span></div>,
    },
    {
        accessorKey: "feeGram",
        id: "feeGram",
        cell: (info) => info.getValue(),
        header: () => <div className="text-center"><span>اجرت گرم</span></div>,
    },
    {
        id: "actions",
        header: () => <div className="text-center"><span>عملیات</span></div>,
        cell: ({ row }) => <ActionButtons rowInfo={row.original} />,
    },
];