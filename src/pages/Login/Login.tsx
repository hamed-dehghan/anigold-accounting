import React, { FC, useContext, useEffect, useState } from 'react';
import './Login.scss';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Button, Checkbox, CircularProgress, FormControl, MenuItem, Select } from '@mui/material';
import { green } from '@mui/material/colors';
import { redirect, useNavigate } from 'react-router-dom';
// import { getValue } from '@testing-library/user-event/dist/utils';
import { useUserData } from '../../contexts/UserContext';
import { GlobalContext } from '../../contexts/NotifContext';
import Loader from 'react-loaders';
import authService from '../../services/authService';
import { CiMobile3 } from "react-icons/ci";
import { IoCallOutline } from "react-icons/io5";
import { FaWhatsapp } from "react-icons/fa";
import { RiTelegramLine } from "react-icons/ri";
import { IoLogoInstagram } from "react-icons/io5";
import { updateClock } from '../../utils/Functions';
import { FaRegClock } from "react-icons/fa6";
import { MdOutlineDateRange } from "react-icons/md";
import { FaRegUserCircle } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
export default function Login(){
  
  const { openNotification, setOpenNotification } = useContext(GlobalContext);
  const [LoginLoading, setLoginLoading] = React.useState(false);
  const [Save, setSave] :any = React.useState(localStorage.getItem('SavePass') == 'true');

  const navigate = useNavigate(); 
  // const token = useSelector((state:any) => state.example.token);
  // const dispatch = useDispatch();
  const { UserData, setUserData } = useUserData();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<any>()
  React.useEffect(() => {
      if(localStorage.getItem('token'))navigate("/definitions/customers");
      
      setValue('username',localStorage.getItem('username'))
      setValue('password',localStorage.getItem('password'))
      if(localStorage.getItem('SavePass') == 'true'){
        setSave(true)
      }else{
        setSave(false)
      }
      // setSave(localStorage.getItem('SavePass'))
  }, []);
  const [clock, setClock] = useState({
    hours: '00',
    minutes: '00',
    seconds: '00',
    date:''
  });

  useEffect(() => {
      // Update the clock every second
      const intervalId = setInterval(() => {
          const updatedTime = updateClock();
          setClock(updatedTime);
      }, 1000);

      // Cleanup the interval on component unmount
      return () => clearInterval(intervalId);
  }, []);
  function handleClickSaveInformation(){

    if(Save){
      localStorage.setItem('SavePass','false')
    }else{
      localStorage.setItem('SavePass','true')
    }
    setSave(!Save)
  }
  const onSubmitPasswordLogin: SubmitHandler<any> = (data) => {
    setLoginLoading(true);
    if(Save){
      localStorage.setItem('username',getValues('username'))
      localStorage.setItem('password',getValues('password'))
    }else{
      localStorage.setItem('username','')
      localStorage.setItem('password','')
    }
    data = {
      "username": getValues('username'),
      "password": getValues('password'),
      "ipAddress":'string'
    }
    console.log(data);
    
    // setTimeout(() => {
    //   setLoginLoading(false);
    //   setOpenNotification({open:true,type:'success',message:'ورود شما با موفقیت انجام شد.'})
    //   navigate("/definitions/customers");
    // }, 1000);
    authService.login(data)
    .then((response:any) => {
      console.log(response);
      
      localStorage.setItem('token', response.data.data.token);
      // localStorage.setItem('is_superuser', response.data.is_superuser);
      // localStorage.setItem('username', response.data.data.fullName);
      // localStorage.setItem('email', response.data.email);

      setUserData(response.data)
      setLoginLoading(false);
      setOpenNotification({open:true,type:'success',message:'ورود شما با موفقیت انجام شد.'})
      navigate("/definitions/customers");
      location.reload()
    })
    .catch(error => {
    });
  }

  return(
    <div className="Login">
      <div className='Login-container'>
        
          <div className='login-form'>
            <div style={{display:'flex',justifyContent:'space-around'}}>
              <div style={{display:'flex',alignItems:'center'}}>
                <span style={{width:'3.8rem'}}>{clock?.hours}:{clock?.minutes}:{clock?.seconds} </span>
                <FaRegClock style={{color:'var(--yellow2)',fontSize:'1.5rem',marginRight:'.2rem',marginTop:'-.2rem'}}></FaRegClock> 
              </div>
              <div style={{display:'flex',alignItems:'center'}}>
                <span >{clock?.date} </span>
                <MdOutlineDateRange style={{color:'var(--yellow2)',fontSize:'1.7rem',marginRight:'.2rem',marginTop:'-.2rem'}}></MdOutlineDateRange>
              </div>
            </div>
            <div style={{display:'flex',flexDirection:'column'}}>
              <form onSubmit={handleSubmit(onSubmitPasswordLogin)} autoComplete="off" className='react_hook_form'>
                <div className='title'>ورود به سامانه</div>
                <div>
                  <label>نام کاربری</label>
                  <input  {...register("username", { required: true })} placeholder={''} />
                  {errors.username && <div className='field_error'>نام کاربری خود را وارد نمایید.</div>}
                </div>
                <div>
                  <label>رمز عبور</label>
                  <input type='password' {...register("password", { required: true })} placeholder={''}/>
                  {errors.password && <div className='field_error'>پسورد خود را وارد نمایید.</div>}
                </div>
                <div style={{width:"100%"}}>
                  <Button variant="contained" type='submit' className='button_submit'>
                    {!LoginLoading ? 'ورود' : (
                      <Loader active={true} type="ball-pulse"/>
                      )}
                  </Button> 
                </div>
              </form>
              <div style={{display:'flex',justifyContent:'space-between',marginTop:'2rem',width:'70%'}}>
                <div>فراموشی رمزعبور</div>
                <div>
                  ذخیره اطلاعات
                  <Checkbox
                    style={{
                      padding: "0",
                      borderRadius: ".5rem",
                    }}
                    defaultChecked={Save}
                    onClick={()=> handleClickSaveInformation()}
                  />
                </div>
              </div>
            </div>
            <div>

            </div>

          </div>
          <div className='login-information'>
            <div></div>
            <div style={{display:'flex',flexDirection:'column',alignItems:'center'}} className='login-information-box'>
              <div className='login-information-logo'></div>
              <div>یزد، بازار خان، سرای خام کهنه</div>
              <div>
                <span>0921232323</span>
                <span><CiMobile3 className='icon-color' style={{marginTop:'-.2rem'}}></CiMobile3></span>
              </div>
              <div>
                <span>025332445345</span>
                <span><IoCallOutline className='icon-color' style={{marginTop:'-.2rem'}}></IoCallOutline></span>
              </div>
              <div>
                <span><FaWhatsapp></FaWhatsapp></span>
                <span><RiTelegramLine></RiTelegramLine></span>
                <span><IoLogoInstagram></IoLogoInstagram></span>
              </div>
            </div>
          </div>
      </div>
    </div>
  )
}
