import React,{useState,useEffect} from 'react';
import styled from 'styled-components'
import axios from 'axios'
import moment from 'moment'

const ScheduleData = styled.div`
    margin-left:0.5rem;
`
const Title = styled.div`
    font-size:1.3rem;
    font-weight:600;
    margin-bottom:1rem;
    margin-top:0.5rem;
`
function App() {
     let [schedule1,setSchedule1] = useState("일정을 불러오는 중입니다.")
     let [schedule2,setSchedule2] = useState("")
     let [schedule3,setSchedule3] = useState("")
     
     useEffect(() => {
         
    axios.get('https://open.neis.go.kr/hub/SchoolSchedule?KEY=b14f10f6a4024b34b57531b5c8117a7e&Type=json&pIndex=1&pSize=100&ATPT_OFCDC_SC_CODE=B10&SD_SCHUL_CODE=7010201&AA_YMD='+moment().format('YYYYMMDD')).then((res)=>{
        try{
    setSchedule1(res.data.SchoolSchedule[1].row[0].EVENT_NM)
        }catch(e){
            setSchedule1('일정없는 날')
        }
        try{
    setSchedule2(res.data.SchoolSchedule[1].row[1].EVENT_NM)
        }catch(e){
            setSchedule2('')
        }
        try{
    setSchedule3(res.data.SchoolSchedule[1].row[2].EVENT_NM)
        }catch(e){
            setSchedule3('')
        }
}).catch((Error)=>{
    alert(Error);
})

  }, []);
  
  return (
  <>
  <ScheduleData>
  <Title>오늘의 일정</Title>
  {schedule1}<br/>{schedule2}<br/>{schedule3}
          </ScheduleData>
  </>
  )
}

export default App;