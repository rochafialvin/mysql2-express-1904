const pool = require("../config/database");

const insertUser = async (data) => {
  const connection = await pool.promise().getConnection();

  const sqlAddUser = `insert into users set ?;`;
  const dataAddUser = [data];
  const [result] = await connection.query(sqlAddUser, dataAddUser);
  
  connection.release();

  return result;
};

const insertUsers

const getAllUser = () => {};

const getUserById = () => {};

const updateUserById = () => {};

const deleteUserById = () => {};
module.exports = { insertUser };
