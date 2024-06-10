import { useParams } from "react-router-dom";
import { useQueryClient , useQuery , useMutation } from "react-query";

import { getShorts, getUser , getUserDetail, getVideos, PutSubscribe } from "../api";

import { Button, Text, useBreakpointValue } from "@chakra-ui/react";


export  function SubscribeButton() {
  const queryClient = useQueryClient();
  

  const mutation = useMutation(PutSubscribe, {
    onSuccess: () => {
      // 업데이트가 성공하면 쿼리 무효화 (갱신)
      queryClient.invalidateQueries('users');
    },
  });

  const {shortPk , videoPk , userPk} = useParams();
  const s_pk = Number(shortPk)
  const v_pk = Number(videoPk)
  const u_pk = Number(userPk)

  const {isLoading:userIsLoading , data:userData} = useQuery({
    queryKey:["users"] ,
    queryFn:getUser ,
  })
  const {isLoading:shortIsLoading , data:shortData} = useQuery({
    queryKey:["shorts"] ,
    queryFn:getShorts ,
  })
  const {isLoading:videoIsLoading , data:videoData} = useQuery({
    queryKey:["videos"] ,
    queryFn:getVideos,
  })

  const userDetail = () => {
    getUserDetail(Number(userPk))
  }
  const {isLoading:userDatailIsLoading , data:userDetailData} = useQuery({
    queryKey:["videos"] ,
    queryFn:userDetail,
  })


  
  const cheakSubscribe = () => {
    if(shortPk){
      
      if(userData){
        for(let i=0 ; i < userData.subscribe.length ;i++){ 
          //console.log(userData.subscribe)
          if(userData.subscribe[i].pk ===  shortData?.[s_pk-1].user.pk){
            //console.log("working")
            return("구독중")
          }
        }
        return("구독")
      }
      console.log(" no userData")
    }
    else if(videoPk) {
      if(userData){
        for(let i=0 ; i < userData.subscribe.length ;i++){ 
          if(userData.subscribe[i].pk ===  videoData?.[v_pk-1].user.pk){
            //console.log("working")
            return("구독중")
          }
        }
        return("구독")
      }
     console.log(" no userData")
    }
    else if(userPk) {
      if(userData){
        for(let i=0 ; i < userData.subscribe.length ;i++){ 
          if(userData.subscribe[i].pk ===  Number(userPk)){
            return("구독중")
          }
        }
        return("구독")
      }
      console.log(" no userData")
    }
     else{
     console.log("pk does not exist")
     return(<Text>pk does not exist</Text>)
     }
    }

  const onClickSubscribe =  async() =>{  
      //put요청을 처리하는 함수
      console.log("working")
    if(shortPk){
      try{
        const list : Number[] = []
    
        if (shortData){
          list.push(shortData?.[s_pk-1].user.pk)
        }
        await mutation.mutate(list);
        //PutSubscribe(list)
      } catch(error){
        console.log(error)
      }
    } else if (videoPk) {
      try{
        const list : Number[] = []
    
        if (videoData){
          list.push(videoData?.[v_pk-1].user.pk)
        }
        await mutation.mutate(list);
        //PutSubscribe(list)
      } catch(error){
        console.log(error)
      }
    }  else if (userPk) {    //userDetail에서 구독 버튼을 눌렀을 때 처리하는 식
      try{   
        const list : Number[] = []
        list.push(Number(userPk))

        await mutation.mutate(list);
        console.log(list)
      } catch(error){
        console.log(error)
      }
    } 
    else {
      console.log("pk does not exist")
    }
  }
    if(!userIsLoading && !videoIsLoading && !shortIsLoading  && !userDatailIsLoading){
    return <Button onClick={onClickSubscribe}> {cheakSubscribe()}</Button>
  }
   return (<Text>fff</Text>)
  }

