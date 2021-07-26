import React,{useState,useEffect} from 'react';
import styled from 'styled-components'
import axios from 'axios'
import moment from 'moment'

const MealData = styled.div`
    margin-left:0.5rem;
`
const Title = styled.div`
    font-size:1.3rem;
    font-weight:600;
    margin-bottom:1rem;
    margin-top:0.5rem;
`
function App() {
     let [meal,setMeal] = useState("급식을 불러오는 중입니다.")
     
     useEffect(() => {
         
    axios.get('https://open.neis.go.kr/hub/mealServiceDietInfo?KEY=b14f10f6a4024b34b57531b5c8117a7e&Type=json&pIndex=1&pSize=100&ATPT_OFCDC_SC_CODE=B10&SD_SCHUL_CODE=7010201&MLSV_YMD='+moment().format('YYYYMMDD')).then((res)=>{
        try{
    setMeal(res.data.mealServiceDietInfo[1].row[0].DDISH_NM)
        }catch(e){
            setMeal('급식없는 날')
        }
}).catch((Error)=>{
    alert(Error);
})

  }, []);
  
  return (
  <>
  <MealData>
  <Title>오늘의 급식</Title>
  {meal.split("<br/>").map( line => {
            return (<span>{line}<br/></span>)
          })}
          </MealData>
  </>
  )
}

export default App;