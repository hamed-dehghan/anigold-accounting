/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Imports ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
import './Customer.scss';
import { IoIosAddCircleOutline, IoIosSearch } from "react-icons/io";
import CustomerForm from '../CustomerForm/CustomerForm';
import CustomDialog from '../DialogComponent/DialogComponent';
import { useContext, useEffect, useState } from 'react';
import { DataTable, DataTableSortStatus, useDataTableColumns } from 'mantine-datatable';
import { ActionIcon, Group, Stack, TextInput } from '@mantine/core';
import apiService from '../../services/api';
import { dataTable } from '../../utils/Storage';
import { AiOutlineClose } from 'react-icons/ai';
import { Box, Button, Select, Tooltip } from '@mui/material';
import { FaTrash } from 'react-icons/fa';
import ConfirmationDialog from '../../shared/confirmationDialog/ConfirmationDialog';
import CustomerDetails from '../CustomerDetails/CustomerDetails';
import { SimpleBackdrop, SimpleCircularProgress } from '../../shared/loadingSpinner/Loading';
import EditIcon from '@mui/icons-material/Edit';
import { GlobalContext } from '../../contexts/NotifContext';
import { generateQuery } from '../../utils/TableFilter';
import { useForm } from 'react-hook-form';
import { BiSolidEdit } from "react-icons/bi";
import { MdEditSquare } from 'react-icons/md';
import { RiEdit2Fill } from 'react-icons/ri';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Messages } from '../../utils/messages';

function Customer() {
  /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ State Variables ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [rerender, setRerender] = useState(false);
  const [Loading, setLoading] = useState(false);
  const [Person_List, setPerson_List] :any = useState([]);
  const [SelectPerson, setSelectPerson] : any= useState({});
  const [QueryParams, setQueryParams] : any= useState({'PageSize':15,'PageNumber':1});
  const [pageSize, setPageSize] = useState(15);
  const PAGE_SIZES = [10, 15, 20 , 50];
  const [totalCount, settotalCount] = useState(0);
  const [totalPages, settotalPages] = useState(0);
  const [page, setPage] = useState(1);
  const [formType, setFormType] = useState('Create');
  const [FileCode, setFileCode] :any = useState();

  const { openNotification, setOpenNotification } = useContext(GlobalContext);

  /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ useEffect Hooks ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

  useEffect(() => {
    setPage(1);
  }, [pageSize]);

  useEffect(() => {
    Get_allPerson()
  }, [QueryParams]);
  

  /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Event Handlers ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
  function 
  handleOpen(object :any) {
    if(object){
      setFormType(object?.formType)
    }
    setDialogOpen(true);
    setSelectedPersonIndex(-1)
  };

  const handleClose = () => {
    setDialogOpen(false);
    
  };

  const handleSave = (data:any) => {
    console.log('Data saved:', data);
    if(data?.close){
      handleClose(); 
    }
    Get_allPerson()
  };
  
  // State for tracking the selected person
  const [selectedPersonIndex, setSelectedPersonIndex] = useState<number | null>(null);
  const [debounceTimer, setDebounceTimer] = useState<NodeJS.Timeout | null>(null);

  const handleKeyDown = (event: KeyboardEvent) => {
    if ((event.key === 'ArrowDown' || event.key === 'ArrowUp') && !isDialogOpen) {
      event.preventDefault();

      // Prevent multiple function calls with debouncing
      if (debounceTimer) {
        clearTimeout(debounceTimer); // Clear the previous timer
      }

      const newDebounceTimer = setTimeout(() => {
        let newIndex :any = selectedPersonIndex;

        if (event.key === 'ArrowDown') {
          if (selectedPersonIndex === null) {
            newIndex = 0; // Select the first person if none is selected
          } else if (selectedPersonIndex < Person_List.length - 1) {
            newIndex = selectedPersonIndex + 1; // Select the next person
          }
        } else if (event.key === 'ArrowUp') {
          if (selectedPersonIndex !== null && selectedPersonIndex > 0) {
            newIndex = selectedPersonIndex - 1; // Select the previous person
          }
        }

        setSelectedPersonIndex(newIndex);

        // Get the selected person from the list
        const selectedPerson = Person_List[newIndex];

        // Call Get_PersonBuId with the selected person's ID
        if (selectedPerson) {
          setSelectPerson(selectedPerson)
          // Get_PersonBuId(selectedPerson.id);
        }
      }, 1); // 300ms delay to debounce

      setDebounceTimer(newDebounceTimer); // Save the new debounce timer
    }
  };

  useEffect(() => {
    // Add keydown event listener to the window
    window.addEventListener('keydown', handleKeyDown);
    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      if (debounceTimer) {
        clearTimeout(debounceTimer); // Cleanup debounce timer
      }
    };
  }, [selectedPersonIndex, debounceTimer]);

  const handleRowClick = (record: any, index: number) => {
    setSelectedPersonIndex(index);
    setSelectPerson(record);
    // Get_PersonBuId(record.id);
  };
