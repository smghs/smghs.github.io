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
    
    
    const [inputs, setInputs] = useState({
    email:'',
    password: ''
  }); 
    useEffect(() => {
    setModalOpen(props.open)
    
  }, [props.open,props.email]);
    
      
  
  const closeModal = (type) => {
        props.setModalOpen(false);
        setInputs({
      ...inputs,
      email: props.email,
      password:''
    });
        
    }
  const { email,password } = inputs; 
  const onChange = (e) => {
    const { name, value }  = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };   
  const handleChangeEmail = () => {
      let token = localStorage.getItem('token')
  axios({
    method: "post",
    url: "/api/users/changeEmail",
    data: inputs,
    headers:{"authorization": "Bearer "+token}
    })
    .then(function (res) {
        if(res.data==='success'){
            setInputs({
            ...inputs,
                password:''
                });
            alert(`이메일이 ${email}으로 변경되었습니다.`)
            props.setModalOpen(false);
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
                <Input type='text' placeholder='새 이메일'
             name="email"
             onChange={onChange} 
             value={email}/>
            <CardNoti></CardNoti>
                <div style={{'margin-bottom':'2rem'}}/>
                <Input type='password' placeholder='현재 비밀번호' style={{'margin-bottom':'2rem'}}
            name="password"
             onChange={onChange} 
             value={password}/>
                <CardSubmit onClick={handleChangeEmail}>이메일 변경</CardSubmit>
                 <CardNoti>{cardNoti}</CardNoti>
            </Modal>
        )
}

export default App;