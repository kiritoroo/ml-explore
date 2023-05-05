import React, { useCallback } from 'react';
import { useRecoilCallback, useRecoilValue, useSetRecoilState } from 'recoil';
import { colorPrimaryState, isLoadingState } from '@store/atoms';
import { BiArrowBack } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom'
import * as S from '@style/comp/ButtonBack.styled';
import * as M from '@motion/ButtonBack.motion';

interface Props {
}

export const ButtonBack = (props: Props) => {
  const colorPrimary = useRecoilValue(colorPrimaryState);
  const setIsLoading = useSetRecoilState(isLoadingState);
  const navigate = useNavigate();

  const handleMouseClick = useCallback(() => {
    setIsLoading(true)
    navigate('/')
  }, [])

  return (
    <M.MotionContainer
      onClick={ handleMouseClick }
      color={ colorPrimary }>
      <S.StyledIconWrapper>
        <BiArrowBack/>
      </S.StyledIconWrapper>
      <S.StyledLabel>
        back to home page
      </S.StyledLabel>
    </M.MotionContainer>
  )
}