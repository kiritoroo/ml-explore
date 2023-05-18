import React, { useCallback } from "react";
import * as S from '@style/comp/ButtonPredict.styled';
import { useRecoilValue } from "recoil";
import { colorPrimaryState } from "@store/atoms";
import { RiImageAddFill } from "react-icons/ri";
import { AiOutlineScan } from "react-icons/ai";

interface Props {
  onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
}

export const ButtonPredict = (props: Props) => {
  const { onClick } = props;
  const colorPrimary = useRecoilValue(colorPrimaryState);

  return (
    <S.StyledContainer
      onClick={(event) => onClick(event) }
      color={ colorPrimary }>
      <S.StyledIconWrapper>
        <AiOutlineScan/>
      </S.StyledIconWrapper>
      <S.StyledLabel>
        Predict
      </S.StyledLabel>
    </S.StyledContainer>
  )
}