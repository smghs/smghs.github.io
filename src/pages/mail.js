import React,{useEffect,useState} from 'react';
import styled,{ createGlobalStyle } from 'styled-components'
import BottomBar from '../components/BottomBar'
import { FiSend } from 'react-icons/fi'
import axios from 'axios'
import MailModal from '../components/modal/viewemail'

const GlobalStyle = createGlobalStyle`
  body {
    background:#fff;
`;
const MailBlock = styled.div`
    width:100%;
    height:6rem;
`
const Sender = styled.div`
    padding:1rem;
    padding-bottom:0.5rem;
    font-weight:600;
    font-size:1.2rem;
`
const Content = styled.div`
    padding:1rem;
    padding-top:0rem;
    font-weight:400;
    font-size:1.05rem;
    white-space: nowrap;
    overflow:hidden;
    text-overflow:ellipsis;
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
const SendButton = styled.div`
    float:right;
    font-size:1.8rem;
    margin-top:1rem;
`
const Header = styled.div`
    height:4rem;
    margin-right:1.2rem;
`
function App() {
    let token = localStorage.getItem('token')
    let [maillist,setMailList] = useState([])
    const [ MailmodalOpen,setMailModalOpen] = useState(false)
    const [ sender,setSender] = useState(null)
    const [ senderNick,setSenderNick] = useState(null)
    
    useEffect(() => {
        axios({
  method: "post",
  url: "/api/mail/selectSender",
  headers: {"authorization": "Bearer "+token}
})
  .then(function (res) {
       setMailList(res.data)
    })
  .catch(function (response) {
      
  });
  }, [token]);
    
    
    
    const handleReadMail =(sender,senderNick)=>{
        axios({
  method: "post",
  url: "/api/mail/readMail",
  headers: {"authorization": "Bearer "+token},
  data:{
      sender:sender,
      senderNick:senderNick
  }
})
  .then(function (res) {
    })
  .catch(function (response) {
      
  });
        if(MailmodalOpen===false){
        setMailModalOpen(true);
    }
    setSender(sender)
    setSenderNick(senderNick)
    }
  return(
     <>
     <GlobalStyle/>
     <Header>
     <PageTitle>쪽지</PageTitle>
     <SendButton onClick={()=>{window.location.href='/writemail'}}><FiSend/></SendButton>
     </Header>
     <div style={{'margin-bottom':'3rem'}}>
        {maillist.map((element) =>
         <MailBlock style={element.read===0?{background:"#FDFAF3"}:{background:"white"}} onClick={()=>{handleReadMail(element.sender,element.senderNick)}}>
         <Sender>{element.senderNick}</Sender>
            <Content>{element.text}</Content>
         </MailBlock>
        )}
        </div>
 <MailModal open={MailmodalOpen} setModalOpen={setMailModalOpen} sender={sender} senderNick={senderNick} setMailList={setMailList}/>
        <BottomBar page='mail'/>
     </> 
  )
}

export default App;