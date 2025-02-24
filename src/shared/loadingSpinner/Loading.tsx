
import React from 'react';
import './Loading.scss';
import { Backdrop, CircularProgress } from '@mui/material';

function LoadingSpinner(){
    return (
        <div className="spinner-container">
          <div className="spinner"></div>
        </div>
      );
}

export default LoadingSpinner;


export function SimpleBackdrop() {
  const [open, setOpen] = React.useState(true);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        // onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}

export function SimpleCircularProgress(){
  return (
    <div className='CircularProgress'>
      <CircularProgress />
    </div>

    );
}