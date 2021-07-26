import React,{useState,useRef} from 'react';
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
    width:20rem;
    height:2rem;
    margin-top:0.5rem;
    font-size:1.2rem;
    border:1.3px solid gray;
    border-radius:0.3rem;
     @media all and (max-width:479px) {
        width:90%;
        height:1.6rem;
    }
`
const PwInput = styled.input`
    margin-top:0.5rem;
    width:20rem;
    height:2rem;
    font-size:1.2rem;
    border:1.3px solid gray;
    border-radius:0.3rem;
    @media all and (max-width:479px) {
        width:90%;
        height:1.6rem;
    }
`
const Submit = styled.button`
    margin-top:0.5rem;
    margin-bottom:0.5rem;
    width:20rem;
    height:2.5rem;
    font-size:1.2rem;
    border:none;
    background:#3698F1;
    color:white;
    border-radius:0.3rem;
    @media all and (max-width:479px) {
        width:90%;
    }
`
const PageTitle = styled.div`
    width:20rem;
    margin:0 auto;
    font-size:3rem;
`
const FindPw = styled.a`
    color:#3698F1;
    text-decoration:none;
`
const Select = styled.select`
    margin-top:0.5rem;
    width:20rem;
    height:2rem;
    font-size:1.2rem;
    border-radius:0.3rem;
    @media all and (max-width:479px) {
        width:95%;
    }
`
function App() {
    const [warn, setWarn] = useState('')
    let [inputs, setInputs] = useState({
    id:'',
    name:'',
    username: '',
    email:'',
    password: '',
    password2:'',
    grade:1,
    classNm:1
  }); 
  const { id, name, username, email, password, password2, grade, classNm } = inputs;
  const idInput = useRef();
  const nameInput = useRef();
  const emailInput = useRef();
  const usernameInput = useRef();
  const pwInput = useRef();
  
  const onChange = (e) => { 
    const { name, value }  = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };
  
  const handleLogin = () => {
     var pattern_kor = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
     var pattern_num = /[0-9]/;	 
     var pattern_eng = /[a-zA-Z]/;	 
     var pattern_spc = /[~!@#$%^&*()_+|<>?:{}]/; 
     var emailRule = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
     var passRule = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/;
     const regex = /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g;
    
     if(id.length<4|| id.length>20 ||(pattern_spc.test(id)) || (pattern_kor.test(id))||regex.test(id)){
      setWarn('아이디는 4글자 이상 20글자 이하 영어+숫자로 입력해주세요.')
      idInput.current.focus();
      return false
  }if(name.length<2 || name.length>4 || (pattern_spc.test(name))||regex.test(name)||pattern_eng.test(name)||pattern_num.test(name)){
      setWarn('이름에 실명을 입력해주세요')
      nameInput.current.focus();
      return false
  }if(username.length<2 || username.length>5){
      setWarn('닉네임은 2글자 이상 5글자 이하로 입력해주세요.')
      usernameInput.current.focus();
      return false
  }if(username==='관리자'||username==='운영자'||username==='익명'){
      setWarn('사용할 수 없는 닉네임입니다.')
      usernameInput.current.focus();
      return false
  }if(!emailRule.test(email)){
      setWarn('이메일 양식이 올바르지 않습니다.')
      emailInput.current.focus();
      return false
  }if(!passRule.test(password)){
      setWarn('비밀번호는 문자,숫자,특수문자 포함 8자리 이상 입력해주세요.')
      pwInput.current.focus();
      return false
  }if(password!==password2){
      setWarn('비밀번호가 일치하지 않습니다.')
      pwInput.current.focus();
      setInputs({
      ...inputs,
      password: '',
      password2: '',
    });
      return false;
  }else{
      setWarn('')
  } 
    axios({
    method: "post",
    url: "/api/sign/up",
    data: inputs,
    })
    .then(function (res) {
      if(res.data==='alreadyid'){
          setWarn('이미 존재하는 아이디입니다.')
          idInput.current.focus();
          return false
      }else if(res.data==='alreadyemail'){
          setWarn('이미 존재하는 이메일입니다.')
          emailInput.current.focus();
          return false
      }
      alert('회원가입이 완료되었습니다.')
      window.location.href = '/login'
    })
  .catch(function (res) {
      alert(res)
  });
  
  }
  
  return (
  <>
  <GlobalStyle/>
  <LoginContainer>
  <PageTitle>SIGNUP</PageTitle>
 
    <IdInput type = "text" 
             placeholder="아이디"
             name="id"
             onChange={onChange} 
             value={id}
             ref={idInput}/>
    <br/>
     <IdInput type = "text" 
             placeholder="이름"
             name="name"
             onChange={onChange} 
             value={name}
             ref={nameInput}/>
    <br/>
     <IdInput type = "text" 
             placeholder="닉네임"
             name="username"
             onChange={onChange} 
             value={username}
             ref={usernameInput}/>
    <br/>
     <IdInput type = "text" 
             placeholder="이메일"
             name="email"
             onChange={onChange} 
             value={email}
             ref={emailInput}/>
    <br/>
    <PwInput type = "password" 
             placeholder = "비밀번호"
             name="password"
             onChange={onChange} 
             value={password}
             ref={PwInput}/>
    <br/>
     <PwInput type = "password" 
             placeholder = "비밀번호확인"
             name="password2"
             onChange={onChange} 
             value={password2}/>
    <br/>
    <Select name="grade"
            onChange={onChange} 
            value={grade}>
    <option value="1">1학년</option>
    <option value="2">2학년</option>
   <option value="3">3학년</option>
   </Select>
   <br/>
     <Select style={{'margin-bottom':'0.5rem'}} name="classNm"
                                                onChange={onChange} 
                                                value={classNm}>
     <option value="1">1반</option>
        <option value="2">2반</option>
       <option value="3">3반</option>
       <option value="4">4반</option>
       <option value="5">5반</option>
       <option value="6">6반</option>
       <option value="7">7반</option>
       <option value="8">8반</option>
       <option value="9">9반</option>
       <option value="10">10반</option>
       <option value="11">11반</option>
       <option value="12">12반</option>
       <option value="13">13반</option>
       <option value="14">14반</option>
     </Select><br/>
     <div style={{'color':'red'}}>{warn}</div>
    <Submit onClick={handleLogin}>회원가입</Submit>
     <br/>
     <FindPw href='/login'>로그인</FindPw>
  </LoginContainer>
  </>
  )
}

export default App;