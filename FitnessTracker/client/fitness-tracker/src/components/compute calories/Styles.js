import styled from "styled-components";




export const Container = styled.div`
 background-color: #36393f;
  color: #fff;
  padding: 20px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
`;

export const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 16px;
  background-color: #202225;
  box-shadow: 0 1px 0 rgba(4, 4, 5, 0.12), 0 1px 2px rgba(4, 4, 5, 0.24);
`;

export const Title = styled.h1`
  color: #ffffff;
  font-size: 20px;
  font-weight: 500;
`;

export const Main = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  flex: 1;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 400px;
  background-color: #40444b;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
`;

export const Label = styled.label`
  color: #b9bbbe;
  margin-bottom: 5px;
  font-size: 14px;
`;

export const Select = styled.select`
  background-color: #202225;
  color: #ffffff;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  margin-bottom: 10px;
  font-size: 16px;
`;

export const Option = styled.option`
  background-color: #202225;
  color: #ffffff;
`;

export const RadioGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`;

export const RadioLabel = styled.label`
  color: #b9bbbe;
  margin-bottom: 5px;
  font-size: 14px;
`;

export const Radio = styled.input`
  margin-right: 5px;
`;

export const Button = styled.button`
  background-color: #7289da;
  color: #ffffff;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  margin-top: 10px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #677bc4;
  }
`;

export const Error = styled.span`
  color: #f04747;
  margin-top: 10px;
  font-size: 14px;
`;
