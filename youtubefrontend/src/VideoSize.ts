export default function VideoSize(size:string){
  //상황에 따라 영상 사이즈를 다르게 적용
  if(size === "small"){
    return {width : "240" , height : "150"}
  } else if(size === "middle") {
    return {width : "360" , height : "225"}
  } else{
    return {width : "540" , height : "340"}
  }
}

