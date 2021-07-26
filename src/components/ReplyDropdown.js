import React,{useEffect,useState,useRef} from 'react';
import '../App.css'
import { FaEllipsisV } from "react-icons/fa";
import axios from 'axios'
import Modal from './modal/SingoModal';
import MailModal from './modal/ReMail'

const DropdownMenu = ({userid,author,postid,category,children,title,writer,commentid,setView}) => {
    let token = localStorage.getItem('token')
  const dropdownRef = useRef(null);
  const [isActive, setIsActive] = useState(false);
  
  const onClick = () => setIsActive(!isActive);
  
  useEffect(() => {
    const pageClickEvent = (e) => {
    if (dropdownRef.current !== null && !dropdownRef.current.contains(e.target)) {
    setIsActive(!isActive);
  }
  };
  if (isActive) {
    window.addEventListener('click', pageClickEvent);
  }
  
  return () => {
    window.removeEventListener('click', pageClickEvent);
  }

  }, [isActive]);
  
  const handleDelete=()=>{
      axios({
  method: "delete",
  url: "/api/reply/delete",
  data: {
      commentid:commentid
  }
}).then(function (res) {
     if(res.data==="ok"){
          axios({
  method: 'get',
  url: '/api/reply/select?postid='+postid,
  responseType: 'stream'
    })
  .then(function (res) {
    setView(res.data)
    
  })
  .catch(function (error) {
    alert(error);
  })
       }
  })
  }
  
  const [ modalOpen, setModalOpen ] = useState(false);

    const openModal = () => {
        setModalOpen(true);
    }
    const closeModal = () => {
        setModalOpen(false);
    }
    const [ singoModalOpen, setSingoModalOpen ] = useState(false);

    const openSingoModal = () => {
        setSingoModalOpen(true);
    }
    const closeSingoModal = () => {
        setSingoModalOpen(false);
    }
    
    const [singoText,setSingoText]=useState("")
    
    const handleSingo=()=>{
       axios({
  method: 'post',
  url: '/api/reply/singo',
  headers: {"authorization": "Bearer "+token},
  data:{
      commentid:commentid,
      title:title,
      author:author
  }
    })
  .then(function (res) {
      setSingoText(res.data)
      closeModal()
      openSingoModal()
  })
  .catch(function (error) {
    console.log(error);
  })
     
    }
     const [ MailmodalOpen,setMailModalOpen] = useState(false)
     let [sender,setSender]=useState('')
    let [senderNick,setSenderNick]=useState('')
    
    const handleReadMail =(sender,senderNick)=>{
        
        if(MailmodalOpen===false){
        setMailModalOpen(true);
        setSender(sender)
        setSenderNick(senderNick)
    }
    }

  return (
      <>
        <MailModal open={MailmodalOpen} setModalOpen={setMailModalOpen} sender={sender} senderNick={senderNick}/>
    <div className="menu-container">
      <button onClick={onClick} className="menu-trigger" style={{'margin':'0 auto'}}>
       <FaEllipsisV style={{'font-size':'1rem'}}/> </button>
             <nav ref={dropdownRef} className={`menu ${isActive ? 'active' : 'inactive'}`}>
        <ul>
        {userid===author?
        <li><div style={{'color':'red'}} onClick={handleDelete}>삭제</div></li
        >:
        <>
        <li><div onClick={openModal}>신고하기</div></li>
           <li><div onClick={()=>{handleReadMail(author,writer)}}>쪽지보내기</div></li>
           </>
           }
        </ul>
      </nav>
      <Modal open={ modalOpen } close={ closeModal } header="신고하기" footer= <button className="close" onClick={handleSingo}> 신고 </button>>
        게시물을 신고하시겠습니까?
            </Modal>
             <Modal open={ singoModalOpen } close={ closeSingoModal } header="신고하기" footer= <button className="close" onClick={closeSingoModal}> 닫기 </button>>
            <div id='singoText'>{singoText}</div>
            </Modal>
    </div>
   
    </>
  );
}  
export default DropdownMenu;