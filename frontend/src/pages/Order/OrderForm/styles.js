import styled from 'styled-components';
import media from 'styled-media-query';

import { colors, fonts, metrics } from '~/styles';

export const Container = styled.div`
  flex: 1;
  form {
    display: flex;
    flex-direction: column;
    width: 100%;

    label {
      color: ${colors.dark};
      font-weight: bold;
      font-size: ${fonts.smaller};
    }

    input {
      width: 100%;
      background: ${colors.white_};
      border: 1px solid ${colors.twelve};
      border-radius: ${metrics.border_radius_4}px;
      padding: 10px;
      color: ${colors.sixX};

      &::placeholder {
        color: ${colors.twelve};
      }
    }

    textarea {
      width: 100%;
      background: ${colors.white_};
      border: 1px solid ${colors.twelve};
      border-radius: ${metrics.border_radius_4}px;
      padding: 10px;
      color: ${colors.sixX};
      resize: vertical;
      min-height: 140px;
      line-height: 24px;

      &::placeholder {
        color: ${colors.twelve};
      }
    }
  }
`;

export const GroupSelect = styled.div`
  width: 50%;
  margin-top: -4px;
  align-items: center;
  justify-content: center;
  align-content: stretch;
  flex-direction: column;
  ${media.lessThan('720px')`    
    width: 100%;  
    `}
`;

export const Recipient = styled.div`
  margin-top: 0;
`;
export const Deliveryman = styled.div`
  margin-top: -64px;
  margin-left: 105%;
  height: 60px;
  width: 95%;

  ${media.lessThan('720px')`
    margin-top: 10px;
    margin-left: 0;    
    flex-direction: column;     
    width: 100%; 
    `}
`;

export const GoupInput = styled.div`
  margin: 10px 0;
  width: 100%;
`;
