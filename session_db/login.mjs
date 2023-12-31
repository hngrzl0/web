import dbUser from "../session_db/db/db_user.mjs";
export default class Login {
    constructor() {
        this.sessions = new Map();
        //this.users = new Map();
    }

    async verifyLogin(req, res) {
        console.log("Verifying...");
        const email = req.body.email;
        const password = req.body.password;
        const user = await dbUser.getUserByEmail(email);
        if (!user || user.password !== password) {
            res.status(403).end();
            return;
        }

        const sid = Math.floor(Math.random() * 100_000_000_000_000);
        this.sessions.set(sid, {
            user: email,
            fullname: user.fullname,
            logged: Date.now()
        });

        console.log(this.sessions);

        res.statusCode = 200;
        res.cookie("session_id", sid);
        res.send({
            result: "OK",
            username: user.fullname
        });
    }
}

export const login = new Login();