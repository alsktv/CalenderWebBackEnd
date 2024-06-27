
import {  Box, Button, Text, VStack, useDisclosure  } from "@chakra-ui/react";
import { useParams } from 'react-router-dom';
import FTodayMemo from "./TodayMemo";
import { APIGetSchedule } from "../../api";
import { useMutation, useQuery } from "react-query";
import { useEffect, useState } from "react";

interface  IScheduleData{
  data:{
    user: {
      mySchedule: 
        {
         description: string,
          date: Date,
        } []
  }
  }

}

export default function FCalenderDateModal(){

  let { year , month , day } = useParams();
  const [schedules , setSchedules] = useState<IScheduleData>()
  const [hours , setHours] = useState()
  const [minutes , setMinutes] = useState()

  const mutation = useMutation(APIGetSchedule , {
    onSuccess: (data) =>{
       setSchedules(data)
    }
  })

  useEffect(()=>{
    mutation.mutate(1)
  },[year,month,day])


  const {isOpen:memoIsOpen , onClose:memoOnClose , onOpen:memoOnOpen} = useDisclosure()

  return(
     <Box maxW='sm' borderWidth='3px' borderRadius='lg' overflow='hidden' w={250}>

          <VStack align="start">
            {schedules ?
             schedules.data.user.mySchedule.map((item)=>(
              <Box>
                <Text> {item.description}</Text>
                {/* <Text> {item.date.getDay.toString}</Text> */}
              </Box>
   
             ))  
             : <Text>fff</Text>
            }

            <Text> {year } /  {month} / {day} </Text>
            <Button > 일정 추가 </Button>
            <Button onClick={memoOnOpen}> 메모장 열기 </Button>
            <FTodayMemo isOpen={memoIsOpen} onClose={memoOnClose}/>
          </VStack>

     </Box>
  )
}