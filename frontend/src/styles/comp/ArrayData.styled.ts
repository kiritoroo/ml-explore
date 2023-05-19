import styled from "styled-components";
import { motion } from "framer-motion";

export const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`


export const StyledArrayWrapper = styled.div`
  position: relative;
  width: 50vw;
  max-height: 40vh;
  overflow: auto;
  display: flex;
  align-items: center;
`

export const StyledHeader = styled.div<{color: string}>`
  background: ${props => props.color};
  padding: 5px 20px;
  color: white;
  margin-right: 20px;
`

export const StyledItem = styled.div<{color: string}>`
  border: solid 0.5px ${props => props.color};
  font-size: 12px;
  padding: 5px 20px;
`