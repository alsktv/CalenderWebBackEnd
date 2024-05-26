import { CiVideoOn } from "react-icons/ci";
import { MdLiveTv } from "react-icons/md";

import { Box , Modal,ModalContent, ModalBody, VStack, Button,} from "@chakra-ui/react"

interface ModalProp{
  isOpen:boolean
  onClose:()=>void
}

export default function VideoShareModal({isOpen,onClose}:ModalProp){
  return(
    <Box>
       <Modal isOpen={isOpen} onClose={onClose} >
         <ModalContent width={60}   left={282}>
           <ModalBody>
             <VStack>
              <Button justifyContent={"flex-start"} leftIcon={<CiVideoOn />} variant={"ghost"} width={"100%"}>
                동영상 업로드
              </Button>
              <Button leftIcon={<MdLiveTv />} variant={"ghost"} width={"100%"}>
                라이브 스트리밍 시작
              </Button>
             </VStack>
           </ModalBody>
         </ModalContent>
       </Modal>
    </Box>
  )
}