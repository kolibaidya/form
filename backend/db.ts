import { Database } from "bun:sqlite";
import bcrypt from "bcrypt";
import { join } from "path";

const dbPath = join(process.cwd(), "users.db");
const db = new Database(dbPath);

db.run(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    forename TEXT NOT NULL,
    surname TEXT NOT NULL,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
  )
`);

export interface User {
  id: number;
  forename: string;
  surname: string;
  username: string;
  password: string;
}

export interface CreateUserInput {
  forename: string;
  surname: string;
  username: string;
  password: string;
}

export interface UpdateUserInput {
  forename?: string;
  surname?: string;
  username?: string;
  password?: string;
}

export const createUser = (input: CreateUserInput): Omit<User, "password"> => {
  const hashedPassword = bcrypt.hashSync(input.password, 10);
  const stmt = db.prepare(
    "INSERT INTO users (forename, surname, username, password) VALUES (?, ?, ?, ?)",
  );
  const result = stmt.run(
    input.forename,
    input.surname,
    input.username,
    hashedPassword,
  );
  return getUserById(result.lastInsertRowid as number)!;
};

export const getAllUsers = (): Omit<User, "password">[] => {
  const stmt = db.prepare("SELECT id, forename, surname, username FROM users");
  return stmt.all() as Omit<User, "password">[];
};

export const getUserById = (id: number): Omit<User, "password"> | undefined => {
  const stmt = db.prepare(
    "SELECT id, forename, surname, username FROM users WHERE id = ?",
  );
  return stmt.get(id) as Omit<User, "password"> | undefined;
};

export const getUserByUsername = (username: string): User | undefined => {
  const stmt = db.prepare("SELECT * FROM users WHERE username = ?");
  return stmt.get(username) as User | undefined;
};

export const updateUser = (
  id: number,
  input: UpdateUserInput,
): Omit<User, "password"> | undefined => {
  const fields: string[] = [];
  const values: (string | number)[] = [];

  if (input.forename !== undefined) {
    fields.push("forename = ?");
    values.push(input.forename);
  }
  if (input.surname !== undefined) {
    fields.push("surname = ?");
    values.push(input.surname);
  }
  if (input.username !== undefined) {
    fields.push("username = ?");
    values.push(input.username);
  }
  if (input.password !== undefined) {
    fields.push("password = ?");
    values.push(bcrypt.hashSync(input.password, 10));
  }

  if (fields.length === 0) return getUserById(id);

  values.push(id);
  const stmt = db.prepare(`UPDATE users SET ${fields.join(", ")} WHERE id = ?`);
  stmt.run(...values);
  return getUserById(id);
};

export const deleteUser = (id: number): boolean => {
  const stmt = db.prepare("DELETE FROM users WHERE id = ?");
  const result = stmt.run(id);
  return result.changes > 0;
};

export const verifyPassword = (
  plainPassword: string,
  hashedPassword: string,
): boolean => {
  return bcrypt.compareSync(plainPassword, hashedPassword);
};