// End for tracking the selected person

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Render Functions ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
  function Get_allPerson(){
    console.log(QueryParams);
    localStorage.removeItem('table-columns-order')
    localStorage.removeItem('table-columns-toggle')
    localStorage.removeItem('table-columns-width')

    setLoading(true)
    apiService.Get_allPerson(generateQuery(QueryParams))
    .then((response:any) => {
        setLoading(false)
        if(response.data?.data == null){
          setPerson_List([])
          settotalCount(0)
        }
        console.log(response.data.data.data);
        setSelectPerson(response.data.data.data[0])
        setSelectedPersonIndex(0)
        setPageSize(response.data?.data?.pageSize)
        settotalCount(response.data?.data?.totalCount)
        settotalPages(response.data?.data?.totalPages)
        setPerson_List(response.data.data.data)
    })
    .catch((error:any) => {
      
    });
  }
  function Get_PersonBuId(Id:any){
    apiService.Get_PersonGetById(Id)
    .then((response:any) => {
      downloadfile(`${response.data.data?.fileCode}`)
      setSelectPerson(...SelectPerson,response.data.data)
    })
    .catch((error:any) => {
      
    });
  }
  function downloadfile(code:any){
    // console.log(code);
    // apiService.downloadfile(code)
    // .then((response:any) => {
    //   console.log(response.data.data);
    //   console.log(response,'response.................');
    //   const binaryData = Uint8Array.from(response?.data, (char:any) => char.charCodeAt(0));

    //   // Create a Blob from the binary data
    //   const blob = new Blob([binaryData], { type: "image/jpeg" });
  
    //   // Create a Blob URL
    //   const blobUrl = URL.createObjectURL(blob);
  
    //   // Update the state with the Blob URL
    //   setFileCode(blobUrl)
    // })
    // .catch((error:any) => {
      
    // });
  }

