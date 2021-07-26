import React,{useEffect,useState} from 'react';
import styled from 'styled-components'
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
    float:left;
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
const New  = styled.div`
    background:red;
    float:right;
    margin-right:1rem;
    color:white;
    width:0.6rem;
    height:0.6rem;
    line-height:0.6rem;
    padding:0.3rem;
    text-align:center;
    font-size:0.7rem;
    border-radius:1rem;
    font-weight:800;
`

function App({match}) {
    
    let [view,setView] = useState([])
    let [pagenum,setpageNum] = useState(1)
    let [isLast,setIsLast] = useState(false)
    useEffect(() => {
    if(isLast===false){
    axios({
  method: 'get',
  url: '/api/board/notiselect/'+pagenum,
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
  }, [pagenum,match.params.category,isLast]);
  
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
            return `${timeValue.getHours()}:${timeValue.getMinutes()}`;
        }
        
        const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
        if (betweenTimeDay < 365) {
            return `${timeValue.getMonth()+1}/${timeValue.getDate()}`;
        }

        return `${Math.floor(betweenTimeDay / 365)}년전`;
    }
    const IsNew = ({value}) => {
        var sdt = new Date();
        var edt = new Date(value);
        var dateDiff = Math.ceil((edt.getTime()-sdt.getTime())/(1000*3600*24));
        if(dateDiff >= 5){
            return null
        }
        return <New>N</New>
    }
  return(
     <>

     <Header title="공지사항" link='/boardlist'/>
     <BoardContainer>
     {view.map((element) =>
         <BoardBlock onClick={()=>{window.location.href='/ViewNoti/'+element.id}}>
         <Title>{element.title}</Title>
         <Description>{element.description.replace(/<br\/>/ig, "\n").replace(/<(\/)?([a-zA-Z]*)(\s[a-zA-Z]*=[^>]*)?(\s)*(\/)?>/ig, "")}</Description>
         <IsNew value={element.createdAt}></IsNew>
         <Time><CreateTime value={element.createdAt}/> | {element.author}</Time>
         </BoardBlock>
        )}
        </BoardContainer>
       
     </> 
  )
}

export default App;