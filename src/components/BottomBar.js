import React from 'react';
import styled from 'styled-components';
import {AiOutlineHome} from "react-icons/ai"
import {AiOutlineBell} from 'react-icons/ai'
import {AiOutlineMail} from 'react-icons/ai'
import {CgProfile} from 'react-icons/cg'
import {RiDashboardLine} from 'react-icons/ri'

const BottomBlock = styled.div`
    width:100vw;
    height:3.5rem;
    background:white;
    position:fixed;
    bottom:0;
    line-height:4.5rem;
    text-align:center;
    color:#d2d2d2;
    border-top:3px solid #e2e2e2;
`;

function BottomBar({page}) {
    //alert(page)
  return (
      <>
     <BottomBlock>
        <AiOutlineHome style={{'font-size':'2rem',margin:'0.2rem',color:page==='main'?'black':null}} onClick={()=>{window.location.href="/"}}/>
        <AiOutlineMail style={{'font-size':'2rem',margin:'0.2rem',color:page==='mail'?'black':null}} onClick={()=>{window.location.href="/mail"}}/>
        <RiDashboardLine  style={{'font-size':'2rem',margin:'0.2rem',color:page==='board'?'black':null}} onClick={()=>{window.location.href="/boardlist"}}/>
        <AiOutlineBell style={{'font-size':'2rem',margin:'0.2rem',color:page==='noti'?'black':null}} onClick={()=>{window.location.href="/noti"}}/>
        <CgProfile style={{'font-size':'2rem',margin:'0.2rem',color:page==='my'?'black':null}} onClick={()=>{window.location.href="/my"}}/>
        </BottomBlock>
        </>
      );
}

export default BottomBar;