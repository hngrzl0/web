import postgres from 'postgres'

const sql = postgres('postgres://postgres:0520@localhost:5432/webdev');

export default sql