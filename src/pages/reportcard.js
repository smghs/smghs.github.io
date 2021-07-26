import React,{useState,useEffect} from 'react';
import axios from 'axios'
import styled from 'styled-components'

const Header = styled.div`
    width:100vw;
    height:2.8rem;
    border-bottom:0.1rem solid #d2d2d2;
    position:fixed;
    top:0;
    background:white;
`
const Title=styled.div`
    text-align:center;
    position:absolute;
    top:50%;
    left:50%;
    font-size:1.3rem;
    transform: translate(-50%, -50%);
`
const Container = styled.div`
    margin-top:3rem;
`
const Table=styled.table`
    width:95%;
    margin:0 auto;
`
const ReportTitle = styled.div`
    padding-top:1.5rem;
    text-align:center;
    margin-bottom:1rem;
    font-size:1.2rem;
    font-weight:600;
`
const Detail=styled.div`
    margin-top:1rem;
    text-align:center;
`


function Report(){
    
    let [percent,setPercent]=useState({})
    let [rank,setRank]=useState({})
    
    useEffect(() => {
        axios({
  method: 'post',
  url: '/api/users/examdata'
    })
  .then(function (res) {
      setPercent(res.data.percent['0'])
      setRank(res.data.rank['0'])
  })
  .catch(function (error) {
  })
    },[])
    
    function Rank({value}){
        let per=value
        if(per*100<=4){
        return <>1</>
        }if(per*100>4&&per*100<=11){
        return <>2</>
        }if(per*100>11&&per*100<=23){
        return <>3</>
        }if(per*100>23&&per*100<=40){
        return <>4</>
        }if(per*100>40&&per*100<=60){
        return <>5</>
        }if(per*100>60&&per*100<=77){
        return <>6</>
        }if(per*100>77&&per*100<=89){
        return <>7</>
        }if(per*100>89&&per*100<=96){
        return <>8</>
        }if(per*100>96&&per*100<=100){
        return <>9</>
        }
        return 0
    }
    
    return (
        <>
        <Header>
        <Title>등급계산기</Title>
        </Header>
        <Container>
        <ReportTitle>n님의 모의고사성적표</ReportTitle>
         <Table>
                     <thead>
                      <tr>
                    <th>영역/과목</th>
                    <th>국어</th>
                    <th>수학</th>
                    <th>영어</th>
                    <th>한국사</th>
                    </tr>
                    </thead>
                    <tbody id='tbody'>
                     <tr>
                     <td>원점수</td>
                    <td>{percent.korea}</td>
                     <td>{percent.math}</td>
                      <td>{percent.english}</td>
                       <td>{percent.history}</td>
                    </tr>
                     <tr>
                      <td>등급</td>
                     <td><Rank value={percent.ko_rank}/></td>
                    <td><Rank value={percent.ma_rank}/></td>
                    <td><Rank value={percent.en_rank}/></td>
                     <td><Rank value={percent.hi_rank}/></td>
                    </tr>
                     <tr>
                     <td>등수</td>
                    <td>{rank.ko_rank}</td>
                    <td>{rank.ma_rank}</td>
                     <td>{rank.en_rank}</td>
                     <td>{rank.hi_rank}</td>
                    </tr>
                     </tbody>
                     </Table>
                     <Detail>
                     <div>
                     전체 n명이 모의고사 성적을 입력했어요.
                     </div>
                     <div>
                     우리반에서는 n명이 모의고사 성적을 입력했어요.
                     </div>
                     </Detail>
                     </Container>
        </>
        )
}

export default Report