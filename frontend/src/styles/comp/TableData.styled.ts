import styled from "styled-components";
import { motion } from "framer-motion";

export const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

export const StyledTableWrapper = styled.div<{color: string}>`
  position: relative;
  border: solid 2px ${props => props.color};
  padding: 20px;
  width: 50vw;
  max-height: 40vh;
  overflow: auto;
  scroll-behavior: smooth;

  &::-webkit-scrollbar {
    width: 8px;
    height: 10px;
  }

  &::-webkit-scrollbar-track {
    background: #F2F3F9;
  }

  &::-webkit-scrollbar-thumb {
    background: ${props => props.color};
  }

  &::-webkit-scrollbar-thumb:hover {
    background: ${props => props.color};
  }
`

export const StyledTable = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`

export const StyledHeader = styled.div<{color: string}>`
  background: ${props => props.color};
  padding: 5px 20px;
  color: white;
`

export const StyledColumWrapper = styled.div<{color: string}>`
  border: solid 0.75px ${props => props.color};
`

export const StyledItem = styled.div<{color: string}>`
  border-bottom: solid 0.5px ${props => props.color};
  font-size: 12px;
  padding: 2px 5px;
`