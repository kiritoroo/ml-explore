import React from 'react';
import * as S from '@style/comp/Navbar.styled';
import { LineCanvas } from './LineCanvas';

interface Props {

}

export const Navbar = ( props: Props ) => {

  return (
    <S.StyledContainer>
      <LineCanvas/>
    </S.StyledContainer>
  )
}