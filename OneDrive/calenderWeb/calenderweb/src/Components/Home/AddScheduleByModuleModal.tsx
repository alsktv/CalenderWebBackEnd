import {  Button, Input, Modal, ModalContent , Text, VStack  } from "@chakra-ui/react";
import { useState } from "react";
import { QueryClient, useMutation, useQueryClient } from "react-query";
import { APIPostSchedule } from "../../api";
import { useParams } from "react-router-dom";

interface IMySchedule {
  pk: number , 
  description: string,
  date: Date,
  isChecked: boolean,
}

interface IProp {
  isOpen:boolean
  onClose: () => void
  onClickButton : (data:IMySchedule[]) => void
  description:string
}

export default function FAddScheduleByModule({isOpen,onClose,onClickButton,description}:IProp) {

  const {year,month,day } = useParams()

  const mutation = useMutation(APIPostSchedule,{
    onSuccess:(data)=>{
      onClickButton(data)
      onClose()
    }
  })

  //유저에게 입력받는 값을 저장하기 위해 만든 변수들
  const [hours , setHours] = useState<string>()
  const [minutes , setMinutes] = useState<string>()

  
  //onChange를 처리하기 위해 만든 함수들
  const onChangeHours = (event: React.ChangeEvent<HTMLInputElement>) => {
    
    setHours(event.target.value);
  }
  const onChangeMinutes = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMinutes(event.target.value);
  }

   //사용자가 입력버튼을 눌렀을 시 작동하는 함수
  const onClickInputButton = () => {
    if( hours && minutes ){
      if( typeof Number(hours) === "number" && typeof Number(minutes) === "number" ){
        if(Number(hours) < 24 && Number(hours) >= 0 && Number(minutes) < 60 && Number(minutes) >= 0){
          console.log(description)
          mutation.mutate({"description" : description , "date":`${year}-${month}-${day}T${hours}:${minutes}:00+09:00`})
        }
      }

    }
    
  }

  return (
  <Modal isOpen = {isOpen} onClose={onClose}>
    <ModalContent left={200}>
       <VStack>
         <Text>시:<Input placeholder="시 입력" value={hours} onChange={onChangeHours}></Input></Text>
         <Text>분:<Input placeholder="분 입력" value={minutes} onChange={onChangeMinutes}></Input></Text>
         <Button onClick={onClickInputButton}>입력</Button>
       </VStack>
    </ModalContent>
  </Modal>
  );
}