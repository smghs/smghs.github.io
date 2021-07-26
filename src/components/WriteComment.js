import React,{useState} from 'react';
import styled from 'styled-components'
import { FiSend } from 'react-icons/fi'
import '../App.css'
import axios from 'axios'

const CommentBlock = styled.div`
    width:95vw;
    height:2.5rem;
    background:#e3e3e3;
    position:fixed;
    bottom:1rem;
    margin-left:2.5vw;
    border-radius:1rem;
    overflow:hidden;
`
const InputComment = styled.input`
    background:none;
    height:100%;
    width:calc(100% - 8.1rem);
    border:none;
    font-size:1.1rem;
    margin-left:4.5rem;
    &:focus{
        outline:none;
    }
`
const CheckAnonymous = styled.div`
    background:#e3e3e3;
    width:4rem;
    float:left;
    position:absolute;
    top:50%;
    transform: translate(0%, -50%);
    left:0.5rem;
    color:#A62F1E;
    font-weight:600;
`
const Submit = styled.div`
    background:#e3e3e3;
    width:3rem;
    top:50%;
    right:0.5rem;
    transform: translate(0%, -50%);
    position:absolute;
    float:right;
    text-align:center;
    font-size:1.4rem;
`
const CheckBox = styled.input`
    
`

function App({postid,setView,commentlist,author}) {
  let token = localStorage.getItem('token')    
  let [isCheck,setCheck] = useState(true)
  let [text, setText] = useState("")
  const handleContent = (e) => { 
    setText(e.target.value)
  };
     const handleCheck = () => {
         if(isCheck){
             setCheck(false)
         }else{
             setCheck(true)
         }
     }  
       
    const handleSubmit = (e) => {
        axios({
  method: "post",
  url: "/api/reply/create",
  headers: { "authorization": "Bearer "+token },
  data: {
      postid:postid,
      parentcomment:0,
      content:text,
      isAnonymous:isCheck,
      receiver:author
  }
})
  .then(function (res) {
       if(res.data==="okay"){
          axios({
  method: 'get',
  url: '/api/reply/select?postid='+postid,
  responseType: 'stream'
    })
  .then(function (res) {
    setView(res.data)
  })
  .catch(function (error) {
    alert(error);
  })
         setText('')
         window.scroll({
      top: document.body.offsetHeight,
      left: 0, 
      behavior: 'smooth',
    });
       }else{
           alert('이용규칙 위반으로 글쓰기가 중지되었습니다.\n'+res.data+'까지')
       }
    })
  .catch(function (response) {
      alert(response)
  });
    }    
    
  return (
  <>
  <CommentBlock>
  <CheckAnonymous>
  
  <CheckBox type="checkbox" 
            checked={isCheck} 
            id='anonymous' 
            onClick={handleCheck}/>
  
  <label for="anonymous"></label>
  익명
  </CheckAnonymous>
  <InputComment type='text' 
                placeholder='댓글을 입력하세요.'
                onChange={handleContent}
                value = {text}/>
  <Submit onClick={handleSubmit}><FiSend style={{color:'#A62F1E'}}/></Submit>
  </CommentBlock>
  </>
  )
}

export default App;