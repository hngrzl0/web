import dbUser from "../session_db/db/db_user.mjs";
export default class Login {
    constructor() {
        this.sessions = new Map();
    }
    //hereglegchiin nevtreltiig verify hiih method
    async verifyLogin(req, res) {
        console.log("Verifying...");
        //requestees email pass aa avah
        const email = req.body.email;
        const password = req.body.password;
        //db-s emailer hereglegchig haih method duudah
        const user = await dbUser.getUserByEmail(email);
        //hereglegch baihgui esvel pass tohirohgui bol response status 403 bogono
        if (!user || user.password !== password) {
            res.status(403).end();
            return;
        }
        //random session id uusgene
        const sid = Math.floor(Math.random() * 100_000_000_000_000);
        //session map daa session infonuudaa hadgalna
        this.sessions.set(sid, {
            user: email,
            fullname: user.fullname,
            logged: Date.now()
        });
        console.log(this.sessions);
        //login amjilttai uyd response status 200 bolgod ok iin hamt useriin neriig bucaana 
        res.statusCode = 200;
        res.cookie("session_id", sid);
        res.send({
            result: "OK",
            username: user.fullname
        });
    }
}
//login uusged exportlono
export const login = new Login();