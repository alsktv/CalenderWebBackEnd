import { Box , HStack, Text , Image, VStack , Modal ,ModalContent, Divider, Button} from "@chakra-ui/react";
import { getUser } from "../api";
import { useQuery} from "react-query";

import { FaGoogle } from "react-icons/fa";

interface IProfile {
  name:string
  // email:string
  // image:string
}

interface ProfileProp {
  isOpen : boolean
  onClose: () => void
}

export default function Profile({isOpen , onClose} : ProfileProp) {
   const {isLoading , data} = useQuery({queryKey:["profile"] , queryFn:getUser})
//  isLoading처리 안해주면 , 처음에 undefined가 들어가서 예상치 못한 에러가 나올 수 있음
  return(
    <Modal isOpen = {isOpen} onClose={onClose}>
      {isLoading ?<ModalContent> <Text> loading...</Text> </ModalContent>: 
              <ModalContent left={270}>
              <HStack>
                <Box mx={5} width={"10%"} >
                  <Image  rounded={"50%"} src={data.image}/> 
                  <Text></Text>
                </Box>
                <Box >
                  <VStack >
                    <Box right={20}>{data.name}</Box>
                    <Text> {data.email}</Text>
                  </VStack>
                </Box>
              </HStack>
              <Divider />
                <VStack>
                  <Button w={"100%"}  leftIcon={<FaGoogle />}>구글 계정</Button>
                </VStack>

                </ModalContent>
      }

    </Modal>
  )
}