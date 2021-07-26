import React,{ useState,useEffect } from 'react';
import styled from 'styled-components'
import axios from 'axios'
import Modal from '../Modal'

const WriteContainer = styled.div`
    height:auto;
    margin-top:3rem;
`


const TextContainer = styled.div`
    width:100%;
    height:20rem;
    position:relative;
`
const Text = styled.textarea`
    width:100%;
    height:99%;
    position:absolute;
    font-size:1rem;
    border:none;
    border-bottom:2px solid #e2e2e2;
    border-top:2px solid #e2e2e2;
    display:block;
    &:focus{
        outline:none;
    }
`

const Container=styled.div`
    position:fixed;
    top:3rem;
    background:white;
    width:100%;
`
const Button=styled.button`
    position:absolute;
    left:50%;
    margin-top:2rem;
    transform: translate(-50%,0%);
    width:5rem;
    height:2rem;
    font-size:1.2rem;
    color:white;
    background:#6c757c;
    border-radius:0.5rem;
`


function App(props) {
  let token = localStorage.getItem('token')
  const [ modalOpen, setModalOpen ] = useState(false);
  
  useEffect(() => {
        setModalOpen(props.open)
  }, [props.open]);
  
  
  const [inputs, setInputs] = useState({
    text: ''
  }); 
  const { text} = inputs; 
  
  const onChange = (e) => { 
    const { name, value }  = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };
  //alert(props.senderNick)
  
  const handleSubmit = ()=>{
      
      axios({
  method: "post",
  url: "/api/mail/resend",
  headers: {"authorization": "Bearer "+token},
  data: {
      receiver:props.sender,
      text:text,
      senderNick:props.senderNick,
  }
})
  .then(function (res) {
       if(res.data==='okay'){
           alert('쪽지를 전달했습니다.')
           props.setModalOpen(false);
           setInputs({
            text: ''
        }); 
       }
    })
  .catch(function (response) {
      alert("error")
  });
  }
  
  const closeModal = (type) => {
        props.setModalOpen(false);
        setInputs({
            text: ''
        }); 
    }
  
 // alert(props.sender)
  
  return(
     <>
     <Modal open={ modalOpen } close={ closeModal }>
     <Container>
        <WriteContainer>
 
        <TextContainer>
        <Text 
        placeholder="내용을 입력하세요."
        name="text"
        onChange={onChange} 
        value={text}
        />
        </TextContainer>
        </WriteContainer>
        <Button onClick={handleSubmit}>전송</Button>
        </Container>
        </Modal>
     </> 
  )
}

export default App;