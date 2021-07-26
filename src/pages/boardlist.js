import React from 'react';
import styled,{ createGlobalStyle } from 'styled-components'
import BottomBar from '../components/BottomBar'
import CategoryBlock from '../components/Category'
import {AiFillFire} from "react-icons/ai"
import {AiFillLike} from "react-icons/ai"
import {BsStarFill} from "react-icons/bs"
import {FaPencilAlt} from 'react-icons/fa'
import {AiOutlinePushpin} from "react-icons/ai"

const GlobalStyle = createGlobalStyle`
  body {
    background:#fff;
  }
`;
const MyBoard = styled.div`
    width:95%;
    background:white;
    border-radius:1rem;
    margin:0 auto;
    margin-top:1.5rem;
    padding-top:1rem;
    padding-bottom:1rem;
    border:2px solid #e2e2e2;
`;
const Category = styled.div`
    font-size:1.1rem;
    margin-top:1rem;
    margin-bottom:1rem;
    margin-left:1rem;
`
const PageTitle = styled.div`
    height:2rem;
    font-size:1.8rem;
    margin-left:1.5rem;
    margin-top:1rem;
    font-weight:600;
    margin-bottom:1rem;
`

function App() {
  return(
     <>
     <GlobalStyle/>
     <PageTitle>게시판</PageTitle>
    <MyBoard>
    <Category onClick={()=>{window.location.href="board2/100"}}><FaPencilAlt style={{color:"#587BAC","margin-right":"1rem"}}/>내가 쓴 글</Category>
    <Category onClick={()=>{window.location.href="board2/200"}}><BsStarFill style={{color:"#FECC1E","margin-right":"1rem"}}/>스크랩</Category>
     <Category onClick={()=>{window.location.href="board2/300"}}><AiFillLike style={{color:"#6CDDC4","margin-right":"1rem"}}/>좋아요 한 게시물</Category>
      <Category onClick={()=>{window.location.href="board2/400"}}><AiFillFire style={{color:"#FE978A","margin-right":"1rem"}}/>HOT 게시판</Category>
    </MyBoard>
     <MyBoard style={{'margin-bottom':'1rem'}}>
    <Category onClick={()=>{window.location.href="board/100"}}><AiOutlinePushpin style={{"margin-right":"1rem"}} />자유게시판</Category>
    <Category onClick={()=>{window.location.href="/board/grade"}}><AiOutlinePushpin style={{"margin-right":"1rem"}}/>학년게시판</Category>
     <Category onClick={()=>{window.location.href="board/300"}}><AiOutlinePushpin style={{"margin-right":"1rem"}} />홍보게시판</Category>
      <Category onClick={()=>{window.location.href="board/400"}}><AiOutlinePushpin style={{"margin-right":"1rem"}} />정보게시판</Category>
    </MyBoard>
    <CategoryBlock/>
    <BottomBar page='board'/>
     </> 
  )
}

export default App;