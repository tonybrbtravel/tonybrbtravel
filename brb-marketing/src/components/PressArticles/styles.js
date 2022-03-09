import styled from 'styled-components'

export const Wrapper = styled.div`
  display: block;
  width: 100%;
  padding: 30px 16px;
  background-color: #f5f8f9;
  color: #333333;

  h4 {
    text-align: center;
    margin: 0 0 30px 0;
    font-size: 22px;
  }
`
export const Grid = styled.div`
  width: 100%;
  max-width: 1400px;
  display: grid;
  margin-left: auto;
  margin-right: auto;
  grid-gap: 20px;
  grid-template-columns: 1fr min-content, 1;

  @media screen and (min-width: 600px) {
    grid-template-columns: 1fr 1fr;
  }
  @media screen and (min-width: 800px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
  @media screen and (min-width: 1200px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
`
