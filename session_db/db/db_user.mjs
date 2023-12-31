// db_user.js
import sql from './db.mjs'

class DbUser {
  constructor() {

  }

  async addUser(loginName, password, fullname) {
    try {
        console.log('Adding user:', loginName, password, fullname);

        const userId = await sql`
            INSERT INTO public.web_user
            (loginname, password, fullname)
            VALUES
            (${loginName}, ${password}, ${fullname})
            RETURNING id;
        `;

        console.log('User ID:', userId);

        return userId;
    } catch (error) {
        console.error('Error in addUser:', error);
        return { id: -1 };
    }
}


  async selectUsers() {
    const users = await sql`
    SELECT 
        id, loginname, fullname
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