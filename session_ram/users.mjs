import dbUser from "../session_db/db/db_user.mjs";

export default class GetUsers {
  constructor() {
    this.sessions = new Map();
    this.users = new Map();
  }
  async get(req, res) {
    const users = await dbUser.selectUsers();

    if (!users) {
    res.status(404).send("Хэрэглэгч олдсонгүй");
    return;
    }
    res.status(200).send(users);
  }
}
export const getusers = new GetUsers();
