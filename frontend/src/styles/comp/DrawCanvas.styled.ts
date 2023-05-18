import styled from "styled-components";
import { motion } from "framer-motion";

export const StyledContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const StyledCanvas = styled.canvas<{color: string}>`
  border: solid 2px ${props => props.color};
  background-color: white;

  &:hover {
    cursor: cell;    
  }
`