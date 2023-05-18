import React, { useImperativeHandle, useState } from 'react';
import * as S from '@style/comp/ImageCard.styled';
import { useRecoilValue } from 'recoil';
import { colorPrimaryState, isLoadingImageState, selectedModuleState } from '@store/atoms';
import { Loading } from './Loading';

interface Props {}

interface Refs {
  setImage: React.Dispatch<React.SetStateAction<string>>
}

export const ImageCard = React.forwardRef<Refs, Props>((props: Props, ref) => {
  const colorPrimary = useRecoilValue(colorPrimaryState);
  const selectedModule = useRecoilValue(selectedModuleState);
  const isLoadingImage = useRecoilValue(isLoadingImageState);
  const [image, setImage] = useState('');
  
  useImperativeHandle(ref, () => {
    return {
      setImage: setImage,
    }
  }, [])

  return (
    <S.StyledContainer>
      <S.StyledImageWrapper color={ colorPrimary }>
        { isLoadingImage && <Loading/> }
        <S.StyledImage
          src={ image }
          onError={({ currentTarget }) => {
            currentTarget.onerror = null;
            currentTarget.src = selectedModule?.examplePath!
          }} />
      </S.StyledImageWrapper>
    </S.StyledContainer>
  )
})
