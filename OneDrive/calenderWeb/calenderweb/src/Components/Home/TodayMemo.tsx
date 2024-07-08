import { Modal, ModalContent , Text  , Button, useDisclosure, Box, VStack } from "@chakra-ui/react";
import { useMutation } from "react-query";
import { useParams } from "react-router-dom";
import { APIGetUserMemo } from "../../api";
import { useEffect, useState } from "react";
import AddTodayMemo from "./AddTodayMemo";

interface IProp {
  isOpen:boolean
  onClose: () => void
}

interface IUserMemo {
  description: string,
  date:string,
  pk:number,
}


export default function FTodayMemo({isOpen,onClose}:IProp){
  ////////////////////////////////////////////////////////////////////////////
  //1. 프로그램에 필요한 변수들
  ////////////////////////////////////////////////////////////////////////////


  //1.1 ->  params값을 가져오는 것
  let { year , month , day ,userPk } = useParams();

  //1.2 ->  특정 날짜의 메모를 저장하는 변수 , 리스트의 길이는 반드시 1이다.
  const [todayMemo , setTodayMemo] = useState<IUserMemo[]>()


    ////////////////////////////////////////////////////////////////////////////
  //2. 모달창에 필요한 변수들
  ////////////////////////////////////////////////////////////////////////////



  //2.1 -> 메모추가 버튼 눌렀을 시 시행되는 모달창에 필요한 변수들
  const {isOpen:addMemoIsOpen , onClose:addMemoOnClose , onOpen:addMemoOnOpen} =useDisclosure()


  ////////////////////////////////////////////////////////////////////////////
  //3. 프로그램에 필요한 함수들
  ////////////////////////////////////////////////////////////////////////////

// 3.1 -> 특정 날짜의 메모가 있는지를 확인하는 함수
  const IsTodaymemos = () => {
    if(todayMemo?.length !== 0){
      return true
    }else{
      return false
    }
  }

  
    ////////////////////////////////////////////////////////////////////////////
  //4.mutation변수들
  ////////////////////////////////////////////////////////////////////////////

  //4.1 -> 특정 날짜의 메모를 가져오는 mutation변수
  // padstart를 이용하여 자리수 고정 + 빈자리 특정 문자로 채우기 가능하다.
  const mutation = useMutation(APIGetUserMemo,{
    onSuccess:(data)=>{
      const userMemos: IUserMemo[] = data.data.dateUserMemos
      const newMemos = userMemos.filter(item =>item.date === `${year}-${month?.padStart(2, '0')}-${day}` )
      setTodayMemo(newMemos)
    }
  })

    ////////////////////////////////////////////////////////////////////////////
  //5.useEffect함수들
  ////////////////////////////////////////////////////////////////////////////
  
  //5.1 -> 처음 시작될 때 시행하는 함수.
  useEffect(()=>{
    mutation.mutate(Number(userPk))
  },[userPk,year,month,day])

  
  return(
    
    <Modal isOpen = {isOpen} onClose={onClose}>
      <ModalContent top={200}>
         <Text> {year } /  {month} / {day}  메모 </Text>
         {IsTodaymemos()
         ?
         <VStack>
         {todayMemo ? <Text>{todayMemo[0]?.description}</Text> :null}
         <Button w={"20%"}> 메모 수정</Button>
         </VStack>
         :
         <Box>
          <Button w={"20%"} onClick={
            ()=>{
              addMemoOnOpen()
            }
              }> 메모 추가</Button> 
          <AddTodayMemo isOpen={addMemoIsOpen} onClose={addMemoOnClose} />
      
          
        </Box>
           
         }
         
      </ModalContent>
    </Modal>
  )
}