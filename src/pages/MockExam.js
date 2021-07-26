import React,{useState} from 'react';
import styled from 'styled-components'
import axios from 'axios'
/**/
const Input=styled.input`
    width:3rem;
    border:none;
    height:100%;
    &:focus{
    outline:none;
    }
`

function MockExam(){
    /**
    **/
  let [inputs, setInputs] = useState({
    korea:'',
    english:'',
    math: '',
    history:''
  }); 
  const { korea,english,math,history } = inputs;
  
  const onChange = (e) => { 
    const { name, value }  = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };
  
  const handleSubmit=()=>{
      axios({
  method: 'post',
  url: '/api/users/mockexam',
  data:inputs,
  })
  .then(function (response) {
  })
  .catch(function (error) {
    console.log(error);
  })
  }
  
    return(
        <>
        <table>
                     <thead>
                      <tr>
                    <th colspan='2'>과목</th>
                    <th>점수</th>
                    </tr>
                    </thead>
                    <tbody id='tbody'>
                     <tr>
                     <td  colspan='2'>국어</td>
                    <td><Input name="korea"
                               onChange={onChange} 
                               value={korea}/></td>
                    </tr>
                     <tr>
                     <td colspan='2'>영어</td>
                    <td><Input name="english"
                               onChange={onChange} 
                               value={english}/></td>
                    </tr>
                     <tr>
                     <td colspan='2'>수학</td>
                    <td><Input name="math"
                               onChange={onChange} 
                               value={math}/></td>
                    </tr>
                     <tr>
                     <td colspan='2'>한국사</td>
                    <td><Input name="history"
                               onChange={onChange} 
                               value={history}/></td>
                    </tr>
                    {/** <tr>
                     <td rowspan='2'>탐구</td>
                      <td>통합과학</td>
                    <td><Input/></td>
                    </tr>
                    <tr>
                    <td>통합사회</td>
                    <td><Input/></td>
                    </tr>**/}
                     </tbody>
                     </table>
                      <button onClick={handleSubmit}>등록하기</button>

                     
        </>
        )
}

export default MockExam;