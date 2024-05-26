import { Outlet } from "react-router-dom"

import RootHeader from "../Component/RootHeader"
import LeftBar from "../Component/LeftBar"

import { Box , HStack} from "@chakra-ui/react"

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