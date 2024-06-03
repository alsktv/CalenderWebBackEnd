import { Box, HStack, Image, Text, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";

interface IProp {image:string ,
                pk: number ,
                user_name:string ,
                video_name:string ,  
                view_count:string , 
                time_difference : string ,
              }


export default function VideoDescription({image, pk , user_name ,video_name ,   view_count , time_difference } : IProp
) {
  return(
    <HStack> 
      <Image src = {image} width={"10%"} rounded={"50%"} />
      <VStack>
        <Link to={`/videos/${pk}`} ><Box ><Text > 제목:{video_name}</Text></Box> </Link>
        <Text> {user_name}</Text>
        <Text> 조회수 : {view_count.toString()} / {time_difference}</Text>
    </VStack>
  </HStack>
  )
}