import React,{useEffect, useState} from 'react';
import styled from 'styled-components';
import Modal from '../Modal';
import axios from 'axios';

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
const Input = styled.input`
    margin:0 auto;
    display:block;
    width:20rem;
    height:1.8rem;
    border-radius:0.5rem;
    background:#f9f9f9;
    border:none;
    margin-bottom:0.1rem;
    border:0.1rem solid #c6c6c6;
    font-size:1rem;
    &:focus{
        outline:none;
    }
     @media all and (max-width:479px) {
     width:90%;
 }
`
const Select = styled.select`
    margin:0 auto;
    display:block;
    width:20rem;
    height:1.8rem;
    border-radius:0.5rem;
    background:#f9f9f9;
    border:none;
    margin-bottom:0.5rem;
    border:0.1rem solid #c6c6c6;
    font-size:1rem;
    &:focus{
        outline:none;
    }
     @media all and (max-width:479px) {
     width:100%;
 }
`
function App(props) {
    const [ modalOpen, setModalOpen ] = useState(false);
    const [cardNoti, setCardNoti] = useState('')
    let token = localStorage.getItem('token')
    let gradeNm = localStorage.getItem('grade')
    let className = localStorage.getItem('class')
    
    const [inputs, setInputs] = useState({
    grade: gradeNm,
    classNm: className,
    password: ''
  }); 
   
    useEffect(() => {
    setModalOpen(props.open)
  }, [props.open,props.grade,props.classNm,inputs]);
    
  const closeModal = (type) => {
        props.setModalOpen(false);
        setInputs({
            ...inputs,
            grade: props.grade,
            classNm:props.classNm,
            password: '',
            });
    }
  const { grade, classNm, password } = inputs; 
  const onChange = (e) => {
    const { name, value }  = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };   
  const handleChangeEmail = () => {
      
  axios({
    method: "post",
    url: "/api/users/changeuserinfo",
    data: inputs,
    headers:{"authorization": "Bearer "+token}
    })
    .then(function (res) {
        if(res.data==='success'){
            alert('변경되었습니다.')
            localStorage.setItem("grade", grade);
            localStorage.setItem("class", classNm);
            props.setModalOpen(false);
            setInputs({
            ...inputs,
            password: '',
            });
        }else{
            setCardNoti(res.data)
        }
    }) 
  .catch(function (res) {
      alert(res)
  });
  }
  
    return(
            <Modal open={ modalOpen } close={ closeModal }>
                <Select
                name="grade"
                onChange={onChange} 
                value={grade}>
                 <option value="1">1학년</option>
                 <option value="2">2학년</option>
                 <option value="3">3학년</option>
                </Select>
                 <Select
                 name="classNm"
                 onChange={onChange} 
                 value={classNm}>
       <option value="1">1반</option>
       <option value="2">2반</option>
       <option value="3">3반</option>
       <option value="4">4반</option>
       <option value="5">5반</option>
       <option value="6">6반</option>
       <option value="7">7반</option>
       <option value="8">8반</option>
       <option value="9">9반</option>
       <option value="10">10반</option>
       <option value="11">11반</option>
       <option value="12">12반</option>
       <option value="13">13반</option>
       <option value="14">14반</option>
                 </Select>
            <CardNoti></CardNoti>
                <div style={{'margin-bottom':'2rem'}}/>
                <Input type='password' placeholder='현재 비밀번호' style={{'margin-bottom':'2rem'}}
            name="password"
             onChange={onChange} 
             value={password}/>
                <CardSubmit onClick={handleChangeEmail}>학년/반 변경</CardSubmit>
                 <CardNoti>{cardNoti}</CardNoti>
            </Modal>
        )
}

export default App;