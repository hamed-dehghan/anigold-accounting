
import * as React from 'react';
import { SnackbarOrigin, SnackbarProvider, TransitionProps, VariantType, useSnackbar } from 'notistack';
import { Alert, Fade, Slide, SlideProps, Snackbar } from '@mui/material';
// import { randomInt } from 'crypto';
import { GlobalContext } from '../contexts/NotifContext';


export default function Toast(props:any) {

  const duration = 3000;
  let Transition :any = Fade;
  const vertical = 'top';
  const horizontal = 'center'
  const { openNotification, setOpenNotification } = React.useContext(GlobalContext);
  
  function SlideTransition(props: SlideProps) {
    return <Slide {...props} direction="down" />;
  }
  Transition = SlideTransition
  
  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    setOpenNotification(false)
  };
  
  return (

      <React.Fragment>
          <Snackbar
            autoHideDuration={duration}
            anchorOrigin={{ vertical, horizontal }}
            open={openNotification.open}
            onClose={handleClose}
            TransitionComponent={Transition}
            key={vertical + horizontal + Math.random()}
            style={{zIndex:'999999999999'}}
            >
            <Alert
              onClose={handleClose}
              severity= {openNotification.type}
              variant="filled"
              sx={{ width: '100%' }}
            >
              { openNotification?.object?.messageType == 'create' &&
                  <span>
                    <span>{openNotification?.object?.name}</span> <span className='Toast_text_bold'>{openNotification?.object?.nameValue}</span>
                      {openNotification?.object?.code &&
                        <span> با کد <span className='Toast_text_bold'>{openNotification?.object?.code}</span> </span>
                      }
                      با موفقیت ایجاد شد.
                  </span>
              }
              { openNotification?.object?.messageType == 'update' &&
                  <span>
                    <span>{openNotification?.object?.name}</span> <span className='Toast_text_bold'>{openNotification?.object?.nameValue}</span>
                      {openNotification?.object?.code &&
                        <span> با کد <span className='Toast_text_bold'>{openNotification?.object?.code}</span> </span>
                      }
                      با موفقیت ویرایش شد.
                  </span>
              }
              { openNotification?.object?.messageType == 'delete' &&
                  <span>
                    <span>{openNotification?.object?.name}</span> <span className='Toast_text_bold'>{openNotification?.object?.nameValue}</span>
                      {openNotification?.object?.code &&
                        <span> با کد <span className='Toast_text_bold'>{openNotification?.object?.code}</span> </span>
                      }
                      با موفقیت حذف شد.
                  </span>
              }
              {openNotification.message}
          </Alert>
        </Snackbar>
      </React.Fragment>
  );
}