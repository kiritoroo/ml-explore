import React, { useCallback, useEffect, useRef } from 'react';
import * as S from "@style/comp/TableData.styled";
import { useRecoilValue } from 'recoil';
import { colorPrimaryState } from '@store/atoms';

interface Props {
  data: any
}

export const TableData = (props: Props) => {
  const { data } = props;
  const keys = Object.keys(data.data ?? '') ?? [];
  const colorPrimary = useRecoilValue(colorPrimaryState);
  console.log()

  return (
    <S.StyledContainer>
      <S.StyledTableWrapper color={ colorPrimary }>
        <S.StyledTable>

        { data.data &&
          <S.StyledColumWrapper color={ colorPrimary }>
            <S.StyledHeader color={ colorPrimary }>index</S.StyledHeader>
            { Array.from({ length: (Object.values((Object.values(data.data ?? '') ?? [])[0] ?? {}).length) }, (_, index) => (
              <S.StyledItem
                key={ index }
                style={{ textAlign: 'center' }}
                color={ colorPrimary }>
                { index }
              </S.StyledItem>
            ))}
          </S.StyledColumWrapper> }

          { keys.map((key => (
            <S.StyledColumWrapper key={ key } color={ colorPrimary }>
              <S.StyledHeader color={ colorPrimary }>{ key }</S.StyledHeader>
              { Object.values(data.data[key]).map((item: any, index: number) => (
                <S.StyledItem key={ index } color={ colorPrimary }>{ item }</S.StyledItem>
              ))}
            </S.StyledColumWrapper>
          ))) }
        </S.StyledTable>
      </S.StyledTableWrapper>
    </S.StyledContainer>
  )
}