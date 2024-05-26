import { Link } from "react-router-dom"

import { Box,Text,Button } from "@chakra-ui/react"

export default function NotFound() {
  return(
    <Box>
      <Text> page not found</Text>
      <Link to={"/"}> <Button> go home</Button></Link>
    </Box>
  )
}