import React, { useContext, useEffect, useRef } from 'react';
import './CustomerForm.scss';
import { Box, Button, Checkbox, CircularProgress, FormControl, FormControlLabel, MenuItem, Tab, Tabs, Tooltip } from '@mui/material';
import Select from 'react-select'
import { Controller, useForm } from 'react-hook-form';
import { IoIosAddCircleOutline, IoIosCheckmarkCircleOutline } from 'react-icons/io';
import { Loader, Textarea } from '@mantine/core';
import Grid from '@mui/material/Grid';
import UploadFiles from '../../shared/UploadFile/UploadFile';
import { FaCreditCard, FaMoneyBillWave, FaUserTie } from 'react-icons/fa';
import { accountType_List, creditType_List, options, roles_List } from '../../utils/Storage';
import apiService, { Get_fileUrl } from '../../services/api';
import { GlobalContext } from '../../contexts/NotifContext';
import { random } from 'lodash';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import { FaFileArrowUp } from "react-icons/fa6";
import { Calendar, CalendarProvider, DatePicker } from "zaman";
import { IoEyeSharp } from "react-icons/io5";
import CustomDialog from '../DialogComponent/DialogComponent';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import moment from 'jalali-moment';
import { closeModal } from '@mantine/modals';
import Zone_Form from '../DefinitionForms/Zone_Form/Zone_Form';
import { CustomOption, CustomSingleValue } from '../../utils/options';
import CustomerType_Form from '../DefinitionForms/CustomerType_Form/CustomerType_Form';
import { AiOutlineBank, AiOutlineCheckCircle, AiOutlineCloseCircle, AiOutlineFileText, AiOutlineGif, AiOutlineGift, AiOutlineHome, AiOutlineInfoCircle, AiOutlinePhone } from 'react-icons/ai';
import { BsFillPersonFill } from 'react-icons/bs';
import { MdAccountBalanceWallet, MdShield, MdVerified } from 'react-icons/md';

