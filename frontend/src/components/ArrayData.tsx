import React, { useCallback, useEffect, useRef } from 'react';
import  * as S from "@style/comp/ArrayData.styled";
import { useRecoilValue } from 'recoil';
import { colorPrimaryState } from '@store/atoms';

interface Props {
  header: string,
  data: any[]
}

export const ArrayData = (props: Props) => {
  const { header, data } = props;
  const colorPrimary = useRecoilValue(colorPrimaryState);
  
  return (
    <S.StyledContainer>
      <S.StyledArrayWrapper>
        <S.StyledHeader color={ colorPrimary }>{ header } </S.StyledHeader>
        { data.map((item, index) => (
          <S.StyledItem  key={index} color={ colorPrimary }>{ item }</S.StyledItem>
        )) }
      </S.StyledArrayWrapper>
    </S.StyledContainer>
  )
}