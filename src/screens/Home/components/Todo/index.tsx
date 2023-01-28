import React from 'react';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {StyledText} from '../../../../components/Text';
import {ITodo} from '../../../../types/Todo';

interface TodoProps extends ITodo {
  onPress: () => void;
  onLongPress?: () => void;
}

export default function Todo({
  completed,
  text,
  onPress,
  onLongPress,
}: TodoProps) {
  return (
    <Row onPress={onPress} onLongPress={onLongPress}>
      <Icon
        name={completed ? 'checkbox-outline' : 'checkbox-blank-outline'}
        size={22}
        color={completed ? '#202020' : '#A3A3A3'}
      />
      <StyledText color={completed ? '#202020' : '#737373'} size="md">
        {text}
      </StyledText>
    </Row>
  );
}

const Row = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 10px;
`;
