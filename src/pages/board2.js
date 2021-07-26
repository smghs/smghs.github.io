import React,{useEffect,useState} from 'react';
import styled from 'styled-components'
import { BiLike } from "react-icons/bi";
import { FaRegComment } from "react-icons/fa";
import Header from '../components/Header'
import axios from 'axios'

const BoardBlock = styled.div`
    background:white;
    width:100%;
    height:4.2rem;
    border-bottom:1.8px solid #e2e2e2;
    
`
const Title = styled.div`
    margin-left:1rem;
    margin-top:0.8rem;
    font-size:1.1rem;
    font-weight:600;
`
const Description = styled.div`
    width:calc(100% - 6rem);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-left:1rem;
    padding-top:0.2rem;
    font-size:0.85rem;
    color:#838383;
`
const Hearts = styled.div`
    float:right;
    margin-right:0.5rem;
    color:#B25148;
`
const Comments = styled.div`
    float:right;
    margin-right:0.5rem;
    color:#499A9F;
`
const BoardContainer = styled.div`
    margin-top:4rem;
`
const Time = styled.div`
    float:left;
    margin-left:1rem;
    font-size:0.8rem;
    color:#c4c4c4;
    margin-top:0.2rem;
`

function App({match}) {
    
    let [view,setView] = useState([])
    let [pagenum,setpageNum] = useState(1)
    let [isLast,setIsLast] = useState(false)
    let token = localStorage.getItem('token')
    useEffect(() => {
    if(isLast===false){
    axios({
  method: 'get',
  url: '/api/board/select2/'+match.params.category+'/'+pagenum,
  headers: {"authorization": "Bearer "+token},
  responseType: 'stream'
    })
  .then(function (response) {
    console.log(response);
    if(response.data[0]===undefined){
        setIsLast(true)
    }else{
    setView(view => [...view, ...response.data]) 
    }
  })
  .catch(function (error) {
    alert(error);
  })
    }
  }, [pagenum,match.params.category,isLast,token]);
  
  window.setTimeout(function() {    
    if(isLast===false){
    window.onscroll = function(e) {
    if((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
    setpageNum(prevNumber => prevNumber + 1);
    }
    
}
}
 }, 1000);

    const CreateTime = ({value}) => {
        const today = new Date();
        const timeValue = new Date(value);

        const betweenTime = Math.floor((today.getTime() - timeValue.getTime()) / 1000 / 60);
        if (betweenTime < 1) return '방금전';
        if (betweenTime < 60) {
            return `${betweenTime}분전`;
        }

        const betweenTimeHour = Math.floor(betweenTime / 60);
        if (betweenTimeHour < 24) {
            return `${betweenTimeHour}시간전`;
        }
        
        const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
        if (betweenTimeDay < 365) {
            return `${timeValue.getMonth()+1}/${timeValue.getDate()}`;
        }

        return `${Math.floor(betweenTimeDay / 365)}년전`;
    }

  return(
     <>

     <Header/>
     <BoardContainer>
     {view.map((element) =>
         <BoardBlock onClick={()=>{window.location.href='/ViewPost/'+element.id}}>
         <Title>{element.title}</Title>
         <Description>{element.description}</Description>
         <Time><CreateTime value={element.createdAt}/> | {element.author}</Time>
         <Comments><FaRegComment style={{'font-size':'0.9rem','margin-right':'0.1rem'}}/>{element.comments} {element.replys.length}</Comments>
          <Hearts><BiLike style={{'margin-right':'0.1rem'}}/>{element.likes.length}</Hearts>
         </BoardBlock>
        )}
        </BoardContainer>
     </> 
  )
}

export default App;