import React, { useRef, useEffect, useState, useCallback } from "react";
import * as S from '@style/comp/LineCanvas.styled';
import { useRecoilValue } from "recoil";
import { colorLineState } from "@store/atoms";

type tCoordinates2D = {
  x: number;
  y: number;
}

export const LineCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [context, setContext] = useState<CanvasRenderingContext2D>()

  const drawLine = useCallback((C: CanvasRenderingContext2D, offsetX: number, offsetY: number) => {
    C.strokeStyle = "#222222";

    C.stroke()
    C.beginPath();
    C.lineWidth = 0.1
    C.moveTo(offsetX, 0)
    C.lineTo(offsetX, C.canvas.height)
    C.closePath()

    C.stroke()
    C.beginPath();
    C.lineWidth = 0.1
    C.moveTo(0, -offsetY)
    C.lineTo(C.canvas.width, -offsetY)
    C.closePath()

    C.stroke()
    C.beginPath()
    C.lineWidth = 0.1
    C.moveTo(offsetX-C.canvas.width*2, -offsetY-C.canvas.height*2);
    C.lineTo(offsetX+C.canvas.width*2, -offsetY+C.canvas.height*2)
    C.closePath()
  }, [])

  useEffect(() => {
    let animationFrameId: number;
    let speed: tCoordinates2D = { x: 0, y: 0};

    const draw = () => {
      if (context) {
        const canvasWidth = context.canvas.width;
        const canvsHeight = context.canvas.height;
        const countLine = 3;
        const space: tCoordinates2D = { 
          x: canvasWidth / countLine,
          y: canvsHeight / countLine
        };
        context.clearRect(0, 0, canvasWidth, canvsHeight);
        for (let i=-countLine-10; i<countLine+10;i++) {
          drawLine(context, space.x*i + speed.x, space.y*i + speed.y)
        }
      }
    }

    const render = () => {
      if (context) {
        context.canvas.width  = window.innerWidth;
        context.canvas.height = window.innerHeight;
        speed = { x: speed.x+0.5, y: speed.y+0.5}
        animationFrameId = window.requestAnimationFrame(render)
        if (speed.x > window.innerWidth) speed = { x: -window.innerWidth, y: -window.innerHeight}
        draw()
      }
    }

    if (canvasRef.current) {
      const renderCtx = canvasRef.current.getContext('2d')
      if (renderCtx) {
        setContext(renderCtx);
        render()
      }
    }
  
    return () => {
      window.cancelAnimationFrame(animationFrameId)
    }
  }, [context])

  return (
    <React.Fragment>
      <S.StyledCanvas ref={canvasRef}/>
    </React.Fragment>
  )
}