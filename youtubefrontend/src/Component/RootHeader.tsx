import { Box, HStack, IconButton, Text,Button, Divider, useColorMode, useColorModeValue, Input , InputGroup , InputRightAddon,useDisclosure } from "@chakra-ui/react"

import { FaYoutube,FaRegUserCircle,FaMoon ,FaMicrophone } from "react-icons/fa";
import { IoIosSunny } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import { MdVideoCall } from "react-icons/md";
import { HiBellAlert } from "react-icons/hi2";

import VideoShareModal from "./VideoShareModal";
import AlertModal from "./AlertModal";
import Profile from "./ProfileModal";
import Categories from "./Categories";

import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function RootHeader(){
  const {colorMode,toggleColorMode} = useColorMode()
  const {isOpen:shareIsOpen , onClose:shareOnClose , onOpen:shareOnOpen} = useDisclosure() 
  const {isOpen:alertIsOpen , onClose:alertOnClose, onOpen:alertOnOpen} = useDisclosure()
  const {isOpen:profileIsOpen , onClose:profileOnClose, onOpen:profileOnOpen} = useDisclosure()
  const [searchValue , setSearchValue] = useState<string>()
  const navigate  = useNavigate()
  
  const SearchButtonSubmit = () =>{ //search 돋보기를 눌렀을 시 링크 연결
    if (searchValue !== "") {
      navigate(`/result?search_query=${searchValue}`)
      window.location.reload();
    }
      
  }

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) =>{
    setSearchValue(e.target.value)
  }

  return(
   <Box >
     <HStack my={6} justifyContent={"space-between"}>
      <HStack>
        <Link to={""}> <IconButton variant={"goest"}color={"red"} aria-label='youtube-icon' icon={<FaYoutube /> } />  </Link>
        <Link to={""}><Text> Youtube</Text> </Link>

      </HStack>
      {/* 검색창 보이는 박스 */}
      <HStack width={"50%"}> 
      
      <InputGroup >
        <Input placeholder='검색'  borderRadius='20px 0 0 20px' value={searchValue} onChange={onChangeSearch} />
        <InputRightAddon borderRadius='0 20px 20px 0' onClick={SearchButtonSubmit}> <CiSearch /></InputRightAddon>
      </InputGroup>
      <Button rounded={"50%"} > <FaMicrophone /> </Button>
      </HStack>
      <Box>
      <VideoShareModal isOpen = {shareIsOpen} onClose = {shareOnClose} />
       <Button mx = {1} variant="ghost" rounded={"50%"} onClick={shareOnOpen}><MdVideoCall /></Button>

       <AlertModal isOpen = {alertIsOpen} onClose={alertOnClose} />
       <Button mx = {1} variant="ghost" rounded={"50%"} onClick={alertOnOpen}> <HiBellAlert /></Button>
        
       <Profile isOpen = {profileIsOpen} onClose={profileOnClose}/>
       <IconButton onClick={profileOnOpen} rounded={"50%"} mx = {1} variant={"ghost"} aria-label='user-icon' icon={<FaRegUserCircle />}></IconButton>

       <IconButton mx = {1} onClick={toggleColorMode} aria-label='darkmode' icon={useColorModeValue(<FaMoon />,<IoIosSunny />)} />
      </Box>
     </HStack>
     <Divider></Divider>
   </Box>
  )
}
