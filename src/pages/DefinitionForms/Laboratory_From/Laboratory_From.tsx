
import './Laboratory_From.scss';
import React, { useContext, useEffect, useRef } from 'react';
import { Box, Button, Checkbox, CircularProgress, FormControl, FormControlLabel, MenuItem, Tab, Tabs, Tooltip } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import Grid from '@mui/material/Grid';
import apiService from '../../../services/api';
import { GlobalContext } from '../../../contexts/NotifContext';


function Laboratory_Form({onSave,selectRow,formType}:any){

  /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ State Variables ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
  const [SubmitLoading, setSubmitLoading] = React.useState(false);
  const [MenuOpen, setMenuOpen] = React.useState('');

  const { control: Modal_control,handleSubmit:Modal_handleSubmit, register : Modal_register,reset:Modal_reset,getValues:Modal_getValues,setValue:Modal_setValue,formState: { errors : Modal_errors }} = useForm();
  
  /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ useEffect Hooks ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
  useEffect(() => { 
    if(selectRow && formType=='Edit'){
      // apiService.Get_LaboratoryGetById(selectRow?.id)
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

  }
  function Set_AllData(selectRow:any){
    Modal_setValue('name',selectRow?.name)
    Modal_setValue('code',selectRow?.code)
    Modal_setValue('managerName',selectRow?.managerName)
    Modal_setValue('phoneNumber',selectRow?.phoneNumber)
    Modal_setValue('address',selectRow?.address)
  }

  /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Render Functions ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
   function GeneratedCode(){
    apiService.GeneratedCode_Laboratory()
    .then((response:any) => {
      Modal_setValue('code',response?.data)
    })
  }

  function onSubmitProject(e:any){
    setSubmitLoading(true)
    console.log(Modal_getValues());
  
    let data :any = {
      "name": Modal_getValues('name'),
      "code": Modal_getValues('code'),
      "managerName": Modal_getValues('managerName'),
      "phoneNumber": Modal_getValues('phoneNumber'),  
      "address": Modal_getValues('address'),
    }
    console.log(data);
    if(formType=='Edit'){
      data.id = selectRow?.id
      apiService.Edit_Laboratory(data)        
      .then((response:any) => {
        
        setOpenNotification({open:true,type:'success',message:'با موفقیت ویرایش شد.'})
        onSave({close:true})
        setSubmitLoading(false)
        
      })
      .catch((error:any) => {
        console.log(error);
        setSubmitLoading(false)
        setOpenNotification({open:true,type:'error',message:''})
      });
    }else{
      apiService.Create_Laboratory(data)        
      .then((response:any) => {
        console.log(response?.data?.isSuccessful);
        if(response?.data?.isSuccessful){
          setOpenNotification({open:true,type:'success',message:`آزمایشگاه ${Modal_getValues('name')} با کد ${Modal_getValues('code')} تایید شد.`})
          onSave()        
          handleFocus('name')
          Modal_reset({name:'',code:'',managerName:'',phoneNumber:'',address:''})
          GeneratedCode()
          handleFocus('fullName')
          setSubmitLoading(false)
        }else{
          setSubmitLoading(false)
          setOpenNotification({open:true,type:'error',message:response?.data?.getMessageText[0]})
        }
      })
      .catch((error:any) => {
        console.log(error);
        setSubmitLoading(false)
        setOpenNotification({open:true,type:'error',message:''})
      });
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
    <div className="Laboratory_Form">
      <div className='react_hook_form'   >
        <form style={{display:'flex',justifyContent:'space-between',padding:'.5rem'}} autoComplete="off" >
        
          <Grid>
            <Grid item xs={12} sm={6}>
            <div style={{display:'flex'}}>
                <div className='Field_Container' style={{width:'10rem'}}>
                  <label>کد</label>
                  <input disabled type='number'  {...Modal_register("code", { required: false })} placeholder={''} ref={(el) => {Modal_register("code").ref(el);(inputRefs.current['code'] = el)}}  onKeyDown={(e) => handleKeyDown(e, 'managerName')}/>   
                  {Modal_errors.code && <div className='field_error'>کد را وارد کنید.</div>}
                </div>
                <div className='Field_Container'>
                  <label>نام *</label>
                  <input type='text'  {...Modal_register("name", { required: true })} placeholder={''} ref={(el) => {Modal_register("name").ref(el);(inputRefs.current['name'] = el)}}  onKeyDown={(e) => handleKeyDown(e, 'managerName')}/>   
                  {Modal_errors.name && <div className='field_error'> نام را وارد کنید.</div>}
                </div>
                <div className='Field_Container'>
                  <label>نام مدیر</label>
                  <input type='text'  {...Modal_register("managerName", { required: false })} placeholder={''} ref={(el) => {Modal_register("managerName").ref(el);(inputRefs.current['managerName'] = el)}}  onKeyDown={(e) => handleKeyDown(e, 'phoneNumber',false)}/>   
                  {Modal_errors.managerName && <div className='field_error'> نام مدیر را وارد کنید.</div>}
                </div>
                <div className='Field_Container'>
                  <label>شماره تماس</label>
                  <input type='number'  {...Modal_register("phoneNumber", { required: false })} placeholder={''} ref={(el) => {Modal_register("phoneNumber").ref(el);(inputRefs.current['phoneNumber'] = el)}}  onKeyDown={(e) => handleKeyDown(e, 'address',false)}/>   
                  {Modal_errors.phoneNumber && <div className='field_error'> شماره تماس را وارد کنید.</div>}
                </div>
              </div>
            </Grid>
            <Grid item xs={12} sm={6}>
              <div style={{display:'flex'}}>
                <div className='Field_Container'>
                  <label>آدرس</label>
                  <input type='text'  {...Modal_register("address", { required: false })} placeholder={''} ref={(el) => {Modal_register("address").ref(el);(inputRefs.current['address'] = el)}}  onKeyDown={(e) => handleKeyDown(e, 'Confirm',false)}/>   
                  {Modal_errors.address && <div className='field_error'> آدرس را وارد کنید.</div>}
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

export default Laboratory_Form;
