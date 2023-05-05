import styled from "styled-components";
import { motion } from "framer-motion";

export const StyledImageWrapper = styled.div<{color: string}>`
  width: 25vw;
  height: 15vw;
  outline: solid 2px ${(props) => props.color};
  overflow: hidden;

  @media screen and (max-width: 1300px) {
    width: 35vw;
    height: 20vw;
  }

  @media screen and (max-width: 1000px) {
    width: 70vw;
    height: 35vw;
  }
`

export const StyledImage = styled.img`
  width: inherit;
  height: inherit;
  object-fit: cover;
  transition: all 2s cubic-bezier(.19,1,.22,1);
`

export const StyledLabelWrapper = styled(motion.div)`
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: 8%;
  right: 8px;
`

export const StyledWordsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end;
  justify-content: center;
`

export const StyledWord = styled.div<{color: string}>`
  color: white;
  line-height: .9;
  font-size: 2em;
  font-weight: 400;
  padding: 5px;
  background: ${(props) => props.color};
`

export const StyledContainer = styled(motion.div)<{color: string}>`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px 10px 50px 10px;
  transition: all .8s cubic-bezier(.19,1,.22,1);
  background: linear-gradient(to left, rgb(255,255,255,0) 50%, ${(props) => props.color} 50%) right;
  background-size: 200%;
  position: relative;
  user-select: none;
  
  &:hover {
    background-position: left;
    cursor: pointer;
  }

  &:hover ${StyledImage} {
    scale: 1.2;
  }
`