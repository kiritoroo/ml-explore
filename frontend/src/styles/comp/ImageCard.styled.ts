import styled from "styled-components";

export const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

export const StyledImageWrapper = styled.div<{color: string}>`
  position: relative;
  border: solid 2px ${props => props.color};
  padding: 20px;
`

export const StyledImage = styled.img`
  width: 55vw;
  height: auto;
  min-height: 50vh;
  max-height: 60vh;
  object-fit: contain;
`