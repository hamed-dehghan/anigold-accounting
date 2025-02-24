
import './Stone_Form.scss';
import React, { useContext, useEffect, useRef } from 'react';
import { Box, Button, Checkbox, CircularProgress, FormControl, FormControlLabel, MenuItem, Tab, Tabs, Tooltip } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import Grid from '@mui/material/Grid';
import apiService, { Get_fileUrl } from '../../../services/api';
import { GlobalContext } from '../../../contexts/NotifContext';
import { MdInsertPhoto } from 'react-icons/md';
import { IoMdCloudUpload } from 'react-icons/io';


function Stone_Form({onSave,selectRow,formType}:any){

  /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ State Variables ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
  const [SubmitLoading, setSubmitLoading] = React.useState(false);
  const [MenuOpen, setMenuOpen] = React.useState('');

  const { control: Modal_control,handleSubmit:Modal_handleSubmit, register : Modal_register,reset:Modal_reset,getValues:Modal_getValues,setValue:Modal_setValue,formState: { errors : Modal_errors }} = useForm();
  
  /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ useEffect Hooks ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
  useEffect(() => { 
    if(selectRow && formType=='Edit'){
      // apiService.Get_StoneGetById(selectRow?.id)
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

      Get_AllData()
      GeneratedCode()
      
    }
    handleFocus('persianName')

  }, []);
  function Get_AllData(){

  }
  function Set_AllData(selectRow:any){
    Modal_setValue('code',selectRow?.code)
    Modal_setValue('persianName',selectRow?.persianName)
    Modal_setValue('englishName',selectRow?.englishName)
    Modal_setValue('fileCode',selectRow?.fileCode)
    setImageAddress(selectRow?.fileCode)
  }

  /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Render Functions ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
 
  function GeneratedCode(){
    apiService.GeneratedCode_stonetype()
    .then((response:any) => {
      Modal_setValue('code',response?.data)
    })
  }

  function onSubmitProject(e:any){
    setSubmitLoading(true)
    console.log(Modal_getValues());
  
    let data :any = {
      "code": Modal_getValues('code'),
      "persianName": Modal_getValues('persianName'),
      "englishName": Modal_getValues('englishName'),
      "fileCode": Modal_getValues('fileCode')
    }
    console.log(data);
    if(formType=='Edit'){
      data.id = selectRow?.id
      apiService.Edit_StoneType(data)        
      .then((response:any) => {
        if(response?.data?.isSuccessful){
          setOpenNotification({open:true,type:'success',object:{messageType:'update',name:'سنگ',nameValue:Modal_getValues('persianName'),code:Modal_getValues('code')}})
          onSave({close:true})
        }else{
          setOpenNotification({open:true,type:'error',message:response?.data?.getMessageText[0]})
        }
      })
      .catch((error:any) => {
        setOpenNotification({open:true,type:'error',message:error?.data?.getMessageText[0]})
      }).finally(()=>{ setSubmitLoading(false)});
    }else{
      apiService.Create_StoneType(data)        
      .then((response:any) => {
        console.log(response?.data?.isSuccessful);
        if(response?.data?.isSuccessful){
          setOpenNotification({open:true,type:'success',object:{messageType:'create',name:'سنگ',nameValue:Modal_getValues('persianName'),code:Modal_getValues('code')}})
          onSave()        
          handleFocus('persianName')
          Modal_reset({persianName:'',englishName:'',code:''})
          setImageAddress(null)
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
  const [ImageAddress, setImageAddress] :any[] = React.useState();
  const [ImageAddressLoading, setImageAddressLoading] :any[] = React.useState(false);
  function handleChangeImage(event:any){
    console.log(event);
    
    setImageAddressLoading(true)
    let selectedFile = event.target.files[0]
    
    const formData = new FormData();
    formData.append("Content", selectedFile, selectedFile.name);

    apiService.Uploadfile(formData)      
    .then((response:any) => {
      console.log(response?.data?.data?.fileId);
      Modal_setValue('fileCode',response?.data?.data?.fileId)
      
      setImageAddressLoading(false)
      setOpenNotification({open:true,type:'success',message:'با موفقیت آپلود شد.'})
      setImageAddress(URL.createObjectURL(selectedFile))
      
    })
    .catch((error:any) => {
      setImageAddressLoading(false)
      setOpenNotification({open:true,type:'error',message:error?.data?.getMessageText[0]})
    });
  }
  return(
    <div className="Stone_Form">
      <div className='react_hook_form'   >
        <form autoComplete="off" style={{display:'flex',justifyContent:'space-between',padding:'.5rem'}}>
        <Grid container>
              <Grid item xs={12} sm={3} style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
                <div>
                  {/* <label>عکس</label> */}
                  <Button
                    component="label"
                    className='UploadImageButton'>
                    { 
                      ImageAddressLoading ? <CircularProgress/>:
                      ImageAddress ? <img  src={Get_fileUrl(ImageAddress)} style={{width:'100%',height:'100%'}}/> :
                        <div className='UploadImageButtonIcon'>
                          <IoMdCloudUpload  />
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
                  <div className='Field_Container' style={{width:'10rem'}}>
                    <label>کد</label>
                    <input disabled type='number'  {...Modal_register("code", { required: false })} placeholder={''} ref={(el) => {Modal_register("code").ref(el);(inputRefs.current['code'] = el)}}  onKeyDown={(e) => handleKeyDown(e, 'persianName')}/>   
                    {Modal_errors.code && <div className='field_error'>کد را وارد کنید.</div>}
                  </div>
                  <div className='Field_Container'>
                    <label>نام فارسی</label>
                    <input type='text'  {...Modal_register("persianName", { required: true })} placeholder={''} ref={(el) => {Modal_register("persianName").ref(el);(inputRefs.current['persianName'] = el)}}  onKeyDown={(e) => handleKeyDown(e, 'englishName')}/>   
                    {Modal_errors.persianName && <div className='field_error'> نام فارسی را وارد کنید.</div>}
                  </div>
                  <div className='Field_Container'>
                    <label>نام انگلیسی</label>
                    <input type='text'  {...Modal_register("englishName", { required: true })} placeholder={''} ref={(el) => {Modal_register("englishName").ref(el);(inputRefs.current['englishName'] = el)}}  onKeyDown={(e) => handleKeyDown(e, 'Confirm')}/>   
                    {Modal_errors.englishName && <div className='field_error'> نام انگلیسی را وارد کنید.</div>}
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

export default Stone_Form;
