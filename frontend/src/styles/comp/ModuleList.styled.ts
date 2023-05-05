import styled from "styled-components";
import { motion } from "framer-motion";

export const StyledContainer = styled.div`
  width: 100vw;
  height: 100vh;
  padding: 20px 20px;
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
