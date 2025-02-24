
import './Bankaccount_Form.scss';

import React, { useContext, useEffect, useRef } from 'react';
import { Box, Button, Checkbox, CircularProgress, FormControl, FormControlLabel, MenuItem, Tab, Tabs, Tooltip } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import Grid from '@mui/material/Grid';
import apiService from '../../../services/api';
import { GlobalContext } from '../../../contexts/NotifContext';
import Select from 'react-select'
import { IoIosAddCircleOutline } from 'react-icons/io';

function Bankaccount_Form({onSave,selectRow,formType}:any){

  /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ State Variables ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
  const [SubmitLoading, setSubmitLoading] = React.useState(false);
  const [MenuOpen, setMenuOpen] = React.useState('');
 const [allBank_List, setallBank_List] = React.useState([]);

  const { control: Modal_control,handleSubmit:Modal_handleSubmit, register : Modal_register,reset:Modal_reset,getValues:Modal_getValues,setValue:Modal_setValue,formState: { errors : Modal_errors }} = useForm();
  
  /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ useEffect Hooks ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
  useEffect(() => { 
    if(selectRow && formType=='Edit'){
      // apiService.Get_BankaccountGetById(selectRow?.id)
      // .then((response:any) => {
      //   selectRow = {...selectRow,...response.data.data}
      //   console.log('selectRow2',selectRow);
      //   Set_AllData(selectRow)
      //   Get_AllData()
      // })
      // .catch((error:any) => {
        
      // });
      Set_AllData(selectRow)
    }else{
      handleFocus('name')
      GeneratedCode()
      Get_AllData()
    }


  }, []);
  function Get_AllData(){
    Get_allBank()
  }
  function Set_AllData(selectRow:any){
    Modal_setValue('bankId',selectRow?.bankId)
    Modal_setValue('branchName',selectRow?.branchName)
    Modal_setValue('accountOwner',selectRow?.accountOwner)
    Modal_setValue('cardNumber',selectRow?.cardNumber)
    Modal_setValue('accountNumber',selectRow?.accountNumber)
    Modal_setValue('shabaNumber',selectRow?.shabaNumber)
    Modal_setValue('isCurrency',selectRow?.isCurrency)
    Get_AllData()
  }

  /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Render Functions ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
 
  function GeneratedCode(){
    // apiService.GeneratedCode_Bankaccount()
    // .then((response:any) => {
    //   Modal_setValue('code',response?.data)
    // })
  }
  function Get_allBank(){
    apiService.Get_allBank()
    .then((response:any) => {
      let List = response?.data?.data
      setallBank_List(List)
      Modal_setValue('bankId',List.find((option:any) => option.id == selectRow?.bankId))
    })

    
  }
  function onSubmitProject(e:any){
    setSubmitLoading(true)
    console.log(Modal_getValues());
  
    let data :any = {
      "bankId": Modal_getValues('bankId')?.id,
      "branchName": Modal_getValues('branchName'),
      "accountOwner": Modal_getValues('accountOwner'),
      "cardNumber": Modal_getValues('cardNumber'),
      "accountNumber": Modal_getValues('accountNumber'),
      "shabaNumber": Modal_getValues('shabaNumber'),
      "isCurrency": Modal_getValues('isCurrency'),
    }
    console.log(data);
    if(formType=='Edit'){
      data.id = selectRow?.bankAccountId
      console.log(data);
      apiService.Edit_Bankaccount(data)        
      .then((response:any) => {
        if(response?.data?.isSuccessful){
          setOpenNotification({open:true,type:'success',object:{messageType:'update',name:'بانک',nameValue:Modal_getValues('name'),code:Modal_getValues('code')}})
          onSave({close:true})
          setSubmitLoading(false)
        }else{
          setOpenNotification({open:true,type:'error',message:response?.data?.getMessageText[0]})
        }
      })
      .catch((error:any) => {
        console.log(error);
        setSubmitLoading(false)
        setOpenNotification({open:true,type:'error',message:error?.data?.getMessageText[0]})
      }).finally(()=>{ setSubmitLoading(false)});
    }else{
      apiService.Create_Bankaccount(data)        
      .then((response:any) => {
        console.log(response?.data?.isSuccessful);
        if(response?.data?.isSuccessful){
          setOpenNotification({open:true,type:'success',object:{messageType:'create',name:'بانک',nameValue:Modal_getValues('name'),code:Modal_getValues('code')}})
          onSave()        
          handleFocus('name')
          Modal_reset({name:'',code:'',branchName:'',accountOwner:'',cardNumber:'',accountNumber:'',isCurrency:'',shabaNumber:''})
          GeneratedCode()
          setSubmitLoading(false)
        }else{
          setSubmitLoading(false)
          setOpenNotification({open:true,type:'error',message:response?.data?.getMessageText[0]})
        }
      })
      .catch((error:any) => {
        console.log(error);
        setSubmitLoading(false)
        setOpenNotification({open:true,type:'error',message:error?.data?.getMessageText[0]})
      }).finally(()=>{ setSubmitLoading(false)});
    }

  }
  
  const { openNotification, setOpenNotification } = useContext(GlobalContext);

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

  return(
    <div className="Bankaccount_Form">
      <div className='react_hook_form'   >
        <form autoComplete="off" style={{display:'flex',justifyContent:'space-between',padding:'.5rem'}}>
          <Grid container>
            <Grid item xs={12} sm={12}>
              <div style={{display:'flex'}}>
                <div className='Field_Container'>
                  <label className="label">بانک</label>
                  <Controller
                    name="bankId"
                    rules={{ required: false }}
                    control={Modal_control}
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
                        }}
                        classNamePrefix="custom-select"
                      />
                    )}
                  />
                  {Modal_errors.bankId && <div className='field_error'>شماره کارت را وارد کنید.</div>}
                </div>
                <div className='Field_Container'>
                  <label>شعبه</label>
                  <input type='text' {...Modal_register("branchName", { required: false })} placeholder={''}/>   
                  {Modal_errors.branchName && <div className='field_error'>شعبه را وارد کنید.</div>}
                </div>
                <FormControlLabel {...Modal_register("isCurrency")}  control={<Checkbox defaultChecked={Modal_getValues('isCurrency')}/>} label="حساب ارزی" style={{width:'25rem'}}/>
              </div>
            </Grid>
            <Grid item xs={12} sm={12}>
              <div style={{display:'flex'}}>
                <div className='Field_Container'>
                  <label>نام صاحب حساب</label>
                  <input type='text' {...Modal_register("accountOwner", { required: false })} placeholder={''}/>   
                  {Modal_errors.accountOwner && <div className='field_error'>نام صاحب حساب را وارد کنید.</div>}
                </div>
                <div className='Field_Container'>
                  <label>شماره حساب</label>
                  <input type='number' {...Modal_register("accountNumber", { required: false })} placeholder={''}/>   
                  {Modal_errors.accountNumber && <div className='field_error'>شماره حساب را وارد کنید.</div>}
                </div>
              </div>
            </Grid>
            <Grid item xs={12} sm={6}>
              <div className='Field_Container' style={{width:'98%'}}>
                <label>شماره شبا</label>
                <input type='number' {...Modal_register("shabaNumber", { required: false })} placeholder={''}/>   
                {Modal_errors.shabaNumber && <div className='field_error'>شماره شبا را وارد کنید.</div>}
              </div>
            </Grid>
            <Grid item xs={12} sm={6}>
              <div style={{display:'flex'}}>
                <div className='Field_Container' style={{width:'99%'}}>
                  <label>شماره کارت</label>
                  <input type='number' {...Modal_register("cardNumber", { required: false })} placeholder={''}/>   
                  {Modal_errors.cardNumber && <div className='field_error'>شماره کارت را وارد کنید.</div>}
                </div>
              </div>
            </Grid>
          </Grid>
        </form>
      </div>
      <div className='buttonSubmit_container'>
        <Button disabled={SubmitLoading} ref={(el) => {(inputRefs.current['Confirm'] = el)}} variant="contained" className='button_submit' onClick={Modal_handleSubmit(onSubmitProject)}>
            تایید
            {SubmitLoading && (<CircularProgress className='SubmitLoading'/>)}
        </Button> 
        <Button ref={(el) => {(inputRefs.current['Cancel'] = el)}} variant="contained" className='button_cancel' style={{marginRight:'.5rem'}} onClick={()=>onSave({close:true})}>
            انصراف
        </Button> 
      </div>

    </div>
  )
}

export default Bankaccount_Form;
