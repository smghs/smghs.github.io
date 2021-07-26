import React,{useEffect,useState,useRef} from 'react';
import '../App.css'
import { FaEllipsisV } from "react-icons/fa";
import axios from 'axios'
import Modal from './modal/SingoModal';

const DropdownMenu = ({userid,author,postid,category,children,title}) => {
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
  url: "/api/post/delete",
  data: {
      postid:postid
  }
}).then(function (res) {
    if(category===1||category===2||category===3){
        window.location.href='/board/grade'
    }else{
        window.location.href=`/board/${category}`
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
  url: '/api/post/singo',
  headers: {"authorization": "Bearer "+token},
  data:{
      postid:postid,
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

  return (
    <div className="menu-container">
      <button onClick={onClick} className="menu-trigger">
       <FaEllipsisV style={{'font-size':'1rem'}}/> </button>
             <nav ref={dropdownRef} className={`menu ${isActive ? 'active' : 'inactive'}`}>
        <ul>
        {userid===author?
        <li><div style={{'color':'red'}} onClick={handleDelete}>삭제</div></li
        >:
        <>
        <li><div onClick={openModal}>신고하기</div></li>
           <li><div>쪽지보내기</div></li>
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
  );
}  
export default DropdownMenu;