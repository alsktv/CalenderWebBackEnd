import {  Box, Text,  } from "@chakra-ui/react";

//전체 메모를 보여주는 컴포넌트
export default function FTotalMemo(){

  return(
     <Box maxW='sm' borderWidth='3px' borderRadius='lg' overflow='hidden' w={250}>
       <Text> 전체 메모를 보여줌</Text>
     </Box>
  )
}