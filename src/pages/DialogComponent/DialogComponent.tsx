

import './DialogComponent.scss';
import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import { AiOutlineClose } from 'react-icons/ai';

const CustomDialog = ({
  isOpen,
  onClose,
  modalTitle,
  OptionalComponent,
  onSave,
  handleModalClick,
  componentProps = {},
  minHeight = '26rem',
  minWidth = '10rem',
  index,
} : any) => {
  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      onClick={handleModalClick}
      PaperProps={{ style: { zIndex: index , minHeight:minHeight , minWidth:minWidth} }}
      // style={{height:'10rem!important'}}
    >
      <DialogTitle style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div></div>
        <span style={{fontSize:'1.2rem'}}>{modalTitle}</span>
        <IconButton onClick={handleClose} style={{ fontSize: '1rem' }}>
          <AiOutlineClose />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        {OptionalComponent ? <OptionalComponent onSave={(data:any) => onSave(data)} {...componentProps}/> : null}
      </DialogContent>
    </Dialog>
  );
};

export default CustomDialog;
