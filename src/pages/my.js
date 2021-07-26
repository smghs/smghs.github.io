import React,{useEffect, useState} from 'react';
import styled,{ createGlobalStyle } from 'styled-components';
import BottomBar from '../components/BottomBar';
import axios from 'axios';
import UserCardModal from '../components/modal/UserCard';
import ChangePwModal from '../components/modal/ChangePw';
import ChangeEmail from '../components/modal/ChangeEmail';
import ChangeUserInfo from '../components/modal/ChangeUserInfo';
import ChangeNick from '../components/modal/ChangeNick';

const GlobalStyle = createGlobalStyle`
  body {
    background:#fff;
`;

const MyBlock = styled.div `
    width:95%;
    padding-bottom:1rem;
    padding-top:1rem;
    background:white;
    margin:0 auto;
    margin-top:3rem;
    border-radius:1rem;
    border:2px solid #e2e2e2;
`
const BlockTitle = styled.div`
    margin-left:0.8rem;
    font-size:1.3rem;
    font-weight:600; 
`
const BlockContent = styled.div`
    margin-left:0.8rem;
    font-size:1.05rem;
    margin-top:1.5rem;
    position:relative;
`
const Version = styled.span`
    position:absolute;
    right:1rem;
    color:gray;
`
const Avatar = styled.div`
    position:relative;
    width:4rem;
    height:4rem;
    background:#e2e2e2;
    margin-left:1rem;
    border-radius:0.5rem;
    float:left;
    overflow:hidden;
`
const MyInfo=styled.div`
    width:auto;
    height:4rem;
    float:left;
    margin-left:1rem;
`
const Id=styled.div`
    font-weight:600;
`
const Name=styled.div`
    font-size:0.9rem;
    color:gray;
    margin-top:0.2rem;
    margin-bottom:0.2rem;
`
const Grade=styled.div`
    font-size:0.9rem;
    color:gray;
`
const AvatarImg=styled.img`
    width:100%;
    height:100%;
    position:absolute;
    object-fit:cover;
`

function App() {
    let token = localStorage.getItem('token')
    const [ modalOpen, setModalOpen ] = useState(false);
    const [ PwmodalOpen, setPwModalOpen ] = useState(false);
    const [ EmailmodalOpen,setEmailModalOpen] = useState(false)
    const [ UserInfomodalOpen,setUserInfoModalOpen] = useState(false)
    const [ NickmodalOpen,setNickModalOpen] = useState(false)
    let gradeNm = localStorage.getItem('grade')
    let className = localStorage.getItem('class')
    let [userinfo, setUserInfo]  = useState ({})
    const [imgBase64, setImgBase64] = useState("https://www.keypointintelligence.com/img/anonymous.png"); 
    useEffect(() => {
    axios({
  method: 'post',
  url: '/api/users',
  headers: {"authorization": "Bearer "+token},
  })
  .then(function (response) {
    setUserInfo(response.data)
    if(response.data.image!==null){
    setImgBase64('https://studybot.s3.ap-northeast-2.amazonaws.com/'+response.data.image)
    }
  })
  .catch(function (error) {
    console.log(error);
  })
  }, [token]);
    
   const handleProfileImage = (event) => {
       let reader = new FileReader();

    reader.onloadend = () => {
      const base64 = reader.result;
      if (base64) {
        setImgBase64(base64.toString()); 
      }
    }
    if (event.target.files[0]) {
      reader.readAsDataURL(event.target.files[0]); 
      
      var bodyFormData = new FormData();
      bodyFormData.append('imgFile', event.target.files[0]); 
      axios({
  method: 'post',
  url: '/api/board/setProfileImg',
  data:bodyFormData,
  headers: { "Content-Type": "multipart/form-data",
            "authorization": "Bearer "+token},
  })
  .then(function (response) {
  })
  .catch(function (error) {
    console.log(error);
  })
    }
   }
   
  const openModal = () => {
      if(modalOpen===false){
        setModalOpen(true);
    }
  }
  const pwOpenModal = () => {
      if(PwmodalOpen===false){
        setPwModalOpen(true);
    }
  }
  
  const emailOpenModal = () => {
      if(EmailmodalOpen===false){
        setEmailModalOpen(true);
    }
  }
  
  const userInfoOpenModal = () => {
      if(UserInfomodalOpen===false){
        setUserInfoModalOpen(true);
    }
  }
  const nickOpenModal = () => {
      if(NickmodalOpen===false){
        setNickModalOpen(true);
    }
  }
  const handleLogout=()=>{
      localStorage.removeItem('token')
      window.location.href='/login'
  }
  const handleSecession=()=>{
      window.location.href='/my/withdrawal'
  }
  
  return(
     <>
     <GlobalStyle/>
     <MyBlock style={{'height':'4rem'}}>
     <Avatar><AvatarImg src={imgBase64}/></Avatar>
     <MyInfo>
     <Id>{userinfo.id}</Id>
     <Name>{userinfo.name}/{userinfo.nickname}</Name>
     <Grade>{gradeNm}학년 {className}반</Grade>
     </MyInfo>
     </MyBlock>
     <MyBlock>
     <BlockTitle>계정</BlockTitle>
    
     <BlockContent onClick={openModal}>학생증인증</BlockContent>
    <BlockContent onClick={nickOpenModal}>닉네임 변경</BlockContent>
     <BlockContent onClick={pwOpenModal}>비밀번호 변경</BlockContent>
     <BlockContent onClick={emailOpenModal}>이메일 변경</BlockContent>
     <BlockContent onClick={userInfoOpenModal}>학년/반 변경</BlockContent>
     <label for='profileImg'>
     <BlockContent>프로필사진 변경</BlockContent>
     </label>
     <input type='file' name='profileImg' id='profileImg' onChange={handleProfileImage} style={{display:'none'}} accept="image/*"/>
     </MyBlock>
     <MyBlock>
     <BlockTitle>이용안내</BlockTitle>
      <BlockContent>앱버전<Version>2.0.0</Version></BlockContent>
      <BlockContent>문의하기</BlockContent>
      <BlockContent onClick={()=>{window.location.href='/board/10'}}>공지사항</BlockContent>
      <BlockContent onClick={()=>{window.location.href='/page/ServiceAgreement'}}>서비스 이용약관</BlockContent>
      <BlockContent onClick={()=>{window.location.href='/page/privacy'}}>개인정보 처리방침</BlockContent>
     
     </MyBlock>
      <MyBlock style={{"margin-bottom":"4.5rem"}}>
     <BlockTitle>기타</BlockTitle>
      <BlockContent onClick={handleLogout}>로그아웃</BlockContent>
      <BlockContent onClick={handleSecession}>회원탈퇴</BlockContent>
      
     
     </MyBlock>
        <BottomBar page='my'/>
        <UserCardModal open={modalOpen} setModalOpen={setModalOpen}/>
        <ChangePwModal open={PwmodalOpen} setModalOpen={setPwModalOpen}/>
        <ChangeEmail open={EmailmodalOpen} setModalOpen={setEmailModalOpen} email={userinfo.email}/>
        <ChangeUserInfo open={UserInfomodalOpen} setModalOpen={setUserInfoModalOpen} grade={userinfo.grade} classNm={userinfo.classNm}/>
        <ChangeNick open={NickmodalOpen} setModalOpen={setNickModalOpen}/>
     </> 
  )
}

export default App;