import React from 'react';
import {TouchableOpacity} from 'react-native';
import {FlatList, View} from 'react-native';
import styled from 'styled-components/native';
import {StyledText} from '../../components/Text';
import {useTodo} from '../../context/todo.context';
import {ITodo} from '../../types/Todo';
import ActionButton from './components/ActionButton';
import Todo from './components/Todo';

export default function Home({navigation}) {
  const {todos, addTodo, toggleTodo, removeTodo} = useTodo();

  console.log('Todos', todos);

  const renderItem = ({item}: {item: ITodo}) => (
    <Todo
      {...item}
      onPress={() => toggleTodo(item)}
      onLongPress={() => removeTodo(item.id)}
    />
  );

  const create = () => {
    addTodo({
      text: `NEW TODO ${Date.now()}}`,
      completed: false,
    });
  };

  return (
    <Container>
      <View>
        <StyledText font="bold" size="xl">
          Home
        </StyledText>
        <TouchableOpacity onPress={() => navigation.navigate('Logs')}>
          <StyledText color="#0000ff">Go to logs</StyledText>
        </TouchableOpacity>
      </View>
      <FlatList
        data={todos}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        ItemSeparatorComponent={Separator}
      />
      <ActionButton onPress={create} />
    </Container>
  );
}

const Container = styled.View`
  background-color: #fff;
  flex: 1;
  padding: 20px;
`;

const Separator = styled.View`
  height: 1px;
  background-color: #e5e5e5;
  margin: 10px 0;
`;
