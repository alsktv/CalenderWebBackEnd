import { Box , Modal, ModalOverlay,ModalContent, ModalBody, VStack, Button,} from "@chakra-ui/react"
import { CiVideoOn } from "react-icons/ci";
import { MdLiveTv } from "react-icons/md";

interface ModalProp{
  isOpen:boolean
  onClose:()=>void
}

export default function VideoShareModal({isOpen,onClose}:ModalProp){
  return(
    <Box>
       <Modal isOpen={isOpen} onClose={onClose}>
         <ModalOverlay />
         <ModalContent>
           <ModalBody>
             <VStack>
              <Button leftIcon={<CiVideoOn />}>
                동영상 업로드
              </Button>
              <Button leftIcon={<MdLiveTv />}>
                라이브 스트리밍 시작
              </Button>
             </VStack>
           </ModalBody>
         </ModalContent>
       </Modal>
    </Box>
  )
}