import { Box , Text, useDisclosure} from "@chakra-ui/react"
import { Outlet } from "react-router-dom"
import RootHeader from "../Component/RootHeader"
import Video from "../Component/Video"
import VideoShareModal from "../Component/VideoShareModal"
import Categories from "../Component/Categories"

export default function Root() {
  return (
    <Box>
      <RootHeader />
      <Categories />
      <Video />
      <Outlet />
    </Box>
  )
}