import React, {useEffect,useState} from 'react';
import styled,{ createGlobalStyle } from 'styled-components'
import BottomBar from '../components/BottomBar'
import {BsChat} from "react-icons/bs"
import {AiOutlineFire} from 'react-icons/ai'
import {AiOutlineMail} from 'react-icons/ai'
import {MdReportProblem} from 'react-icons/md'
import axios from 'axios'
import firebase from 'firebase'; 

const GlobalStyle = createGlobalStyle`
  body {
    background:#fff;
`;
const NotiBlock = styled.div`
    width:100%;
    height:6rem;
    clear:both;
`
const NotiTitle = styled.div`
    margin-top:0.7rem;
    display:inline-block;
    margin-left:0.5rem;
    font-size:1.1rem;
    font-weight:600;
`
const NotiContent = styled.div`
    margin-top:0.3rem;
    display:inline-block;
    margin-left:0.5rem;
    width:calc(100vw - 5rem);
`
const NotiImg = styled.div`
    width:3rem;
    height:3rem;
    border:2px solid #e2e2e2;
    border-radius:100%;
    overflow:hidden;
    margin-top:0.5rem;
    margin-left:0.5rem;
    display:inline-block;
    float:left;
    object-fit:cover;
    position:relative;
`
const ImgDiv = styled.div`
    position:absolute;
    top:50%;
    left:50%;
    transform: translate(-50%, -50%);
    font-size:1.7rem;
`
const PageTitle = styled.div`
    height:2rem;
    font-size:1.8rem;
    margin-left:1.5rem;
    margin-top:1rem;
    font-weight:600;
    margin-bottom:1rem;
    
`
const NotiButton=styled.button`
    float:right;
    border:none;
    margin-right:1rem;
    width:auto;
    height:2.5rem;
    font-size:1.05rem;
    color:white;
    border-radius:0.3rem;
    background:#007aff;
`

let iconlist = [<BsChat style={{color:"#93B8E5"}}/>,<AiOutlineFire style={{color:"#C62918"}}/>,<AiOutlineMail style={{color:"#00D28B"}}/>,<MdReportProblem style={{color:"#C62918"}}/>]


  
function App() {
    
    let [notilist, setNotilist] = useState([])
    let token = localStorage.getItem('token')
    useEffect(() => {
         
    axios({
  method: 'post',
  url: '/api/users/noti',
  headers: {"authorization": "Bearer "+token},
  })
    .then((res)=>{
        if(res.data){
        setNotilist(res.data)
        }
}).catch((Error)=>{
    console.log(Error);
})

  }, [token]);
  
  const handleNoti = (link,id) => {
      if(link){
      window.location.href=link;
        axios({
  method: "post",
  url: '/api/users/notiread',
  data: {
      notiId:id
  }
   })
      }
  }
  
let messaging = null

const pushButton = document.getElementById('subscribe')

if (firebase.messaging.isSupported()) {
  messaging = firebase.messaging()
  updateBtn()
} else {
  console.log('no-support :(')
  if(pushButton){
      pushButton.disabled = true;
      pushButton.textContent = '알림차단됨';
  }
}

if (firebase.messaging.isSupported()) {
messaging.onTokenRefresh(function() {
	messaging.getToken()
	.then(function(refreshedToken) {
		console.log(refreshedToken);
		axios({
    method: "post",
    url: "/api/users/setNotiToken",
    headers: {"authorization": "Bearer "+token},
    data: {token:refreshedToken},
    })
	})
	.catch(function(err) {
		console.log('Unable to retrieve refreshed token ', err);
	});
});
}

function updateBtn(){
if (Notification.permission === "granted"&&pushButton) {
    pushButton.textContent = '알림해제';
}else if (Notification.permission === 'denied'&&pushButton){
    pushButton.textContent = '알림차단됨';
    pushButton.disabled = true;
}else if(Notification.permission === 'deafault'&&pushButton){
    pushButton.textContent = '알림설정';
}}


  const handleNotiToken=()=>{
      if(Notification.permission !== "granted"&&messaging){
    messaging.requestPermission()
.then(function() {
    updateBtn()
	return messaging.getToken(); 
})
.then(function(notitoken) {
    updateBtn()
	console.log(notitoken);
	axios({
    method: "post",
    url: "/api/users/setNotiToken",
    headers: {"authorization": "Bearer "+token},
    data: {token:notitoken},
    })
})
.catch(function(err) {
	console.log('fcm error : ', err);
	updateBtn()
})
}else{
    alert('알림을 해제하시려면 브라우저 캐시를 초기화 해주세요.')
    updateBtn()
}
  }
  //alert(window.browser.permissions.Permissions)
  return(
     <>
     <GlobalStyle/>
 <NotiButton onClick={handleNotiToken} id='subscribe'>알림설정</NotiButton>
     <PageTitle>알림</PageTitle>
    
     {notilist.map((element) =>
         <NotiBlock style={element.read===0?{background:"#FDFAF3"}:{background:"white"}} onClick={()=>{handleNoti(element.link, element.id)}}>
         
         <NotiImg><ImgDiv>{element.title.includes("댓글")?iconlist[0]:element.title.includes("인기")?iconlist[1]:element.title.includes("쪽지")?iconlist[2]:element.title.includes("신고")?iconlist[3]:null}</ImgDiv></NotiImg>
         
         <NotiTitle>{element.title}</NotiTitle>
         <br/>
         <NotiContent>{element.content}</NotiContent>
         </NotiBlock>
        )}
        <div style={{"margin-top":"3rem"}}/>
         <BottomBar page='noti'/>
        
     </> 
  )
}

export default App;