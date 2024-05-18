import { Box,Text } from "@chakra-ui/react"
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom"

export default function Video () {

  return (
    <Box>
      <iframe
    width="560"
    height="315"
    src="https://www.youtube.com/embed/ds0Uhi_iVDQ?si=w8UcJOT8YPg2Cqen"
    title="YouTube video player"
    frameBorder="0" 
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowFullScreen
  ></iframe>
  <Link to={"video/1"}>
  <Text>제목 :  fdfd</Text>
  </Link>
    </Box>

  )
}