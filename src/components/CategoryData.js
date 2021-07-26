import React,{useState,useEffect} from 'react';
import styled from 'styled-components'
import axios from 'axios'

const MealData = styled.div`
    margin-left:0.5rem;
`
const Title = styled.div`
    font-size:1.3rem;
    font-weight:600;
    margin-bottom:1rem;
    margin-top:0.5rem;
`
const Category = styled.div`
    margin-bottom:1rem;
    font-size:0.95rem;
    font-weight:600;
`
const Prev = styled.span`
    font-size:0.9rem;
    font-weight:500;
    margin-left:0.8rem;
    color:gray;
`

function App() {
  
  let [gr1,setGr1]=useState([{}]);
  let [gr2,setGr2]=useState([{}])
  let [gr3,setGr3]=useState([{}])
  
  useEffect(() => {
    axios({
  method: 'get',
  url: '/api/board/summary',
  responseType: 'stream'
    })
  .then(function (res) {
    let arr=res.data 
    setGr1(arr.filter(element => element.category === 100));
    setGr2(arr.filter(element => element.category === 300));
    setGr3(arr.filter(element => element.category === 400));
  })
  .catch(function (error) {
    alert(error);
  })
  }, []);
     
  return (
  <>
  <MealData>
  <Title>즐겨찾는 게시판</Title>
  <Category onClick={()=>{window.location.href='/board/100'}}>자유게시판<Prev>{gr1[0]?gr1[0].title:''}</Prev></Category>
  <Category onClick={()=>{window.location.href='/board/grade'}}>학년게시판<Prev>본인 학년 글만 조회가능합니다.</Prev></Category>
  <Category onClick={()=>{window.location.href='/board/400'}}>정보게시판<Prev>{gr3[0]?gr3[0].title:''}</Prev></Category>
  <Category onClick={()=>{window.location.href='/board/300'}}>홍보게시판<Prev>{gr2[0]?gr2[0].title:''}</Prev></Category>
          </MealData>
  </>
  )
}

export default React.memo(App);