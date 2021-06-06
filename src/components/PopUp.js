import React,{useEffect, useState}from 'react'
import styled, { keyframes } from 'styled-components';
import { Text } from '../styles/Styles';
import { imageQuality } from '../utils/common';
import { addtonext } from '../utils/controls';
import {addToPlaylist, checkInPlaylist, removeFromPlaylist} from '../utils/db';
import Back from './Back';



function PopUp(props){
           
  const [like, setlike] = useState(false);
  
  
  async function onlikecliked(){
    if(like){
      await removeFromPlaylist(props.data.id);
    }
    else{
       addToPlaylist(props.data);
    }
    setlike(!like);
} 

useEffect(() => {
      
  async function get(){
    const r=await checkInPlaylist(props.data.id);
    if(r){
      setlike(true);
    }
    else{
      setlike(false);
    }
  }
  get();
  return () => {
    
  }
}, []);

  
  function handlePlay(){
    props.handleClick(props.data,props.index);
    props.setopen(false);
  }

   function addnext(){
    addtonext(props.data);
    props.setopen(false);

   }

    return (
      <>
        <Wrapper>
          
        
        
            <ImageWrapper padding="30px 0 10px 0">
                  <Image src={imageQuality(props.data.image)}/>
            </ImageWrapper>
        
             <TextWrapper>
                <Text color="white" family="Poppins" size="1.02em">{props.data.title}</Text>
                <Text color="gray" style={{width:"350px"}}family="Poppins" size="0.8em">{props.data.description || props.data.subtitle}</Text>
             </TextWrapper>
           
          
            <br/>
            
            <ButtonWrapper>
            <Text color="yellow" family="Poppins" size="1.2em" onClick={handlePlay} padding="5px"><Picon color="white" size="1.2em"><i class="fa fa-play"></i></Picon>Play Now</Text>
            <Text color="white" family="Poppins" size="1.2em" onClick={addnext} padding="5px"><Picon color="white" size="1.2em"><i class="fa fa-forward"></i></Picon>Play Next</Text>
            <Text color={like?"red":"white"} family="Poppins" size="1.2em" padding="5px" onClick={onlikecliked}><Picon color={like?"red":"white"} size="1.3em"><i class="fa fa-heart"></i></Picon>{like?"Remove from Library":"Add to Library"}</Text>
              
            </ButtonWrapper>
            
            

           
            

            
            
            <Icon tobottom={true} BorderRadius="15px" width="100%" height="50px" size="1.2em" background="#2a2d36" color="white" onClick={()=>props.setopen(false)}>Cancel</Icon>
            
              

         
         

         </Wrapper>
        </>
    )
}

export default PopUp
const fadeup=keyframes`
from {top:300px; opacity: 0}
to {top: 60px; opacity: 1}



`

const ButtonWrapper=styled.div`
padding-left:20px;

`

const Picon=styled.a`
color:${props=>props.color};
font-size:${props=>props.size};
padding-right:10px;

`
const TextWrapper=styled.div`

width:100%;
text-align:center;
margin:5px;

`


const Wrapper=styled.div`
   box-shadow:0px 0px 20px inset gray;
  display: block; 
  position: fixed; 
  z-index: 1; 
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh; 
  overflow: hidden; 
  background-color: #2a2d36;

  animation-name:${fadeup};
  animation-duration: 0.4s;
  animation-iteration-count:1;
  animation-timing-function: linear;
  animation-fill-mode: forwards;
  border-radius:50px;

`







const ImageWrapper=styled.div`
padding:${props=>props.padding};
display:flex;
justify-content:center;
width:100%;
//background:linear-gradient(to bottom, #d6d3d3, #2a2d36);

`

const Image=styled.img`
width:200px;
height:200px;
border-radius:10px;
`


const Icon=styled.button`
background:${props=>props.background};
border:0.25px solid gray;
width:${props=>props.width};
height:${props=>props.height};
outline:none;
color:${props=>props.color};
font-size:${props=>props.size};
position:${props=>props.tobottom && "absolute"};
bottom:${props=>props.tobottom && "70px"};
box-shadow:${props=>props.tobottom && "0px 0px 20px inset gray"};
border-radius:${props=>props.BorderRadius}

`

const Footer=styled.div`
display:flex;
flex-direction:column;
align-items:center;

`
