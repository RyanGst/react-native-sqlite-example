import {openDatabase} from 'react-native-sqlite-storage';

class Database {
  getDBConnection = async () => {
    return openDatabase({name: 'todo-data.db', location: 'default'});
  };
}
export default Database;
