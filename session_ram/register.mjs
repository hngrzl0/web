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
    // email, name, password validation
    if (!email || !name || !password) {
      return res
        .status(400)
        .json({ error: "email, fullname, password бүрэн оруулах" });
    }  
    const userId = await dbUser.addUser(email, password, name);
    console.log("User ID:", userId);
    if (userId < 0) {
      return res.status(500).json({ error: "Registration failed" });
    }
    console.log("Registration successful");
    res.status(200).send({
      result: "OK",
      username: name
    });
  }
}
export const register = new Register();