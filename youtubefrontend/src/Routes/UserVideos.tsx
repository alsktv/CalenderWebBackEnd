import { Box, Grid, GridItem, Text } from "@chakra-ui/react";
import { useQuery } from "react-query";
import { getUserDetail } from "../api";
import { useParams } from "react-router-dom";
import Video from "../Component/Video";
import VideoDescription from "../Component/Video_description";
import VideoSize from "../VideoSize";


interface IVideo {
      pk: number
      user: number
      name: string
      video: string
      view_count: number
      time_difference: string
      created_at: Date

    }


export default function UserVideos(){

  const {userPk} = useParams()
  const pk = Number(userPk)

  const connectGetUser = () => {
    return getUserDetail(pk)
  }

  const {isLoading , data} = useQuery({queryKey:["user_detail"] , queryFn:connectGetUser})


  return(
    <Box>
      {isLoading ? <Text>loading... </Text> :
            <Grid templateColumns='repeat(3, 1fr)' templateRows={"repeat(3,1fr)"} gap={6}>

            {data?.videos.map((item:IVideo) => (
             <GridItem key = {item.pk.toString()}>
               
               <Video src={item.video} name={item.name} pk={item.pk} user = {data?.name} view_count = {item.view_count} time = {item.time_difference} size={VideoSize("middle")} />
               <Box >
                 <VideoDescription image={data?.image} pk={item.pk} user_name={data?.name} video_name={item.name}   view_count={item.view_count.toString()} time_difference = {item.time_difference} user_pk={data?.pk}/>
               </Box>
             </GridItem>
           ))}
   
         </Grid>
      }
    </Box>
  )
}