import {  Button, Input, Modal, ModalContent , Text, VStack  } from "@chakra-ui/react";
import { useState } from "react";
import { QueryClient, useMutation, useQueryClient } from "react-query";
import { APIPostSchedule } from "../../api";
import { useParams } from "react-router-dom";

interface IProp {
  isOpen:boolean
  onClose: () => void
}

export default function FAddScheduleModal({isOpen,onClose}:IProp) {

  const {year,month,day } = useParams()

  const queryClient = useQueryClient();

  const mutation = useMutation(APIPostSchedule,{
    onSuccess:()=>{
       queryClient.invalidateQueries('schedules');
    }
  })

  //유저에게 입력받는 값을 저장하기 위해 만든 변수들
  const [description , setDescription] = useState<string>() 
  const [hours , setHours] = useState<string>()
  const [minutes , setMinutes] = useState<string>()
  
  //onChange를 처리하기 위해 만든 함수들
  const onChangeDescription = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
  }
  const onChangeHours = (event: React.ChangeEvent<HTMLInputElement>) => {
    
    setHours(event.target.value);
  }
  const onChangeMinutes = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMinutes(event.target.value);
  }

   //사용자가 입력버튼을 눌렀을 시 작동하는 함수
  const onSubmitButton = () => {
    if(description && hours && minutes){
      mutation.mutate({"description" : description , "date":`${year}-${month}-${day}T${hours}:${minutes}:00+00:00`})
    }
    
  }

  return (
  <Modal isOpen = {isOpen} onClose={onClose}>
    <ModalContent left={200}>
       <VStack>
         <Text>내용:<Input placeholder="일정 내용 입력" value={description} onChange={onChangeDescription}></Input></Text>
         <Text>시:<Input placeholder="시 입력" value={hours} onChange={onChangeHours}></Input></Text>
         <Text>분:<Input placeholder="분 입력" value={minutes} onChange={onChangeMinutes}></Input></Text>
         <Button onSubmit={onSubmitButton}>입력</Button>
       </VStack>
    </ModalContent>
  </Modal>
  );
}