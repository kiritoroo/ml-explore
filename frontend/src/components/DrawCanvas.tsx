import React, { useCallback, useEffect, useImperativeHandle, useRef, useState } from "react";
import * as S from "@style/comp/DrawCanvas.styled";
import { useRecoilValue } from "recoil";
import { colorPrimaryState } from "@store/atoms";

interface Props {}

interface Refs {
  clearCanvas: () => void
  getImageb64: () => string
}

export const DrawCanvas = React.forwardRef<Refs, Props>((props: Props, ref) => {
  const colorPrimary = useRecoilValue(colorPrimaryState);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [canvasContext, setCanvasContext] = useState<CanvasRenderingContext2D>()
  const drawColor = colorPrimary
  const drawSize = 12

  useImperativeHandle(ref, () => {
    return {
      clearCanvas: clearCanvas,
      getImageb64: getImageb64
    }
  }, [canvasContext])

  const clearCanvas = useCallback(() => {
    if (canvasContext) {
      canvasContext.clearRect(0, 0, canvasContext.canvas.width, canvasContext.canvas.height);
    }
  }, [canvasContext])

  const getImageb64 = useCallback(() => {
    if (canvasContext) {
      return canvasContext.canvas.toDataURL()
    }
    return ''
  }, [canvasContext])

  useEffect(() => {
    let mouseDown: boolean = false;
    let start = { x: 0, y: 0};
    let end = { x: 0, y: 0};

    const handleMouseDown = (e: MouseEvent) => {
      mouseDown = true;
      const canvasOffsetLeft = canvasRef.current ? canvasRef.current.getBoundingClientRect().left : 0;
      const canvasOffstTop = canvasRef.current ? canvasRef.current.getBoundingClientRect().top : 0;

      start = { x: e.clientX - canvasOffsetLeft, y: e.clientY - canvasOffstTop }
      end = { x: e.clientX - canvasOffsetLeft, y: e.clientY - canvasOffstTop }
    }
  
    const handleMouseUp = (e: MouseEvent) => {
      mouseDown = false;
    }
    
    const handleMousLeave = (e: MouseEvent) => {
      mouseDown = false;
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (mouseDown && canvasContext) {
        const canvasOffsetLeft = canvasRef.current ? canvasRef.current.getBoundingClientRect().left : 0;
        const canvasOffstTop = canvasRef.current ? canvasRef.current.getBoundingClientRect().top : 0;
  
        start = { x: end.x, y: end.y };
        end = { x: e.clientX - canvasOffsetLeft, y: e.clientY - canvasOffstTop };

        canvasContext.beginPath();
        canvasContext.moveTo(start.x, start.y);
        canvasContext.lineTo(end.x, end.y);
        canvasContext.strokeStyle = drawColor;
        canvasContext.lineWidth = drawSize;
        canvasContext.lineCap = 'round';
        canvasContext.stroke();
        canvasContext.closePath();
      }
    }

    if (canvasRef.current) {
      const renderCtx = canvasRef.current.getContext('2d')
      if (renderCtx) {
        canvasRef.current.addEventListener('mousedown', handleMouseDown);
        canvasRef.current.addEventListener('mouseup', handleMouseUp);
        canvasRef.current.addEventListener('mousemove', handleMouseMove);
        canvasRef.current.addEventListener('mouseout', handleMousLeave);
        setCanvasContext(renderCtx);
      }
    }

    return () => {
      if (canvasRef.current) {
        canvasRef.current.removeEventListener('mousedown', handleMouseDown);
        canvasRef.current.removeEventListener('mouseup', handleMouseUp);
        canvasRef.current.removeEventListener('mousemove', handleMouseMove);
        canvasRef.current.removeEventListener('mouseout', handleMousLeave);
      }
    }
  }, [canvasContext]);


  return (
    <S.StyledContainer>
      <S.StyledCanvas
        ref={ canvasRef }
        width={ 600 }
        height={ 600 }
        color={colorPrimary }/>
    </S.StyledContainer>
  )
})
