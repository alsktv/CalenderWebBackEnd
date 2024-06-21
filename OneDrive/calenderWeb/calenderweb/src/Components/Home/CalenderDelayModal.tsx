import { Heading, Modal, ModalContent ,Box, HStack, VStack , Text ,Image , Button, Divider } from "@chakra-ui/react";
import { useQuery } from "react-query";

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