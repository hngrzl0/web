import sql from './db.mjs'//db handah query vvdiig bicij ogson

class DbUser {
  constructor() {

  }
  //hereglegch nemeh function
  async addUser(loginName, password, fullname) {
    try {
        console.log('Adding user:', loginName, password, fullname);
        //nemeh gj bga useriin medeelel 
        const userId = await sql`
            INSERT INTO public.web_user
            (loginname, password, fullname)
            VALUES
            (${loginName}, ${password}, ${fullname})
            RETURNING id;
        `;
        //db-d nemegdsnii dra bucaagdsn id haruulna
        console.log('User ID:', userId);
        //amjilttai nemegdsn bol id bucaana
        return userId;
    } catch (error) {
        console.error('Error in addUser:', error);
        return { id: -1 };
    }
}

  //hereglegchdiig bucaah query
  async selectUsers() {
    const users = await sql`
    SELECT 
        id, loginname, fullname
	  FROM 
        public.web_user;
  `
    return users;
  }
  //email password oor damjuulan hereglegchiig shalgaj baival hereglegciig bucaana
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
  
    //emaileer n heregelgchiig haij bucaana
    async  getUserByEmail(email) {
      
      const result = await sql`
          SELECT * FROM public.web_user
          WHERE loginname = ${email};
      `;
      if (result && result.length > 0) {
          return result[0]; 
      } else {
          return null; 
      }
      
  }
}
//dbuser object uusged exportlono
const dbUser = new DbUser();
export default dbUser;