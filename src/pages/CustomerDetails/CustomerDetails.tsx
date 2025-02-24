import React, { FC } from 'react';
import './CustomerDetails.scss';
import { FaUserTie } from 'react-icons/fa';
import { Get_fileUrl } from '../../services/api';

function CustomerDetails({Customer}:any){
  // console.log(Customer,'Customer====');
  
  return(
    <div className="CustomerDetails">
      { Customer?.id ? 
        <div className="customer-container">
          <div className='UploadImageButtonIcon'>
          {
            Customer.fileCode ? <img style={{width:'100%',height:'100%',borderRadius:'50%'}} src={Get_fileUrl(Customer?.fileCode)} alt="Image"></img> :<FaUserTie />
          }
            
          </div>
          {/* <img src="data:image/jpeg;base64,qMpWSRPIMG10tRWnIY+P2pUjiQ/EkHvsLUTHGQIRZZUodTwMZm58TeNtp/Z6kXb1" alt="Image"></img>
          <img src="data:image/png;base64,pKTMW1QnBfpmc+Xa9ziNhbEAwJYqcI3I/VIrraCuNiz+JyiRZYyo9swAjQgKov3+" alt="Image"></img> */}
          <div><strong>نام و نام خانوادگی:</strong> {Customer.fullName}</div>
          <div><strong>کد:</strong> {Customer.code}</div>
          <div><strong>نوع مشتری:</strong> {Customer.customerTypeName}</div>
          <div><strong> منطقه:</strong> {Customer.zoneName}</div>
          <div><strong> شماره موبایل:</strong> {Customer.phoneNumber}</div>
          <div><strong> نام واحد صنفی:</strong> {Customer.storeName}</div>

          {/* <div><strong>کد ملی:</strong> {Customer.nationalCode}</div> */}
          {/* <div><strong>معرف:</strong> {Customer.referral}</div> */}
          {/* <div><strong> نوع مشتری:</strong> {Customer.customerTypeName}</div> */}
          {/* <div><strong>توضیحات:</strong> {Customer.description || "ناموجود"}</div> */}
          {/* <div><strong>کد فایل:</strong> {Customer.fileCode || "ناموجود"}</div> */}
          {/* <div><strong>شناسه:</strong> {Customer.id}</div> */}
        </div> : ''
      }
      
    </div>
  )
}

export default CustomerDetails;
