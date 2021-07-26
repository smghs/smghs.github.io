import React,{useState,useEffect} from 'react';
import styled from 'styled-components';
import WriteComment from './WriteComment'
import axios from 'axios'
import { FaRegComment } from "react-icons/fa";
import Modal from './modal/WriteRereply';
import DropdownMenu from './ReplyDropdown'

const CommentsBlock = styled.div`
    width:100vw;
    margin-bottom:5rem;
`;
const Comment = styled.div`
    width:100%;
    border-bottom:1.5px solid #e2e2e2;
`
const ProfileContainer = styled.div`
    height:auto;
    margin-top:0.5rem;
    padding-left:1rem;
`
const Avatar = styled.div`
    width:2.5rem;
    height:2.5rem;
    background:white;
    margin-left:2rem;
    border-radius:0.7rem;
    float:left;
    position:relative;
    overflow:hidden;
`
const Avatar2 = styled.div`
    width:2.5rem;
    height:2.5rem;
    background:white;
    border-radius:0.7rem;
    float:left;
    position:relative;
    overflow:hidden;
`
const Author = styled.div`
    padding-left:0.3rem;
    font-size:1.2rem;
    font-weight:600;
    display:inline-block;
    margin-top:0.5rem;
`
const CreateAt = styled.div`
    padding-left:0.5rem;
    margin-left:2.5rem;
    color:gray;
    margin-bottom:0.5rem;
    font-size:0.9rem;
`
const CreateAt2 = styled.div`
    padding-left:0.5rem;
    margin-left:0.5rem;
    color:gray;
    margin-bottom:0.5rem;
    font-size:0.9rem;
`
const Content = styled.div`
    margin-top:1rem;
    margin-left:3rem;
    padding-bottom:1rem;
`
const Content2 = styled.div`
    margin-top:1rem;
    margin-left:1rem;
    padding-bottom:1rem;
`
const LikeBlock = styled.div`
    width:2.5rem;
    height:2rem;
    float:right;
    border:1.5px solid #e2e2e2;
    border-radius:0.3rem;
    padding-right:0.2rem;
    padding-left:0.2rem;
    text-align:center;
    line-height:2.3rem;
    color:gray;
    font-size:0.95rem;
    @media all and (max-width:479px) {
        width:2rem;
        height:1.5rem;
        line-height:1.7rem;
    }
`
const ReplyContainer = styled.div`
    margin-left:4rem;
    background:#f2f2f2;
    margin-right:2rem;
    padding:0.3rem;
    margin-bottom:1rem;
    border-radius:1rem;
`
const DropBlock = styled.div`
    width:2.5rem;
    height:2rem;
    float:right;
    border:1.5px solid #e2e2e2;
    border-radius:0.3rem;
    text-align:center;
    margin-right:1rem;
    @media all and (max-width:479px) {
        width:2rem;
        height:1.5rem;
        line-height:1.7rem;
    }
`


function Comments(props) {
    
    let [commentlist, setView] = useState([])
    let [id, setId] = useState(0)
    let [replyAuthor,setReplyAuthor] = useState(null)
    let postid=props.postid
    let author = props.author
    useEffect(() => {
    axios({
  method: 'get',
  url: '/api/reply/select?postid='+postid,
  responseType: 'stream'
    })
  .then(function (res) {
    setView(res.data)
  })
  .catch(function (error) {
    alert(error);
  })
  
  
    },[postid])
    const [ modalOpen, setModalOpen ] = useState(false);

    const openModal = (id,author) => {
        setModalOpen(true);
        setId(id)
        setReplyAuthor(author)
    }
    const closeModal = () => {
        setModalOpen(false);
    }
    
    
    
    


  return (
      <>
     <CommentsBlock>
       {commentlist.map((element) =>
        <Comment>
        <ProfileContainer>
        <Avatar><img src='https://www.keypointintelligence.com/img/anonymous.png' style={{'position':'absolute','width':'100%','height':'100%'}} alt="avatar"/></Avatar>
        <DropBlock><DropdownMenu author={element.userid} userid={props.userid} commentid={element.id} title={element.content} writer={element.author} postid={postid} setView={setView}/></DropBlock>
         <LikeBlock onClick={ ()=>{openModal(element.id,element.userid)} }><FaRegComment/></LikeBlock>
        <Author style={{color:author===element.userid?'#419AA2':'#000'}}>{author===element.userid?element.author+'(글쓴이)':element.author}</Author><br/>
        </ProfileContainer>
        <Content>{element.content}</Content>
     <CreateAt>{new Date(element.createdAt).getMonth()+1}/{new Date(element.createdAt).getDate()} {new Date(element.createdAt).getHours()}:{new Date(element.createdAt).getMinutes()}</CreateAt>
     {element.ReComment.map((reply) =>
     <>
     <ReplyContainer>
          <ProfileContainer>
        <Avatar2><img src='https://www.keypointintelligence.com/img/anonymous.png' style={{'position':'absolute','width':'100%','height':'100%'}} alt="avatar"/></Avatar2>
        <DropBlock style={{'margin-right':'0rem'}}><DropdownMenu author={reply.userid} userid={props.userid} commentid={reply.id} title={reply.content} writer={reply.author} postid={postid} setView={setView}/></DropBlock>
         <LikeBlock onClick={ ()=>{openModal(element.id,reply.userid)} }><FaRegComment/></LikeBlock>
         
         
        <Author style={{color:author===reply.userid?'#419AA2':'#000'}}>{author===reply.userid?reply.author+'(글쓴이)':reply.author}</Author><br/>
        </ProfileContainer>
        <Content2>{reply.content}</Content2>
     <CreateAt2>{new Date(reply.createdAt).getMonth()+1}/{new Date(reply.createdAt).getDate()} {new Date(reply.createdAt).getHours()}:{new Date(reply.createdAt).getMinutes()}</CreateAt2>
     </ReplyContainer>
     </>
        )}
        </Comment>
        )}
        </CommentsBlock>
        <Modal open={ modalOpen } close={ closeModal } postid={postid} parentid={id} replyAuthor={replyAuthor} setView={setView} setModalOpen={setModalOpen}/>
        <WriteComment postid={postid} setView={setView} commentlist={commentlist} author={author}/>
        
        </>
      );
}

export default Comments;