import { Box, HStack, VStack, Text , Image, Button, Heading, Input} from "@chakra-ui/react";
import Video from "../Component/Video";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { getVideos  , getUser, getReviews} from "../api";
import VideoSize from "../VideoSize";
import { getVideoDetail } from "../api";
import {SubscribeButton} from "../Component/SubscribeButton";
import { useState } from "react";

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
  description:string
}

interface IReview  {
         user: {
             name: string
             image: string
         }
         text: string
         time_difference:string
       }

export default function VideoDetail(){
  const {videoPk} = useParams()
  const getDetail = () => {     // 이거는 useQuery의 queryFn에 넣기 위한 매개함수임
    return getVideoDetail(Number(videoPk))
  }

   const getVideoReview = () => {
     return getReviews(Number(videoPk))
   }

    const {isLoading:reviewsIsLoading , data:reviewsData} = useQuery({queryKey:["reviews"] , queryFn:getVideoReview})

  const [inputValue,setInputValue] = useState<string>()

  const {isLoading:videoIsLoading , data:videoData} = useQuery<IVideo>({queryKey:["videoDetail"] , queryFn:getDetail})

  const  {isLoading:userIsLoading , data:userData} = useQuery({queryKey:["profile"] , queryFn:getUser})



  const  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value)
  }

 
  return (
    <Box>
      {videoIsLoading && userIsLoading && reviewsIsLoading? <Text></Text> : 
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
                    <SubscribeButton />
                  </HStack>
                   
                  <HStack w={"90%"}>    {/* 좋아요, 싫어요 등이 있는 HStack */}
                    <Button> 좋아요:{videoData.like_count.toString()}</Button>
                    <Button>공유</Button>
                    <Button>오프라인 공유</Button>
                    <Button>Thanks</Button>
                    <Button>클립</Button>
                    <Button>...</Button>
                  </HStack>

                  <Box w={"90% "}   h={300}     borderWidth="1px" 
                  borderRadius="md" 
                   boxShadow="md"
                   borderColor="gray.200">
                  {videoData.description}
                  </Box>
                  
                  <Heading> 댓글 수:{videoData.review_count.toString()}</Heading>

                         
                  <VStack>
                    {
                    reviewsData.map(
                      (item:IReview) => (
                      <HStack>
                        <Image src={item.user.image} w={10} rounded={"50%"}/>
                        <VStack>
                          <HStack>
                            <Text>{item.user.name}</Text>
                            <Text>{item.time_difference}</Text>
                          </HStack>
                            <Text>{item.text}</Text>
                        </VStack>
                      </HStack>              
                  ) )
                    }
                  </VStack> 
                 
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