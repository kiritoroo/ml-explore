import styled from "styled-components";
import { motion } from "framer-motion";

export const StyledContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(80, 80, 80, 0.4);
  z-index: 99999;
`
export const StyledModalWrapper = styled(motion.div)`
  background-color: #FFFFFF;
  position: relative;
  width: 500px;
  height: 250px;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const StyledIconCloseWrapper = styled.div<{color: string}>`
  position: absolute;
  top: 0%;
  left: 0%;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(to left, rgb(255,255,255,0) 50%, ${(props) => props.color} 50%) right;
  background-size: 200%;
  transition: all .5s cubic-bezier(.19,1,.22,1);
  color: ${(props) => props.color};

  &:hover {
    cursor: pointer;
    background-position: left;
    color: white;
  }
`

export const StyledInfoListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  gap: 20px;
`

export const StyledInfoWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
`

export const StyledInfoLabel = styled.div`
  font-size: 1.15em;
  margin-right: 15px;
`

export const StyledInfoName = styled.div<{color: string}>`
  background: ${props => props.color};
  color: white;
  margin-left: 5px;
  padding: 3px 20px;
  font-size: 1.25em;
`

export const StyledInfoId = styled.div<{color: string}>`
  border: solid 1px ${props => props.color};
  color: ${props => props.color};
  margin-left: 5px;
  padding: 3px 20px;
  font-size: 1em;
`

export const StyledIconLinkWrapper = styled.a<{color: string}>`
  margin-left: 5px;
  padding: 5px 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(to left, rgb(255,255,255,0) 50%, ${(props) => props.color} 50%) right;
  background-size: 200%;
  transition: all .5s cubic-bezier(.19,1,.22,1);
  color: ${(props) => props.color};

  &:hover {
    cursor: pointer;
    background-position: left;
    color: white;
  }
`