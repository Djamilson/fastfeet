import styled from 'styled-components';

import { colors, fonts } from '~/styles';

export const Container = styled.div`
  flex: 1;
  form {
    display: flex;
    flex-direction: column;
    width: 100%;
    hr {
      border-top: #c1c1c1 1px solid;
      margin: 20px 0;
    }
    label {
      color: ${colors.dark};
      font-weight: bold;
      font-size: ${fonts.smaller};
    }

    article {
      width: 100%;
      margin-bottom: 10px;
    }

    article:first-child {
      margin-right: 0px;
      width: 120px;
      margin-right: 10px;
    }

    article:last-child {
      margin-right: 0px;
      width: 120px;
      margin-right: 10px;
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

export const GroupEmail = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
`;

export const Password = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;

  div:first-child {
    padding-right: 5px;
    min-width: 200px;
  }

  div:last-child {
    min-width: 200px;
  }
`;

export const GroupInput = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 0px;
`;

export const Input01 = styled.div`
  width: 60%;
  margin-right: 10px;
`;

export const NumberComplement = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: 50%;
  margin-top: 0;

  div:first-child {
    margin-right: 0px;
    width: 30%;
    margin-right: 10px;
  }
`;

export const GrupSelects = styled.div`
  display: flex;
  margin-top: 10px;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
`;

export const GrupSelect = styled.div`
  width: 210px;
  margin-top: -4px;
  margin-right: 10px;

  align-items: center;
  justify-content: center;
  align-content: stretch;
  flex-direction: column;
`;

export const AddressState = styled.div`
  margin-top: 0;
`;
export const AddressCity = styled.div`
  margin-top: -64px;
  margin-left: 222px;
  height: 60px;
  width: 225px;
`;

export const AddressCep = styled.div`
  width: 120px;
`;

export const AddressCEP = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
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

export const ContaineIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: ${colors.serven};
  font-weight: bold;
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
