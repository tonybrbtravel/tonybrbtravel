import styled from 'styled-components';
import Colors from '../../themes/Colors';

export const Container = styled.div`
  padding: 0 12px;
`;

export const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 500px;
  max-width: 960px;
  overflow: hidden;
  border-radius: 6px;
  margin: 0 auto;

  @media screen and (min-width: 600px) {
    flex-direction: row;
    height: 360px;
  }

  img {
    object-fit: cover;
    object-position: center;
    width: 100%;
    height: 33.3%;
    filter: ${(props) => (props.tripRevealed ? '' : 'blur(15px);')};

    @media screen and (min-width: 600px) {
      width: 33.3%;
      height: 100%;
    }
  }
`;

export const TripInfo = styled.div`
  position: absolute;
  width: auto;
  border-radius: 3px;
  padding: 14px 40px 14px 14px;
  left: 12px;
  bottom: 12px;
  z-index: 500;
  box-shadow: 0 0 9px 0 rgba(224, 224, 224, 0.5);
  background: white;

  @media screen and (min-width: 600px) {
    left: 30px;
    bottom: 30px;
  }

  h2 {
    margin: 0;
    font-size: 22px;
  }

  a {
    color: ${Colors.red};
  }
`;

export const P = styled.p`
  font-size: 18px;
  color: #a6a6a6;
  margin: 0;
`;

export const RedStar = styled.span`
  font-size: 14px;
  color: ${Colors.red};
`;
export const Stars = styled.span`
  font-size: 14px;
  color: #efefef;
`;

export const Details = styled.ul`
  list-style-type: none;
  display: inline-block;
  padding: 0;
  margin: 0;

  li {
    display: block;
    font-size: 14px;
    margin: 0;

    @media screen and (min-width: 600px) {
      display: inline-block;
      margin-right: 16px;
    }
  }

    strong {
      letter-spacing: -0.5px;
    }
  }
`;
