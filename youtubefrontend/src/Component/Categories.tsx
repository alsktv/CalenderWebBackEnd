import { Tabs, TabList, TabPanels, Tab, TabPanel , Box , Text, Button, HStack } from '@chakra-ui/react'
import  {getCategories } from '../api';
import { useState  } from 'react';
import axios from 'axios';
import Video from './Video';
import Videos from './Videos';
import { useQuery  } from 'react-query'; {/* 반드시 react-query에서 import 해야 함. 추가로 api 관리시 api.ts 를 src안에 만들어서 따로 관리하는 것이 좋음 */}
{/* 이 컴포넌트는 header에 있는 카테고리 버튼을 만드는 컴포넌트임. */}



interface Icategory {
  name:string
  pk:number
}

  export default function() {
    const {isLoading, data} = useQuery<Icategory[]>({queryKey:["categories"] , queryFn:getCategories}) 

    const [selectCategory , setSelectCategory] = useState<String>("전체")

    const onClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
      const target = e.target as HTMLButtonElement;
      setSelectCategory(target.innerText);
      console.log(typeof target.innerText)
      
    }
    // {onClick={onClick} 처럼 써야하고, onClick()이렇게 쓰면 안됨}
    return (
      <Box>
          {isLoading ? <Text> loading...</Text> :
          <Box>
                     <HStack>
          <Button onClick={onClick} bg={selectCategory === "전체" ? "blue.400" : "white.100"} > 전체</Button>
          {data?.map((item) =>(
            <Button onClick={onClick} key={item.pk} bg={selectCategory === item.name ? "blue.400": "white:100"} > {item.name} </ Button>
          ))}
       </HStack>
 
       <Videos selectCategory = {selectCategory} />
          </ Box >
        }
      </Box>
       
   )  
 }
  

