import { Box, HStack, Image, Text, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";

interface IProp {image:string ,
                pk: number ,
                user_name:string ,
                video_name:string ,  
                view_count:string , 
                time_difference : string ,
                user_pk:number,
              }

// 영상 밑에 있는 유저, 영상에 관한 설명을 만드는 컴포넌트
export default function VideoDescription({image, pk , user_name ,video_name ,   view_count , time_difference , user_pk} : IProp
) {
  return(
    <HStack> 
      <Link to={`/users/${user_pk}`}><Image src = {image} width={20} rounded={"50%"} /></Link>
      <VStack >
        <Link to={`/videos/${pk}`} ><Box ><Text > 제목:{video_name}</Text></Box> </Link>
        <Text> {user_name}</Text>
        <Text> 조회수 : {view_count.toString()} / {time_difference}</Text>
    </VStack>
  </HStack>
  )
}