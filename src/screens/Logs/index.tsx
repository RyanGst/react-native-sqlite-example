import {View, Text} from 'react-native';
import React from 'react';
import styled from 'styled-components/native';

export default function Logs() {
  return (
    <Container>
      <Text>Logs</Text>
    </Container>
  );
}

const Container = styled.View`
  background-color: #fff;
  flex: 1;
  padding: 20px;
`;
