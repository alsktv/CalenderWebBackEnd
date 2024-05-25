import { Box, HStack, VStack , Image , Text , Button, Heading} from "@chakra-ui/react";
import { getUser } from "../api";
import { useQuery } from "react-query";

export default  function Feedyou(){
  const {isLoading:userIsLoading , data:userData} = useQuery({queryKey:["users"] , queryFn:getUser } )
  return(
   <Box>
    {userIsLoading ? <Text> loading...</Text> : 
        <VStack >
          <HStack my={5} mr={250}>
            <Image src={userData.image} w={10} rounded={"50%"}/>
            <VStack>
              <Text >{userData.name} </Text>
              <Text>{userData.email}</Text>
              <HStack>
                <Button>게정전환</Button>
                <Button>Google 계정</Button>
              </HStack>
            </VStack>
          </HStack>
          <Box >
            <HStack>
             <Heading mr={450}>기록</Heading>
             <Button rounded={"20%"}> 모두 보기 </Button>
            </HStack>
            
        </Box>
        <Box>
      
        </Box>
      </VStack>
    }

  </Box>
    


  )
}