
import {  Box, Button, HStack, Text, VStack, useDisclosure  } from "@chakra-ui/react";
import { useNavigate, useParams } from 'react-router-dom';
import FTodayMemo from "./TodayMemo";
import { APIGetSchedule } from "../../api";
import { useMutation, useQuery } from "react-query";
import { useEffect, useState } from "react";
import { formatDate } from "react-calendar/dist/cjs/shared/dateFormatter";
import FAddScheduleModal from "./AddScheduleModal";

interface IMySchedule {
  description: string,
  date: Date,
}

interface  IScheduleData{
  data:{
    user: {
      mySchedule: IMySchedule []
  }
  }

}

export default function FCalenderDateModal(){

  let { year , month , day , userPk } = useParams();
  const [schedules , setSchedules] = useState<IMySchedule[]>()
  const [hours , setHours] = useState()
  const [minutes , setMinutes] = useState()
  const currentDate = new Date()

  const navigation = useNavigate()


  const mutation = useMutation(APIGetSchedule , {
    onSuccess: (data) =>{
      //유저가 선택 한 날짜의 일정만 가져오게 만듬
      const dateSchedule = data.data.user.mySchedule.filter(
        (item:IMySchedule) =>{
          const itemDate = new Date(item.date)
          return (
                   itemDate.getDate() === Number(day)
            &&   itemDate.getMonth() + 1 === Number(month)
       &&  itemDate.getFullYear() === Number(year)
          )
        }
          

    )
      console.log(dateSchedule)
       setSchedules(dateSchedule)
    }
  })

  useEffect(()=>{
    mutation.mutate(Number(userPk))
  },[year,month,day])

  const formatDate = (dateString:Date) => {
     console.log(dateString)
     const date = new Date(dateString);
     const hour = date.getHours()
     const minutes = String(date.getMinutes()).padStart(2, '0');
     return `${hour}:${minutes}`
  };



  const {isOpen:memoIsOpen , onClose:memoOnClose , onOpen:memoOnOpen} = useDisclosure()
  const {isOpen:scheduleIsOpen , onClose:scheduleOnClose , onOpen:scheduleOnOpen} = useDisclosure()

  return(
     <Box maxW='sm' borderWidth='3px' borderRadius='lg' overflow='hidden' w={250}>

          <VStack align="start">
            <Text> {year } /  {month} / {day} </Text>

            {schedules ?
             schedules.map((item)=>(
              <HStack>
                <Text> {item.description}</Text>
                <Text> 시간: {formatDate(item.date)}</Text>
              </HStack>
   
             ))  
             : <Text>일정이 없습니다.</Text>
            }
            <Button onClick={scheduleOnOpen}> 일정 추가 </Button>
            <FAddScheduleModal isOpen={scheduleIsOpen} onClose={scheduleOnClose}/>
            <Button onClick={memoOnOpen}> 메모장 열기 </Button>
            <FTodayMemo isOpen={memoIsOpen} onClose={memoOnClose}/>
          </VStack>

     </Box>
  )
}