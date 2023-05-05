import React, { useEffect } from 'react';
import { isLoadingState } from '@store/atoms';
import { useSetRecoilState } from 'recoil';
import { ButtonBack } from '@comp/ButtonBack';
import * as S from '@style/page/FaceRecogPage.styled';
import * as M from '@motion/FaceRecogPage.styled'

export default function FaceRecogPage() {
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