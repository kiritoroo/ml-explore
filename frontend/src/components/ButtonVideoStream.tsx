import React, { useCallback } from "react";
import * as S from '@style/comp/ButtonVideoStream.styled';
import { useRecoilValue } from "recoil";
import { colorPrimaryState } from "@store/atoms";
import { RiImageAddFill } from "react-icons/ri";

interface Props {
  onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
}

export const ButtonVideoStream = (props: Props) => {
  const { onClick } = props;
  const colorPrimary = useRecoilValue(colorPrimaryState);

  return (
    <S.StyledContainer
    onClick={(event) => onClick(event) }
      color={ colorPrimary }>
      <S.StyledIconWrapper>
        <RiImageAddFill/>
      </S.StyledIconWrapper>
      <S.StyledLabel>
        Video Stream
      </S.StyledLabel>
    </S.StyledContainer>
  )
}