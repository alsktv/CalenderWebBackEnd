import { useParams } from "react-router-dom"
import { Box,Text } from "@chakra-ui/react"
import Video from "../Component/Video"

export default function VideoDetail(){
  const {id} = useParams()
  return(
   <Box>
     <Video />
     <Text>VideoDetail</Text>
   </Box>
  )
}