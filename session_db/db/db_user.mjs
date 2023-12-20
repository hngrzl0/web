// db_user.js
import sql from './db.mjs'

class DbUser {
  constructor() {

  }

  async addUser(loginName, password, fullname) {
    try {

      const userId = await sql`
    INSERT INTO public.web_user
    (loginname, password, fullname)
    VALUES
    (${loginName},${password},${fullname})
    returning id;
    `
      return userId;
    } catch (error) {
      return { id: -1 }
    }
  }

  async selectUsers() {
    const users = await sql`
    SELECT 
        id, loginname, password, fullname
	  FROM 
        public.web_user;
  `
    return users;
  }

  async login(email, password) {
  
    const user = await sql`
    SELECT 
      id, loginname, fullname
	  FROM 
      public.web_user
	  where 
      loginname='${email}' 
        and 
      password='${password}';
  `
    return user;
  }
}

const dbUser = new DbUser();

export default dbUser;