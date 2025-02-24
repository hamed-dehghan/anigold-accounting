
import React, { useContext, useEffect, useRef, useState } from 'react';

import './UploadFile.scss';
import { GlobalContext } from '../../contexts/NotifContext';
import ConfirmationDialog from '../confirmationDialog/ConfirmationDialog';
import { Messages } from '../../utils/messages';


function UploadFiles(
  {parentCallback,attachments}:any
){
  const [Attachments, setAttachments] :any = React.useState(attachments || []);
  const fileInputRef :any = useRef(null);
  // const { openNotification, setOpenNotification } = useContext(GlobalContext);

  const ConfirmationCallback = (childData:any) => {
    console.log(childData)
    if(childData.Confirm == true){
      setAttachments(Attachments.splice(childData.Id, 1))
    }  
    setAttachments([...Attachments])
  };

  async function uploadFile(){
    const fileInput :any = document.getElementById('fileInput');
    const file = fileInput.files[0];
    function updateProgress(progressPercentage:any) {
      progressBar.style.width = progressPercentage + '%';
      progressBar.innerText = progressPercentage + '%';
    }
    let progressBar :any= document.getElementById('progressBar');
    updateProgress(0)

    
    
  }
  const [files, setFiles] :any = useState([]);
  // const [uploadProgress, setUploadProgress] = useState({});
  const handleFileChange = (event:any) => {
    uploadFile()
    // log(event.target.files);
    setFiles([...event.target.files]);
  };
  return(
    <div className="UploadFile">
      <div style={{marginBottom:'.5rem'}}>
        <label>آپلود فایل</label>
        {  Attachments.length !=0 &&
          <div style={{width:'100%',height:'3rem',display:'flex',flexWrap:'wrap',overflow:'auto'}}>
            {
              Attachments.map((attachment:any,index:any)=>{
                return(
                  <div className='UploadFile_Attachment'>
                    {/* {`فایل ${index + 1}`} */}
                    <ConfirmationDialog
                      Id = {index}
                      tooltip='حذف فایل'
                      parentCallback={(childData:any)=>{ConfirmationCallback(childData)}}
                      ButtonText='DeleteIcon'
                      OkButtonText='حذف'
                      CancelButtonText='انصراف'
                      Theme='danger'
                      Body= {Messages.deleteConfirmation}
                      Title= 'حذف فایل'
                    ></ConfirmationDialog>
                    <div style={{width:'auto'}}>{attachment?.files?.name || attachment?.name}</div>
                  </div>
                )
              })
            }
          </div>
        }
        <input className='UploadFile_Attachment'  ref={fileInputRef}  type="file" id="fileInput" onChange={handleFileChange}/>
        {/* <div onClick={uploadFile}>Upload</div> */}
        <div id="progressContainer">
            <div id="progressBar">0%</div>
        </div>
      </div>
    </div>
  )
}

export default UploadFiles;
