import React, { useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil'
import * as S from '@style/comp/Loading.styled';
import * as M from '@motion/Loading.motion';
import { colorPrimaryState } from '@store/atoms';

interface IProps {

}

export const Loading = React.memo((props: IProps) => {
  const colorPrimary = useRecoilValue(colorPrimaryState);

  return (
    <React.Fragment>
      <M.MotionContainer>
        <M.MotionDotWrapper>
          <M.MotionDot color={ colorPrimary }/>
          <M.MotionDot color={ colorPrimary }/>
          <M.MotionDot color={ colorPrimary }/>
        </M.MotionDotWrapper>
      </M.MotionContainer>
    </React.Fragment>
  )
})
