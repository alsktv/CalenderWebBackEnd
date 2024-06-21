
import {  Box, Text  } from "@chakra-ui/react";
import { useParams } from 'react-router-dom';

// interface IProp {
 
//   date:Date
// }

export default function FCalenderDateModal(){
  let { year , month , day } = useParams();

  return(
     <Box maxW='sm' borderWidth='3px' borderRadius='lg' overflow='hidden'>
       <Text> {year } /  {month} / {day} </Text>
     </Box>
  )
}