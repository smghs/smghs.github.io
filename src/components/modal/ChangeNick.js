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
    const [Nick, setNick] = useState('')
    let token = localStorage.getItem('token')
    
    useEffect(() => {
    setModalOpen(props.open)
  }, [props.open]);
    
      
  
  const closeModal = (type) => {
        props.setModalOpen(false);
    }
  
  const handleChangeNick = () => {
      if(Nick.length>5||Nick.length<2||Nick==='관리자'||Nick==='운영자'||Nick==='익명'){
          setCardNoti('사용할 수 없는 닉네임입니다.')
          return false;
          }
      
  axios({
    method: "post",
    url: "/api/users/changeNick",
    data: {nickname:Nick},
    headers:{"authorization": "Bearer "+token}
    })
    .then(function (res) {
        if(res.data==='change'){
            setNick('')
            alert('변경되었습니다.')
            props.setModalOpen(false);
        }else if(res.data==='already change'){
            setCardNoti('마지막 변경이후 30일이 지나지 않았습니다.')
        }
    })
  .catch(function (res) {
      alert(res)
  });
  }
  const handleNick =(e)=>{
      let nick=e.target.value
      if(nick.length>5){
          setCardNoti('닉네임은 5글자 이하로 입력해주세요.')
      }else if(nick.length<2){
          setCardNoti('닉네임은 2글자 이상 입력해주세요.')
      }else if(nick==='관리자'||nick==='운영자'||nick==='익명'){
          setCardNoti('사용할 수 없는 닉네임입니다.')
      }else{
          setCardNoti('')
      }
          setNick(e.target.value)
          
          
  }
    return(
            <Modal open={ modalOpen } close={ closeModal }>
                <Input type='text' placeholder='새 닉네임' onChange={handleNick}
             />
               <CardNoti style={{color:'#c62918'}}>{cardNoti}</CardNoti>
                <div style={{'margin-bottom':'2rem'}}/>
                <CardSubmit onClick={handleChangeNick}>닉네임 변경</CardSubmit>
            <CardNoti>닉네임을 변경하시면 30일 동안 다시 변경하실 수 없습니다.</CardNoti>                
            </Modal>
        )
}

export default App;