import {  Button, Input, Modal, ModalContent , Text, VStack  } from "@chakra-ui/react";
import { useState } from "react";
import { QueryClient, useMutation, useQueryClient } from "react-query";
import { APIPostSchedule, APIPostScheduleModule } from "../../api";
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
}

export default function FAddModuleModal({isOpen,onClose,onClickButton}:IProp) {

  const {year,month,day,userPk } = useParams()


  const mutation = useMutation(APIPostScheduleModule,{
    onSuccess:(data)=>{
      onClose()
      onClickButton(data)
    }
  })

  //유저에게 입력받는 값을 저장하기 위해 만든 변수들
  const [description , setDescription] = useState<string>() 

  
  //onChange를 처리하기 위해 만든 함수들
  const onChangeDescription = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
  }

   //사용자가 입력버튼을 눌렀을 시 작동하는 함수
  const onClickInputButton = () => {
    if(description){
      mutation.mutate({pk:Number(userPk) , description : description})
    }
  }

  return (
  <Modal isOpen = {isOpen} onClose={onClose}>
    <ModalContent left={200}>
       <VStack>
         <Text>내용:<Input placeholder="모듈 내용 입력" value={description} onChange={onChangeDescription}></Input></Text>
         <Button onClick={onClickInputButton}>입력</Button>
       </VStack>
    </ModalContent>
  </Modal>
  );
}