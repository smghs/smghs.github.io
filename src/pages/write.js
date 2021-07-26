import React,{ useState } from 'react';
import styled from 'styled-components'
import {AiFillCamera} from "react-icons/ai"
import { BiArrowBack } from 'react-icons/bi'
import axios from 'axios'

const WriteContainer = styled.div`
    border-bottom:2px solid #e2e2e2;
    width:100%;
    height:auto;
    margin-top:3rem;
`
const TitleContainer = styled.div`
    width:100%;
    border-top:2px solid #e2e2e2;
    border-bottom:2px solid #e2e2e2;
    height:2.5rem;
    position:relative;
`
const ToolContainer = styled.div`
    width:100%;
    border-bottom:2px solid #e2e2e2;
    border-top:2px solid #e2e2e2;
    height:2.5rem;
    position:relative;
`
const Title = styled.input`
    width:95%;
    height:90%;
    position:absolute;
    border:none;
    font-size:1.2rem;
    &:focus{
        outline:none;
    }
    
`
const TextContainer = styled.div`
    width:100%;
    height:20rem;
    position:relative;
`
const Text = styled.textarea`
    width:90%;
    height:99%;
    position:absolute;
    font-size:1rem;
    border:none;
    border-bottom:2px solid #e2e2e2;
    &:focus{
        outline:none;
        border:none;
    }
`
const PreView = styled.div`
    width:2rem;
    height:2rem;
    background:#e2e2e2;
    float:left;
    margin-top:0.2rem;
    margin-left:0.5rem;
    position:relative;
    overflow:hidden;
`
const MyImage = styled.img`
    position:absolute;
    width:100%;
    height:100%;
`
const HeaderBlock = styled.div`
    width:100vw;
    height:3rem;
    background:white;
    position:fixed;
    top:0;
    line-height:3rem;
    padding-left:1rem;
    padding-right:1rem;
`;
const Submit = styled.div`
    float:right;
    margin-right:2rem;
    font-size:1.2rem;
    font-weight:600;
`;
const CheckBox = styled.input`
    
`
const CheckAnonymous = styled.div`
    width:auto;
    float:right;
    position:relative;
    margin-right:0.5rem;
    top:45%;
    transform: translate(0%, -50%);
`
function App({match}) {
  let token = localStorage.getItem('token')    
  const [imgBase64, setImgBase64] = useState(null); // 파일 base64
  const [imgFile, setImgFile] = useState(null);	//파일	
  let category = match.params.category;
  let [isCheck,setCheck] = useState(true)
  const handleCheck = () => {
         if(isCheck){
             setCheck(false)
         }else{
             setCheck(true)
         }
     }  
  const [inputs, setInputs] = useState({
    title: '',
    description: '',
  }); 
  const { title, description } = inputs; 
  
  const onChange = (e) => { 
    const { name, value }  = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };
  
  const handleChangeFile = (event) => {
    let reader = new FileReader();

    reader.onloadend = () => {
      const base64 = reader.result;
      if (base64) {
        setImgBase64(base64.toString()); 
      }
    }
    if (event.target.files[0]) {
      reader.readAsDataURL(event.target.files[0]); 
      setImgFile(event.target.files[0]); 
    }
  }
  
  const handleSubmit = ()=>{
      var bodyFormData = new FormData();
    bodyFormData.append('title', inputs.title); 
    bodyFormData.append('description', inputs.description); 
    bodyFormData.append('category', category); 
    bodyFormData.append('imgFile', imgFile); 
    bodyFormData.append('isCheck', isCheck); 
    
    if(title===''){
        alert('제목을 입력해주세요.')
        return false;
    }if(description===''){
        alert('내용을 입력해주세요.')
        return false;
    }
    
      axios({
  method: "post",
  url: "/api/board/create",
  data: bodyFormData,
  headers: { "Content-Type": "multipart/form-data",
            "authorization": "Bearer "+token },
})
  .then(function (res) {
       if(res.data==="okay"){
           window.location.href="/board/"+category
       }else{
           alert('이용규칙 위반으로 글쓰기가 중지되었습니다.\n'+res.data+'까지')
       }
    })
  .catch(function (response) {
      alert("error")
  });
  }
  
  return(
     <>
        <WriteContainer>
        <TitleContainer>
        <Title 
        placeholder="제목을 입력하세요."
        name="title"
        onChange={onChange} 
        value={title}
        />
        </TitleContainer>
        <ToolContainer>
        <label for = 'imgFile'>
        <AiFillCamera style={{'font-size':'2rem','margin-left':'1rem','float':'left'}}/>
        <PreView><MyImage src={imgBase64}/></PreView>
        </label>
        <CheckAnonymous>
         <CheckBox type="checkbox" 
            checked={isCheck} 
            id='anonymous' 
            onClick={handleCheck}/>
        <label for="anonymous">익명</label>
        </CheckAnonymous>
        <input type='file' id="imgFile" style={{'display':'none'}} accept="image/*" onChange={handleChangeFile} name="imgFile"/>
        </ToolContainer>
        <TextContainer>
        <Text 
        placeholder="내용을 입력하세요."
        name="description"
        onChange={onChange} 
        value={description}
        />
        </TextContainer>
        </WriteContainer>
         <HeaderBlock>
          <BiArrowBack style={{'font-size':'2rem','margin-top':'0.5rem'}} onClick={()=>{window.history.back()}}/>
          <Submit onClick={handleSubmit}>글 등록</Submit>
         </HeaderBlock>
        
     </> 
  )
}

export default App;