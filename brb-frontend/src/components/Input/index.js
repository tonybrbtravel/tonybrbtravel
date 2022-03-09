import React from 'react';
import styled from 'styled-components';

const Box = styled.input`
  padding: 12px 0px 12px 12px;
  font-size: 16px;
  border: ${(props) => (props.blue ? '1px solid #9FB6D3' : '3px solid red')};
  border-radius: 3px;
  display: block;
  margin: 0;
  margin-bottom: 16px;
  width: 100%;

  &::placeholder {
    color: #a4a4a4;
  }
`;

export function Input(props) {
  const { error } = props;
  return (
    <div>
      <Box {...props} />
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}
