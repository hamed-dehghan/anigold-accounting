
import './CustomerType_Form.scss';
import React, { useContext, useEffect, useRef } from 'react';
import { Box, Button, Checkbox, CircularProgress, FormControl, FormControlLabel, MenuItem, Tab, Tabs, Tooltip } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import Grid from '@mui/material/Grid';
import apiService from '../../../services/api';
import { GlobalContext } from '../../../contexts/NotifContext';


function CustomerType_Form({onSave,selectRow,formType}:any){

  /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ State Variables ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
  const [SubmitLoading, setSubmitLoading] = React.useState(false);
  const [MenuOpen, setMenuOpen] = React.useState('');

  const { control: Modal_control,handleSubmit:Modal_handleSubmit, register : Modal_register,reset:Modal_reset,getValues:Modal_getValues,setValue:Modal_setValue,formState: { errors : Modal_errors }} = useForm();
  
  /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ useEffect Hooks ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
  useEffect(() => { 
    if(selectRow && formType=='Edit'){
      // apiService.Get_CustomerTypeGetById(selectRow?.id)
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
      Get_AllData()
      GeneratedCode()
    }


  }, []);
  function Get_AllData(){

  }
  function Set_AllData(selectRow:any){
    Modal_setValue('name',selectRow?.name)
    Modal_setValue('code',selectRow?.code)
  }

  /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Render Functions ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

  function GeneratedCode(){
    apiService.GeneratedCode_CustomerType()
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
    }
    console.log(data);
    if(formType=='Edit'){
      data.id = selectRow?.id
      apiService.Edit_CustomerType(data)        
      .then((response:any) => {
        if(response?.data?.isSuccessful){
          setOpenNotification({open:true,type:'success',object:{messageType:'update',name:'منطقه',nameValue:Modal_getValues('name'),code:Modal_getValues('code')}})
          onSave({close:true})
          setSubmitLoading(false)
        }else{
          setOpenNotification({open:true,type:'error',message:response?.data?.getMessageText[0]})
        }
      })
      .catch((error:any) => {
        console.log(error);
        setOpenNotification({open:true,type:'error',message:error?.data?.getMessageText[0]})
      }).finally(()=>{ setSubmitLoading(false)});
    }else{
      apiService.Create_CustomerType(data)        
      .then((response:any) => {
        console.log(response?.data?.isSuccessful);
        if(response?.data?.isSuccessful){
          setOpenNotification({open:true,type:'success',object:{messageType:'create',name:'نوع مشتری',nameValue:Modal_getValues('name'),code:Modal_getValues('code')}})
          onSave()
          handleFocus('name')
          Modal_reset({name:'',code:''})
          GeneratedCode()
        }else{
          setOpenNotification({open:true,type:'error',message:response?.data?.getMessageText[0]})
        }
      })
      .catch((error:any) => {
        console.log(error);
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
    <div className="CustomerType_Form">
      <div className='react_hook_form'   >
        <form autoComplete="off" style={{display:'flex',justifyContent:'space-between',padding:'.5rem'}}>
            <div style={{display:'flex'}}>
              <div className='Field_Container' style={{width:'10rem'}}>
                <label>کد</label>
                <input disabled type='number'  {...Modal_register("code", { required: false })} placeholder={''} ref={(el) => {Modal_register("code").ref(el);(inputRefs.current['code'] = el)}}  onKeyDown={(e) => handleKeyDown(e, 'name')}/>   
                {Modal_errors.code && <div className='field_error'>کد را وارد کنید.</div>}
              </div>
              <div className='Field_Container'>
                <label>نام *</label>
                <input type='text'  {...Modal_register("name", { required: true })} placeholder={''} ref={(el) => {Modal_register("name").ref(el);(inputRefs.current['name'] = el)}}  onKeyDown={(e) => handleKeyDown(e, 'Confirm')}/>   
                {Modal_errors.name && <div className='field_error'> نام را وارد کنید.</div>}
              </div>
            </div>
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

export default CustomerType_Form;
