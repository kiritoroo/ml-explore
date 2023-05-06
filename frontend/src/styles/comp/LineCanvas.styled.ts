import styled from "styled-components";
import { motion } from "framer-motion";

export const StyledCanvasWrapper = styled(motion.div)`
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width:  100%;
  height: 100%;
  z-index: -5;
`

export const StyledCanvas = styled(motion.canvas)`
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width:  100%;
  height: 100%;
  margin: 0;
  background: #F9F9F9;
`