

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Imports ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
import './Definition_Income.scss';
import { IoIosAddCircleOutline, IoIosSearch } from "react-icons/io";
import CustomDialog from '../../DialogComponent/DialogComponent';
import { useContext, useEffect, useState } from 'react';
import { DataTable, DataTableSortStatus, useDataTableColumns } from 'mantine-datatable';
import { ActionIcon, Group, Stack, TextInput } from '@mantine/core';
import apiService from '../../../services/api';
import { Box, Button, Select, Tooltip } from '@mui/material';
import ConfirmationDialog from '../../../shared/confirmationDialog/ConfirmationDialog';
import EditIcon from '@mui/icons-material/Edit';
import { GlobalContext } from '../../../contexts/NotifContext';
import { generateQuery } from '../../../utils/TableFilter';
import { useForm } from 'react-hook-form';
import Income_Form from '../../DefinitionForms/Income_Form/Income_Form';
import { Messages } from '../../../utils/messages';



function Definition_Income() {
  /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ State Variables ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [rerender, setRerender] = useState(false);
  const [Loading, setLoading] = useState(false);
  const [Income_List, setIncome_List] :any = useState([]);
  const [SelectIncome, setSelectIncome] : any= useState({});
  const [QueryParams, setQueryParams] : any= useState({'PageSize':15,'PageNumber':1});
  const [pageSize, setPageSize] = useState(15);
  const PAGE_SIZES = [10, 15, 20];
  const [totalCount, settotalCount] = useState(0);
  const [totalPages, settotalPages] = useState(0);
  const [page, setPage] = useState(1);
  const [formType, setFormType] = useState('Create');

  const { openNotification, setOpenNotification } = useContext(GlobalContext);

  /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ useEffect Hooks ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

  useEffect(() => {
    setPage(1);
  }, [pageSize]);

  useEffect(() => {
    Get_allIncome()
  }, [QueryParams]);
  

  /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Event Handlers ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
  function handleOpen(object :any) {
    if(object){
      setFormType(object?.formType)
      setSelectIncome(object?.Row_Selected)
    }
    setDialogOpen(true);
  };

  const handleClose = () => {
    setDialogOpen(false);
    
  };

  const handleSave = (data:any) => {
    console.log('Data saved:', data);
    if(data?.close){
      handleClose(); 
    }
    Get_allIncome()
  };
  
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Render Functions ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
  function Get_allIncome(){
    console.log(QueryParams);
    localStorage.removeItem('table-columns-order')
    localStorage.removeItem('table-columns-toggle')
    localStorage.removeItem('table-columns-width')

    setLoading(true)
    apiService.Get_allIncome(generateQuery(QueryParams))
    .then((response:any) => {
        setLoading(false)
        if(response.data?.data == null){
          setIncome_List([])
          settotalCount(0)
        }
        setPageSize(response.data?.data?.pageSize)
        settotalCount(response.data?.data?.totalCount)
        settotalPages(response.data?.data?.totalPages)
        setIncome_List(response.data.data.data)
    })
    .catch((error:any) => {
      
    });
  }
  function Get_IncomeBuId(Id:any){
    // apiService.Get_IncomeGetById(Id)
    // .then((response:any) => {
    //   console.log(response.data.data);
    //   setSelectIncome(...SelectIncome,response.data.data)
    // })
    // .catch((error:any) => {
      
    // });
  }
  


/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Config Table ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
  function handleFilter(parameter:any,value:any,object:any={}){
    console.log(QueryParams);
    console.log(parameter,value);
    
    object[parameter] = value;
    setQueryParams({...QueryParams,...object})
  }
  const props = {
    // resizable: true,
    // sortable: true,
    // toggleable: true,
    // draggable: true,
  };
  const ConfirmationCallback = (childData:any) => {
    console.log(childData);
    let data = {
      "id": childData?.id
    }
    apiService.Delete_Income(data)
    .then((response:any) => {
      if(response?.data?.isSuccessful){
        setOpenNotification({open:true,type:'success',object:{messageType:'delete',name:'درآمد',nameValue:childData?.row?.name,code:childData?.row?.code}})
        Get_allIncome()
      }else{
        setOpenNotification({open:true,type:'error',message:response?.data?.getMessageText[0]})
      }
    })
    .catch((error:any) => {
      setOpenNotification({open:true,type:'error',message:error?.data?.getMessageText[0]})
    });
  };
  const columns :any= [
    { title:'ردیف', accessor: 'index' ,width: 50,...props ,render: (customer:any,index:any) => ((page-1)*pageSize + index+1)},
    { title:'نام' , accessor: 'name' , width: 200 ,sortable: true, ...props}, 
    { title:'کد', accessor: 'code' ,...props,},
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
              id={customer?.id}
              row={customer}
              tooltip="حذف درآمد"
              parentCallback={(childData: any) => { ConfirmationCallback(childData); }}
              ButtonText="DeleteIcon"
              OkButtonText="حذف"
              CancelButtonText="انصراف"
              Theme="danger"
              Body= {Messages?.deleteMessage_modal({name:'درآمد',nameValue:customer?.name,code:customer?.code})}
              Title="حذف درآمد"
          />
          </ActionIcon>
          <ActionIcon
            size="sm"
            variant="subtle"
            color="red"
            onClick={() => {
              
            }}
          >
             <Tooltip title="ویرایش درآمد" componentsProps={{ tooltip: { className: 'tooltip-warning' } }}>
                <span onClick={()=>{handleOpen({formType:'Edit',Row_Selected:customer})}}><EditIcon className='badge bg-warning'></EditIcon></span>
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
    handleFilter('OrderBy',event?.columnAccessor + ' ' + event?.direction,{'PageNumber':1})
  }
  const { control: Modal_control,handleSubmit:Modal_handleSubmit, register : Modal_register,reset:Modal_reset,getValues:Modal_getValues,setValue:Modal_setValue,formState: { errors : Modal_errors }} = useForm();

  /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Main Return (JSX) ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
  return (
    <div className="Definition_Income page-container" >
      <div className="page-container-header">
        <div className='page-container-header-toolbar'>
          <div className='page-header-title'>تعریف درآمد</div>
          <Button className='page-header-button' onClick={handleOpen}>
              افزودن
              <IoIosAddCircleOutline className='badge color-success' style={{fontSize:'2rem'}}  />
          </Button>
        </div>
      </div>
      <div className="page-container-body">
        <div className='DataTable_Style' >
          <div className='react_hook_form react_hook_form_search_table'>
            <div className='Field_Container Field_Container_search_form'>
              <input autoComplete='off'  type='text' {...Modal_register("Keyword", { required: true })} placeholder={'جستجو'} onChange={(event:any)=>{handleFilter('Keyword',event?.target?.value,{'PageNumber':1});setPage(1)}}/>   
            </div>
          </div>
          <Stack>
            <DataTable<any> 
              storeColumnsKey={key}
              records={Income_List }
              columns={effectiveColumns}
              fetching={Loading}
              sortStatus={sortStatus}
              onSortStatusChange={handleChangeSort}
              totalRecords={totalCount}
              recordsPerPage={pageSize}
              page={page}
              recordsPerPageOptions={PAGE_SIZES}
              onRecordsPerPageChange={(Size:any) => {handleFilter('PageSize',Size);setPageSize(Size);setPage(1)}}
              onPageChange={(p) => {setPage(p);handleFilter('PageNumber',p);}}
              rowStyle={() => ({ height: '10px' })}
              className="mantine-DataTable-root"
            />
          </Stack>
        </div>
      </div>

      <CustomDialog
          isOpen={isDialogOpen}
          onClose={handleClose}
          modalTitle={formType=='Edit' ? "ویرایش درآمد" : "تعریف درآمد" }
          OptionalComponent={Income_Form}
          onSave={handleSave}
          handleModalClick={() => console.log('Modal clicked')}
          index={1000}
          componentProps = {{selectRow:SelectIncome,formType:formType}}
          minHeight = '10rem'
          minWidth = '15rem'
      />
    </div>
  );
}

export default Definition_Income;

