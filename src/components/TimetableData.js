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
    margin-bottom:0.6rem;
    margin-top:0.5rem;
`
function App() {
     let [timetable,setTimetable] = useState([])
     let grade = localStorage.getItem("grade");
     let classnm = localStorage.getItem("class");
     
     useEffect(() => {
         
    axios.get('https://open.neis.go.kr/hub/hisTimetable?KEY=d8f732154df44de4a5975ca574e5ec9c&Type=json&pIndex=1&pSize=100&ATPT_OFCDC_SC_CODE=B10&SD_SCHUL_CODE=7010201&ALL_TI_YMD='+moment().format('YYYYMMDD')+'&GRADE='+grade+'&CLASS_NM='+classnm).then((res)=>{
        let body = res.data
        if(body.hisTimetable){
        setTimetable(body.hisTimetable[1].row)
        }
}).catch((Error)=>{
    alert(Error);
})

  }, [classnm,grade]);
  
  return (
  <>
  <MealData>
  <Title>오늘의 시간표</Title>
  {timetable.map((element,index) =>
  <div>{index+1}교시: {element.ITRT_CNTNT}</div>
  )}
          </MealData>
  </>
  )
}

export default App;