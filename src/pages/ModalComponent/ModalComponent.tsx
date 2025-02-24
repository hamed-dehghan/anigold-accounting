
import './ModalComponent.scss';
import React, { useState, useRef } from "react";
import { AiOutlineClose } from "react-icons/ai"; // Close icon
import Modal from "@mui/material/Modal"; // Import MUI Modal
import { Rnd } from "react-rnd"; // Import react-rnd for resizable functionality
import Draggable from 'react-draggable';
import { Dialog, DialogContent, DialogTitle, Paper } from '@mui/material';


const ModalComponent = ({ 
  isOpen, 
  onClose, 
  onSave, 
  index, 
  onClickModal, 
  optionalComponent: OptionalComponent,
  BackdropProps = true,
  minWidth,
  minHeight ,
  draggable = true,
  modalTitle
}:any,

) => {
  const [userData, setUserData] = useState({ name: "", email: "" });
  const modalRef = useRef(null);

  const handleChange = (e:any) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = () => {
    if (userData.name && userData.email) {
      onSave(userData); // Pass userData to onSave callback
      setUserData({ name: "", email: "" }); // Reset fields
      onClose(); // Close modal after saving
    } else {
      alert("Please fill in both fields.");
    }
  };

  // Handle modal click event to bring modal to front
  const handleModalClick = () => {
    // onClickModal(index);
  };
  
  function handleClose(){
    console.log('onclose');
    
    onClose();
  }

  if (!isOpen) return null; // Return null if modal is not open

  const PaperComponent = (props: any) => (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
  return (

        <Modal open={isOpen} onClose={onClose}
        BackdropProps={{
          style: { display: `${BackdropProps?'':'none'}`}, // Hide the backdrop
        }}
        >
        <div
          className="overlay"
          onClick={handleModalClick} // Handle modal click to bring it to front
          style={{
            zIndex: index ,
          }}
        >
          <Rnd
            ref={modalRef}
            minWidth={minWidth}
            minHeight={minHeight}
            // bounds="parent"
            className="modal"
            disableDragging={!draggable} // Enable dragging
            dragHandleClassName={`header${index}`} // Enable dragging from the header
            >
            <div className={`header${index} header`}>
              <span>{modalTitle}</span>
              <AiOutlineClose onClick={()=>handleClose()} className="close-icon" style={{fontSize:'1rem'}}/>
            </div>
          
            <div className="dynamic-content">
              {OptionalComponent ? <OptionalComponent onSave={(data:any) =>  onSave(data)}/> : ''}
            </div>
          </Rnd>
        </div>
      </Modal>
      

  );
};

export default ModalComponent;


// document for use ModalComponent

// const [modals, setModals] :any = useState([]); // Track the open modals
  // const [modalCounter, setModalCounter] = useState(0); // Counter to manage z-index

  // Function to open a new modal and increment the counter
  // const openModal = () => {
  //   setModals([...modals, modalCounter]); // Add new modal and update counter
  //   setModalCounter(modalCounter + 1); // Increment z-index counter
  // };

  // Function to close a modal
  // const closeModal = (index:any) => {
  //   setModals(modals.filter((modalIndex:any) => modalIndex !== index)); // Remove the closed modal
  // };

  // Function to bring clicked modal to the front
  // const bringModalToFront = (clickedIndex:any) => {
  //   const newModals = [...modals];
  //   const clickedModal = newModals.findIndex((modalIndex) => modalIndex === clickedIndex);
  //   newModals.splice(clickedModal, 1); // Remove the clicked modal from its current position
  //   newModals.push(clickedIndex); // Add it to the end (front)
  //   setModals(newModals);
  // };

  {/* onClick={openModal} */}
  {/* <div>
    {modals.map((modalIndex:any) => (
      <ModalComponent
        key={modalIndex}
        isOpen={true}
        onClose={() => closeModal(modalIndex)}
        onSave={(data:any) => console.log(data)}
        index={modalIndex + 1} // Assign z-index based on the modal order
        onClickModal={bringModalToFront} // Pass function to bring modal to front
        optionalComponent={CustomerForm} // Pass dynamic component here
        minWidth = {400}
        minHeight = {420}
        draggable = {true}
        modalTitle = 'ایجاد پرسنل'
      />
    ))}
  </div> */}