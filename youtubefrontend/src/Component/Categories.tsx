import { Tabs, TabList, TabPanels, Tab, TabPanel , Box , Text, Button, HStack } from '@chakra-ui/react'
import  {getCategories } from '../api';
import axios from 'axios';
import { useQuery  } from 'react-query'; {/* 반드시 react-query에서 import 해야 함. 추가로 api 관리시 api.ts 를 src안에 만들어서 따로 관리하는 것이 좋음 */}
{/* 이 컴포넌트는 header에 있는 카테고리 버튼을 만드는 컴포넌트임. */}


interface Icategory {
  name:string
  pk:number
}

  export default function() {
    const {isLoading, data} = useQuery<Icategory[]>({queryKey:["categories"] , queryFn:getCategories}) 

    return (
      <HStack>
         {data?.map((item) =>(
           <Button key={item.pk}> {item.name}</Button>
         ))}
      </HStack>
   )
 }
  

