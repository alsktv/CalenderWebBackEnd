import { Link, Outlet } from "react-router-dom";
import {Box ,Text} from '@chakra-ui/react';
import React from 'react';
import { useState } from 'react';
import FCalendar from "../Components/Home/Calender";
import FTopBar from "../Components/Home/TopBar";


export default function Home() {

  return(
    <Box>
      <FTopBar />
      <FCalendar />
      <Outlet />
    </Box>
  )
}