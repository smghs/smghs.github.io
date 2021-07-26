import React from 'react';
import styled,{ createGlobalStyle } from 'styled-components'
import BottomBar from '../components/BottomBar'
import MealData from '../components/MealData'
import ScheduleData from '../components/ScheduleData'
import TimetableData from '../components/TimetableData'
import HitData from '../components/hitData'
import BestScrab from '../components/BestScrab'
import CategoryData from '../components/CategoryData'
import firebase from 'firebase'
import axios from 'axios'

const GlobalStyle = createGlobalStyle`
  body {
    background:#fff;
`;
const Top = styled.div`
    width:100%;
    height:15rem;
    margin:0 auto;
    position:relative;
    overflow:scroll;
    margin-top:2rem;
    &::-webkit-scrollbar {
    display: none; 
}
`
const TopContent = styled.div`
    width:20rem;
    min-height:11rem;
    background:white;
    border-radius:1rem;
    float:left;
    margin-left:3%;
    border:0.1rem solid #e2e2e2;
`
const TopContent2 = styled.div`
    width:20rem;
    height:11rem;
    background:white;
    border-radius:1rem;
    position:absolute;
    left:21rem;
    margin-left:3%;
    border:0.1rem solid #e2e2e2;
    overflow:scroll;
`
const TopContent3 = styled.div`
    width:20rem;
    height:11rem;
    background:white;
    border-radius:1rem;
    position:absolute;
    left:42rem;
    margin-left:3%;
    border:0.1rem solid #e2e2e2;
    overflow:scroll;
`
const HitBoard = styled.div`
    width:97%;
    min-height:14rem;
    background:white;
    border-radius:1rem;
    margin:0 auto;
    margin-top:1.5rem;
    border:0.1rem solid #e2e2e2;
`
const PageTitle = styled.div`
    height:2rem;
    font-size:1.8rem;
    margin-left:1.5rem;
    margin-top:1rem;
    font-weight:600;
    margin-bottom:1rem;
    float:left;
`
const config =  { 
    apiKey: "AIzaSyDo_YJCtgiWQy3G1U4Th4_X1bw5NCTxNvY",
    authDomain: "web-push-9fefc.firebaseapp.com",
    projectId: "web-push-9fefc",
    storageBucket: "web-push-9fefc.appspot.com",
    messagingSenderId: "338195592175",
    appId: "1:338195592175:web:62358a2531b6a85a2abc1a"
}; 

if (!firebase.apps.length) {
  firebase.initializeApp(config);
} else {
  firebase.app();
}

let messaging = null

if (firebase.messaging.isSupported()) {
  messaging = firebase.messaging()
} else {
  console.log('no-support :(')
}

if(messaging){
messaging.onMessage(function(payload){
	console.log(payload.notification.title);
	console.log(payload.notification.body);
})

}


function App() {
    let token=localStorage.getItem('token')

    axios({
    method: "post",
    url: "/api/login/verify",
    headers: { "authorization": "Bearer "+token },
    })
    .then(function (res) {
     if(res.data!=='ok'){
          window.location.href='/login'
     }
    })
  .catch(function (response) {
      window.location.href='/login'
  });
 
  
  return(
     <>
     
     <GlobalStyle/>
     <PageTitle>숙명여자고등학교</PageTitle>
    <Top>
    <TopContent3><ScheduleData/></TopContent3>
    <TopContent>
   <TimetableData/>
    </TopContent>
    <TopContent2><MealData/></TopContent2>
    </Top>
        <HitBoard><CategoryData/></HitBoard>
        <HitBoard><HitData/></HitBoard>
        <HitBoard><BestScrab/></HitBoard>
        <div style={{'margin-bottom':'4rem'}}/>
        
        <BottomBar page='main'/>
     </> 
  )
}

export default App;