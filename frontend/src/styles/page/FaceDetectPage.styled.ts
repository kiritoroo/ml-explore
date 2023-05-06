import styled from "styled-components";
import { motion } from "framer-motion";

export const StyledContainer = styled(motion.div)`
  margin-top: 10vh;
  padding: 0px 50px;
`

export const StyledGridWrapper = styled.div`
  display: grid;
  grid-template-columns: 3fr 7fr;
  gap: 20px;

  @media screen and (max-width: 1000px) {
    display: flex;
    flex-direction: column;
  }
`

export const StyledLeftGridWrapper = styled.div`
`

export const StyledRightGridWrapper = styled.div`

`

export const StyledModuleLabel = styled.div<{color: string}>`
  display: inline-block;
  width: auto;
  font-size: 2.25em;
  font-weight: 400;
  margin: 20px 0;
  padding: 5px 8px;
  color: white;
  background: ${props => props.color};
`

export const StyledModuleDesc = styled.div`
  font-size: 1.15rem;
  font-weight: 300;
`

export const StyledTag = styled.div`
  margin-top: 15px;
  font-size: 0.95em;
`

export const StyledTagLabel = styled.span`
  margin-right: 15px;
`

export const StyledBadge = styled.span<{color: string}>`
  background: ${props => props.color};
  color: white;
  margin-left: 5px;
  padding: 3px 10px;
  font-size: 1.05em;
`