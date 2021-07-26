import React,{useState} from 'react';
import styled,{ createGlobalStyle } from 'styled-components'
import axios from 'axios'
const GlobalStyle = createGlobalStyle`
  body {
    position:relative;
    width:95vw;
    height:100vh;
    margin:0 auto;
  }
`;

const LoginContainer = styled.div`
    width:100%;
    text-align:center;
    position:absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`
const IdInput = styled.input`
    width:90%;
    height:2rem;
    margin-top:0.1rem;
    font-size:1.2rem;
    border:1.3px solid gray;
    border-radius:0.3rem;
`
const PwInput = styled.input`
    margin-top:1rem;
    width:90%;
    height:2rem;
    margin-bottom:0.5rem;
    font-size:1.2rem;
    border:1.3px solid gray;
    border-radius:0.3rem;
`
const Submit = styled.button`
    margin-top:0.5rem;
    margin-bottom:0.5rem;
    width:90%;
    height:2.5rem;
    font-size:1.2rem;
    border:none;
    background:#3698F1;
    color:white;
    border-radius:0.3rem;
`
const PageTitle = styled.div`
    width:100%;
    margin:0 auto;
    font-size:3rem;
`
const FindPw = styled.a`
    color:#3698F1;
    text-decoration:none
`

function App() {
    const [warn, setWarn] = useState('')
    const [inputs, setInputs] = useState({
    username: '',
    password: '',
  }); 
  const { username, password } = inputs; 
  
  const onChange = (e) => { 
    const { name, value }  = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };
  
  const handleLogin = () => {
      
    axios({
    method: "post",
    url: "/api/login",
    data: inputs,
    headers: { "Content-Type": "application/json; charset=utf-8" },
    credentials: "same-origin",
    })
    .then(function (res) {
       
      if(res.data.token){
          window.location.href = '/'
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("grade", res.data.grade);
          localStorage.setItem("class", res.data.classNM);
      }else{
          setWarn('입력한 사용자 이름을 사용하는 계정을 찾을 수 없습니다. 사용자 이름을 확인하고 다시 시도하세요.')
      }
    })
  .catch(function (response) {
      
  });
  
  }
  
  return (
  <>
  <GlobalStyle/>
  <LoginContainer>
  <PageTitle>LOGIN</PageTitle>
 
    <IdInput type = "text" 
             placeholder="아이디"
             name="username"
             onChange={onChange} 
             value={username}/>
    <br/>
    <PwInput type = "password" 
             placeholder = "비밀번호"
             name="password"
             onChange={onChange} 
             value={password}/>
    <br/>
    <FindPw>비밀번호를 잊으셨나요?</FindPw>
    <br/>
    <Submit onClick={handleLogin}>로그인</Submit>
     <div style={{'color':'red',width:'20rem','margin':'0 auto','margin-top':'0.5rem'}}>{warn}</div>
    <br/>
     <FindPw href='/signup'>회원가입</FindPw>
  </LoginContainer>
  </>
  )
}

export default App;