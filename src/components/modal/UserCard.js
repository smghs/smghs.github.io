import React,{useEffect, useState} from 'react';
import styled from 'styled-components';
import Modal from '../Modal';
import axios from 'axios';

const ImgPreview = styled.div`
    width:20rem;
    height:20rem;
    background:#e2e2e2;
    margin:0 auto;
    border-radius:0.5rem;
    font-size:10rem;
    color:gray;
    position:relative;
    text-aligin:center;
    overflow:hidden;
     @media all and (max-width:479px) {
     width:100%;
 }
`
const UserCardImg=styled.img`
    width:100%;
    height:100%;
    position:absolute;
`
const Discript = styled.div`
    width:20rem;
    margin:0 auto;
    margin-top:1rem;
    color:gray;
    @media all and (max-width:479px) {
     width:100%;
 }
`
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

function App(props) {
    const [ modalOpen, setModalOpen ] = useState(false);
    const [cardImg64, setCardImg64] = useState(); 
    const [cardImg,setCardImg] = useState(null)
    const [cardNoti, setCardNoti] = useState('')
    let token = localStorage.getItem('token')
    useEffect(() => {
    setModalOpen(props.open)
  }, [props.open]);
    
    
    const closeModal = (type) => {
        props.setModalOpen(false);
        setCardImg64()
        setCardImg(false)
        setCardNoti('')
    }
    const handleCardUpload = () =>{
       var bodyFormData = new FormData();
      bodyFormData.append('imgFile', cardImg); 
      axios({
  method: 'post',
  url: '/api/board/setCardImg',
  data:bodyFormData,
  headers: { "Content-Type": "multipart/form-data",
             "authorization": "Bearer "+token},
  })
  .then(function (response) {
    setCardNoti('학생증인증이 완료되었습니다. 등록하신 학생증은 3일 안에 검증됩니다.')
  })
  .catch(function (error) {
    alert(error);
  })
   }
   const handleStudentCard = (event) => {
       let reader = new FileReader();

    reader.onloadend = () => {
      const base64 = reader.result;
      if (base64) {
        setCardImg64(base64.toString()); 
      }
    }
    if (event.target.files[0]) {
      reader.readAsDataURL(event.target.files[0]); 
      setCardImg(event.target.files[0])
    }
   }
    return(
         <Modal open={ modalOpen } close={ closeModal }>
          <label for='studentCard'>
            <ImgPreview><UserCardImg src={cardImg64}/>
            </ImgPreview>
            </label>
             <input type='file' name='studentCard' id='studentCard' style={{display:'none'}} accept="image/*" onChange={handleStudentCard}/>
            <Discript>위 버튼을 눌러 학생증을 업로드 해주세요. 학생증을 업로드하시면 학년/반 변경, 학년 전용게시판 글작성, 이벤트 참여 등 다양한 해택을 받으실 수 있습니다.</Discript><br/>
            <CardSubmit onClick={handleCardUpload}>학생증 업로드</CardSubmit>
            <CardNoti>{cardNoti}</CardNoti>
            </Modal>
        )
}

export default App;