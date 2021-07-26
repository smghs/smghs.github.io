import React,{useEffect,useState} from 'react';
import styled,{createGlobalStyle} from 'styled-components'
import { BiArrowBack } from 'react-icons/bi'
import axios from 'axios'
import 'react-image-lightbox/style.css'; 

const HeaderBlock = styled.div`
    width:100vw;
    height:3rem;
    background:white;
    position:fixed;
    top:0;
`;

const GlobalStyle = createGlobalStyle`
  body {

  }
`;
const PostContainer = styled.div`
    margin-top:3rem;
    border-bottom:1.8px solid #e2e2e2;
`
const ProfileContainer = styled.div`
    height:5rem;
`
const TitleContainer = styled.div`
    padding-top:0.5rem;
    font-size:1.8rem;
    font-weight:600;
    margin-left:2rem;
`
const DescriptionContainer = styled.div`
    margin-top:1rem;
    margin-bottom:1rem;
    margin-left:2.2rem;
`
const Avatar = styled.div`
    width:4rem;
    height:4rem;
    background:white;
    margin-left:2rem;
    border-radius:1rem;
    float:left;
    position:relative;
    overflow:hidden;
    @media all and (max-width:479px) {
        margin-left:1rem;
    }

`
const Author = styled.div`
    padding-left:0.3rem;
    font-size:1.5rem;
    font-weight:600;
    display:inline-block;
    @media all and (max-width:479px) {
        margin-top:0.5rem;
    }
`
const CreateAt = styled.div`
    padding-left:0.5rem;
    display:inline;
    color:gray;
    @media all and (max-width:479px) {
        font-size:1rem;
        display:inline-block;
        
    }
`
const Icon=styled.div`
    float:left;
    position:absolute;
    left:1rem;
    transform: translate(0%, -50%);
    top:50%;
`


function App({match}) {
    let postid = match.params.postId
    let [PostInfo,setPostInfo] = useState({title:'',description:'',author:'',like:0,star:0,reply:0,createdAt:new Date()})
    
    useEffect(() => {
    
    axios({
  method: 'get',
  url: '/api/board/notiread?id='+postid,
  responseType: 'stream'
    })
  .then(function (res) {
      if(res.data.category===0){
          setPostInfo({title:'삭제된 게시물입니다.',description:'삭제된 게시물입니다.',author:'',like:0,star:0,replys:0,createdAt:new Date()})
      }else{
    setPostInfo(res.data)
      }
  })
  .catch(function (error) {
    console.log(error);
  })
  }, [postid]);
  
 
  return(
     <>
     <GlobalStyle/>
     <PostContainer>
        <ProfileContainer>
        <Avatar><img src='https://www.keypointintelligence.com/img/anonymous.png' style={{'position':'absolute','width':'100%','height':'100%'}} alt="avatar"/></Avatar>
        <Author>{PostInfo.author}</Author><br/>
        <CreateAt>{new Date(PostInfo.createdAt).getMonth()+1}/{new Date(PostInfo.createdAt).getDate()} {new Date(PostInfo.createdAt).getHours()}:{new Date(PostInfo.createdAt).getMinutes()}</CreateAt>
        </ProfileContainer>
        <TitleContainer>
        {PostInfo.title}
        </TitleContainer>
        <DescriptionContainer>
        <div dangerouslySetInnerHTML={ {__html: PostInfo.description} }>
      </div>
        </DescriptionContainer>

        
        </PostContainer>
       <HeaderBlock>
        <Icon><BiArrowBack style={{'font-size':'2rem'}} onClick={()=>{window.history.back()}}/></Icon>
        </HeaderBlock>
        
     </> 
  )
}

export default App;