
import {Box, Button, HStack, useDisclosure} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import FCalenderDelayModal from './CalenderDelayModal';
import FCalenderAddModal from './CalenderAddModal';



export default function FTopBar() {

  const navigate = useNavigate()
  const date = new Date()
  const {isOpen:delayIsOpen , onClose:delayOnClose , onOpen:delayOnOpen} = useDisclosure()
  const {isOpen:addIsOpen , onClose:addOnClose , onOpen:addOnOpen} = useDisclosure()

  // 변수 이름은 소문자로, 함수 이름은 대문자로, export함수는 앞에 F붙인 뒤 대문자로
  const OnClickToday = () =>{
   navigate(`/${date.getFullYear()}/${date.getMonth() +1}/${date.getDate()}`)
  }

  return(
   <Box>
     <HStack>
       <Button onClick={OnClickToday}> 오늘 일정 </Button>
       <Button onClick={delayOnOpen}> 미룬 일정</Button>
       <FCalenderDelayModal isOpen={delayIsOpen} onClose={delayOnClose}/>
       <Button onClick={addOnOpen}> + </Button>
       <FCalenderAddModal  isOpen={addIsOpen} onClose={addOnClose} />
     </HStack>
   </Box>
  )
}