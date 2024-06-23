import { Link, Outlet } from "react-router-dom";
import {Box ,HStack,Text} from '@chakra-ui/react';
import React from 'react';
import { useState } from 'react';
import FCalendar from "../Components/Home/Calender";
import FTopBar from "../Components/Home/TopBar";
import FTotalMemo from "../Components/Home/TotalMemo";


export default function Home() {

  return(
    <HStack>
      <Box>
        <FTopBar />
        <FCalendar />
      </Box>
      <Outlet />
      <FTotalMemo />
    </HStack>

  )
}