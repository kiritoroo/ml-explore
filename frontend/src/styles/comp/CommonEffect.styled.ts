import styled, { keyframes, css } from "styled-components"

const shin = keyframes`
  from {
    -webkit-mask-position: 150%;
  }
  to {
    -webkit-mask-position: -50%;
  }
`

export const CssEffectWave = css`
  mask-image: linear-gradient(
    -75deg,
    rgba(0, 0, 0, 0.3) 30%,
    #000 50%,
    rgba(0, 0, 0, 0.2) 90%
  );
  -webkit-mask-image: linear-gradient(
    -75deg,
    rgba(0, 0, 0, 0.3) 30%,
    #000 50%,
    rgba(0, 0, 0, 0.3) 90%
  );
  mask-size: 200%;
  -webkit-mask-size: 200%;
  animation: ${shin} 2s linear infinite;
`

export const CssEffectUnderline = css<{color: string}>`
  position: relative;
  
  &::before {
    content: "";
    position: absolute;
    bottom: -5px;
    left: 0;
    right: 0;
    display: block;
    width: 97%;
    height: 3px;
    background-color: ${props => props.color};
    transform-origin: 100% 0;
    transform: scaleX(0%);
    transition: transform 0.5s cubic-bezier(0.23, 1, 0.32, 1);
  }

  &:hover::before {
    transform: scaleX(100%);
    transform-origin: 0 0;
  }
`