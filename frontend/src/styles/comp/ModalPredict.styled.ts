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
  background-color: rgba(80, 80, 80, 0.2);
  z-index: 99999;
`
export const StyledModalWrapper = styled.div`
  background-color: #FFFFFF;
  position: relative;
  width: 400px;
  height: 150px;
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

export const StyledPredicWrapper = styled.div`

`

export const StyledResultLabel = styled.span`
  font-size: 1.15em;
  margin-right: 15px;
`

export const StyledPredictResult = styled.span<{color: string}>`
  background: ${props => props.color};
  color: white;
  margin-left: 5px;
  padding: 3px 20px;
  font-size: 1.25em;
`

