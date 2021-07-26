import React,{useEffect,useState} from 'react';
import styled from 'styled-components'
import {AiOutlinePushpin} from "react-icons/ai"
import axios from 'axios'

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

function App() {
    const [view,setView] = useState([])
    useEffect(() => {
         
    axios.get('/api/board/boardlist').then((res)=>{
        setView(res.data)
}).catch((Error)=>{
    
})

  }, []);
  
  
  return(
     <>
     <MyBoard style={{'margin-bottom':'5rem'}}>
     {view.map((element) =>
            <>
       <Category onClick={()=>{window.location.href="board/"+element.category_id}}><AiOutlinePushpin style={{"margin-right":"1rem"}} />{element.category_name}</Category>
            </>
        )}
     </MyBoard>
     </>
     )
}

export default App;