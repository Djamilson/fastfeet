import styled from 'styled-components';

import { colors, metrics, fonts } from '~/styles';

export const Front = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);

  right: 0;
  bottom: 0;
  z-index: 99;
  display: -webkit-flex;
  display: -moz-flex;
  display: -ms-flex;
  display: -o-flex;
  justify-content: center;
  -ms-align-items: center;

  -webkit-animation: react-confirm-alert-fadeIn 0.5s 0.2s forwards;
  -moz-animation: react-confirm-alert-fadeIn 0.5s 0.2s forwards;
  -o-animation: react-confirm-alert-fadeIn 0.5s 0.2s forwards;
  animation: react-confirm-alert-fadeIn 0.5s 0.2s forwards;
`;

export const Modall = styled.div`
  min-width: 450px;
  height: 353px;
  background: ${colors.white_};
  border-radius: ${metrics.border_radius}px;
  transition: 1.1s ease-out;
  padding: 20px;
  filter: blur(0);
  transform: scale(1);
  opacity: 1;
  visibility: visible;
  h3 {
    font-size: ${fonts.regular}px;
    color: ${colors.dark};
    font-weight: bold;
    padding-bottom: 10px;
  }
  p {
    line-height: 26px;
    text-align: justify;
    font-size: ${fonts.large}px;
    color: ${colors.dark};
    padding: 4px 0;
  }
`;

export const ContentModal = styled.div`
  display: flex;
  margin-top: 10px;
  border-bottom: 1px solid #ccc;
  padding-bottom: 5px;
  justify-content: flex-start;
  flex-direction: column;
  padding-bottom: 10px;

  div {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: row;
    strong {
      color: ${colors.dark};
      font-weight: bold;
      font-size: ${fonts.regular};
      padding: 4px 0;
    }
    span {
      margin-left: 10px;
      padding: 4px 0;
      color: ${colors.dark};
      font-weight: normal;
      font-size: ${fonts.smaller};
    }
  }
`;

export const Signature = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 20px;
  label {
    img {
      width: 240px;
      height: 60px;
    }
  }
`;
export const ContaineLabel = styled.div`
  margin-top: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: ${colors.serven};
  font-weight: bold;
`;

export const Actions = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  span {
    margin-top: 20px;
    color: ${colors.dark};
    font-weight: bold;
    font-size: ${fonts.smaller};
  }
`;
