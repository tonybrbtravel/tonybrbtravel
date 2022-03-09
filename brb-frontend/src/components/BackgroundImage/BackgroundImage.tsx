import styled from 'styled-components';

interface BackgroundImageProps {
  src: string;
  isActive: boolean;
}

const BackgroundImage = styled.img<BackgroundImageProps>`
  background-image: ${(props: any) => `url(${process.env.PUBLIC_URL}/${props.src})`};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: ${(props: any) => (props.isActive ? 1 : 0)};
  transition: opacity 500ms ease-in-out;
`;

export default BackgroundImage;
