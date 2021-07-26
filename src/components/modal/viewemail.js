import React,{useEffect,useState} from 'react';
import styled from 'styled-components'
import axios from 'axios'
import Modal from '../MailModal'

const BoardBlock = styled.div`
    background:white;
    width:100%;
    min-height:4.2rem;
    border-bottom:1.8px solid #e2e2e2;
    
`
const Title = styled.div`
    margin-left:1rem;
    margin-top:0.8rem;
    font-size:1.1rem;
    font-weight:600;
    float:left;
`
const Description = styled.div`
    margin-left:1rem;
    margin-top:0.2rem;
    margin-bottom:0.8rem;
`
const BoardContainer = styled.div`
`
const Time = styled.div`
    margin-right:1rem;
    font-size:0.8rem;
    color:#b4b4b4;
    margin-top:0.5rem;
    float:right;
    
`
const More = styled.div`
    width:100%;
    height:3rem;
    border-bottom:1.5px solid #e2e2e2;
    text-align:center;
    line-height:3rem;
`

function App(props) {
    const [ modalOpen, setModalOpen ] = useState(false);
    let [view,setView] = useState([])
    let [pagenum,setpageNum] = useState(1)
    let [userid,setUserid] = useState(null)
    
    let token = localStorage.getItem("token")
    useEffect(() => {
        setModalOpen(props.open)
  axios({
  method: 'post',
  url: '/api/users/getId',
  headers: { "authorization": "Bearer "+token },
    })
  .then(function (res) {
    setUserid(res.data)
  })
  .catch(function (error) {
    console.log(error);
  })
  
    axios({
  method: 'post',
  url: '/api/mail/select/'+pagenum,
  data: {
      sender:props.sender,
      senderNick:props.senderNick
  },
  headers: {"authorization": "Bearer "+token}
    })
  .then(function (response) {
    if(response.data[0]===undefined){
    }else{
    setView(response.data) 
    }
  })
  .catch(function (error) {
    console.log(error);
  })
    
  }, [props.open,props.sender,props.senderNick]);
  
  const closeModal = (type) => {
        props.setModalOpen(false);
        setView([])
        setpageNum(1)
        axios({
  method: "post",
  url: "/api/mail/selectSender",
  headers: {"authorization": "Bearer "+token}
})
  .then(function (res) {
       props.setMailList(res.data)
    })
  .catch(function (response) {
      console.log("error")
  });
    }

    const CreateTime = ({value}) => {
        const today = new Date();
        const timeValue = new Date(value);

        const betweenTime = Math.floor((today.getTime() - timeValue.getTime()) / 1000 / 60);
        if (betweenTime < 1) return '방금전';
        if (betweenTime < 60) {
            return `${betweenTime}분전`;
        }

        const betweenTimeHour = Math.floor(betweenTime / 60);
        if (betweenTimeHour < 24) {
            return `${betweenTimeHour}시간전`;
        }
        
        const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
        if (betweenTimeDay < 365) {
            return `${timeValue.getMonth()+1}/${timeValue.getDate()}`;
        }

        return `${Math.floor(betweenTimeDay / 365)}년전`;
    }
    
    const handleMore = () => {
        axios({
  method: 'post',
  url: '/api/mail/select/'+Number(pagenum+1),
  data: {
      sender:props.sender,
      senderNick:props.senderNick
  }
    })
  .then(function (response) {
    if(response.data[0]===undefined){
    }else{
    setView(view => [...view, ...response.data]) 
    setpageNum(prevNumber => prevNumber + 1);
    }
  })
  .catch(function (error) {
    console.log(error);
  })
    }

  return(
     <>
     <Modal open={ modalOpen } close={ closeModal } sender={props.sender} senderNick={props.senderNick}>
     <BoardContainer>
     {view.map((element) =>
         <BoardBlock>
         
         <Title style={{color:userid===element.sender?'#E1D039':'#3EA39C'}}>{userid===element.sender?'보낸쪽지':'받은쪽지'}</Title>
          <Time><CreateTime value={element.createdAt}/> </Time>
          
          <br/><br/>
         <Description>{element.text}</Description>
         
         </BoardBlock>
        )}
        </BoardContainer>
        <More onClick={handleMore}>더보기</More>
        </Modal>
       
        
     </> 
  )
}

export default App;