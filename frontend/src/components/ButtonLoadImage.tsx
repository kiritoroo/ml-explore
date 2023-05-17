import React, { useCallback } from "react";
import * as S from '@style/comp/ButtonLoadImage.styled';
import { useRecoilValue } from "recoil";
import { colorPrimaryState } from "@store/atoms";
import { RiImageAddFill } from "react-icons/ri";

interface Props {
  onUploadImage: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export const ButtonLoadImage = (props: Props) => {
  const { onUploadImage } = props;
  const colorPrimary = useRecoilValue(colorPrimaryState);

  return (
    <S.StyledContainer
      color={ colorPrimary }>
      <S.StyledIconWrapper>
        <RiImageAddFill/>
      </S.StyledIconWrapper>
      <S.StyledLabel>
        Load Image
      </S.StyledLabel>
      <S.StyledInput
        type="file"
        accept="image/*"
        onChange={ (event) => onUploadImage(event) }/>
    </S.StyledContainer>
  )
}