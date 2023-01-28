/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import Routes from './src/index.routes';
import SQLite from 'react-native-sqlite-storage';
import {StatusBar} from 'react-native';
import {TodoProvider} from './src/context/todo.context';

SQLite.DEBUG(true);
SQLite.enablePromise(true);

function App(): JSX.Element {
  return (
    <TodoProvider>
      <StatusBar backgroundColor="#FFF" barStyle={'dark-content'} />
      <Routes />
    </TodoProvider>
  );
}

export default App;
