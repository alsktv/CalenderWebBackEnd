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
  size:{
    width:string
    height:string
  }
}

export default function Video ({src , name , pk , user , view_count , time , size}:IProp) {
  return (
    <Box>
      <iframe
    width={size.width}
    height={size.height}
    src={src.replace(/"/g, '')}
    title="YouTube video player"
    frameBorder="0" 
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowFullScreen
  ></iframe>


    </Box>

  )
}