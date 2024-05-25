import { Heading, Modal, ModalContent ,Box, HStack, VStack , Text ,Image , Button, Divider } from "@chakra-ui/react";
import { CiSettings } from "react-icons/ci";
import { BsThreeDotsVertical } from "react-icons/bs";
import {getAlertVideo} from "../api";
import { useQuery } from "react-query";

interface AlertModalProp {
  isOpen:boolean
  onClose: () => void
}

interface IVideo {  //IAlertVideo의 interface
  name:string
}
 
interface IAlertVideo {  //api에서 가져온 alert정보에 관한 interface(여기에는 알람설정한 유저에 대한 type을 정의함)
  name: string
  image: string
  video: IVideo[]

}


export default function AlertModal({isOpen,onClose}:AlertModalProp){
  const {isLoading , data} = useQuery<IAlertVideo[]>({queryKey:["alert"] , queryFn:getAlertVideo})
  return(
    
    <Modal isOpen = {isOpen} onClose={onClose}>
      <ModalContent left={210} rounded={10}>
          <Box >
          <HStack justifyContent={"space-between"}>
            <Text my={"3%"}> 알림</Text>
            <CiSettings />
          </HStack>
          </Box>
          <Divider />
          <VStack>
             {/*최근 영상 가져오기 위해서 item.video.length -1을 사용함 */}
           {data?.map((item) =>( 
            <HStack key={item.name}>
              {item.video.length !==0 ? 
                <Button variant={"ghost"}>
                <HStack> 
               <Image width={"10%"} rounded={"50%"} src={item.image}></Image>
               <Text  whiteSpace="normal" wordBreak="break-word"> {item.name} 에서 업로드한 동영상:   {item.video[item.video.length -1] ? item.video[item.video.length -1].name : ""}</Text>  
               </HStack >
               </Button> : null}
           </HStack> ))}
          </VStack>

      </ModalContent>
    </Modal>
  )
}

