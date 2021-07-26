import React,{useState} from 'react';
import styled from 'styled-components'
import Header from '../components/Header'
import axios from 'axios'

const Withdrawal = styled.div`
    width:30rem;
    height:20rem;
    border:1.5px solid #e2e2e2;
    margin:0 auto;
    margin-top:5rem;
    border-radius:1rem;
    position:relative;
`
const Title = styled.div`
    margin-top:1rem;
    margin-left:1rem;
    font-weight:600;
    font-size:1.5rem;
`
const Input = styled.input`
    margin-top:2rem;
    width:25rem;
    height:2rem;
    border-radius:1rem;
    border:1.5px solid #e2e2e2;
    font-size:1rem;
    background:#f9f9f9;
    display:block;
    margin:0 auto;
    margin-top:2rem;
    &:focus{
        outline:none;
    }
`
const Warn = styled.div`
    padding-left:2rem;
    margin-top:1rem;
    font-size:0.85rem;
    color:gray;
    line-height:1.4rem;
`
const Submit = styled.button`
    width:25rem;
    display:block;
    margin:0 auto;
    margin-top:1rem;
    height:2.5rem;
    position:absolute;
    bottom:1rem;
    right:2.5rem;
    border-radius:1rem;
    border:none;
    background:gray;
    color:white;
    font-size:1.3rem;
`
const SiteInfo = styled.div`
   text-align:center; 
   margin-top:0.8rem;
   font-size:0.75rem;
   color:gray;
`

function App(){
    let token = localStorage.getItem('token')
    let [pw,setPw] = useState('')
    
    const handleWithdrawal =()=>{
        axios({
    method: "post",
    url: "/api/users/withdrawal",
    headers: { "authorization": "Bearer "+token },
    data:{
        password:pw
    }
    })
    .then(function (res) {
        if(res.data==='ok'){
            alert('회원탈퇴 되었습니다.')
            window.location.href='/login'
            localStorage.removeItem('token')
        }else if(res.data==='incorrect'){
            alert('비밀번호가 올바르지 않습니다.')
        }
    })
  .catch(function (response) {
  });
    }
    
    const handlePassword =(e)=>{
        setPw(e.target.value)
    }
    
    return(
        <>
        <Header/>
        <Withdrawal>
        <Title>회원탈퇴</Title>
        <Input type='password' placeholder='비밀번호' onChange={handlePassword}/>
        <Warn>※ 탈퇴시 개인정보,쪽지등의 데이터가 삭제되며 복구할 수 없습니다.<br/>※ 작성한 게시물은 삭제되지 않으며, (알수없음)으로 닉네임이 표시됩니다.<br/>※ 자세한 내용은 개인정보처리방침을 확인해주세요.</Warn>
        <Submit onClick={handleWithdrawal}>회원탈퇴</Submit>
        </Withdrawal>
        <SiteInfo><span onClick={()=>{window.location.href='/page/ServiceAgreement'}}>이용약관</span>&nbsp; &nbsp;<span onClick={()=>{window.location.href='/page/privacy'}}>개인정보처리방침</span>&nbsp; &nbsp;문의하기&nbsp; &nbsp;&copy;<span onClick={()=>{window.location.href='/'}}>숙명여고커뮤니티</span></SiteInfo>
        </>
        )
}

export default App;