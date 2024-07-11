import {  Box, Button, HStack, Modal, ModalContent , Text, useDisclosure, VStack  } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { useParams } from "react-router-dom";
import { APIGetSchedule, APIGetScheduleModule } from "../../api";
import FAddScheduleByModule from "./AddScheduleByModuleModal";
import FAddModuleModal from "./AddModule";

interface IProp {
  isOpen:boolean
  onClose: () => void
}

interface IModule {
  pk:number
  description:string
}




  

export default function FCalenderAddModal({isOpen,onClose}:IProp){

    /////////////////////////////////////////////////////////////////////////////
  //1.프로그램에 필요한 변수들 저장
  /////////////////////////////////////////////////////////////////////////////
  

  //1.1 -> 특정 유저의 일정 모듈의 정보를 저장하는 변수
  const [module, setModule] = useState<IModule[]>([])

  //1.2 -> params값 저장하기
  const {year, month , day , userPk} = useParams()

  //1.3 -> 모달창에 보낼 description을 저장하는 변수
  const [Itemdescription,setItemDescription] = useState("")



  /////////////////////////////////////////////////////////////////////////////
  //2.뮤테이션 변수들
  /////////////////////////////////////////////////////////////////////////////
  

  //2.1 -> 일정모듈을 get요청을 통해 가져오는 함수
  const getModuleMutation = useMutation(APIGetScheduleModule,{
    onSuccess:(data) => {
      setModule(data.data.scheduleModules)
    }
  })

  //2.2 -> 스케쥴을 가져오는 뮤테이션 함수
  const getScheduleMutation = useMutation(APIGetSchedule,{
    onSuccess:(data) => {
      
    }
  })


  ////////////////////////////////////////////////////////////////////////////////
  // 프로그램에 필요한 함수들
  ///////////////////////////////////////////////////////////////////////////////

  //모달창 컴포넌트에 보낼때 사용하는 함수. 이것으로 인해 변경된 값을 즉시 화면에 나타낼 수 있음
  const onClickButton = () => {
    getScheduleMutation.mutate(Number(userPk))
  }

  const onClickAddButton = () => {
    getModuleMutation.mutate(Number(userPk))
  }




  ///////////////////////////////////////////////////////////////////////////
  //3.이벤트 핸들러 함수들
  ///////////////////////////////////////////////////////////////////////////
  const onClick = (index:number, description:string) => {
   plusonOpen()
   setItemDescription(description)
   console.log(index, description)
  }


  /////////////////////////////////////////////////////////////////////////////
  //4.모달창을 다루기 위한 변수
  ////////////////////////////////////////////////////////////////////////////

  //4.1 -> +버튼 눌렀을 때 나오는 모달창을 다루는 변수
  const {isOpen:plusIsOpen , onOpen:plusonOpen , onClose:plusonClose} = useDisclosure()

  //
  const {isOpen:addIsOpen , onOpen:addonOpen , onClose:addonClose} = useDisclosure()



    ///////////////////////////////////////////////////////////////////////////
  //5.useEffect 함수들
  ///////////////////////////////////////////////////////////////////////////
  useEffect(()=>{
    getModuleMutation.mutate(Number(userPk))
  },[year,month,day,userPk])


  return(
    
    <Modal isOpen = {isOpen} onClose={onClose}>
      <ModalContent left={200}>
        <VStack>
          {module ?   module?.map((item:IModule,index)=>(
          <Box key={item.pk}>
            <HStack>
              <Text>{item.description}</Text>
              <Button onClick={()=>{onClick(index , item.description)}}>+</Button>
              <FAddScheduleByModule isOpen={plusIsOpen} onClose={plusonClose} description = {Itemdescription} onClickButton={onClickButton}/>
            </HStack>
          </Box>
         )): null}
   
        </VStack>
         <Button onClick={addonOpen}>모듈 추가</Button>
         <FAddModuleModal isOpen={addIsOpen} onClose={addonClose} onClickButton={onClickAddButton}/>
      </ModalContent>
    </Modal>
  )
}