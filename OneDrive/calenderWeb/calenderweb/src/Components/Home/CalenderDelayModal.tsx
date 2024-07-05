import { Modal, ModalContent  , Text  } from "@chakra-ui/react";

interface IProp {
  isOpen:boolean
  onClose: () => void
}

export default function FCalenderDelayModal({isOpen,onClose}:IProp){
  return(
    
    <Modal isOpen = {isOpen} onClose={onClose}>
      <ModalContent left={200}>
         <Text> delay</Text>
      </ModalContent>
    </Modal>
  )
}