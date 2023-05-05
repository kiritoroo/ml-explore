import styled from "styled-components";
import { motion } from 'framer-motion';

export const StyledContainer = styled(motion.div)`
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  position: absolute;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: white;
  pointer-events: none;
  user-select: none;
  z-index: 99999;
`

export const StyledDotWrapper = styled(motion.div)`
  width: 6rem;
  height: 3rem;
  display: flex;
  justify-content: space-around;
`

export const StyledDot = styled(motion.span)<{ color: string}>`
  display: block;
  width: 0.8rem;
  height: 0.8rem;
  background: ${(props) => props.color};
  border-radius: 50%;
`
