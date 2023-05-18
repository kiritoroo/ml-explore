import React, { useCallback } from "react";
import * as S from '@style/comp/ButtonClear.styled';
import { useRecoilValue } from "recoil";
import { colorPrimaryState } from "@store/atoms";
import { RiImageAddFill } from "react-icons/ri";
import { AiOutlineClear } from "react-icons/ai";

interface Props {
  onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
}

export const ButtonClear = (props: Props) => {
  const { onClick } = props;
  const colorPrimary = useRecoilValue(colorPrimaryState);

  return (
    <S.StyledContainer
      onClick={(event) => onClick(event) }
      color={ colorPrimary }>
      <S.StyledIconWrapper>
        <AiOutlineClear/>
      </S.StyledIconWrapper>
      <S.StyledLabel>
        Clear Draw
      </S.StyledLabel>
    </S.StyledContainer>
  )
}