function handleFilter(parameter:any,value:any,object:any={}){
  console.log(QueryParams);
  console.log(parameter,value);
  
  object[parameter] = value;
  setQueryParams({...QueryParams,...object})
}

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Config Table ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
  const props = {
    // resizable: true,
    // sortable: true,
    // toggleable: true,
    // draggable: true,
  };
  const [query, setQuery] = useState('');
  const ConfirmationCallback = (childData:any) => {
    console.log(childData);
    
    let data = {
      "personId": childData?.id
    }
    apiService.Delete_person(data)
    .then((response:any) => {
      setOpenNotification({open:true,type:'success',message:'با موفقیت حذف شد.'})
      console.log(response);
      Get_allPerson()
    })
    .catch((error:any) => {
      
    });
  };
  const columns :any= [
    { title:'ردیف', accessor: 'index' ,...props ,render: (customer:any,index:any) => ((page-1)*pageSize + index+1)},
    { title:'نام و نام خانوادگی' , accessor: 'fullName' , width: 200 ,sortable: true, ...props,
      // filter: (
      //   <TextInput
      //     label=""
      //     description=""
      //     placeholder="جستجوی شخص..."
      //     leftSection={<IoIosSearch size={16} />}
      //     rightSection={
      //       <ActionIcon size="sm" variant="transparent" c="dimmed" onClick={() => setQuery('')}>
      //         <AiOutlineClose size={14} onClick={()=>{handleFilter('FullName','')}}/>
      //       </ActionIcon>
      //     }
      //     value={QueryParams['FullName']}
      //     onChange={(e) => {handleFilter('FullName',e.currentTarget.value)}}
      //   />
      // ),
      // filtering: QueryParams['FullName'],
    }, 
    { title:'کد', accessor: 'code' ,...props,
      // filter: (
      //   <TextInput
      //     label=""
      //     description=""
      //     placeholder="جستجوی کد..."
      //     leftSection={<IoIosSearch size={16} />}
      //     rightSection={
      //       <ActionIcon size="sm" variant="transparent" c="dimmed" onClick={() => setQuery('')}>
      //         <AiOutlineClose size={14} onClick={()=>{handleFilter('Code','')}}/>
      //       </ActionIcon>
      //     }
      //     value={QueryParams['Code']}
      //     onChange={(e) => {handleFilter('Code',e.currentTarget.value)}}
      //   />
      // ),
      // filtering: QueryParams['Code'],
    },
    { title:'نوع مشتری', accessor: 'customerTypeName' ,...props}, 

    // { title:'کد ملی', accessor: 'nationalCode' ,...props}, 
    { title:'منطقه', accessor: 'zoneName' ,...props},
    { title:'شماره موبایل', accessor: 'phoneNumber' ,...props}, 
    { title:'نام واحد صنفی', accessor: 'storeName' ,...props}, 
    {
      accessor: 'actions',
      // width: 20,
      title: <Box mr={6}>عملیات</Box>,
      textAlign: 'right',
      render: (customer:any) => (
        <Group gap={4} justify="right" wrap="nowrap">
          <ActionIcon
            size="sm"
            variant="subtle"
            color="red"
            onClick={() => {
              
            }}
          >
          <ConfirmationDialog 
              id = {customer?.id}
              tooltip='حذف شخص'
              parentCallback={(childData:any)=>{ConfirmationCallback(childData)}}
              ButtonText='DeleteIcon'
              OkButtonText='حذف'
              CancelButtonText='کنسل'
              Theme='danger'
              Body= {Messages?.deleteMessage_modal({name:'مشتری',nameValue:customer?.fullName,code:customer?.code})}
              Title= 'حذف شخص'
            ></ConfirmationDialog>
          </ActionIcon>
          <ActionIcon
            size="sm"
            variant="subtle"
            color="red"
            onClick={() => {
              
            }}
          >
             <Tooltip title="ویرایش شخص" componentsProps={{ tooltip: { className: 'tooltip-warning' } }}>
                <span onClick={()=>{handleOpen({formType:'Edit',Row_Selected:customer})}}><RiEdit2Fill className='badge bg-warning'></RiEdit2Fill></span>
              </Tooltip>
          </ActionIcon>
          <ActionIcon
            size="sm"
            variant="subtle"
            color="red"
            onClick={() => {
              
            }}
          >
            <Tooltip title="جزییات شخص" componentsProps={{ tooltip: { className: 'tooltip-info' } }}>
              <span onClick={()=>{handleOpen({formType:'Info',Row_Selected:customer})}}><VisibilityIcon className='badge bg-info'></VisibilityIcon></span>
            </Tooltip>
          </ActionIcon>
        </Group>
      ),
    },
  ]
  const key = 'table';
  const { effectiveColumns, resetColumnsWidth } = useDataTableColumns<any>({
    key,
    columns: columns,
  });
  const [sortStatus, setSortStatus] = useState<DataTableSortStatus<any>>({
    columnAccessor: '',
    direction: 'asc',
  });
  function handleChangeSort(event:any){
    setSortStatus(event)
    setPage(1)
    // 'Order': event?.direction == 'asc' ? 'true' : 'false',
    handleFilter('OrderBy',event?.columnAccessor + ' ' + event?.direction,{'PageNumber':1})
  }
  const { control: Modal_control,handleSubmit:Modal_handleSubmit, register : Modal_register,reset:Modal_reset,getValues:Modal_getValues,setValue:Modal_setValue,formState: { errors : Modal_errors }} = useForm();

  /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Main Return (JSX) ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
  return (
    <div className="Customer page-container" >
      <div className="page-container-header">
        <div className='page-container-header-toolbar'>
          
          <div className='page-header-title'>تعریف اشخاص</div>
          <Button className='page-header-button' onClick={handleOpen}>
              افزودن
              <IoIosAddCircleOutline className='badge color-success' style={{fontSize:'2rem'}}  />
          </Button>
        </div>
      </div>
      <div className="page-container-body">
        <div className=''>
          <CustomerDetails Customer={SelectPerson}></CustomerDetails>
        </div>
        {/* {Loading ? <div style={{position:'absolute',marginLeft:'50%',marginTop:'4rem'}}><SimpleBackdrop/></div>:''} */}
        <div className='DataTable_Style' >
          <div className='react_hook_form react_hook_form_search_table'>
            <div className='Field_Container Field_Container_search_form'>
              {/* <label>جستجو</label> */}
              <input autoComplete='off' type='text' {...Modal_register("Keyword", { required: true })} placeholder={'جستجو'} onChange={(event:any)=>{handleFilter('Keyword',event?.target?.value,{'PageNumber':1});setPage(1)}}/>   
            </div>
          </div>
          <Stack>
            <DataTable<any> 
              // height={window.innerHeight - 270}
              storeColumnsKey={key}
              records={Person_List }
              columns={effectiveColumns}
              fetching={Loading}
              // defaultColumnRender={(row, _, accessor) => {
              //   if(accessor == 'addresses'){
              //     return row?.addresses[0]?.addressLine
              //   }else{
              //     return row[accessor]
              //   }
              // }}
              sortStatus={sortStatus}
              onSortStatusChange={handleChangeSort}
              // sortIcons={{
              //   sorted: <IconChevronUp size={14} />,
              //   unsorted: <IconSelector size={14} />,
              // }}
              
 
              // onRowClick={({ record, index, event }:any) => {
              //   console.log(record);
              //   console.log(index);
              //   console.log(record);
              //   setSelectPerson(record)
              //   Get_PersonBuId(record?.id)
                
              // }}
              // rowClassName={({ id }) => (id == SelectPerson?.id ? 'SelectedRow custom-row' : 'custom-row')}
              totalRecords={totalCount}
              recordsPerPage={pageSize}
              page={page}
              onPageChange={(p) => {setPage(p);handleFilter('PageNumber',p);}}
              recordsPerPageOptions={PAGE_SIZES}
              onRecordsPerPageChange={(Size) => {handleFilter('PageSize',Size);setPageSize(Size);setPage(1)}}
              rowClassName={({ id }, index) =>
                index === selectedPersonIndex ? 'SelectedRow custom-row' : 'custom-row'
              }
              onRowClick={({ record, index }: any) => handleRowClick(record, index)}
              rowStyle={() => ({ height: '10px' })}
              className="mantine-DataTable-root"
            />
          </Stack>
        </div>
      </div>

      <CustomDialog
          isOpen={isDialogOpen}
          onClose={handleClose}
          modalTitle={formType=='Edit' ? "ویرایش شخص" : "تعریف شخص" }
          OptionalComponent={CustomerForm}
          onSave={handleSave}
          handleModalClick={() => console.log('Modal clicked')}
          index={1000}
          componentProps = {{selectRow:SelectPerson,formType:formType}}
          // minWidth = '40rem'
      />
    </div>
  );
}

export default Customer;

