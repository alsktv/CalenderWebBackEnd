import { useQuery } from "react-query"

import { getVideos } from "../api"
import VideoSize from "../VideoSize"
import Video from "./Video"

import { Grid , GridItem , Box, Text, HStack, VStack , Image} from "@chakra-ui/react"

interface IProp {
  selectCategory:String
}

interface IVideo {
    pk:Number
    user: {
        name: string
        image: string
        subscribe_count: Number
    },
    name: string
    video:  string
    view_count: Number
    time_difference: string
    categories : {
      name:string
    }
}



export default function Videos({selectCategory}:IProp) {
  const {isLoading , data} = useQuery<IVideo[]>({queryKey:["videos"] , queryFn:getVideos})
  const filteringData  = data?.filter(item => 
    item.categories.name === selectCategory
   )


  const select = () => {
      {if(selectCategory === "전체"){
        return(data)
      } else {
        return(filteringData)
      }}
  }
  
  return(
     <Box>
      {isLoading ? <Text> loading...</Text> : 
        <Grid templateColumns='repeat(3, 1fr)' templateRows={"repeat(3,1fr)"} gap={6}>

           {select()?.map((item) => (
            <GridItem key = {item.pk.toString()}>
              
              <Video src={item.video} name={item.name} pk={item.pk} user = {item.user} view_count = {item.view_count} time = {item.time_difference} size={VideoSize("middle")} />
              <Box >
                <HStack> 
                  <Image src = {item.user.image} width={"10%"} rounded={"50%"} />
                  <VStack>
                    <Text> 제목:{item.name}</Text>
                    <Text> {item.user.name}</Text>
                    <Text> 조회수 : {item.view_count.toString()} / {item.time_difference}</Text>
                  </VStack>
                </HStack>
              </Box>
            </GridItem>
          ))}
  
        </Grid>
      }


     </Box>

  )
}