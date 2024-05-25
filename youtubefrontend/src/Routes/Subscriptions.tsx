import { DEFAULT_ECDH_CURVE } from "tls";
import { getUser } from "../api";
import { useQuery } from "react-query";
import { Box, Text } from "@chakra-ui/react";

export default function Subscriptions() {
  const {isLoading:userIsLoading , data:userData} = useQuery({queryKey:["users"] , queryFn:getUser } )
  {userIsLoading ? console.log("ff") :
  console.log(userData.subscribe)
 }
 
  return(
     <Box>
       {userIsLoading ? <Text> loading...</Text> :
        <Text>fff</Text>
       }
     </Box>
  )
}