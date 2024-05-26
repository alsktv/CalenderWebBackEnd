import { useQuery } from "react-query";

import { getUser } from "../api";
import Video from "../Component/Video";
import VideoSize from "../VideoSize";

import { Box, HStack, VStack , Image , Text , Button, Heading, Grid, GridItem} from "@chakra-ui/react";

interface IVideo {
  categories:{name:string}
  name:string
  pk:Number
  time_difference:string
  user: {
    pk: Number
    name: string
    image:string 
    subscribe_count:Number
  }

     videos:{
      name: string
      time_difference:string
      user:Number
      video:string
      view_count:Number
     } []  
   video:string
   view_count:Number
}

export default  function Feedyou(){
  const {isLoading:userIsLoading , data:userData} = useQuery({
    queryKey:["users"] , 
    queryFn:getUser 
  })

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
          <Box my={15}>
            <HStack>
             <Heading mr={500}>기록</Heading>
             <Button rounded={"20%"}> 모두 보기 </Button>
            </HStack>
            
        </Box>
        <Box my={15}>
          <HStack justifyContent={"space-between"}>
            <HStack mr={310}>
              <Heading >좋아요 누른 동영상</Heading>
              <Text ml={10}>{userData.likeVideo.length}</Text>
            </HStack>
            <Button rounded={"20%"}> 모두 보기 </Button>
          </HStack>

          <Grid templateColumns='repeat(5, 1fr)' templateRows={"repeat(3,1fr)"} gap={6}>

            {userData.likeVideo?.map((item:IVideo) => (
            <GridItem key = {item.pk.toString()}>
              
              <Video src={item.video} name={item.name} pk={item.pk} user = {item.user} view_count = {item.view_count} time = {item.time_difference} size = {VideoSize("small")} />
            </GridItem>
            ))}

          </Grid>


        </Box>
      </VStack>
    }

  </Box>
    


  )
}