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
  width: 500px;
  background: white;
  border: 1px solid #ccc;
  transition: 1.1s ease-out;
  filter: blur(0);
  transform: scale(1);
  opacity: 1;
  visibility: visible;
  h3 {
    font-size: ${fonts.regular}px;
    color: ${colors.dark};
    font-weight: bold;
    border-bottom: 1px solid #ccc;
    padding: 1rem;
  }
`;

export const ContentModal = styled.div`
  padding: 1.5rem 1rem;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  div {
    display: flex;
    width: 100%;
    margin-left: -90px;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    span {
      color: ${colors.dark};
      font-weight: normal;
      font-size: ${fonts.smaller};
    }
    strong {
      margin-top: 10px;
      color: ${colors.dark};
      font-weight: bold;
      font-size: ${fonts.regular};
    }
  }
`;

export const Actions = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-self: center;
  border-top: 1px solid #ccc;
  background: #eee;
  padding: 20px;
  align-items: center;
  justify-content: center;

  button {
    color: ${colors.white_};
    border: 0;
    font-weight: bold;
    background: #f00;
    border-radius: 5px;
    padding: 0.3rem 0.4rem;
    font-size: 1.5rem;
    line-height: 1;
    width: 140px;
    height: 35px;
    margin-left: 10px;
  }

  button:first-child {
    background: #1db854;
  }

  button:hover {
    opacity: 0.8;
    background: #7159c1;
    color: ${colors.white_};
    font-weight: bold;
    border: 0;
  }
`;
