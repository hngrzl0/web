import postgres from 'postgres' //db handah
//db username password port databasename
const sql = postgres('postgres://postgres:0520@localhost:5432/webdev');

export default sql