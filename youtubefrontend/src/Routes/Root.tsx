import { Box , HStack, Text, useDisclosure} from "@chakra-ui/react"
import { Outlet } from "react-router-dom"
import RootHeader from "../Component/RootHeader"
import Video from "../Component/Video"
import Videos from "../Component/Videos"
import VideoShareModal from "../Component/VideoShareModal"
import Categories from "../Component/Categories"
import LeftBar from "../Component/LeftBar"

export default function Root() {
  return (
    <HStack>
      <LeftBar  />
      <Box>
      <RootHeader />
        <Outlet />
      </Box>
    </HStack>
  )
}