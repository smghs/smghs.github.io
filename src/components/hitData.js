import React,{useState,useEffect} from 'react';
import styled from 'styled-components'
import axios from 'axios'
import { BiLike } from "react-icons/bi";
import { FaRegComment } from "react-icons/fa";

const MealData = styled.div`
    margin-left:0.5rem;
`
const Title = styled.div`
    font-size:1.3rem;
    font-weight:600;
    margin-bottom:1rem;
    margin-top:0.5rem;
`
const Avatar = styled.div`
    width:2rem;
    height:2rem;
    position:relative;
    float:left;
    clear:both;
`
const HitPost = styled.div`
    margin-bottom:1rem;
    position:relative;
    padding-bottom:1rem;
`
const Author = styled.div`
    margin-left:0.5rem;
    float:left;
    font-weight:600;
`
const PostTitle = styled.div`
    clear:both;
    padding-top:0.4rem;
    font-weight:600;
`
const Discription = styled.div`
    margin-top:0.2rem;
    font-size:0.95rem;
    width:60%;
`
const Created=styled.div`
    float:right;
    font-size:0.85rem;
    margin-right:0.5rem;
    color:gray;
`
const Category = styled.div`
    font-size:0.8rem;
    margin-top:0.2rem;
    color:gray;
    float:left;
    height:2rem;
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
         
    axios.post('/api/board/livehit').then((res)=>{
        try{
    setHitList(res.data)
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
  <Title>실시간 인기글</Title>
  {hitList.map( element => {
            return(
            <HitPost onClick={()=>{window.location.href='/ViewPost/'+element.id}}>
             <Avatar><img src='https://www.keypointintelligence.com/img/anonymous.png' style={{'position':'absolute','width':'100%','height':'100%'}} alt="avatar"/></Avatar>
             <Created>{new Date(element.createdAt).getMonth()+1}/{new Date(element.createdAt).getDate()} {new Date(element.createdAt).getHours()}:{new Date(element.createdAt).getMinutes()}</Created>
             <Author>{element.author}</Author>
             <PostTitle>
             {element.title}
             </PostTitle>
             <Discription>
             {element.description}
             </Discription>
             <div>
              <PostInfo><like style={{color:'#B25148'}}><BiLike/>&nbsp;{element.like}&nbsp;</like><FaRegComment/> {element.replys.length}</PostInfo>
             <Category>자유게시판</Category>
            
             </div>
            </HitPost>
            )
          })}
          </MealData>
  </>
  )
}

export default React.memo(App);