function CustomerForm({onSave,selectRow,formType}:any){

  /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ State Variables ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
  const [SubmitLoading, setSubmitLoading] = React.useState(false);
  const [ allCustomerType_List, setallCustomerType_List] = React.useState([]);
  const [zoneList_List, setzoneList_List] = React.useState([]);
  const [guaranteetype_List, setguaranteetype] = React.useState([]);
  const [creditType_List, setCreditType] = React.useState([]);
  const [allBank_List, setallBank_List] = React.useState([]);
  const [allbankbranch_List, setallbankbranch_List] = React.useState([]);
  const [addresstype_List, setaddresstype_List] = React.useState([]);
  const [appdatetype_List, setappdatetype_List] = React.useState([]);
  const [bankaccounttype_List, setbankaccounttype_List] = React.useState([]);
  const [customertype_List, setcustomertype_List] = React.useState([]);
  const [phonenumbertype_List, setphonenumbertype_List] = React.useState([]);
  const [roletype_List, setroletype_List] = React.useState([]);
  const [MenuOpen, setMenuOpen] = React.useState('');

  const { control: Modal_control,handleSubmit:Modal_handleSubmit, register : Modal_register,reset:Modal_reset,getValues:Modal_getValues,setValue:Modal_setValue,formState: { errors : Modal_errors }} = useForm();
  const { control: phoneNumber_control,handleSubmit:phoneNumber_handleSubmit, register : phoneNumber_register,reset:phoneNumber_reset,getValues:phoneNumber_getValues,setValue:phoneNumber_setValue,formState: { errors : phoneNumber_errors }} = useForm();
  const { control: address_control,handleSubmit:address_handleSubmit, register : address_register,reset:address_reset,getValues:address_getValues,setValue:address_setValue,formState: { errors : address_errors }} = useForm();
  const { control: Bank_control,handleSubmit:Bank_handleSubmit, register : Bank_register,reset:Bank_reset,getValues:Bank_getValues,setValue:Bank_setValue,formState: { errors : Bank_errors }} = useForm();
  const { control: date_control,handleSubmit:date_handleSubmit, register : date_register,reset:date_reset,getValues:date_getValues,setValue:date_setValue,formState: { errors : date_errors }} = useForm();
  const { control: guarantee_control,handleSubmit:guarantee_handleSubmit, register : guarantee_register,reset:guarantee_reset,getValues:guarantee_getValues,setValue:guarantee_setValue,formState: { errors : guarantee_errors }} = useForm();
  const { control: credit_control,handleSubmit:credit_handleSubmit, register : credit_register,reset:credit_reset,getValues:credit_getValues,setValue:credit_setValue,formState: { errors : credit_errors }} = useForm();


  const [phoneNumber_List, setphoneNumber_List] :any[] = React.useState([]);
  const [address_List, setaddress_List] :any[] = React.useState([]);
  const [Bank_List, setBank_List] :any[] = React.useState([]);
  const [date_List, setdate_List] :any[] = React.useState([]);
  const [credit_List, setCredit_List] :any[] = React.useState([]);
  const [guarantee_List, setguarantee_List] :any[] = React.useState([]);

  /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ useEffect Hooks ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
  useEffect(() => { 
 
    if(selectRow && (formType=='Edit' || formType == 'Info')){
      setImageAddress(selectRow?.fileCode)
      apiService.Get_PersonGetById(selectRow?.id)
      .then((response:any) => {
        console.log(response.data.data);
        selectRow = {...selectRow,...response.data.data}
        console.log('selectRow2',selectRow);
        // setdate_List([...selectRow?.appDates])
        // setBank_List([...selectRow?.bankAccounts])
        // setguarantee_List([...selectRow?.guarantees])
        // setSelectPerson(...SelectPerson,response.data.data)
        // console.log('selectRow',selectRow);
        // console.log(zoneList_List.find((option:any) => option.id == selectRow?.zoneId));
        Modal_setValue('fullName',selectRow?.fullName)
        Modal_setValue('storeName',selectRow?.storeName)
        Modal_setValue('nationalCode',selectRow?.nationalCode)
        Modal_setValue('code',selectRow?.code)
        Modal_setValue('referral',selectRow?.referral)
        Modal_setValue('description',selectRow?.description)
        Modal_setValue('fileCode',selectRow?.fileCode)
        Modal_setValue('phoneNumber',selectRow?.phoneNumber)
        // Modal_setValue('role',selectRow?.role || 1)
        Get_AllData()
      })
      .catch((error:any) => {
        
      });
    }else{
      handleFocus('fullName')
      // Get_Person_generatedcode()
      Get_AllData()
    }


  }, []);
  function Get_AllData(){
    Get_allCustomerType()
    Get_zoneList()
    Get_guaranteetype()
    Get_creditType()
    Get_allBank()
    Get_addresstype()
    Get_appdatetype()
    Get_bankaccounttype()
    Get_customertype()
    Get_phonenumbertype()
    Get_roletype()
  }
  function Get_PersonBuId(Id:any){

  }
  /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Render Functions ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
  function Get_Person_generatedcode(){
    apiService.Get_Person_generatedcode()
    .then((response:any) => {
      Modal_setValue('code',response?.data)
    })
  }
  function Get_allCustomerType(){
    apiService.Get_allCustomerType()
    .then((response:any) => {
      setallCustomerType_List(response?.data?.data?.data)
    })
  }
  function Get_zoneList(){
    apiService.Get_zoneList()
    .then((response:any) => {
      let List = response?.data?.data;
      setzoneList_List(List)
      if((formType=='Edit' || formType == 'Info'))Modal_setValue('zoneId',List.find((option:any) => option.id == selectRow?.zoneId))
    })
  }
  function Get_guaranteetype(){
    apiService.Get_guaranteetype()
    .then((response:any) => {
      let List :any= response?.data?.data
      setguaranteetype(List)
      if((formType=='Edit' || formType == 'Info')){
        selectRow?.guarantees?.map((item:any)=>{      
          const found = List.find((option: any) => option.id == item?.guaranteeTypeId);
          item.guaranteeTypeId = found || item.guaranteeTypeId;   
        })
        setguarantee_List([...selectRow?.guarantees])
      }
    })
  }
  function Get_creditType(){
    apiService.Get_guaranteetype()
    .then((response:any) => {
      let List :any= response?.data?.data
      setCreditType(List)
      if((formType=='Edit' || formType == 'Info')){
        selectRow?.guarantees?.map((item:any)=>{      
          const found = List.find((option: any) => option.id == item?.creditTypeId);
          item.creditTypeId = found || item.creditTypeId;   
        })
        setguarantee_List([...selectRow?.guarantees])
      }
    })
  }
  function Get_allBank(){
    apiService.Get_allBank()
    .then((response:any) => {
      setallBank_List(response?.data?.data)
    })
  }
  function Get_addresstype(){
    apiService.Get_addresstype()
    .then((response:any) => {
      let List :any= response?.data?.data
      setaddresstype_List(List)
      if((formType=='Edit' || formType == 'Info')){
        selectRow?.addresses?.map((item:any)=>{   
          const found = List.find((option: any) => option.id == item?.addressTypeId);
          item.addressTypeId = found || item.addressTypeId;  
        })
        setaddress_List([...selectRow?.addresses])
      }
    })
  }
  function Get_appdatetype(){
    apiService.Get_appdatetype()
    .then((response:any) => {
      let List :any= response?.data?.data
      setappdatetype_List(List)
      if((formType=='Edit' || formType == 'Info')){
        selectRow?.appDates?.map((item:any)=>{      
          const found = List.find((option: any) => option.id == item?.appDateTypeId);
          item.appDateTypeId = found || item.appDateTypeId;  
        })
        setdate_List([...selectRow?.appDates])
      }
    })
  }
  function Get_bankaccounttype(){
    // apiService.Get_bankaccounttype()
    // .then((response:any) => {
    //   let List :any= response?.data?.data
    //   setbankaccounttype_List(List)
    //   if((formType=='Edit' || formType == 'Info')){
    //     selectRow?.bankAccounts?.map((item:any)=>{      
    //       const found = List.find((option: any) => option.id == item?.branchId);
    //       item.branchId = found || item.branchId;  
    //     })
    //     setBank_List([...selectRow?.bankAccounts])
    //   }
    // })
  }
  function Get_customertype(){
    apiService.Get_customertype()
    .then((response:any) => {
      let List = response?.data?.data
      if((formType=='Edit' || formType == 'Info'))Modal_setValue('customerTypeId',List.find((option:any) => option.id == selectRow?.customerTypeId))
      setcustomertype_List(List)
    })
  }
  function Get_phonenumbertype(){
    apiService.Get_phonenumbertype()
    .then((response:any) => {
      let List :any= response?.data?.data
      setphonenumbertype_List(List)
      if((formType=='Edit' || formType == 'Info')){
        selectRow?.phoneNumbers?.map((item:any)=>{
          const found = List.find((option: any) => option.id == item?.phoneNumberTypeId);
          item.phoneNumberTypeId = found || item.phoneNumberTypeId;  
        })
        setphoneNumber_List([...selectRow?.phoneNumbers])
      }
    })
  }
  function Get_roletype(){
    apiService.Get_roletype()
    .then((response:any) => {
      let List = response?.data?.data;
      setroletype_List(List)
      if((formType=='Edit' || formType == 'Info'))Modal_setValue('role',List.find((option:any) => option.id == selectRow?.roleId))
      if(formType!='Edit' || !selectRow?.roleId)Modal_setValue('role',List.find((option:any) => option.id == 1))

    })
  }
  function Get_allbankbranch(Id:any){
    apiService.Get_getallbankbranchByBankId(Id)
    .then((response:any) => {
      setallbankbranch_List(response?.data?.data?.data)
    })
  }

  function onSubmitProject(e:any){
    // onSave(Modal_getValues());
    setSubmitLoading(true)
    console.log(Modal_getValues('fileCode'));
    
    console.log(Modal_getValues());
    let addresses : any[] = [];
    let phoneNumbers : any[] = [];
    let appDates : any[] = [];
    let bankAccounts : any[] = [];
    let guarantees : any[] = [];
    let credits : any[] = [];

    
    address_List?.map((item:any)=>{
      addresses.push(
        {
          'addressTypeId' :item?.addressTypeId?.id,
          'addressLine': item?.addressLine,
          'zipCode': item?.zipCode
        }
      )
    })
    if(Modal_getValues('phoneNumber')){
      phoneNumbers.push(
        {
          "phoneNumberTypeId": 2,
          "number": Modal_getValues('phoneNumber')
        }
      )
    }
    phoneNumber_List?.map((item:any)=>{
      if(Modal_getValues('phoneNumber') != item?.number){
        phoneNumbers.push(
          {
            "phoneNumberTypeId": item?.phoneNumberTypeId?.id,
            "number": item?.number
          }
        )
      }
    })
    date_List?.map((item:any)=>{
      appDates.push(
        {
          "appDateTypeId": item?.appDateTypeId?.id,
          "date": item?.date
        }
      )
    })
    Bank_List?.map((item:any)=>{
      bankAccounts.push(
        {
          // "branchId": item?.branchId?.id,
          "bankId": item?.bankId?.id,
          "branchName": item?.branchName,
          "cardNumber": item?.cardNumber,
          "accountNumber": item?.accountNumber,
          "shabaNumber": item?.shabaNumber,
          "isCurrency": item?.isCurrency
        }
      )
    })
    guarantee_List?.map((item:any)=>{
      guarantees.push(
        {
          "guaranteeTypeId": item?.guaranteeTypeId?.id,
          "guaranteeFileCodes": item?.FileAddresses,
          "name": item?.name,
          "amount": item?.amount,
        }
      )
    })
    credit_List?.map((item:any)=>{
      credits.push(
        {
          "creditTypeId": item?.creditTypeId?.id,
          "amount": item?.amount,
        }
      )
    })
    let data :any = {
      // "customerTypeId": Modal_getValues('customerTypeId')?.id || null,
      "zoneId": Modal_getValues('zoneId')?.id || null,
      "fullName": Modal_getValues('fullName') || null,
      "storeName": Modal_getValues('storeName') || null,
      "nationalCode": Modal_getValues('nationalCode') || null,
      // "code": Modal_getValues('code') || null,
      "referral": Modal_getValues('referral') || null,
      "description": Modal_getValues('description') || null,
      "fileCode": Modal_getValues('fileCode') || null,
      "roles": [
        {
          "roleType": Modal_getValues('role')?.id,
          "roleCustomerType": 1
        }
      ],
      "addresses": addresses.length === 0 ? null : addresses,
      "phoneNumbers": phoneNumbers.length === 0 ? null : phoneNumbers,
      "appDates": appDates.length === 0 ? null : appDates,
      "bankAccounts": bankAccounts.length === 0 ? null : bankAccounts,
      "guarantees": guarantees.length === 0? null : guarantees,
      "credits": credits.length === 0? null : credits,
    }
    console.log(data);
    if((formType=='Edit' || formType == 'Info')){
      data.id = selectRow?.id
      apiService.Edit_person(data)        
      .then((response:any) => {
        if(response?.data?.isSuccessful){
        // setLoading(false);
        setOpenNotification({open:true,type:'success',message:'با موفقیت ویرایش شد.'})
        onSave({close:true})
        setSubmitLoading(false)
        }else{
          setSubmitLoading(false)
          setOpenNotification({open:true,type:'error',message:response?.data?.getMessageText[0]})
        }
      })
      .catch(error => {
        console.log(error);
        // setLoading(false);
        setSubmitLoading(false)
        setOpenNotification({open:true,type:'error',message:error?.data?.getMessageText[0]})
      });
    }else{
      apiService.Create_person(data)        
      .then((response:any) => {
        if(response?.data?.isSuccessful){
          // setLoading(false);
          setOpenNotification({open:true,type:'success',message:`مشتری ${Modal_getValues('fullName')} با کد ${response?.data?.data?.code} تایید شد.`})
          onSave()
  
          Modal_reset({fullName:'',storeName:'',nationalCode:'',code:'',referral:'',description:'',fileCode:'',phoneNumber:''})
          Modal_setValue('role',roletype_List.find((option:any) => option.id == 1))
          // Get_Person_generatedcode()
          handleFocus('fullName')
          setSubmitLoading(false)
          setphoneNumber_List([])
          setaddress_List([])
          setBank_List([])
          setdate_List([])
          setguarantee_List([])
        }else{
          setSubmitLoading(false)
          setOpenNotification({open:true,type:'error',message:response?.data?.getMessageText[0]})
        }

      })
      .catch(error => {
        console.log(error);
        // setLoading(false);
        setSubmitLoading(false)
        setOpenNotification({open:true,type:'error',message:error?.data?.getMessageText[0]})
      });
    }

  }
  function phoneNumber_onSubmitProject(e:any){
    console.log(phoneNumber_getValues());
    let data :any[] = [...phoneNumber_List,{
      "phoneNumberTypeId": phoneNumber_getValues('phoneNumberTypeId'),
      "number": phoneNumber_getValues('number')
    }]
    console.log(data);
    setphoneNumber_List(data)
    phoneNumber_reset({number:''})
  }
  function address_onSubmitProject(e:any){
    console.log(address_getValues());
    let data :any = [...address_List,{
      "addressTypeId": address_getValues('addressTypeId'),
      "addressLine": address_getValues('addressLine'),
      "zipCode": address_getValues('zipCode')
    }]
    setaddress_List(data)
    console.log(data);
    address_reset({zipCode:'',addressLine:''})
  }
  function Bank_onSubmitProject(e:any){
    console.log(Bank_getValues());
    let data :any[] = [...Bank_List,{
      "bankId": Bank_getValues('bankId'),
      "branchName": Bank_getValues('branchName'),
      "cardNumber": Bank_getValues('cardNumber'),
      "accountNumber": Bank_getValues('accountNumber'),
      "shabaNumber": Bank_getValues('shabaNumber'),
      "isCurrency": Bank_getValues('isCurrency')
      }]
    setBank_List(data)
    console.log(data);
    Bank_reset({isCurrency:'',shabaNumber:'',accountNumber:'',cardNumber:'',branchName:'',bankId:''})
  }
  function date_onSubmitProject(e:any){
    console.log(date_getValues('date'));
    
    console.log(date_getValues());
    let data :any = [...date_List,{
      "appDateTypeId": date_getValues('appDateTypeId'),
      "date": date_getValues('date').toISOString()
      }]
    setdate_List(data)
    console.log(data);
    date_reset({date:new Date()})
  }
  function guarantee_onSubmitProject(e:any){
    console.log(guarantee_getValues());
    let data :any = [...guarantee_List,{
      "guaranteeTypeId": guarantee_getValues('guaranteeTypeId'),
      "guaranteeFileCode": guarantee_getValues('guaranteeFileCode'),
      "name": guarantee_getValues('name'),
      "amount": guarantee_getValues('amount'),
      "FileAddresses" : FileAddresses
      }]
    setguarantee_List(data)
    console.log(data);
    setFileAddresses([])
    guarantee_reset({amount:'',name:'',guaranteeFileCode:''})
  }
  function credit_onSubmitProject(e:any){
    console.log(credit_getValues());
    let data :any = [...credit_List,{
      "creditTypeId": credit_getValues('creditTypeId'),
      "amount": credit_getValues('amount'),
      }]
    setCredit_List(data)
    credit_reset({amount:'',creditTypeId:''})
  }
  function DeleteRow(ListName:string,index:number){
    switch (ListName) {
      case 'phoneNumber_List':
        setphoneNumber_List((prevList:any) => prevList.filter((_ :any, i:any) => i !== index));
        break;
      case 'address_List':
        setaddress_List((prevList:any) => prevList.filter((_ :any, i:any) => i !== index));
        break;
      case 'Bank_List':
        setBank_List((prevList:any) => prevList.filter((_ :any, i:any) => i !== index));
        break;
      case 'date_List':
        setdate_List((prevList:any) => prevList.filter((_ :any, i:any) => i !== index));
        break;
      case 'guarantee_List':
        setguarantee_List((prevList:any) => prevList.filter((_ :any, i:any) => i !== index));
        break;
      case 'credit_List':
        setCredit_List((prevList:any) => prevList.filter((_ :any, i:any) => i !== index));
        break;
      default:
        break;
    }
  }

  //Tabs
  const [value, setValue] = React.useState(7);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    console.log(event);
    console.log(newValue);
    
    setValue(newValue);
  };
  const { openNotification, setOpenNotification } = useContext(GlobalContext);
  const [ImageAddress, setImageAddress] :any[] = React.useState();
  const [FileAddresses, setFileAddresses] :any[] = React.useState([]);
  const [ImageAddressLoading, setImageAddressLoading] :any[] = React.useState(false);
  function handleChangeImage(event:any){
    console.log(event);
    
    setImageAddressLoading(true)
    let selectedFile = event.target.files[0]
    console.log(selectedFile);
    
    const formData = new FormData();
    formData.append("Content", selectedFile, selectedFile.name);
    console.log(formData);
    
    apiService.Uploadfile(formData)      
    .then((response:any) => {

      if(response?.data?.isSuccessful){
        console.log(response?.data?.data?.fileId);
        Modal_setValue('fileCode',response?.data?.data?.fileId)
        
        setImageAddressLoading(false)
        setOpenNotification({open:true,type:'success',message:'با موفقیت آپلود شد.'})
        setImageAddress(URL.createObjectURL(selectedFile))
      }else{
        setOpenNotification({open:true,type:'error',message:response?.data?.getMessageText[0]})
      }
    })
    .catch((error:any) => {
      setImageAddressLoading(false)
      setOpenNotification({open:true,type:'error',message:error?.data?.getMessageText[0]})
    });
  }
  function handle_multiUploadFile(event:any){
    // console.log(event.target.files);
    
    setImageAddressLoading(true)
    console.log(event.target.files);
    
    let selectedFiles :any[] = []
    selectedFiles = [...event.target.files]
    console.log(selectedFiles);
    
    const formData = new FormData();
    selectedFiles.forEach((file:any) => {
      formData.append("Contents", file, file?.name);
      // formData.append("filename", file?.name);
    });
    console.log(formData);
    
    apiService.multiUploadfile(formData)      
    .then((response:any) => {
      if(response?.data?.isSuccessful){
        setImageAddressLoading(false)
        setOpenNotification({open:true,type:'success',message:'با موفقیت آپلود شد.'})
        let list_FileAddresses :any[]= []
        response?.data?.data.forEach((file:any) => {
          list_FileAddresses.push(file?.fileId)
        });
        setFileAddresses([...FileAddresses,...list_FileAddresses])
        console.log(list_FileAddresses);
      }else{
        setOpenNotification({open:true,type:'error',message:response?.data?.getMessageText[0]})
      }
      
    })
    .catch((error:any) => {
      console.log(error);
      
      setImageAddressLoading(false)
      setOpenNotification({open:true,type:'error',message:error?.data?.getMessageText[0]})
    });
  }
  const FileUploadCallback = (childData:any) => {
    console.log(childData);
    Modal_setValue('attachments',childData?.Attachments)
  };

  // const inputRefs :any = useRef({current:[1,2,3]});
  // const handleKeyDown = (e:any, index:any) => {
  //   console.log(inputRefs);
    
  //   console.log(e,'dddddddddddddddd');
    
  //   if (e.key === "Enter") {
  //     e.preventDefault(); // Prevent form submission
  //     const nextElement :any = inputRefs.current[index + 1];
  //     console.log(nextElement);
      
  //     if (nextElement) {
  //       nextElement.focus(); // Focus on the next input
  //     }
  //   }
  // };
  const inputRefs :any = useRef([]);

  const handleKeyDown = (e:any, index:any,required = true) => {
    if(!e.target.value && required) return
    if (e.key == "Enter") {
      e.preventDefault(); // Prevent form submission
      const nextElement = inputRefs.current[index];
      if (nextElement) {
        nextElement.focus(); // Focus on the next input
      }
    }
  };
  function handleFocus(index:any){
    const nextElement = inputRefs.current[index];
    if (nextElement) {
      nextElement.focus();
      setMenuOpen(index) // Focus on the next input
    }
  }
  const [DialogOpen, setDialogOpen] = React.useState(false);
  const handleClose = () => {
    setDialogOpen(false);
  };

  const [DialogOpenZone, setDialogOpenZone] = React.useState(false);
  function handleOpenZone() { 
    setDialogOpenZone(true);
  };

  const handleCloseZone = () => {
    setDialogOpenZone(false);
  };

  const handleSaveZone = (data:any) => {
    handleCloseZone(); 
    Get_zoneList()
  };

  const [DialogOpenCustomerType, setDialogOpenCustomerType] = React.useState(false);
  function handleOpenCustomerType() { 
    setDialogOpenCustomerType(true);
  };

  const handleCloseCustomerType = () => {
    setDialogOpenCustomerType(false);
  };

  const handleSaveCustomerType = (data:any) => {
    handleCloseCustomerType(); 
    Get_allCustomerType()
  };
  return(
    <div className="CustomerForm">
      <div className='react_hook_form'   >
        
        <Box sx={{ maxWidth: { xs: 320, sm: 480 }, bgcolor: 'background.paper' }}>
          <Tabs 
            className='Tabs_Custom'
            value={value}
            onChange={handleChange}
            // variant="scrollable"
            // scrollButtons
            // allowScrollButtonsMobile
            aria-label="scrollable force tabs example"
          >
            <Tab icon={<AiOutlineCheckCircle />} label="اعتبار" value={2}/>
            {/* <Tab label="نقش" value={4}/> */}
            <Tab icon={<AiOutlineFileText />} label="اسناد ضمانتی" value={3} />
            <Tab icon={<AiOutlineGift />} label="مناسبت" value={6} />
            <Tab icon={<AiOutlineBank />} label="حسابهای بانکی" value={0} />
            <Tab icon={<AiOutlineHome />} label="آدرس" value={1} />
            <Tab icon={<AiOutlinePhone />} label="اطلاعات تماس" value={5} />
            <Tab icon={<BsFillPersonFill />} label="اطلاعات تکمیلی" value={8} />
            <Tab icon={<AiOutlineInfoCircle />} label="اطلاعات" value={7} />
          </Tabs>
        </Box>
        { value == 7 && 
          <form autoComplete="off" style={{display:'flex',justifyContent:'space-between',padding:'.5rem'}}>
          <Grid container>
            <Grid item xs={12} sm={3} style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
              <div>
                <Button
                  disabled={formType == 'Info'}
                  component="label"
                  className='UploadImageButton'>
                  { 
                    ImageAddressLoading ? <CircularProgress/>:
                    ImageAddress ? <img  src={Get_fileUrl(ImageAddress)} style={{width:'100%',height:'100%'}}/> :
                      <div className='UploadImageButtonIcon'>
                        <FaUserTie />
                      </div>
                  }
                  <input onChange={(event:any)=>{handleChangeImage(event)}}
                    type="file"
                    hidden
                  />
                </Button>
              </div>
            </Grid>
            <Grid item xs={12} sm={9}>
              <div style={{display:'flex'}}>
                {/* <div className='Field_Container' style={{width:'10rem'}}>
                  <label>کد</label>
                  <input disabled type='number' {...Modal_register("code", { required: false })} placeholder={''} ref={(el) => {Modal_register("code").ref(el);(inputRefs.current['code'] = el)}}  onKeyDown={(e) => handleKeyDown(e, 'customerTypeId')}/>   
                  {Modal_errors.title && <div className='field_error'>کد را وارد کنید.</div>}
                </div> */}
                <div className='Field_Container Required'>
                  <label>نام و نام خانوادگی  </label>
                  <input readOnly={formType == 'Info'} type='text'  {...Modal_register("fullName", { required: true })} placeholder={''} ref={(el) => {Modal_register("fullName").ref(el);(inputRefs.current['fullName'] = el)}}  onKeyDown={(e) => handleKeyDown(e, 'phoneNumber')}/>   
                  {Modal_errors.fullName && <div className='field_error'>نام و نام خانوادگی را وارد کنید.</div>}
                </div>
                <div className='Field_Container'>
                  <label>شماره تماس</label>
                  <input readOnly={formType == 'Info'} type='number'  {...Modal_register("phoneNumber", { required: false })} placeholder={''} ref={(el) => {Modal_register("phoneNumber").ref(el);(inputRefs.current['phoneNumber'] = el)}}  onKeyDown={(e) => handleKeyDown(e, 'zoneId',false)}/>   
                  {Modal_errors.phoneNumber && <div className='field_error'> شماره تماس را وارد کنید.</div>}
                </div>
              </div>
              <div style={{display:'flex'}}>
                {/* <div className='Field_Container Required'>
                  <label className="label">نوع مشتری </label>
                  <Controller
                    name="customerTypeId"
                    rules={{ required: true }}
                    control={Modal_control}
                    defaultValue={null}
                    render={({ field }) => (
                      <Select
                        isDisabled={formType == 'Info'}
                        placeholder=''
                        {...field}
                        isClearable
                        options={[...allCustomerType_List, { name: 'افزودن', value: 'add-new' , isAddOption: true}]}
                        getOptionLabel={(option) =>  (option.code + ' ' + option.name)  || ''}
                        onChange={(selectedOption) => {
                          field.onChange(selectedOption)
                          if (selectedOption?.value === 'add-new') {  // Check if the "Add New Zone" option is selected
                            handleOpenCustomerType();  // Open the modal
                          } else {
                            handleFocus('zoneId');
                          }
                        }}
                        components={{
                          SingleValue: CustomSingleValue, 
                          Option: CustomOption,
                        }}
                        classNamePrefix="custom-select"
                        ref={(el) => {Modal_register("customerTypeId").ref(el);(inputRefs.current['customerTypeId'] = el)}}
                        menuIsOpen={MenuOpen == "customerTypeId"}
                        onFocus={() => {setMenuOpen('customerTypeId')}}
                        onBlur={() => {setMenuOpen('')}}
                      />
                    )}
                  />
                  <CustomDialog
                    key='DialogCustomerType'
                    isOpen={DialogOpenCustomerType}
                    onClose={handleCloseCustomerType}
                    modalTitle={"تعریف نوع مشتری"}
                    OptionalComponent={CustomerType_Form}
                    onSave={handleSaveCustomerType}
                    handleModalClick={() => console.log('Modal clicked')}
                    index={1000}
                    componentProps={{}}
                    minHeight='10rem'
                    minWidth='15rem'
                  />
                  {Modal_errors.customerTypeId && <div className='field_error'>نوع مشتری را وارد کنید.</div>}
                </div> */}
                <div className='Field_Container Required'>
                  <label className="label">منطقه </label>
                  {/* <Controller
                    name="zoneId"
                    rules={{ required: true }}
                    control={Modal_control}
                    defaultValue={null}
                    render={({ field }) => (
                      <Select
                        placeholder=''
                        {...field}
                        isClearable
                        options={zoneList_List}
                        getOptionLabel={(option) =>  option.name  || ''}
                        onChange={(selectedOption) => {
                          field.onChange(selectedOption)
                          handleFocus('Confirm')
                        }}
                        classNamePrefix="custom-select"
                        ref={(el) => {Modal_register("zoneId").ref(el);(inputRefs.current['zoneId'] = el)}}  
                        menuIsOpen={MenuOpen == "zoneId"}
                        onFocus={() => {setMenuOpen('zoneId')}}
                        onBlur={() => {setMenuOpen('')}}
                      />
                      
                    )}

                  /> */}
                  <Controller
                    name="zoneId"
                    rules={{ required: true }}
                    control={Modal_control}
                    defaultValue={null}
                    render={({ field }) => (
                      <Select
                        isDisabled={formType == 'Info'}
                        placeholder=''
                        {...field}
                        isClearable
                        options={[...zoneList_List, { name: 'افزودن', value: 'add-new' , isAddOption: true}]}  // Add the option for opening the modal
                        getOptionLabel={(option) => option.name || ''}
                        onChange={(selectedOption) => {
                          field.onChange(selectedOption);
                          if (selectedOption?.value === 'add-new') {  // Check if the "Add New Zone" option is selected
                            handleOpenZone();  // Open the modal
                          } else {
                            handleFocus('role');
                          }
                        }}
                        components={{
                          SingleValue: CustomSingleValue, 
                          Option: CustomOption,
                        }}
                        classNamePrefix="custom-select"
                        ref={(el) => {Modal_register("zoneId").ref(el); (inputRefs.current['zoneId'] = el)}}
                        menuIsOpen={MenuOpen == "zoneId"}
                        onFocus={() => {setMenuOpen('zoneId')}}
                        onBlur={() => {setMenuOpen('')}}
                      />
                    )}
                    />

                    <CustomDialog
                      key='DialogZone'
                      isOpen={DialogOpenZone}
                      onClose={handleCloseZone}
                      modalTitle={"تعریف منطقه"}
                      OptionalComponent={Zone_Form}
                      onSave={handleSaveZone}
                      handleModalClick={() => console.log('Modal clicked')}
                      index={1000}
                      componentProps={{}}
                      minHeight='10rem'
                      minWidth='15rem'
                    />

                  {Modal_errors.zoneId && <div className='field_error'>منطقه را وارد کنید.</div>}
                </div>
                <div className='Field_Container Required'>
                    <label className="label">نقش</label>
                    <Controller
                      name="role"
                      rules={{ required: true }}
                      control={Modal_control}
                      defaultValue={null}
                      render={({ field }) => (
                        <Select
                          isDisabled={formType == 'Info'}
                          placeholder=''
                          {...field}
                          isClearable
                          options={roles_List}
                          getOptionLabel={(option) =>  option.name  || ''}
                          onChange={(selectedOption) => {
                            field.onChange(selectedOption)
                            handleFocus('Confirm')
                          }}
                          classNamePrefix="custom-select"
                          ref={(el) => {Modal_register("role").ref(el);(inputRefs.current['role'] = el)}}  
                          menuIsOpen={MenuOpen == "role"}
                          onFocus={() => {setMenuOpen('role')}}
                          onBlur={() => {setMenuOpen('')}}
                        />
                      )}
                    />
                    {Modal_errors.role && <div className='field_error'>نقش را وارد کنید.</div>}
                  </div>
                  {/* <div>
                  <FormControlLabel {...Bank_register("isCurrency")}  control={<Checkbox defaultChecked={Bank_getValues('isCurrency')}/>} label="حساب ارزی" style={{width:'25rem'}}/>

                  </div> */}
              </div>
            </Grid>
            <Grid item xs={12} sm={12}>
   
            </Grid>
            <Grid item xs={12} sm={12}>

            </Grid>
          </Grid>

          </form>
        }
        { value == 8 && 
          <form autoComplete="off" style={{display:'flex',justifyContent:'space-between',padding:'.5rem'}}>
          {/* <div onClick={handleFocus}>Focus Input</div> */}
          <Grid container>
            <Grid item xs={12} sm={12}>
              <div style={{display:'flex'}}>
                <div className='Field_Container'>
                  <label>کد ملی</label>
                  {/* ,maxLength:10,minLength:10 */}
                  <input readOnly={formType == 'Info'} type='number'  {...Modal_register("nationalCode", { required: false })} placeholder={''} ref={(el) => {Modal_register("nationalCode").ref(el);(inputRefs.current['nationalCode'] = el)}}  onKeyDown={(e) => handleKeyDown(e, 'code')}
                    />   
                    {/* onKeyDown={(e) => handleKeyDown(e, 0)} */}
                  {Modal_errors.title && <div className='field_error'>کد ملی را وارد کنید.</div>}
                </div>
                <div className='Field_Container'>
                  <label>معرف</label>
                  <input readOnly={formType == 'Info'} {...Modal_register("referral", { required: false })} placeholder={''} ref={(el) => {Modal_register("referral").ref(el);(inputRefs.current['referral'] = el)}}  onKeyDown={(e) => handleKeyDown(e, 'role')}/>   
                  {Modal_errors.title && <div className='field_error'>معرف را وارد کنید.</div>}
                </div>
                <div className='Field_Container'>
                  <label>نام واحد صنفی</label>
                  <input readOnly={formType == 'Info'} type='text'  {...Modal_register("storeName", { required: false })} placeholder={''} ref={(el) => {Modal_register("storeName").ref(el);(inputRefs.current['storeName'] = el)}}  onKeyDown={(e) => handleKeyDown(e, 'customerTypeId')}/>   
                  {Modal_errors.storeName && <div className='field_error'>   نام واحد صنفی را وارد کنید.</div>}
                </div>
              </div>
            </Grid>
            {/* <Grid item xs={12} sm={12}> */}

            {/* </Grid> */}
          </Grid>

          </form>
        }
        { value == 0 && 
          <form autoComplete="off" className='CustomerForm_TabBody'>
            { formType != 'Info'&&
              <Grid container>
                <Grid item xs={12} sm={7}>
                  <div style={{display:'flex'}}>
                    <div className='Field_Container'>
                      <label className="label">بانک</label>
                      <Controller
                        name="bankId"
                        rules={{ required: false }}
                        control={Bank_control}
                        defaultValue={null}
                        render={({ field }) => (
                          <Select
                            placeholder=''
                            {...field}
                            isClearable
                            options={allBank_List}
                            getOptionLabel={(option) =>  option.name  || ''}
                            onChange={(selectedOption) => {
                              field.onChange(selectedOption)
                              Get_allbankbranch(selectedOption?.id)
                            }}
                            classNamePrefix="custom-select"
                          />
                        )}
                      />
                      {Bank_errors.bankId && <div className='field_error'>شماره کارت را وارد کنید.</div>}
                    </div>
                    <div className='Field_Container'>
                      <label>شعبه</label>
                      <input type='text' {...Bank_register("branchName", { required: false })} placeholder={''}/>   
                      {Bank_errors.branchName && <div className='field_error'>شعبه را وارد کنید.</div>}
                    </div>
                    {/* <div className='Field_Container'>
                      <label className="label">شعبه</label>
                      <Controller
                        name="branchId"
                        rules={{ required: false }}
                        control={Bank_control}
                        defaultValue={null}
                        render={({ field }) => (
                          <Select
                            placeholder=''
                            {...field}
                            isClearable
                            options={allbankbranch_List}
                            getOptionLabel={(option) =>  option.name  || ''}
                            onChange={(selectedOption) => {
                              field.onChange(selectedOption)
                            }}
                            classNamePrefix="custom-select"
                          />
                        )}
                      />
                      {Bank_errors.branchId && <div className='field_error'>شماره کارت را وارد کنید.</div>}
                    </div> */}
                    {/* <div className='Field_Container'>
                      <label className="label">نوع حساب</label>
                      <Controller
                        name="customerTypeId"
                        rules={{ required: false }}
                        control={Modal_control}
                        defaultValue={null}
                        render={({ field }) => (
                          <Select
                            placeholder=''
                            {...field}
                            isClearable
                            options={bankaccounttype_List}
                            getOptionLabel={(option) =>  option.name  || ''}
                            onChange={(selectedOption) => {
                              field.onChange(selectedOption)
                            }}
                            classNamePrefix="custom-select"
                          />
                        )}
                      />
                    </div> */}
                    {/* <div className='Field_Container'>
                      <label className="label">حساب ارزی</label>
                      <Controller
                        name="isCurrency"
                        rules={{ required: false }}
                        control={Bank_control}
                        defaultValue={null}
                        render={({ field }) => (
                          <Select
                            placeholder=''
                            {...field}
                            isClearable
                            options={options}
                            getOptionLabel={(option) =>  option.name  || ''}
                            onChange={(selectedOption) => {
                              field.onChange(selectedOption)
                            }}
                            classNamePrefix="custom-select"
                          />
                        )}
                      />
                    </div> */}
                  <FormControlLabel {...Bank_register("isCurrency")}  control={<Checkbox defaultChecked={Bank_getValues('isCurrency')}/>} label="حساب ارزی" style={{width:'25rem'}}/>
                  </div>
                </Grid>
                <Grid item xs={12} sm={5}>
                  <div className='Field_Container'>
                    <label>شماره حساب</label>
                    <input type='number' {...Bank_register("accountNumber", { required: false })} placeholder={''}/>   
                    {Bank_errors.accountNumber && <div className='field_error'>شماره حساب را وارد کنید.</div>}
                  </div>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <div className='Field_Container' style={{width:'98%'}}>
                    <label>شماره شبا</label>
                    <input type='number' {...Bank_register("shabaNumber", { required: false })} placeholder={''}/>   
                    {Bank_errors.shabaNumber && <div className='field_error'>شماره شبا را وارد کنید.</div>}
                  </div>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <div style={{display:'flex'}}>
                    <div className='Field_Container' style={{width:'99%'}}>
                      <label>شماره کارت</label>
                      <input type='number' {...Bank_register("cardNumber", { required: false })} placeholder={''}/>   
                      {Bank_errors.cardNumber && <div className='field_error'>شماره کارت را وارد کنید.</div>}
                    </div>
                    <div style={{display:'flex'}}>
                      <div className='form_AddIcon'>
                        <IoIosAddCircleOutline className=' color-success' onClick={Bank_handleSubmit(Bank_onSubmitProject)}/>
                      </div>
                    </div>
                  </div>

                </Grid>
              </Grid>
            }
            <TableContainer component={Paper} className='table_Mui'>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    {/* <TableCell>بانک</TableCell> */}
                    <TableCell>شعبه</TableCell>
                    <TableCell>حساب ارزی</TableCell>
                    <TableCell>شماره حساب</TableCell>
                    <TableCell>شماره شبا</TableCell>
                    <TableCell>شماره کارت</TableCell>
                    <TableCell style={{textAlign:'center'}}>عملیات</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Bank_List?.map((row:any,index:any) => (
                    <TableRow
                      key={row.name}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      {/* <TableCell>{row?.bankId?.name}</TableCell> */}
                      <TableCell>{row?.branchName}</TableCell>
                      <TableCell>{row?.isCurrency? <CheckCircleIcon/>: <CancelIcon/>}</TableCell>
                      <TableCell>{row?.accountNumber}</TableCell>
                      <TableCell>{row?.shabaNumber}</TableCell>
                      <TableCell>{row?.cardNumber}</TableCell>
                      <TableCell style={{textAlign:'center'}}>
                        <Tooltip title="حذف" componentsProps={{ tooltip: { className: 'tooltip-danger' } }}>
                          <span onClick={()=>{DeleteRow('Bank_List',index)}}><DeleteIcon className='badge bg-danger' ></DeleteIcon> </span>
                        </Tooltip>
                        </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </form>
        }
        { value == 1 && 
          <form autoComplete="off" className='CustomerForm_TabBody'>
            { formType != 'Info'&& 
              <Grid container>
                <Grid item xs={12} sm={12}>
                  <div style={{display:'flex',alignItems:'center'}}>
                    <div className='Field_Container'>
                      <label className="label">نوع آدرس</label>
                      <Controller
                        name="addressTypeId"
                        rules={{ required: true }}
                        control={address_control}
                        defaultValue={null}
                        render={({ field }) => (
                          <Select
                            placeholder=''
                            {...field}
                            isClearable
                            options={addresstype_List}
                            getOptionLabel={(option) =>  option.name  || ''}
                            onChange={(selectedOption) => {
                              field.onChange(selectedOption)
                            }}
                            classNamePrefix="custom-select"
                          />
                        )}
                      />
                      {address_errors.addressTypeId && <div className='field_error'>نوع آدرس را وارد کنید.</div>}
                    </div>
                    <div className='Field_Container'>
                      <label>آدرس</label>
                      <input  {...address_register("addressLine", { required: true })} placeholder={''}/>   
                      {address_errors.addressLine && <div className='field_error'>آدرس را وارد کنید.</div>}
                    </div>
                    <div className='Field_Container'>
                      <label>کد پستی</label>
                      <input type='number'  {...address_register("zipCode", { required: false })} placeholder={''}/>   
                      {address_errors.zipCode && <div className='field_error'>کدپستی را وارد کنید.</div>}
                    </div>
                    <div className='form_AddIcon'>
                      <IoIosAddCircleOutline className=' color-success' onClick={address_handleSubmit(address_onSubmitProject)}/>
                    </div>
                  </div>
                </Grid>
              </Grid>
            }
            <TableContainer component={Paper} className='table_Mui'>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>نوع آدرس</TableCell>
                    <TableCell>آدرس</TableCell>
                    <TableCell>کد پستی</TableCell>
                    <TableCell style={{textAlign:'center'}}>عملیات</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {address_List?.map((row:any,index:any) => (
                    <TableRow
                      key={row?.name}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell>{row?.addressTypeId?.name}</TableCell>
                      <TableCell>{row?.addressLine}</TableCell>
                      <TableCell>{row?.zipCode}</TableCell>
                      <TableCell style={{textAlign:'center'}}>
                        <Tooltip title="حذف" componentsProps={{ tooltip: { className: 'tooltip-danger' } }}>
                          <span onClick={()=>{DeleteRow('address_List',index)}}><DeleteIcon className='badge bg-danger' ></DeleteIcon> </span>
                        </Tooltip>
                        </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </form>
        }
        { value == 2 && 
          <form autoComplete="off" className='CustomerForm_TabBody'>
          { formType != 'Info'&& 
            <Grid container>
              <Grid item xs={12} sm={12}>
                <div style={{display:'flex'}}>
                  <div className='Field_Container'>
                    <label className="label">نوع اعتبار</label>
                    <Controller
                      name="creditTypeId"
                      rules={{ required: true }}
                      control={credit_control}
                      defaultValue={null}
                      render={({ field }) => (
                        <Select
                          placeholder=''
                          {...field}
                          isClearable
                          options={addresstype_List}
                          getOptionLabel={(option) =>  option.name  || ''}
                          onChange={(selectedOption) => {
                            field.onChange(selectedOption)
                          }}
                          classNamePrefix="custom-select"
                        />
                      )}
                    />
                    {credit_errors.creditTypeId && <div className='field_error'>نوع اعتبار را وارد کنید.</div>}
                  </div>
                  <div className='Field_Container'>
                    <label>مقدار</label>
                    <input  {...credit_register("amount", { required: true })} placeholder={''}/>   
                    {credit_errors.amount && <div className='field_error'>مقدار را وارد کنید.</div>}
                  </div>
                  <div className='form_AddIcon'>
                    <IoIosAddCircleOutline className=' color-success' onClick={credit_handleSubmit(credit_onSubmitProject)}/>
                  </div>
                </div>
              </Grid>
            </Grid>
          }
          <TableContainer component={Paper} className='table_Mui'>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>نوع اعتبار</TableCell>
                  <TableCell>مقدار</TableCell>
                  <TableCell style={{textAlign:'center'}}>عملیات</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {credit_List?.map((row:any,index:any) => (
                  <TableRow
                    key={row?.name}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell>{row?.creditTypeId?.name}</TableCell>
                    <TableCell>{row?.amount}</TableCell>
                    <TableCell style={{textAlign:'center'}}>
                      <Tooltip title="حذف" componentsProps={{ tooltip: { className: 'tooltip-danger' } }}>
                        <span onClick={()=>{DeleteRow('credit_List',index)}}><DeleteIcon className='badge bg-danger' ></DeleteIcon> </span>
                      </Tooltip>
                      </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </form>
        }
        { value == 3 && 
          <form className='CustomerForm_TabBody' autoComplete="off">
            { formType != 'Info'&&
              <Grid container>
                <Grid item xs={12} sm={12}>
                  <div style={{display:'flex'}}>
                    <div className='Field_Container'>
                      <label>اسناد ضمانتی</label>
                      <input  {...guarantee_register("name", { required: true })} placeholder={''}/>   
                      {guarantee_errors.name && <div className='field_error'>اسناد ضمانتی را وارد کنید.</div>}
                    </div>
                    <div className='Field_Container'>
                      <label className="label">نوع وثیقه</label>
                      <Controller
                        name="guaranteeTypeId"
                        rules={{ required: true }}
                        control={guarantee_control}
                        defaultValue={null}
                        render={({ field }) => (
                          <Select
                            placeholder=''
                            {...field}
                            isClearable
                            options={guaranteetype_List}
                            getOptionLabel={(option) =>  option.name  || ''}
                            onChange={(selectedOption) => {
                              field.onChange(selectedOption)
                            }}
                            classNamePrefix="custom-select"
                          />
                        )}
                      />
                      {guarantee_errors.guaranteeTypeId && <div className='field_error'>نوع وثیقه را وارد کنید.</div>}
                    </div>
                    <div className='Field_Container'>
                      <label>مقدار وثیقه</label>
                      <input  {...guarantee_register("amount", { required: true })} placeholder={''}/>   
                      {guarantee_errors.amount && <div className='field_error'>مقدار را وارد کنید.</div>}
                    </div>
                    <div className='form_AddIcon'>
                      <IoIosAddCircleOutline className=' color-success' onClick={guarantee_handleSubmit(guarantee_onSubmitProject)}/>
                    </div>
                  </div>
                </Grid>
                <Grid xs={12} sm={12}>

                  <div style={{display:'flex'}}>
                  { FileAddresses &&
                      FileAddresses?.map((Url:any)=>{
                        return(
                          <Button
                            component="label"
                            className='UploadImageButton'>
                            { 
                              <img src={Get_fileUrl(Url)} style={{width:'5rem'}}/>
                            }
                          </Button>
                        )
                      })
                    }
                    <Button
                      component="label"
                      className='UploadImageButton'>
                      { 
                        ImageAddressLoading ? <CircularProgress/>:
                        // ImageAddress ? <img src={ImageAddress} style={{width:'5rem'}}/> :
                          <div className='UploadImageButtonIcon'>
                            <FaFileArrowUp />
                          </div>
                      }
                      <input onChange={(event:any)=>{handle_multiUploadFile(event)}}
                        type="file"
                        multiple
                        hidden
                      />
                    </Button>
                  </div>
                </Grid>
              </Grid>
            }
            <TableContainer component={Paper} className='table_Mui' style={{marginBottom:'1rem'}}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>اسناد ضمانتی</TableCell>
                    <TableCell>نوع وثیقه</TableCell>
                    <TableCell>مقدار وثیقه</TableCell>
                    <TableCell>عکس ها</TableCell>
                    <TableCell style={{textAlign:'center'}}>عملیات</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {guarantee_List?.map((row:any,index:any) => (
                    <TableRow
                      key={row?.name}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell>{row?.name}</TableCell>
                      <TableCell>{row?.guaranteeTypeId?.name}</TableCell>
                      <TableCell>{row?.amount}</TableCell>
                      <TableCell style={{display:'flex',alignItems:'center'}}>{row?.FileAddresses?.length} 
                        <Tooltip style={{margin:"0 .3rem"}} title="نمایش فایل ها" componentsProps={{ tooltip: { className: 'tooltip-info' } }}>
                          <span onClick={()=>{setDialogOpen(true)}}><IoEyeSharp className='badge bg-info' ></IoEyeSharp> </span>
                        </Tooltip>
                      </TableCell>
                      <TableCell style={{textAlign:'center'}}>
                        <Tooltip title="حذف" componentsProps={{ tooltip: { className: 'tooltip-danger' } }}>
                          <span onClick={()=>{DeleteRow('guarantee_List',index)}}><DeleteIcon className='badge bg-danger' ></DeleteIcon> </span>
                        </Tooltip>
                      </TableCell>
                      <CustomDialog
                          key={row?.name + index}
                          isOpen={DialogOpen}
                          onClose={handleClose}
                          modalTitle={"نمایش فایل ها"}
                          OptionalComponent={Show_FileAddresses}
                          // onSave={handleSave}
                          minHeight='15rem'
                          minWidth='30rem'
                          handleModalClick={() => console.log('Modal clicked')}
                          index={1000}
                          componentProps = {{FileAddresses:row?.FileAddresses}}
                      />
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <div>
                <label>توضیحات</label>
                <Textarea readOnly={formType == 'Info'} minRows={3} {...Modal_register("description", { required: false })} placeholder={''} ref={(el) => {Modal_register("description").ref(el);(inputRefs.current['description'] = el)}}  onKeyDown={(e) => handleKeyDown(e, 'Confirm')}/>
                {/* {errors.password && <div className='field_error'>پسورد خود را وارد نمایید.</div>} */}
              </div>
          </form>
        }
        {/* { value == 4 && 
          <div className='CustomerForm_TabBody'>
            <Grid container>
              <Grid item xs={12} sm={12}>
                <div style={{display:'flex'}}>
                  
                  <div className='form_AddIcon'>
                    <IoIosAddCircleOutline className=' color-success' />
                  </div>
                </div>
              </Grid>
            </Grid>
          </div>
        } */}
         { value == 5 && 
          <form autoComplete="off" className='CustomerForm_TabBody'>
            { formType != 'Info'&&
              <Grid container>
                <Grid item xs={12} sm={12}>
                  <div style={{display:'flex'}}>
                    <div className='Field_Container'>
                      <label className="label">نوع تماس</label>
                      <Controller
                        name="phoneNumberTypeId"
                        rules={{ required: true }}
                        control={phoneNumber_control}
                        defaultValue={null}
                        render={({ field }) => (
                          <Select
                            placeholder=''
                            {...field}
                            isClearable
                            options={phonenumbertype_List}
                            getOptionLabel={(option) =>  option.name  || ''}
                            onChange={(selectedOption) => {
                              field.onChange(selectedOption)
                            }}
                            classNamePrefix="custom-select"
                          />
                        )}
                      />
                      {phoneNumber_errors.phoneNumberTypeId && <div className='field_error'>نوع تماس را وارد کنید.</div>}
                    </div>
                    <div className='Field_Container'>
                      <label>شماره</label>
                      <input type='number' {...phoneNumber_register("number", { required: true })} placeholder={''}/>   
                      {phoneNumber_errors.number && <div className='field_error'>شماره را وارد کنید.</div>}
                    </div>
                    <div style={{display:'flex'}}>
                      <div className='form_AddIcon'>
                        <IoIosAddCircleOutline className=' color-success' onClick={phoneNumber_handleSubmit(phoneNumber_onSubmitProject)}/>
                      </div>
                    </div>
                  </div>
                </Grid>
              </Grid>
            }
            <TableContainer component={Paper} className='table_Mui'>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>نوع تماس</TableCell>
                    <TableCell>شماره</TableCell>
                    <TableCell style={{textAlign:'center'}}>عملیات</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {phoneNumber_List?.map((row:any,index:any) => (
                    <TableRow
                      key={row.name}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell>{row?.phoneNumberTypeId?.name}</TableCell>
                      <TableCell>{row?.number}</TableCell>
                      <TableCell style={{textAlign:'center'}}>
                        <Tooltip title="حذف" componentsProps={{ tooltip: { className: 'tooltip-danger' } }}>
                          <span onClick={()=>{DeleteRow('phoneNumber_List',index)}}><DeleteIcon className='badge bg-danger' ></DeleteIcon> </span>
                        </Tooltip>
                        </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </form>
        }
        { value == 6 && 
          <form autoComplete="off" className='CustomerForm_TabBody'>
            { formType != 'Info'&&
              <Grid container>
                <Grid item xs={12} sm={12}>
                  <div style={{display:'flex'}}>
                    <div className='Field_Container'>
                      <label className="label">نوع مناسبت</label>
                      <Controller
                        name="appDateTypeId"
                        rules={{ required: true }}
                        control={date_control}
                        defaultValue={null}
                        render={({ field }) => (
                          <Select
                            placeholder=''
                            {...field}
                            isClearable
                            options={appdatetype_List}
                            getOptionLabel={(option) =>  option.name  || ''}
                            onChange={(selectedOption) => {
                              field.onChange(selectedOption)
                            }}
                            classNamePrefix="custom-select"
                          />
                        )}
                      />
                      {date_errors.appDateTypeId && <div className='field_error'>نوع مناسبت را وارد کنید.</div>}
                    </div>
                    <div className='Field_Container'>
                      <label>تاریخ</label>
                      {/* <input type='number' {...date_register("date", { required: false })} placeholder={''}/>    */}
                      <DatePicker className='custom-datePicker' {...date_register("date" , { required: true }) } position={'center'}  onChange={(e:any) => date_setValue("date",(e.value))} />
                      {date_errors.date && <div className='field_error'>تاریخ را وارد کنید.</div>}
                    </div>
                    <div style={{display:'flex'}}>
                      <div className='form_AddIcon'>
                        <IoIosAddCircleOutline className=' color-success' onClick={date_handleSubmit(date_onSubmitProject)}/>
                      </div>
                    </div>
                  </div>
                </Grid>
              </Grid>
            }
            <TableContainer component={Paper} className='table_Mui'>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>نوع مناسبت</TableCell>
                    <TableCell>تاریخ</TableCell>
                    <TableCell style={{textAlign:'center'}}>عملیات</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {date_List?.map((row:any,index:any) => (
                    <TableRow
                      key={row.name}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell>{row?.appDateTypeId?.name}</TableCell>
                      <TableCell>{moment(row?.date).locale('fa').format('YYYY/MM/DD')}</TableCell>
                      <TableCell style={{textAlign:'center'}}>
                        <Tooltip title="حذف" componentsProps={{ tooltip: { className: 'tooltip-danger' } }}>
                          <span onClick={()=>{DeleteRow('date_List',index)}}><DeleteIcon className='badge bg-danger' ></DeleteIcon> </span>
                        </Tooltip>
                        </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </form>
        }
      </div>
      { formType != 'Info'&&
        <div className='buttonSubmit_container'>
          <Button disabled={SubmitLoading} ref={(el) => {(inputRefs.current['Confirm'] = el)}} variant="contained" className='button_submit' onClick={Modal_handleSubmit(onSubmitProject)} endIcon={<IoIosCheckmarkCircleOutline/>}>
              تایید
              {SubmitLoading && (<CircularProgress className='SubmitLoading'/>)}
          </Button> 
          <Button ref={(el) => {(inputRefs.current['Cancel'] = el)}} variant="contained" className='button_cancel' style={{marginRight:'.5rem'}} onClick={()=>onSave({close:true})} endIcon={<AiOutlineCloseCircle/>}>
              انصراف
          </Button> 
        </div>
      }

    </div>
  )
}

export default CustomerForm;

function Show_FileAddresses({FileAddresses}:any){
  return(
    <div style={{display:'flex'}}>
      { FileAddresses &&
          FileAddresses?.map((Url:any)=>{
            return(
              <Button
                component="label"
                className='UploadImageButton'>
                { 
                  <img src={Get_fileUrl(Url)} style={{width:'5rem'}}/>
                }
              </Button>
            )
          })
        }
    </div>
  )
}