import React,{useState} from 'react';
import "../Writerereply.css";
import styled from 'styled-components';
import axios from 'axios'
const Input = styled.input`
    width:95%;
    height:1.5rem;
    border-radius:1rem;
    font-size:1.1rem;
    &:focus{
        outline:none;
    }
`
const CheckAnonymous = styled.div`
    width:4rem;
    float:left;
    position:absolute;
    top:50%;
    transform: translate(0%, -50%);
    left:0.5rem;
    color:#A62F1E;
    font-weight:600;
`
const CheckBox = styled.input`
    
`

const Modal = ( props ) => {
    // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
    let token = localStorage.getItem('token')
    const { open, header } = props;
    let [isCheck,setCheck] = useState(true)
  let [text, setText] = useState("")
  const handleContent = (e) => { 
    setText(e.target.value)
    
  };
     const handleCheck = () => {
         if(isCheck){
             setCheck(false)
         }else{
             setCheck(true)
         }
     }  
    const handleRereply = () =>{
        axios({
  method: "post",
  url: "/api/reply/create",
  headers: {"authorization": "Bearer "+token},
  data: {
      type:'reReply',
      postid:props.postid,
      parentcomment:props.parentid,
      content:text,
      isAnonymous:isCheck,
      receiver:props.replyAuthor
  }
})
 .then(function (res) {
     setText('')
     props.setModalOpen(false)
       if(res.data==="okay"){
          axios({
  method: 'get',
  url: '/api/reply/select?postid='+props.postid,
  responseType: 'stream'
    })
  .then(function (res) {
    props.setView(res.data)
    
  })
  .catch(function (error) {
    alert(error);
  })
       }else{
           alert('이용규칙 위반으로 글쓰기가 중지되었습니다.\n'+res.data+'까지')
       }
    })
  .catch(function (response) {
      alert(response)
  });
    }
    const handleClose = () => {
        props.setModalOpen(false)
        setText('')
    }
    
    return (
        // 모달이 열릴때 openModal 클래스가 생성된다.
        <div className={ open ? 'openModal replymodal' : 'replymodal' }>
            { open ? (  
                <section>
                    <header>
                        {header}
                        <button className="close" onClick={handleClose}> &times; </button>
                    </header>
                    
                    <main>
                        <Input type='text'
                               onChange={handleContent}
                               value = {text}/>
                               <div style={{position:'relative','height':'2rem'}}>
                                <CheckAnonymous>
 
  <CheckBox type="checkbox" 
            checked={isCheck} 
            id='anonymous' 
            onClick={handleCheck}/>
   <label for="anonymous"></label>
  
  익명
  </CheckAnonymous>
  </div>
                    </main>
                    <footer>
                        <button className="close" onClick={handleRereply}> 답글쓰기 </button>
                    </footer>
                </section>
            ) : null }
        </div>
    )
}

export default Modal