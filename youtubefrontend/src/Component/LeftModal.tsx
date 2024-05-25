import { ModalContent , Modal ,Box, HStack ,Text , VStack , Button} from "@chakra-ui/react";
import { CiMenuBurger } from "react-icons/ci";
import { FaYoutube } from "react-icons/fa";

import { MdOutlineHome } from "react-icons/md";
import { SiYoutubeshorts } from "react-icons/si";
import { GoVideo } from "react-icons/go";

interface IProp{
  isOpen:boolean
  onClose:() => void
}


export default function LeftModal({isOpen,onClose}:IProp){

  return(
   <Modal isOpen = {isOpen} onClose={onClose}>
      <ModalContent w={"15%"} right={480}>
        <Box> 
          <HStack>
            <CiMenuBurger />
            <FaYoutube /> 
            <Text>Youtube</Text>
          </HStack>
        </Box>
        <VStack >
          
          <Button variant={"ghost"} w={"100%"} textAlign={"left"} leftIcon={<MdOutlineHome />}> 홈</Button>
          <Button variant={"ghost"} w={"100%"} leftIcon={<SiYoutubeshorts />}> shorts</Button>
          <Button variant={"ghost"} w={"100%"} leftIcon={<GoVideo />}>  구독</Button>
        </VStack>
      </ModalContent>
   </Modal>
  )
}