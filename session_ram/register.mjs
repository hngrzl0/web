import dbUser from "../session_db/db/db_user.mjs";
export default class Register {
  constructor() {
    this.sessions = new Map();
    this.users = new Map();
  }
  //hereglech burtguuleh method
  async verifyRegister(req, res) {
    //requestees email name pass aa avna
    const email = req.body.email,
      name = req.body.fullname,
      password = req.body.password;
    // email, name, password validation
    if (!email || !name || !password) {
      //ali neg n hooson bol response 400 bolgood doorh json bucaana
      return res
        .status(400)
        .json({ error: "email, fullname, password бүрэн оруулах" });
    }  
    //3 utga validated baivl db-s addUser method duudaj id hadgalna
    const userId = await dbUser.addUser(email, password, name);
    console.log("User ID:", userId);
    //herv amjiltgui bol response status aa 500 bolgood doorh error bucaana
    if (userId < 0) {
      return res.status(500).json({ error: "Registration failed" });
    }
    console.log("Registration successful");
    //amjilttai tohioldold response status 200 bolgood neriig bucaana
    res.status(200).send({
      result: "OK",
      username: name
    });
  }
}
export const register = new Register();
