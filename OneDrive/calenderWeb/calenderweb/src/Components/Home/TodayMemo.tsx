import { Heading, Modal, ModalContent , Text ,Image , Button, Divider } from "@chakra-ui/react";
import { useParams } from "react-router-dom";

interface IProp {
  isOpen:boolean
  onClose: () => void
}


export default function FTodayMemo({isOpen,onClose}:IProp){
  let { year , month , day } = useParams();
  
  return(
    
    <Modal isOpen = {isOpen} onClose={onClose}>
      <ModalContent top={200}>
         <Text> {year } /  {month} / {day}  메모 </Text>
         <Button w={"20%"}> 메모 추가</Button>
      </ModalContent>
    </Modal>
  )
}