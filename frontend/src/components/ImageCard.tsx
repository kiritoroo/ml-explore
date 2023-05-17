import React, { useImperativeHandle, useState } from 'react';
import * as S from '@style/comp/ImageCard.styled';
import { useRecoilValue } from 'recoil';
import { colorPrimaryState, selectedModuleState } from '@store/atoms';

interface Props {}

interface Refs {
  setImage: React.Dispatch<React.SetStateAction<string>>
}

export const ImageCard = React.forwardRef<Refs, Props>((props: Props, ref) => {
  const colorPrimary = useRecoilValue(colorPrimaryState);
  const selecteedModule = useRecoilValue(selectedModuleState);
  const [image, setImage] = useState('');

  useImperativeHandle(ref, () => {
    return {
      setImage: setImage,
    }
  }, [])

  return (
    <S.StyledContainer>
      <S.StyledImageWrapper color={ colorPrimary }>
        <S.StyledImage
          src={ image }
          onError={({ currentTarget }) => {
            currentTarget.onerror = null;
            currentTarget.src = selecteedModule?.examplePath!
          }} />
      </S.StyledImageWrapper>
    </S.StyledContainer>
  )
})
