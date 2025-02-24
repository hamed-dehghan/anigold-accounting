
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import React, { useEffect, useRef } from 'react';
import { Button, Tooltip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
{/* <AiTwotoneDelete /> */}
import './confirmationDialog.scss'

import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import { AiFillDelete } from 'react-icons/ai';
const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
const theme :any = {
    'danger':{
        Color:'#F44336'
    },
    'success':{
      Color:'rgba(5, 193, 104, 0.7)!important'
  }
}
export default function ConfirmationDialog(
    {
        id,
        row,
        parentCallback,
        ButtonText='modal',
        OkButtonText='Confirm',
        CancelButtonText='انصراف',
        Theme,
        Title,
        Body,
        tooltip = ''
    }:any) {
      
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    setOpen(false)
  };
  useEffect(() => {

}, []);
setTimeout(() => {
  const deleteButton  = document.getElementById('deleteButton');
  if (deleteButton) {
    deleteButton.focus(); // Focus the button with id="deleteButton"
  }
}, 100);
  const Confirm = (data:any) => {
    if(ButtonText == 'DeleteIcon' && !data?.Confirm ){
      handleClose()
      return
    }
    console.log(data);
    
    data.id = id;
    data.row = row;
    parentCallback(
      data
    );
    setOpen(false)
  };
  return (
    <Tooltip title={tooltip} componentsProps={{ tooltip: { className: 'tooltip-'+Theme } }}>
      <span className='ConfirmationModal'>
        {ButtonText == 'DeleteIcon' ? <span onClick={handleOpen}><AiFillDelete  className='badge bg-danger'></AiFillDelete></span>:
        ButtonText == 'QuestionMarkIcon' ? <span onClick={handleOpen}><QuestionMarkIcon className='badge bg-success'></QuestionMarkIcon></span>:
        <Button style={{width:"100%",color:theme[Theme].Color}} onClick={handleOpen}>{ButtonText}</Button>}
        
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style} >
            <Typography id="modal-modal-title" variant="h6" component="h2">
              <div></div>
              {Title}
              <span onClick={handleClose} style={{cursor:'pointer'}}><CloseIcon></CloseIcon></span>
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              {Body}
            </Typography>
            <div className='Confirmation_buttons'>
              <Button onClick={()=> Confirm({Confirm:false})} className={ButtonText == 'DeleteIcon' ? 'bg-gray' : 'btn-danger'} style={{marginRight:'.5rem'}}>{CancelButtonText}</Button>
              <Button id="deleteButton" style={{color:theme[Theme].Color }} className={ButtonText == 'DeleteIcon' ? 'btn-danger' : 'btn-success'} onClick={()=>{Confirm({Confirm:true})}}>{OkButtonText}</Button>
            </div>
          </Box>
        </Modal>
      </span>
    </Tooltip>

  );
}