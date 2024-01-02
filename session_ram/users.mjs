import dbUser from "../session_db/db/db_user.mjs";
export default class GetUsers {
  constructor() {
    this.sessions = new Map();
    this.users = new Map();
  }
  //hereglegchdiig avah get method
  async get(req, res) {
    //db-s select users method duudna
    const users = await dbUser.selectUsers();
    if (!users) {
    //hereglegch oldhgui uyd response status 404 blgn
    res.status(404).send("Хэрэглэгч олдсонгүй");
    return;
    }
    //amjilttai uyd status 200 blgd hereglgchude bucaana
    res.status(200).send(users);
  }
}
export const getusers = new GetUsers();
