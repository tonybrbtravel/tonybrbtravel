import styled from 'styled-components'
import Colors from '../../themes/Colors'

export const Wrapper = styled.section`
  display: flex;
  max-width: 1000px;
  padding: 0 20px;
  flex-direction: column;
  padding: 30px;
  align-items: center;
  margin: auto;

  @media screen and (min-width: 500px) {
    flex-direction: row;
    padding: 0;
  }
`

export const Block = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  a {
    color: ${Colors.red};
    font-size: 18px;
    &:hover {
      cursor: pointer;
    }
  }

  @media screen and (min-width: 500px) {
    width: 100%;
  }
`

export const Box = styled.div`
  background: #ffffff;
  box-shadow: 0 2px 24px 0 rgba(196, 196, 196, 0.5);
  padding: 24px 20px 0px 20px;
  border-radius: 6px;
  width: 300px;
  margin-top: 30px;

  @media screen and (min-width: 500px) {
    margin-top: -126px;
    margin-bottom: 0;
  }
`

export const Desc = styled.p`
  color: ${Colors.blue};
  font-size: 18px;
  margin: 0;
  line-height: 1;
  margin-bottom: 8px;
`
export const Price = styled.h3`
  font-size: 42px;
  letter-spacing: -1.5px;
  margin: 0;
  line-height: 1;

  span {
    font-size: 18px;
    letter-spacing: -1px;
  }
`
export const Info = styled.p`
  display: inline-block;
  padding: 6px 8px;
  margin: 8px 0 20px 0;
  background-color: ${Colors.blue};
  color: white;
  font-size: 16px;
  line-height: 1;
  border-radius: 3px;
`
export const Checklist = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0 0 20px 0;

  li {
    margin: 0px;
    padding: 0px;
    font-size: 16px;
    color: #7f7f7f;
    padding-left: 24px;
    position: relative;
    margin-bottom: 6px;

    &:before {
      content: '✓';
      display: block;
      color: ${Colors.green};
      position: absolute;
      left: 0px;
    }
  }
`
