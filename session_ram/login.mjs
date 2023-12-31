export default class Login {
    constructor() {
        this.sessions = new Map();
        this.users = new Map();
    }

    verifyLogin(req, res) {
        const email = req.body.email, pass = req.body.password;

        if (!this.users.has(email) || this.users.get(email).password != pass) {
            res.status(403).end();
            return;
        }

        const sid = Math.floor(Math.random() * 100_000_000_000_000);
        this.sessions.set(sid,
            {
                user: email,
                fullname: this.users.get(email).fullname,
                logged: Date.now()
            });
        console.log(this.sessions);

        res.status(200);
        res.cookie("session_id", sid);
        res.send({
            result: "OK",
            username: this.users.get(email).fullname
        });

    }
}

export const login = new Login();