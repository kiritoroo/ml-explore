import React, { useEffect } from 'react';
import { isLoadingState } from '@store/atoms';
import { useSetRecoilState } from 'recoil';
import { ButtonBack } from '@comp/ButtonBack';
import { AnimatePresence } from 'framer-motion';
import * as S from '@style/page/FaceDetectPage.styled';
import * as M from '@motion/FaceDetectPage.motion'

export default function FaceDetectPage() {
  const setIsLoading = useSetRecoilState(isLoadingState);

  useEffect(() => {
    setIsLoading(false)
  }, [])

  return (
    <M.MotionContainer>
      <S.StyledLeftGridWrapper>
        <ButtonBack/>
      </S.StyledLeftGridWrapper>
      <S.StyledRightGridWrapper>
        
      </S.StyledRightGridWrapper>
    </M.MotionContainer>
  )
}