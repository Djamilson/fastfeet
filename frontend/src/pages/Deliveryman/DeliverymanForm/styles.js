import styled from 'styled-components';
import media from 'styled-media-query';

import { colors, fonts } from '~/styles';

export const Box = styled.div`
  background: ${colors.white};
  height: 105%;
`;

export const Container = styled.div`
  form {
    display: flex;
    flex-direction: column;
    width: 100%;

    label {
      color: ${colors.dark};
      font-weight: bold;
      font-size: ${fonts.smaller};
    }

    article {
      width: 100%;
      margin-bottom: 10px;
    }

    input {
      width: 100%;
      background: ${colors.white_};
      border: 1px solid ${colors.twelve};
      border-radius: 4px;
      padding: 10px;
      color: ${colors.sixX};

      &::placeholder {
        color: ${colors.twelve};
      }
    }
  }
`;

export const ImagemDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;

export const Avatar = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 160px;
  height: 160px;
  border: 3px dashed ${(props) => props.color};
  border-radius: 50%;

  label {
    cursor: pointer;
    transition: height 0.2s ease;
    &:hover {
      opacity: 0.7;
    }

    img {
      width: 160px;
      height: 160px;
      border-radius: 50%;
    }

    input {
      display: none;
    }
  }
`;

export const ContaineIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: ${colors.serven};
  font-weight: bold;
`;

export const GroupEmail = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 0px;

  ${media.lessThan('720px')`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items:center;
  `}
`;

export const Phone = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: 60%;
  margin-top: -10px;

  ${media.lessThan('720px')`
  width: 100%;
  margin-top: 5px;
  `}

  div:first-child {
    margin-right: 10px;
    width: 40%;
    margin-left: 10px;
    ${media.lessThan('720px')`
    margin-left: 0px;
  `}
  }
`;

export const GroupInput = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 0px;

  ${media.lessThan('720px')`
  width: 100%;
  margin-top: 5px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  `}
`;

export const Input01 = styled.div`
  width: 60%;
  margin-right: 10px;

  ${media.lessThan('720px')`
  margin:0;
  width: 100%;
  margin-top: 5px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  `}
`;

export const NumberComplement = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: 50%;
  margin-top: 0;

  ${media.lessThan('720px')`
  width: 100%;
  margin-top: 5px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  `}

  div:first-child {
    margin-right: 0px;
    width: 30%;
    margin-right: 10px;

    ${media.lessThan('720px')`
      margin:0;
      width: 100%;
      margin-top: 5px;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      margin-bottom: 10px;
    `}
  }
  div:last-child {
    margin-right: 0px;
    width: 100%;

    ${media.lessThan('720px')`
      margin:0;
      width: 100%;
      padding-top: 5px;
    `}
  }
`;

export const GroupSelects = styled.div`
  display: flex;
  margin-top: 10px;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;

  ${media.lessThan('1233px')`
      margin:0;
      width: 100%;
      margin-top: 15px;
      margin-left:0;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      margin-bottom: 10px;
    `}
`;

export const StateDiv = styled.div`
  width: 250px;
  padding-right: 40px;
  ${media.lessThan('720px')`
      margin:0px;
      width: 100%;
      margin-top: 10px;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      margin-bottom: 0px;
    `}
`;

export const GroupSelect = styled.div`
  width: 100%;
  margin-top: -4px;
  margin-right: 10px;

  align-items: flex-start;
  justify-content: flex-start;
  align-content: stretch;
  flex-direction: column;

  ${media.lessThan('1233px')`
  margin:0;
  left:0;
      width: 100%;
      margin-top: 0px;

    `}

  ${media.lessThan('720px')`
      margin:0;
      margin-left:0;
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;

    `}
`;

export const AddressState = styled.div`
  margin-top: 0;
  width: ${(props) => (props.showCity ? '50%' : '78%')};
  ${media.lessThan('720px')`
      margin:0;
      width: 100%;
      margin-top: 5px;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      margin-bottom: 10px;
    `}
`;
export const AddressCity = styled.div`
  margin-top: -64px;
  margin-left: 292px;
  height: 60px;
  width: 225px;

  ${media.lessThan('1233px')`
  margin:0;
  left:0;
      width: 100%;
      margin-top: 15px;
    `}

  ${media.lessThan('720px')`
      margin:0;
      width: 100%;
      margin-top: 5px;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      margin-bottom: 10px;
    `}
`;

export const AddressCep = styled.div`
  width: 120px;
`;

export const AddressCEP = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  ${media.lessThan('1233px')`
  margin:0;
  left:0;
      width: 100%;
      margin-top: 5px;

    `}

  ${media.lessThan('720px')`
      margin:0;
      width: 100%;
      margin-top: 5px;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;

    `}
`;

export const District = styled.div`
  margin: 5px 0 10px 0;
  width: 60%;
  margin-right: 10px;
`;

export const AvatarTable = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;

  label {
    cursor: pointer;
    border: 1px dashed #ddd;
    border-radius: 4px;
    height: auto;
    width: 60px;
    color: #fff;
    transition: height 0.2s ease;

    &:hover {
      opacity: 0.7;
    }

    img {
      height: 60px;
      width: 60px;
      border-radius: 50%;
      border: 3px solid rgba(255, 255, 255, 0.3);
      background: #eee;
    }

    input {
      display: none;
    }
  }
`;
