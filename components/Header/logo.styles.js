import styled from 'styled-components';

export const Logo = styled.div`
 img{ 
    max-width:350px;
    margin-bottom:-10px;
    background-color:#000;
    @media (max-width: 1300px) {
    grid-template-columns: 1fr;
    justify-content: center;
    width:250px;
    align-content:center;
  }
   }
`;
