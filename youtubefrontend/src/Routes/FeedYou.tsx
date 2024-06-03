import { useQuery } from "react-query";

import { getUser , putRecentVideos } from "../api";
import Video from "../Component/Video";
import VideoSize from "../VideoSize";

import { Box, HStack, VStack , Image , Text , Button, Heading, Grid, GridItem} from "@chakra-ui/react";

import { Link } from "react-router-dom";
import VideoDescription from "../Component/Video_description";

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
            <HStack>
              <Grid templateColumns='repeat(5, 1fr)' templateRows={"repeat(3,1fr)"} gap={6}>
                    <GridItem key = {userData.recent_video1.pk.toString()}>
                
                    <Video src={userData.recent_video1.video} name={userData.recent_video1.name} pk={userData.recent_video1.pk} user = {userData.recent_video1.user} view_count = {userData.recent_video1.view_count} time = {userData.recent_video1.time_difference} size={VideoSize("middle")} />
                    <Box >
                      <VideoDescription  image = {userData.recent_video1.user.image} pk = {userData.recent_video1.pk}  user_name = {userData.recent_video1.user.name} video_name = {userData.recent_video1.name}    view_count = {userData.recent_video1.view_count}  time_difference  = {userData.recent_video1.time_difference} />
                    </Box>
                  </GridItem>

                  <GridItem key = {userData.recent_video2.pk.toString()}>
                
                <Video src={userData.recent_video2.video} name={userData.recent_video2.name} pk={userData.recent_video2.pk} user = {userData.recent_video2.user} view_count = {userData.recent_video2.view_count} time = {userData.recent_video2.time_difference} size={VideoSize("middle")} />
                <Box >
                  <VideoDescription  image = {userData.recent_video2.user.image} pk = {userData.recent_video2.pk}  user_name = {userData.recent_video2.user.name} video_name = {userData.recent_video2.name}    view_count = {userData.recent_video2.view_count}  time_difference  = {userData.recent_video2.time_difference} />
                </Box>
              </GridItem>

              <GridItem key = {userData.recent_video3.pk.toString()}>
                
                <Video src={userData.recent_video3.video} name={userData.recent_video3.name} pk={userData.recent_video3.pk} user = {userData.recent_video3.user} view_count = {userData.recent_video3.view_count} time = {userData.recent_video3.time_difference} size={VideoSize("middle")} />
                <Box >
                  <VideoDescription  image = {userData.recent_video1.user.image} pk = {userData.recent_video3.pk}  user_name = {userData.recent_video3.user.name} video_name = {userData.recent_video3.name}    view_count = {userData.recent_video3.view_count}  time_difference  = {userData.recent_video3.time_difference} />
                </Box>
              </GridItem>
                </Grid>
      
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