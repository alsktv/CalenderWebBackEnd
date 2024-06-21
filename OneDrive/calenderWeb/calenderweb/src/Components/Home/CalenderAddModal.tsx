import {  Modal, ModalContent , Text  } from "@chakra-ui/react";
import { useEffect } from "react";

interface IProp {
  isOpen:boolean
  onClose: () => void
}



export default function FCalenderAddModal({isOpen,onClose}:IProp){



  return(
    
    <Modal isOpen = {isOpen} onClose={onClose}>
      <ModalContent left={200}>
         <Text> 일정 모듈화</Text>
      </ModalContent>
    </Modal>
  )
}