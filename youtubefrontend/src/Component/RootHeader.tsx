import { Box, HStack, IconButton, Text,Button, Divider, useColorMode, useColorModeValue, Input , InputGroup , InputRightAddon } from "@chakra-ui/react"

import { FaYoutube,FaRegUserCircle,FaMoon ,FaMicrophone } from "react-icons/fa";
import { IoIosSunny } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import { useDisclosure } from "@chakra-ui/react";
import VideoShareModal from "./VideoShareModal";

export default function RootHeader(){
  const {colorMode,toggleColorMode} = useColorMode()
  const {isOpen:loginIsOpen , onClose:loginOnClose , onOpen:loginOnOpen} = useDisclosure() 
  return(
   <Box>
     <HStack my={6} justifyContent={"space-between"}>
      <HStack>
        <IconButton variant={"goest"}color={"red"} aria-label='youtube-icon' icon={<FaYoutube /> } />
        <Text> Youtube</Text>
      </HStack>
      {/* 검색창 보이는 박스 */}
      <HStack width={"50%"}> 
      
      <InputGroup >
        <Input placeholder='검색'  borderRadius='20px 0 0 20px' />
        <InputRightAddon borderRadius='0 20px 20px 0'> <CiSearch /></InputRightAddon>
      </InputGroup>
      <Button rounded={"50%"}> <FaMicrophone /> </Button>
      </HStack>
      <Box>
      <VideoShareModal isOpen = {loginIsOpen} onClose = {loginOnClose} />
       <Button onClick={loginOnOpen}> shareTv</Button>
  
       <IconButton variant={"goest"} aria-label='user-icon' icon={<FaRegUserCircle />}></IconButton>
       <IconButton onClick={toggleColorMode} aria-label='darkmode' icon={useColorModeValue(<FaMoon />,<IoIosSunny />)} />
      </Box>
     </HStack>
     <Divider></Divider>
   </Box>
  )
}
