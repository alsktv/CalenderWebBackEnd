import { Box, Grid, GridItem, HStack, Image, Text, VStack } from "@chakra-ui/react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { getSearchVideos, getVideos, putRecentVideos } from "../api";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Video from "../Component/Video";
import VideoSize from "../VideoSize";

interface IVideo {
  pk: number
  user: {
      pk: number
      name: string
      subscribe_count: number
      image: string
  },
  name: string
  video: string
  view_count: number
  time_difference: string
  categories: {
      name: string
  }
}


export default function SearchResult(){
  // const [videos , setVideos] = useState<IVideo[]>()
  // const mutation = useMutation(getSearchVideos , {
  //   onSuccess:(data) => {setVideos(data)}
  // })
  
  const [searchParams] = useSearchParams();
  const search_query = searchParams.get('search_query');

  const LinkUseQuery = () => {
    if(search_query)
    return getSearchVideos(search_query)
  }

  const {isLoading:searchIsLoading , data:searchData} = useQuery({queryKey:["search_videos"] , queryFn:LinkUseQuery})

   const queryClient = useQueryClient();
  
   const mutation = useMutation(putRecentVideos, {   //제목을 눌렀을 시 최근 본 영상에 추가하기 위해 만든  mutation임
     onSuccess: () => {
       // 업데이트가 성공하면 쿼리 무효화 (갱신)
       queryClient.invalidateQueries('users');
       
     },
   });

   const searchMutation = useMutation(getSearchVideos, {   
    onSuccess: async () => {
      // 업데이트가 성공하면 쿼리 무효화 (갱신)
      await queryClient.invalidateQueries('search_query');
    },
  });

  
  const onClickTitle = (pk:Number) => (e:React.MouseEvent<HTMLDivElement>) => {
    const list:Number[] = []
    list.push(pk) 
    mutation.mutate(list)
   }

   useEffect(()=>{
    if(search_query)
    searchMutation.mutate(search_query)
  },[search_query])


  return(
    <Box>
      {searchIsLoading ? <Text>loading...</Text> :
        <Grid templateColumns='repeat(3, 1fr)' templateRows={"repeat(3,1fr)"} gap={6}>

        { searchData?.map((item:IVideo) => (
         <GridItem key = {item.pk.toString()}>
           
           <Video src={item.video} name={item.name} pk={item.pk} user = {item.user} view_count = {item.view_count} time = {item.time_difference} size={VideoSize("middle")} />
           <Box >
             <HStack> 
               <Image src = {item.user.image} width={"10%"} rounded={"50%"} />
               <VStack>
                 <Link to={`/videos/${item.pk}`} ><Box onClick={onClickTitle(item.pk)}><Text > 제목:{item.name}</Text></Box> </Link>
                 <Text> {item.user.name}</Text>
                 <Text> 조회수 : {item.view_count.toString()} / {item.time_difference}</Text>
               </VStack>
             </HStack>
           </Box>
         </GridItem>
       ))}

     </Grid>
      
      }
    </Box>
  )
}