import styled from "styled-components";
import { motion } from "framer-motion";

export const StyledContainer = styled(motion.div)<{color: string}>`
  border: solid 1px ${(props) => props.color};
  color: ${(props) => props.color};
  background: linear-gradient(to left, rgb(255,255,255,0) 50%, ${(props) => props.color} 50%) right;
  width: 200px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  transition: all .8s cubic-bezier(.19,1,.22,1);
  background-size: 200%;
  gap: 10px;

  &:hover {
    cursor: pointer;
    background-position: left;
    color: white;
  }
`

export const StyledIconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`

export const StyledLabel = styled.div`

`