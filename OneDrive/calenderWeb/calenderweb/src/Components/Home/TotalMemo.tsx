import {  Box, Text,  } from "@chakra-ui/react";
import { useMutation } from "react-query";
import { APIGetTotalMemo } from "../../api";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

//전체 메모를 보여주는 컴포넌트
export default function FTotalMemo(){

  ///////////////////////////////////////////////////////////////////////////////
  //1.프로그램에 필요한 변수들
  ///////////////////////////////////////////////////////////////////////////////


  //1.1 -> totalMemo를 저장하는 변수
   const [totalMemo , setTotalMemo] = useState<string>()

   //1.2 -> useParams
   const {year , month , day , userPk} = useParams()



  ///////////////////////////////////////////////////////////////////////////////
  //2.프로그램에 필요한 함수들
  ///////////////////////////////////////////////////////////////////////////////



  ///////////////////////////////////////////////////////////////////////////////
  //3.뮤테이션 함수들
  ///////////////////////////////////////////////////////////////////////////////


  //3.1 -> 특정 유저의 totalMemo를 가져오는 뮤테이션 변수
   const getTotalMemoMutation = useMutation(APIGetTotalMemo , 
    {
      onSuccess:(data) => {
       setTotalMemo(data.data.totalMemo.description)
      }
    }
   )


  ///////////////////////////////////////////////////////////////////////////////
  //4. useEffect함수들
  ///////////////////////////////////////////////////////////////////////////////
  

//4.1 -> getMutation을 시행하는 함수
  useEffect(()=>{
    getTotalMemoMutation.mutate(Number(userPk))
  },[year,month,day])


  return(
     <Box maxW='sm' borderWidth='3px' borderRadius='lg' overflow='hidden' w={250}>
       <Text> {totalMemo}</Text>
     </Box>
  )
}