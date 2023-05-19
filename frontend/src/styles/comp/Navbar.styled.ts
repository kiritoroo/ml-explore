import styled from "styled-components";
import { motion } from "framer-motion";
import { CssEffectWave, CssEffectUnderline } from "@style/comp/CommonEffect.styled";

export const StyledContainer = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: auto;
  z-index: 99999;
  user-select: none;
`

export const StyledGradientBar = styled(motion.div)`
  position: absolute;
  top: 0;
  z-index: -1;
  height: 80px;
  width: 100vw;

  &::after {
    position: fixed;
    content: "";
    top: 0;
    left: 0;
    width: 100%;
    height: 80px;
    background-color: #f8f8f8;
    box-shadow: 0 0 0 4px #f8f8f8,0 0 0 8px hsla(0,0%,97.3%,0.8),0 0 0 12px hsla(0,0%,97.3%,0.6),0 0 0 16px hsla(0,0%,97.3%,0.4),0 0 0 20px hsla(0,0%,97.3%,0.2);
    opacity: 0.9;
    user-select: none;
    pointer-events: none;
  }
`

export const StyledNavbarWrapper = styled(motion.div)`
  margin: 3vh 5vw;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`

export const StyledLinkListWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 3vw;
`

export const StyledLogo = styled(motion.div)`
  text-transform: uppercase;
  font-weight: 400;
  font-size: 1.75em;
  color: #0d0d0d;

  &:hover {
    cursor: pointer;
  }
`

export const StyledLinkWrapper = styled.div<{color: string}>`
  ${CssEffectUnderline}

  text-transform: lowercase;
  font-weight: 400;
  font-size: 1.5em;

  &:hover {
    cursor: pointer;
  }
`