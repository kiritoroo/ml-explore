import styled from "styled-components";
import { motion } from "framer-motion";

export const StyledContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow: auto;
  padding: 15vh 2vw;
`

export const StyledModuleListWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 20px;
`

export const StyledModuleListItemWrapper = styled(motion.div)`
  width: auto;
  height: auto;
`
