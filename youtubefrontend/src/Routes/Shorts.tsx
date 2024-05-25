import { Box, HStack, Image, Text , Button, VStack } from "@chakra-ui/react";
import { getShorts } from "../api";
import { useQuery,useMutation, useQueryClient  } from "react-query";
import { useEffect, useState } from "react";
import { AiFillLike , AiFillDislike } from "react-icons/ai";
import { MdMessage } from "react-icons/md";
import { FaShare ,FaArrowUp ,  FaLongArrowAltDown} from "react-icons/fa";
import { CiMenuKebab } from "react-icons/ci";
import { useParams } from "react-router-dom";
import { getUser } from "../api";
import { PutSubscribe } from "../api";
import { Link,useNavigate} from "react-router-dom";


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
 const {isLoading:userIsLoading , data:userData} = useQuery({queryKey:["users"] , queryFn:getUser } )
 const {isLoading, data} = useQuery<IShort[]>({queryKey:["short"] , queryFn:getShorts})
 const {shortPk} = useParams();
 const pk= Number(shortPk)
 const navigate = useNavigate()
  

  const queryClient = useQueryClient();

    // 데이터 업데이트 뮤테이션
  const mutation = useMutation(PutSubscribe, {
    onSuccess: () => {
      // 업데이트가 성공하면 쿼리 무효화 (갱신)
      queryClient.invalidateQueries('users');
    },
  });
    
const CheakSubscribe =   () =>{     //사용자가 short의 영상 주인을 구독했는지를 판단할 수 있는 함수. 구독이 되어있다면 true를, 아니면 false를 반환한다. userData는 로그인 된 유저, pk 는 영상 주인의 user모델에 있는 pk값임
  
    if(userData){
      for(let i=0 ; i < userData.subscribe.length ;i++){ 
        if(userData.subscribe[i].pk === data?.[pk-1].user.pk){
          //console.log("working")
          setIsSubscribe(true)
          return(true)
        }
      }
      setIsSubscribe(false)
      return(false)
    }
    console.log(" no userData")
  }

  useEffect(() => {
    // userData가 정의되었을 때에만 실행
    if (userData) {
      CheakSubscribe();
    }
  }, [userData]);

 // '{ name: string; image: string; subscribe_count: Number; }' 형식에 '{ name: string; image: string; subscribe_count: Number; }[]' 형식의 length, pop, push, concat 외 35개 속성이 없습니다.ts(2740)  이거는 리스트를 줘야하는 상황에 단일 값을 줬을 때 발생하는 에러임
const onClickSubscribe =  async() =>{
  try{
    const list : Number[] = []

    if (data){
      list.push(data?.[pk-1].user.pk)
    }
    await mutation.mutate(list);
    //PutSubscribe(list)
  } catch(error){
    console.log(error)
  }

  CheakSubscribe()
  console.log("ISsubscribe",IsSubscribe)
}

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
      src={data?.[pk-1]?.video.replace(/"/g, '')}
      title="YouTube video player"
      frameBorder="0" 
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    ></iframe>
    <Box textAlign={"center"}>
    <HStack>
      
        <Image src={data?.[pk-1]?.user.image} w={"5%"} rounded={"50%"}/>
    <Text>{data?.[pk-1]?.user.name}</Text>
    <Button onClick={onClickSubscribe}> {IsSubscribe ? "구독" : "구독중"} </Button>
     {/**/}
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

