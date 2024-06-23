
import {  Box, Button, Text, VStack, useDisclosure  } from "@chakra-ui/react";
import { useParams } from 'react-router-dom';
import FTodayMemo from "./TodayMemo";

// interface IProp {
 
//   date:Date
// }

export default function FCalenderDateModal(){
  let { year , month , day } = useParams();

  const {isOpen:memoIsOpen , onClose:memoOnClose , onOpen:memoOnOpen} = useDisclosure()

  return(
     <Box maxW='sm' borderWidth='3px' borderRadius='lg' overflow='hidden' w={250}>
      <VStack align="start">
        <Text> {year } /  {month} / {day} </Text>
        <Button > 일정 추가 </Button>
        <Button onClick={memoOnOpen}> 메모장 열기 </Button>
        <FTodayMemo isOpen={memoIsOpen} onClose={memoOnClose}/>
      </VStack>
     </Box>
  )
}