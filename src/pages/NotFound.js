import React from 'react';
import styled,{ createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  body {
    background:#f2f2f2;
    position:relative;
`;
const ErrorContainer = styled.div`
    width:auto;
    height:10rem;
    background:gray;
    position:absolute;
    top:50%;
    left:50%;
    transform: translate(-50%, -50%);
    margin-top:10rem;
`



function App() {
  return(
     <>
     <GlobalStyle/>
    <ErrorContainer>
     <img src='https://image.freepik.com/free-vector/404-error-page-found_41910-364.jpg' style={{'width':'100vw'}} alt="not found"/>
    </ErrorContainer>
     </> 
  )
}

export default App;