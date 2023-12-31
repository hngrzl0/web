import dbUser from "../session_db/db/db_user.mjs";

export default class Register {
    constructor() {
      this.sessions = new Map();
      this.users = new Map();
    }
  
    async verifyRegister(req, res) {
      
      const email = req.body.email,
        name = req.body.fullname,
        password = req.body.password;
      if (!email || !name || !password) {
        return res
          .status(400)
          .json({ error: "Email, fullname, password are required" });
      }  
      const userId = await dbUser.addUser(email, password, name);
      if (userId < 0) {
        return res.status(500).json({ error: "Registration failed" });
      }
      const sid = Math.floor(Math.random() * 100_000_000_000_000);
      this.sessions.set(sid, {
        user: email,
        fullname: name,
        registered: Date.now(),
      });
      console.log("Registration successful");
      res.status(200).send({
        result: "OK",
        username: name
      });
    }
  }
export const register = new Register();
