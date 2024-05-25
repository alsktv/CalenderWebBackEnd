import { Box,HStack,Text , Image, VStack } from "@chakra-ui/react"
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom"

interface IProp {
  src:string
  name: string
  pk: Number
  user: {
    name: string
    image: string
    subscribe_count: Number
}
  view_count : Number 
  time: string
}

export default function Video ({src,name,pk,user,view_count,time}:IProp) {
  return (
    <Box>
      <iframe
    width="360"
    height="225"
    src={src.replace(/"/g, '')}
    title="YouTube video player"
    frameBorder="0" 
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowFullScreen
  ></iframe>
    <Box >
      <HStack> 
        <Image src = {user.image} width={"10%"} rounded={"50%"} />
        <VStack>
          <Text> 제목:{name}</Text>
          <Text> {user.name}</Text>
          <Text> 조회수 : {view_count.toString()} / {time}</Text>
        </VStack>
      </HStack>
    </Box>

    </Box>

  )
}