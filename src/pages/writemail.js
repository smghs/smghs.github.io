import React,{ useState } from 'react';
import styled from 'styled-components'
import { BiArrowBack } from 'react-icons/bi'
import axios from 'axios'
import { FiSend } from 'react-icons/fi'

const WriteContainer = styled.div`
    border-bottom:2px solid #e2e2e2;
    width:100%;
    height:auto;
    margin-top:3rem;
`
const TitleContainer = styled.div`
    width:100%;
    border-top:2px solid #e2e2e2;
    border-bottom:2px solid #e2e2e2;
    height:2.5rem;
    position:relative;
`
const ToolContainer = styled.div`
    width:100%;
    border-bottom:2px solid #e2e2e2;
    border-top:2px solid #e2e2e2;
    height:2.5rem;
    position:relative;
`
const Title = styled.input`
    width:95%;
    height:90%;
    position:absolute;
    border:none;
    font-size:1.2rem;
    &:focus{
        outline:none;
    }
    
`
const TextContainer = styled.div`
    width:100%;
    height:20rem;
    position:relative;
`
const Text = styled.textarea`
    width:90%;
    height:99%;
    position:absolute;
    font-size:1rem;
    border:none;
    border-bottom:2px solid #e2e2e2;
    &:focus{
        outline:none;
        border:none;
    }
`
const HeaderBlock = styled.div`
    width:100vw;
    height:3rem;
    background:white;
    position:fixed;
    top:0;
    line-height:3rem;
    padding-left:1rem;
    padding-right:1rem;
`;
const Submit = styled.div`
    float:right;
    margin-right:2rem;
    font-size:1.6rem;
    font-weight:600;
    margin-top:0.5rem;
`;
const CheckBox = styled.input`
    
`
const CheckAnonymous = styled.div`
    width:auto;
    float:left;
    position:relative;
    margin-left:0.5rem;
    top:45%;
    transform: translate(0%, -50%);
`
function App() {
    let token = localStorage.getItem('token')
  let [isCheck,setCheck] = useState(true)
  const handleCheck = () => {
         if(isCheck){
             setCheck(false)
         }else{
             setCheck(true)
         }
     }  
  const [inputs, setInputs] = useState({
    text: '',
    receiver: '',
  }); 
  const { text, receiver } = inputs; 
  
  const onChange = (e) => { 
    const { name, value }  = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };
  
  
  const handleSubmit = ()=>{
      axios({
  method: "post",
  url: "/api/mail/send",
  headers: {"authorization": "Bearer "+token},
  data: {
      receiver:receiver,
      text:text,
      isAnonymous:isCheck
  }
})
  .then(function (res) {
       if(res.data==="okay"){
           window.location.href="/mail"
       }
    })
  .catch(function (response) {
      alert("error")
  });
  }
  
  return(
     <>
        <WriteContainer>
        <TitleContainer>
        <Title 
        placeholder="받는사람 아이디"
        name="receiver"
        onChange={onChange} 
        value={receiver}
        />
        </TitleContainer>
        <ToolContainer>
        <CheckAnonymous>
         <CheckBox type="checkbox" 
            checked={isCheck} 
            id='anonymous' 
            onClick={handleCheck}/>
        <label for="anonymous">익명</label>
        </CheckAnonymous>
        </ToolContainer>
        <TextContainer>
        <Text 
        placeholder={"내용을 입력하세요.\n운영자 아이디는 admin입니다."}
        name="text"
        onChange={onChange} 
        value={text}
        />
        </TextContainer>
        </WriteContainer>
         <HeaderBlock>
          <BiArrowBack style={{'font-size':'2rem','margin-top':'0.5rem'}} onClick={()=>{window.history.back()}}/>
          <Submit onClick={handleSubmit}><FiSend/></Submit>
         </HeaderBlock>
        
     </> 
  )
}

export default App;