import { darken } from 'polished';
import styled from 'styled-components';

import { colors, fonts, metrics } from '~/styles';

export const Wrapper = styled.div`
  background: ${colors.third};
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

export const Content = styled.div`
  min-width: 360px;
  height: 425px;
  padding: 0 30px;
  background: ${colors.white_};
  border-radius: ${metrics.border_radius}px;

  display: flex;
  justify-items: center;
  align-items: center;
  flex-direction: column;

  img {
    width: 250px;
    height: auto;
    margin-top: 60px;
  }

  form {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-top: 40px;
    width: 100%;

    label {
      margin-bottom: 0.2rem;
      position: relative;
      color: ${colors.darker};
      font-weight: bold;
      padding-bottom: 2px;
      font-size: ${fonts.regular}px;
    }

    input {
      background: ${colors.white_};
      border: 1px solid ${colors.twelve};
      border-radius: 4px;
      height: 45px;
      padding: 10px;
      margin: 0 0 15px;
      min-width: 300px;

      &::placeholder {
        color: ${colors.twelve};
      }
    }

    button {
      width: 300px;
      margin: 0;
      height: 45px;
      background: ${colors.third};
      font-weight: bold;
      color: ${colors.white_};
      border: 0;
      border-radius: ${metrics.border_radius_4}px;
      font-size: ${fonts.small}px;
      transition: backgroud 0.2s;

      &:hover {
        background: ${darken(0.03, '#3b9eff')};
      }
    }
  }
`;
