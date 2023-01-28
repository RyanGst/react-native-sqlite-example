import {SQLiteDatabase} from 'react-native-sqlite-storage';
import Database from '../../services/database';
import {ITodo} from '../../types/Todo';

class TodoRepository {
  model!: SQLiteDatabase;

  constructor() {
    this.init();
  }

  async init() {
    new Database().getDBConnection().then(db => {
      this.model = db;
      this.createTable();
      this.createTrigger();
    });
  }

  async createTable() {
    const query = `CREATE TABLE IF NOT EXISTS todo (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        text TEXT,
        completed BOOLEAN
        )`;

    const tableQuery = `CREATE TABLE IF NOT EXISTS logs (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            text TEXT,
            timestamp TEXT
            )`;
    await this.model.executeSql(tableQuery);
    return await this.model.executeSql(query);
  }

  async createTrigger() {
    const triggerQuery = `CREATE TRIGGER IF NOT EXISTS log_update AFTER UPDATE ON todo
        BEGIN
        INSERT INTO logs (text, timestamp) VALUES (OLD.text, datetime('now'));  
        END`;

    return await this.model.executeSql(triggerQuery);
  }

  async create(todo: Partial<ITodo>) {
    const query = `INSERT INTO todo (text, completed) VALUES (?, ?)`;
    const params = [todo.text, todo.completed];

    return await this.model.executeSql(query, params);
  }

  async update(todo: ITodo) {
    const query = `UPDATE todo SET text = ?, completed = ? WHERE id = ?`;
    const params = [todo.text, todo.completed, todo.id];

    return await this.model.executeSql(query, params);
  }

  async selectAll() {
    const query = `SELECT * FROM todo`;
    const result = await this.model.executeSql(query);

    return result[0].rows.raw();
  }

  async delete(id: number) {
    const query = `DELETE FROM todo WHERE id = ?`;
    const params = [id];

    return await this.model.executeSql(query, params);
  }

  async deleteAll() {
    const query = `DELETE FROM todo`;
    return await this.model.executeSql(query);
  }
}

export default TodoRepository;
