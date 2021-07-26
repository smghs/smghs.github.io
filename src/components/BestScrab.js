import React,{useState,useEffect} from 'react';
import styled from 'styled-components'
import axios from 'axios'
import { FaRegComment } from "react-icons/fa";
import { BiStar } from 'react-icons/bi'

const MealData = styled.div`
    margin-left:0.5rem;
    margin-bottom:2rem;
`
const Title = styled.div`
    font-size:1.3rem;
    margin-bottom:1rem;
    margin-top:0.5rem;
    font-weight:600;
`
const HitPost = styled.div`
    position:relative;
`
const PostTitle = styled.div`
    clear:both;
    padding-top:0.4rem;
`
const Created=styled.div`
    font-size:0.85rem;
    margin-right:0.5rem;
    color:gray;
    float:left;
    padding-bottom:1rem;
`
const PostInfo = styled.div`
    float:right;
    font-size:0.9rem;
    margin-right:0.5rem;
    color:#499A9F;
`

function App() {
     let [hitList,setHitList] = useState([]);
     
     useEffect(() => {
         
    axios.post('/api/board/scrabhit').then((res)=>{
        try{
    setHitList(res.data)
    //alert(res.data)
        }catch(e){
            alert(e)
        }
}).catch((Error)=>{
    alert(Error);
})

  },[]);
  
  return (
  <>
  <MealData>
  <Title>스크랩 베스트</Title>
  {hitList.map( element => {
            return(
            <HitPost onClick={()=>{window.location.href='/ViewPost/'+element.id}}>
             <PostTitle>
             {element.title}
             </PostTitle>
              <Created>{new Date(element.createdAt).getMonth()+1}/{new Date(element.createdAt).getDate()} {new Date(element.createdAt).getHours()}:{new Date(element.createdAt).getMinutes()}</Created>
              <PostInfo><like style={{color:'#FDCD22','font-size':'1.05rem'}}><BiStar/>&nbsp;{element.star}&nbsp;</like><FaRegComment/> {element.replys.length}</PostInfo>
            </HitPost>
            )
          })}
          
          </MealData>
  </>
  )
}

export default React.memo(App);