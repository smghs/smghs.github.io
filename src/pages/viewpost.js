import React,{useEffect,useState} from 'react';
import styled,{createGlobalStyle} from 'styled-components'
import { BiLike } from "react-icons/bi";
import { BiStar } from 'react-icons/bi'
import { FaRegComment } from "react-icons/fa";
import CommentsBlock from '../components/Comments'
import DropdownMenu from '../components/DropdownMenu'
import { BiArrowBack } from 'react-icons/bi'
import axios from 'axios'
import Lightbox from 'react-image-lightbox';
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
    margin-top:1.3rem;
    margin-left:2.2rem;
`
const LikeBar = styled.div`
    height:2rem;
    margin-top:1rem;
    margin-left:2.2rem;
`
const Likes = styled.div`
    float:left;
    font-size:1.1rem;
    color:#C42D1D;
`
const Scrabs = styled.div`
    float:left;
    font-size:1.1rem;
    color:#FDCD22;
`
const Comments = styled.div`
    float:left;
    color:#1DAAB3
    
`
const Count = styled.span`
    float:left;
    margin-right:0.5rem;
    margin-left:0.1rem;
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
    font-size:1.3rem;
    font-weight:600;
    display:inline-block;
    @media all and (max-width:479px) {
        margin-top:0.2rem;
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
const LikeBlock = styled.div`
    width:2rem;
    float:right;
    padding:0.3rem;
    border:1.5px solid #e2e2e2;
    border-radius:0.3rem;
    text-align:center;
    color:gray;
    font-size:0.95rem;
    @media all and (max-width:479px) {
    padding:0.3rem;
    width:auto;
    }
`
const Icon=styled.div`
    float:left;
    position:absolute;
    left:1rem;
    transform: translate(0%, -50%);
    top:50%;
`
const ImgContainer = styled.div`
    margin:0 auto;
    
    border-radius:1rem;
    position:relative;
    width:95vw;
    height:95vw;
 @media all and (min-width:768px) and (max-width:1023px) {
    max-width:80vw;
    max-height:80vw;
    margin:1rem;
 } 
 @media all and (min-width:1024px) {
    max-width:50vw;
    max-height:50vw;
    margin:1rem;
 }  
 @media all and (min-width:480px) and (max-width:767px) {
     max-width:95vw;
     max-height:95vw;
 } 
 @media all and (max-width:479px) {
     max-width:95vw;
     max-height:95vw;
 }
`
const Img = styled.img`
    position:absolute;
    width:100%;
    height:100%;
    object-fit:cover;
`
const ImgText=styled.div`
    text-align:center;
    margin-bottom:2rem;
    margin-top:0.5rem;
    color:gray;
    @media all and (min-width:1024px) {
    text-align:left;
    padding-left:1rem;
 }  
  @media all and (min-width:768px) and (max-width:1023px) {
    text-align:left;
    padding-left:1rem;
 } 
`


function App({match}) {
    let token = localStorage.getItem('token')    
    let postid = match.params.postId
    let [PostInfo,setPostInfo] = useState({title:'',description:'',author:'',like:0,star:0,reply:0,createdAt:new Date()})
    
    let [isLike, setIsLike] = useState(false);
    let [isStar, setIsStar] = useState(false);
    let [userId,setUserid] = useState(null)
    let [pfimg,setPfimg] = useState('https://www.keypointintelligence.com/img/anonymous.png')
    
    useEffect(() => {
    
    axios({
  method: 'get',
  url: '/api/board/read?id='+postid,
  responseType: 'stream'
    })
  .then(function (res) {
      
      if(res.data.title===undefined){
          setPostInfo({title:'없는 게시물입니다.',description:'없는 게시물입니다.',author:'',like:0,star:0,replys:0,createdAt:new Date()})
      }else if(res.data.category===0){
          setPostInfo({title:'삭제된 게시물입니다.',description:'삭제된 게시물입니다.',author:'',like:0,star:0,replys:0,createdAt:new Date()})
      }else{
    setPostInfo(res.data)
    if(res.data.pfimg&&res.data.author!=='익명')
    setPfimg('https://studybot.s3.ap-northeast-2.amazonaws.com/'+res.data.pfimg)
      }
  })
  .catch(function (error) {
    console.log(error);
  })
    
    axios({
  method: "post",
  url: "/api/post/selectInfo",
  data: {
      postid:postid
  },
  headers: { "authorization": "Bearer "+token },
    })
   .then(function (res) {
      // alert(res.data)
    if(res.data==='both'){
        setIsStar(true)
        setIsLike(true)
    }else if(res.data==='like'){
        setIsLike(true)
    }else if(res.data==='scrab'){
        setIsStar(true)
    }
  })
  .catch(function (error) {
    console.log(error)
    alert(error)
  })
  
  axios({
  method: 'post',
  url: '/api/users/getId',
  headers: { "authorization": "Bearer "+token },
    })
  .then(function (res) {
    setUserid(res.data)
  })
  .catch(function (error) {
    console.log(error);
  })
  
  
  }, [postid,token]);
  
  const handleScrab = () => {
      axios({
  method: "post",
  url: "/api/post/scrab",
  headers: { "authorization": "Bearer "+token },
  data: {
      type:'insert',
      postid:postid
  }
})
   .then(function (res) {
    if(res.data==='already'){
        setIsStar(false)
    }else{
        setIsStar(true)
    }
  })
  .catch(function (error) {
    console.log(error);
  })
  }
  
  const handleLikes = () => {
       axios({
  method: "post",
  url: "/api/post/like",
  data: {
      type:'insert',
      postid:postid
  },
  headers: {"authorization": "Bearer "+token },
})
   .then(function (res) {
    if(res.data==='already'){
        setIsLike(false)
    }else{
        setIsLike(true)
    }
  })
  .catch(function (error) {
    console.log(error);
  })
  } 
  
  const [isOpen,setIsOpen] = useState(false)
  
  return(
     <>
     <GlobalStyle/>
     <PostContainer>
        <ProfileContainer>
        <Avatar><img src={pfimg} style={{'position':'absolute','width':'100%','height':'100%'}} alt="avatar"/></Avatar>
        <LikeBlock style={{'margin-right':'1rem'}}>
      <DropdownMenu author={PostInfo.userid} userid={userId} postid={postid} category={PostInfo.category} title={PostInfo.title}/>
      </LikeBlock>
        <LikeBlock style={{background:isStar?'#FDCD22':'white',color:isStar?'white':null}} onClick={handleScrab}>
         <span>
        <BiStar style={{'font-size':'1.2rem'}}/></span>
        
        </LikeBlock>
        <LikeBlock onClick={handleLikes} style={{background:isLike?'#C42D1D':'white',color:isLike?'white':null}}>
        <span><BiLike style={{'font-size':'1.2rem'}}/></span>
        </LikeBlock>
        <Author>{PostInfo.author}</Author><br/>
        <CreateAt>{new Date(PostInfo.createdAt).getMonth()+1}/{new Date(PostInfo.createdAt).getDate()} {new Date(PostInfo.createdAt).getHours()}:{new Date(PostInfo.createdAt).getMinutes()}</CreateAt>
        </ProfileContainer>
        <TitleContainer>
        {PostInfo.title}
        </TitleContainer>
        <DescriptionContainer>
        {PostInfo.description.split('\n').map( line => {
            return (<span>{line}<br/></span>)
          })}
        </DescriptionContainer>
        <LikeBar>
        <Likes><BiLike/></Likes>
        <Count style={{'color':'#C42D1D'}}>{PostInfo.like}</Count>
        <Comments><FaRegComment/></Comments>
        <Count style={{'color':'#1DAAB3'}}> {PostInfo.reply?PostInfo.reply.length:0}</Count>
        <Scrabs><BiStar/></Scrabs>
        <Count style={{'margin-top':'0.05rem','color':'#FDCD22'}}>{PostInfo.star}</Count>
        </LikeBar>
       
        {PostInfo.image?
        <><ImgContainer onClick={() => {setIsOpen(true)}}><Img src={'https://studybot.s3.ap-northeast-2.amazonaws.com/'+PostInfo.image}/></ImgContainer><ImgText>사진을 클릭하시면 원본사진을 보실 수 있습니다.</ImgText></>
        :null}
        {isOpen && (
          <Lightbox
            mainSrc={'https://studybot.s3.ap-northeast-2.amazonaws.com/'+PostInfo.image}
            onCloseRequest={() => { setIsOpen(false) }}
          />
        )}
        </PostContainer>
        <CommentsBlock postid={postid} author={PostInfo.userid} userid={userId}/>
       <HeaderBlock>
        <Icon><BiArrowBack style={{'font-size':'2rem'}} onClick={()=>{document.referrer ? window.history.back() : window.location.href="/"}}/></Icon>
        </HeaderBlock>
        
     </> 
  )
}

export default App;