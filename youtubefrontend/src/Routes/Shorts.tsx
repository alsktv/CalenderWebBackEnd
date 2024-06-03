import { useEffect , useState } from "react";
import { useQuery ,useMutation , useQueryClient } from "react-query";
import { useParams , useNavigate } from "react-router-dom";

import { AiFillLike , AiFillDislike } from "react-icons/ai";
import { MdMessage } from "react-icons/md";
import { FaShare , FaArrowUp ,  FaLongArrowAltDown} from "react-icons/fa";
import { CiMenuKebab } from "react-icons/ci";

import { getUser , PutSubscribe , getShorts } from "../api";
import { SubscribeButton } from "../Component/SubscribeButton";

import { Box, HStack, VStack , Image, Text , Button  } from "@chakra-ui/react";



interface IShort {
  
    pk: number
    user: {
        pk:Number
        name: string
        image: string
        subscribe_count: Number
    }
    name: string
    video: string
    view_count: Number
    time_difference: string
    categories: {
        pk: Number
        name: string
    }
    review_count:Number
}



export default function Shorts() {

 const [IsSubscribe, setIsSubscribe] = useState<boolean>()

 const {shortPk} = useParams();
 const pk= Number(shortPk);

 const navigate = useNavigate();

 const {isLoading, data} = useQuery<IShort[]>({
    queryKey:["short"] ,
    queryFn:getShorts ,
})
 const {isLoading:userIsLoading , data:userData} = useQuery({
    queryKey:["users"] ,
    queryFn:getUser ,
  })


const onClickUpDown = (arrow:string) => (event: React.MouseEvent<HTMLButtonElement>) => {
  if(arrow === "up" && pk !== 1){
    navigate(`/shorts/${pk-1}`)
  }else if(arrow === "down" && pk !== data?.length){
    navigate(`/shorts/${pk+1}`)
  } else{
    navigate(`/shorts/${pk}`)
  }
}


  return(
        <Box>

      {isLoading &&  userIsLoading
 ? <Text> loading...</Text> :
      <HStack> 
        <VStack>
          <iframe
            width="360"
            height="225"
            src={data?.[pk-1]?.video.replace(/"/g, '')} //pk-1을 해야됨. 왜냐하면 리스트는 0부터 시작하기 때문이다. 그리고 ""가 추가되어 있으면 에러가 나기 때문에 ""붙여줘야함.
            title="YouTube video player"
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
    ></iframe>
          <Box textAlign={"center"}>

            <HStack>

              <Image src={data?.[pk-1]?.user.image} w={"5%"} rounded={"50%"}/>
              <Text>{data?.[pk-1]?.user.name}</Text>
              <SubscribeButton />
            </HStack>

          </Box>

        </VStack>

        <VStack>

          <VStack>   
            <Button rounded={"50%"}><AiFillLike /></Button>
            <Text>좋아요</Text>
          </VStack>

          <VStack> 
            <Button rounded={"50%"}><AiFillDislike /></Button>
            <Text>싫어요</Text>
          </VStack>

          <VStack> 
            <Button rounded={"50%"}> <MdMessage /></Button>
            <Text>{data?.[pk-1]?.review_count.toString()}</Text>
          </VStack>

          <VStack> 
            <Button rounded={"50%"}><FaShare /></Button>
            <Text>공유</Text>
          </VStack>

           <Button rounded={"50%"}> <CiMenuKebab /> </Button>
          </VStack>

          <VStack>
            <Button my={200} onClick={onClickUpDown("up")}> <FaArrowUp /> </Button>   
            <Button onClick={onClickUpDown("down")}> < FaLongArrowAltDown /> </Button> 
          </VStack>

        </HStack>  
}
</Box>
) }

