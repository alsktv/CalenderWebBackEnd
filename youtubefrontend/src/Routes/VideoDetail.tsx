import { Box, HStack, VStack, Text , Image, Button} from "@chakra-ui/react";
import Video from "../Component/Video";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { getVideos } from "../api";
import VideoSize from "../VideoSize";
import { getVideoDetail } from "../api";

interface IVideo {
  pk: Number
  user: {
      pk: Number
      name: string
      subscribe_count: Number
      image: string
  }
  name:string
  view_count: Number
  like_count: Number
  review_count: Number
  categories: {
      name: string
  }
  time_difference: string
  video:string
}


export default function VideoDetail(){
  const {videoPk} = useParams()
  const getDetail = () => {     // 이거는 useQuery의 queryFn에 넣기 위한 매개함수임
    return getVideoDetail(Number(videoPk))
  }

  const {isLoading:videoIsLoading , data:videoData} = useQuery<IVideo>({queryKey:["videoDetail"] , queryFn:getDetail})
  return (
    <Box>
      {videoIsLoading ? <Text> loading...</Text> : 
          <Box>
            {videoData ? 

           <HStack>
          <VStack>
            <Video src={videoData.video} name={videoData.name} pk={videoData.pk} user = {videoData.user} view_count = {videoData.view_count} time = {videoData.time_difference} size={VideoSize("large")} /> 
            <VStack>
              <Text> {videoData.name}</Text>

             {/*제목 밑 두번제 박스 */}
               <HStack>  

                <HStack>
                  <Image src={videoData.user.image} w={10} rounded={"50%"}></Image>
                  <VStack>
                    <Text> {videoData.user.name}</Text>
                    <Text>구독자:{videoData.user.subscribe_count.toString()}</Text>
                  </VStack>
                </HStack>

                <Button> </Button>
              </HStack>
            </VStack>
          </VStack>
        </HStack> 
            :<Text> video does not exist</Text>
            }
          </Box>

        
      

      
      }
    </Box>
     )
}  