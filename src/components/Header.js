import React from 'react';
import styled from 'styled-components';
import { BiArrowBack } from 'react-icons/bi'

const HeaderBlock = styled.div`
    width:100vw;
    height:3rem;
    background:white;
    position:fixed;
    top:0;
    padding-left:1rem;
`;
const Icon=styled.div`
    position:absolute;
    top:50%;
    left:2rem;
    transform: translate(-50%, -50%);
`
const Title = styled.div`
    float:left;
    position:absolute;
    top:50%;
    left:50%;
    transform: translate(-50%, -50%);
    font-size:1.2rem;
`

function Header({title}) {
    
  return (
      <>
     <HeaderBlock>
       <Icon> <BiArrowBack style={{'font-size':'2rem'}} onClick={()=>{window.history.back()}}/></Icon>
        <Title>{title}</Title>
        </HeaderBlock>
        </>
      );
}

export default Header;