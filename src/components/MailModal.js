import React,{useState} from 'react';
import "../App.css";
import styled from 'styled-components'
import MailModal from './modal/ReMail'


const ReMail=styled.button`
    float:left;
`

const Modal = ( props ) => {
    // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
    const { open, close } = props;
    const [ MailmodalOpen,setMailModalOpen] = useState(false)
    
    const handleReadMail =(sender,senderNick)=>{
        if(MailmodalOpen===false){
        setMailModalOpen(true);
    }
    }
    
    return (
        <>
          <div className={ open ? 'openModal modal' : 'modal' }>
            { open ? (  
                <section>
                 <footer>
                  <ReMail className="close" onClick={handleReadMail}> 답장하기 </ReMail>
                        <button className="close" onClick={close}> close </button>
                    </footer>
                    <main>
                        {props.children}
                    </main>
                </section>
            ) : null }
            <MailModal open={MailmodalOpen} setModalOpen={setMailModalOpen} sender={props.sender} senderNick={props.senderNick}/>
        </div>
         </>
    )
}

export default Modal;