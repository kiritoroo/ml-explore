import styled from "styled-components";

export const StyledContainer = styled.div<{color: string}>`
  position: relative;
  color: white;
  border: solid 1px ${(props) => props.color};
  background: linear-gradient(to left, ${(props) => props.color} 50%, rgb(255,255,255,0) 50%) right;
  width: 200px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  transition: all .8s cubic-bezier(.19,1,.22,1);
  background-size: 200%;
  gap: 10px;

  &:hover {
    cursor: pointer;
    color: ${(props) => props.color};
    background-position: left;
  }
`

export const StyledIconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`

export const StyledLabel = styled.div`
  font-size: 18px;
`

export const StyledInput = styled.input`
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
  cursor: pointer;
  height: 100%;
  width: 100%;
`