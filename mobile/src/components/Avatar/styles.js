import styled from 'styled-components/native';

export const Avatar = styled.Image`
  width: ${props => props.number * 60}px;
  height: ${props => props.number * 60}px;
  border-radius: ${props => props.number * 30}px;
`;
