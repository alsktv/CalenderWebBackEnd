import { Box, HStack, Image, Text, VStack ,Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import { Link, useParams } from "react-router-dom";

import { getUserDetail } from "../api";
import { useQuery } from "react-query";
import { SubscribeButton } from "../Component/SubscribeButton";
import UserFeatured from "./UserFeatured";
import UserVideos from "./UserVideos";


export default function UserDetail(){
  const {userPk} = useParams()
  const pk = Number(userPk)

  const getDetail = () => {     // 이거는 useQuery의 queryFn에 넣기 위한 매개함수임
    return getUserDetail(pk)
  }
  const {isLoading:userIsLoading , data:userData} = useQuery({queryKey:["user_detail"] , queryFn:getDetail})

  return(
    <Box>
      {userIsLoading ? <Text>loading....</Text>:
      <VStack>
        <HStack>
          <Image src={userData?.image} w={"10%"} rounded={"50%"}></Image>
          <VStack>
            <Text>{userData.name}</Text>
            <Text>{userData.email}. 구독자:{userData.subscribe_count} </Text>
            <SubscribeButton />
          </VStack>
        </HStack>

        <Tabs right={50}>
            <TabList>
              <Link to={"featured"}><Tab>홈</Tab></Link>
              <Link to={"videos"}><Tab>동영상</Tab></Link>
            </TabList>

            <TabPanels>
              <TabPanel>
                <UserFeatured />
              </TabPanel>
              <TabPanel>
                <UserVideos />
              </TabPanel>
            </TabPanels>
          </Tabs>
      </VStack>
      }
    </Box>
  )
}