import { Grid, GridItem, Text, VStack , Box, Image, HStack} from "@chakra-ui/react";
import { useMutation, useQuery } from "react-query";
import { getUser, getVideoDetail } from "../api";
import { useEffect , useState} from "react";
import Video from "../Component/Video";
import VideoSize from "../VideoSize";
import { Link } from "react-router-dom";
import VideoDescription from "../Component/Video_description";

interface IVideo {
  user: IUser
  name: string
  video: string
  view_count: Number
  time_difference: string
  created_at:Date
  pk:number
}

interface IUser{
  
    name: string
    image: string
    subscribe_count: Number
    pk:number
}

export default function FeedSubscription() {
   const {isLoading:userIsLoading , data:userData} = useQuery({queryKey :["users"] , queryFn:getUser})

   const mutation = useMutation(getVideoDetail , {
    onSuccess : (data) => {video_user_list.push(data.user)}
   })

   //let sorted_list:IVideo [] = []    //정렬 된 리스트가 들어가는 변수
   const [sortedList , setSortedList] = useState<IVideo[]>([])

     //유저가 구독한 사람의 영상을 담는 리스트
   const [videoList , setVideoList] = useState<IVideo[]>()

   const video_user_list:IUser[] = []


   const makeVideoList = () => {

    const video_list :IVideo [] = []

    for(let i=0 ; i < userData.subscribe.length; i++){
     for (let k=0 ; k< userData.subscribe[i].videos.length ; k++){
      video_list.push(userData.subscribe[i].videos[k])
     }
    }
    
   //리스트를 시간 순으로 정렬한 리스트
     if(video_list){
      setSortedList([...video_list].sort((a,b) => new Date(b?.created_at).getTime() - new Date(a?.created_at).getTime()) )
     }
     
   }

   const create_video_user = () => {
    for (let i=0 ; i < sortedList.length ; i++){
     mutation.mutate(sortedList[i].pk)
    }

   }

   //함수가 의도치 않게 계속 반복된다면, useEffect를 사용해야 한다.
   useEffect(()=>{
    if(!userIsLoading){
      makeVideoList()
    }
   },[userData])

   useEffect(()=>{
    if(!userIsLoading){
      create_video_user()
    }
   },[sortedList])



  return(
    <Box>
      {userIsLoading ? <Text></Text>:
      <VStack>
        <Text> 최신 순</Text>
              <Grid templateColumns='repeat(5, 1fr)' templateRows={"repeat(3,1fr)"} gap={6}>

              {sortedList?.map((item:IVideo , index:number) => (
                
               <GridItem key = {item.pk.toString()}>
                 
                 <Video src={item?.video} name={item?.name} pk={item?.pk} user = {video_user_list[index]} view_count = {item?.view_count} time = {item?.time_difference} size={VideoSize("middle")} />

                 <VideoDescription image={item?.user.image} pk={item?.pk} user_name={item?.user.name} video_name={item?.name}   view_count={item?.view_count.toString()} time_difference = {item?.time_difference} user_pk={item.user.pk}/>
                </GridItem>
             ))} 
     
           </Grid> 
        </VStack>
      
     }

</Box>
  )
}