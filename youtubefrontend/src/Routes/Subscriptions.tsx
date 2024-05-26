import { useQuery } from "react-query";

import { getUser } from "../api";
import Video from "../Component/Video";
import VideoSize from "../VideoSize";

import { Box, Grid, GridItem, Text } from "@chakra-ui/react";


interface IVideo {
  name:string
  user: Number
  video:string
  view_count:Number
  time_difference: string
}

interface IUser {
  image:string
  name:string
  pk:Number
  subscribe_count:Number
  videos:IVideo[]
}

export default function Subscriptions() {
  const {isLoading:userIsLoading , data:userData} = useQuery({queryKey:["users"] , queryFn:getUser } )
 
  return(
     <Box>
       {userIsLoading ? <Text> loading...</Text> :
             <Box>
             
              <Grid templateColumns='repeat(3, 1fr)' templateRows={"repeat(3,1fr)"}   gap=  {6}>
       
                  {
                  userData.subscribe?.map((item:IUser) => (

                    item.videos?.map((video:IVideo) => (
                      <GridItem>

                        <Video src={video.video} name={video.name} pk={video.user} user = {item} view_count = {video.view_count} time = {video.time_difference} size = {VideoSize("small")} />

                      </GridItem>
                    ))
                 )) 
                 }
         
              </Grid>
            </Box>
       }
     </Box>
  )
}