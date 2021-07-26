import React,{useEffect, useState} from 'react';
import styled from 'styled-components';
import Modal from '../Modal';
import axios from 'axios';

const CardSubmit = styled.button`
    width:20rem;
    height:1.8rem;
    margin: 0 auto;
    background:#6c757d;
    display:block;
    border-radius:1rem;
    font-size:1.2rem;
    color:white;
    margin-bottom:0.5rem;
     @media all and (max-width:479px) {
     width:100%;
 }
`
const CardNoti = styled.div`
    width:20rem;
    margin:0 auto;
    margin-bottom:0.5rem;
    color:gray;
    font-size:0.8rem;
     @media all and (max-width:479px) {
     width:100%;
 }
`
const Input = styled.input`
    margin:0 auto;
    display:block;
    width:20rem;
    height:1.8rem;
    border-radius:0.5rem;
    background:#f9f9f9;
    border:none;
    margin-bottom:0.1rem;
    border:0.1rem solid #c6c6c6;
    font-size:1rem;
    &:focus{
        outline:none;
    }
     @media all and (max-width:479px) {
     width:90%;
 }
`

function App(props) {
    const [ modalOpen, setModalOpen ] = useState(false);
    const [cardNoti, setCardNoti] = useState('')
    let token = localStorage.getItem('token')
    useEffect(() => {
    setModalOpen(props.open)
  }, [props.open]);
    
    
    const closeModal = (type) => {
        props.setModalOpen(false);
    }
    
      const [inputs, setInputs] = useState({
    password1: '',
    password2: '',
    password3: '',
  }); 
  const { password1, password2, password3 } = inputs; 
  const onChange = (e) => {
    const { name, value }  = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };   
  const handleChangePw = () => {
      var passRule = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/;
      if(!passRule.test(password1)){
      setCardNoti('비밀번호는 문자,숫자,특수문자 포함 8자리 이상 입력해주세요.');
      return false
  }if(password1!==password2){
      setCardNoti('비밀번호가 일치하지 않습니다.')
      return false
  }
  axios({
    method: "post",
    url: "/api/users/changepassword",
    data: inputs,
    headers:{"authorization": "Bearer "+token}
    })
    .then(function (res) {
        if(res.data==='success'){
            alert('변경되었습니다. \n현재 기기에서는 로그아웃됩니다.')
            window.location.href='/login'
        }else{
            setCardNoti(res.data)
        }
    })
  .catch(function (res) {
      alert(res)
  });
  }
  
  
    return(
            <Modal open={ modalOpen } close={ closeModal }>
                <Input type='password' placeholder='새 비밀번호'
             name="password1"
             onChange={onChange} 
             value={password1}/>
            <CardNoti></CardNoti>
                <Input type='password' placeholder='새 비밀번호 확인'
             name="password2"
             onChange={onChange} 
             value={password2}/>
              <CardNoti></CardNoti>
                <div style={{'margin-bottom':'2rem'}}/>
                <Input type='password' placeholder='현재 비밀번호' style={{'margin-bottom':'2rem'}}
            name="password3"
             onChange={onChange} 
             value={password3}/>
                <CardSubmit onClick={handleChangePw}>비밀번호 변경</CardSubmit>
                 <CardNoti>{cardNoti}</CardNoti>
            </Modal>
        )
}

export default App;