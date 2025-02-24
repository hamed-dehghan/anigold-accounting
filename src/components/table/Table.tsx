import { ColumnDef, flexRender, getCoreRowModel, useReactTable, getPaginationRowModel, getSortedRowModel, SortingState, VisibilityState } from "@tanstack/react-table";
import { Table, TableHead, TableBody, TableRow, TableCell, TableHeader } from '../ui/table';
import { useMemo, useState, useEffect, useRef } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Button } from "../ui/button";
import Icon from "../../lib/icon";
import Spinner from "../../common/loading/spinner";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from "../ui/dropdown-menu";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  isLoading?: boolean | any;
  pagination: {
    currentPage: number;
    pageSize: number;
    totalPages: number;
    totalCount: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
  onPageChange: (newPage: number, newPageSize?: number) => void;
}

export function DataTable({ columns, data, IsLoading, pagination, onPageChange }: any) {
  const [SlecetedRow, setSlecetedRow] = useState<any>() // state for save id row selected
  // State for sorting, visibility, and row selection
  const [sorting, setSorting] = useState<SortingState>([]); //for sort table , now is enable 
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(() => {
    // Initialize directly from localStorage to avoid flicker
    if (typeof window !== 'undefined') {
      const savedVisibility = localStorage.getItem('columnVisibility');
      return savedVisibility ? JSON.parse(savedVisibility) : {};
    }
    return {};
  }); //for hidden column
  const [rowSelection, setRowSelection] = useState({}); //for checkbox in selected column
  //state for close or open dropDown
  const [isOpen, setIsOpen] = useState(false);
  // Track initial render to skip saving to localStorage
  const isInitialRender = useRef(true);

  // Save column visibility to localStorage when it changes (after initial render)
  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
    } else {
      localStorage.setItem('columnVisibility', JSON.stringify(columnVisibility));
    }
  }, [columnVisibility]);

  // Initialize the table
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
    },
  });

  const visibleColumn = () => {
    return (
      <div>
        <DropdownMenu
          open={isOpen}
          onOpenChange={setIsOpen}
          modal={false} // Allows interaction with other elements
        >
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="ml-auto hover:bg-MainColor bg-MainColor focus-visible:ring-0 rounded-[5px] h-[41px] w-[107px]"
            >
              <span className="text-black_5 text-[12px]">
                <Icon icon="filter" className="h-[30px]" />
                فیلتر ستون ها
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="start"
            onInteractOutside={() => setIsOpen(false)}
          >
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => {
                    column.toggleVisibility(!!value);
                  }}
                  onSelect={(event) => event.preventDefault()} // Prevent default closing behavior
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  };

  const rowsPerPageSelector = useMemo(
    () => (
      <div className="py-3 px-4 font-light dark:text-white">
        <Select
          // dir="ltr"
          value={String(pagination?.pageSize)}
          onValueChange={(value) => onPageChange(1, Number(value))}
        >
          <SelectTrigger className="rounded-[20px] bg-gray_20 h-[53px] w-[85px] border-none flex-shrink-0 outline-none text-gray_30 text-[14px] leading-[21px]">
            <SelectValue>{pagination?.pageSize}</SelectValue> {/* Fixed */}
          </SelectTrigger>
          <SelectContent side="top" align="end">
            {[5, 10, 15, 20, 50].map((pageSize) => (
              <SelectItem key={pageSize} value={String(pageSize)}>
                {pageSize === pagination?.pageSize ? ` ${pageSize}` : pageSize} {/* Updated */}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    ),
    [pagination?.pageSize, onPageChange] // Ensure dependencies are correct
  );

  const pageRow = () => (
    <nav className="flex justify-start items-center gap-3 pr-5 mt-[6px]" aria-label="Table navigation">
      <span className="h-[30px] flex-shrink-0 text-headerTitle">
        نمایش{" "}
        <span className="">
          {pagination?.totalCount} از {pagination?.pageSize}
        </span>
        {" "}مورد
      </span>
      {/* <Button
        variant="outline"
        className="h-8 w-8 p-0 "
        onClick={() => onPageChange(pagination?.currentPage - 1)}
        disabled={!pagination?.hasPreviousPage}
      >
        <span className="sr-only">صحفه قبل</span>
        <Icon icon="arrow-right" className="h-4 w-4" />
      </Button>
      <div className="w-7 h-7 flex items-center ">
        <span className="text-center  w-full text-gray_45">{pagination?.currentPage}</span>
      </div>
      <Button
        variant="outline"
        className="h-8 w-8 p-0"
        onClick={() => onPageChange(pagination?.currentPage + 1)}
        disabled={!pagination?.hasNextPage}
      >
        <span className="sr-only">صحفه بعد</span>
        <Icon icon="arrow-left" className="h-4 w-4" />
      </Button> */}
      {rowsPerPageSelector}
    </nav>
  );

  return (
    <div>
      <div className="flex justify-end mx-4 mb-2 absolute left-[120px] top-4">
        {visibleColumn()}
      </div>
      <div className="relative overflow-auto mx-4 h-full  md:h-[calc(100vh-240px)]">
        <Table className="w-full">
          <TableHeader className="h-[44px] flex-shrink-0 bg-gray_20 sticky top-0 z-40">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className={`h-[30px] w-[20px] bg-colorTextSidbar text-white font-Poppins text-[14px] font-[600] leading-[21px] pr-5 whitespace-normal first:rounded-r-lg last:rounded-l-lg`}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row, index) => (
                <TableRow
                  key={row.id}
                  onClick={() => setSlecetedRow(row?.original.id)}
                  data-state={row.getIsSelected() && 'selected'}
                  className={`
                    table-row h-[20px] hover:bg-MainColor px-[15px] 
                    pl-[37.759px] justify-end items-center 
                    ${index % 2 === 0 ? 'bg-white' : '!bg-[rgba(88, 103, 221, 0.07)]'}
                    ${row.getIsSelected() && '!bg-sidebarBackground !text-white '}
                    
                    `}
                // ${SlecetedRow === row.original.id && '!bg-sidebarBackground !text-white'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className={`
                        text-center text-[14px] h-[11px] font-[400]  leading-[15px] text-headerTitle pr-5 whitespace-normal
                        $  ${row.getIsSelected() && '!bg-sidebarBackground !text-white'}
                        `}
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : IsLoading ? (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center ">
                  <div className="w-full h-full flex justify-center items-center">
                    <Spinner />
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center text-gray_45">
                  <span>هیچ آیتمی موجود نیست!</span>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div >
  );
}