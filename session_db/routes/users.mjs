import db_user from "../db/db_user.mjs";

class User { 
    constructor() { 
        //user datah hadgalah
        this.users = new Map();
        this.sessions = new Map();
    }
    //user burtguuleh method
    async verifyRegister(req, res, { email, password, fullname }) { 
        //addUser methodiig duudaj user db-d nemeh
        const result = await dbUser.addUser(email, password, fullname);
        //herev amjiltgui bolsn bol repond oo 400 bolgh
        if (result.id == -1) { 
            res.status(400).end();
            return;
        }
        const sid = Math.floor(Math.random() * 100_000_000_000_000);
        this.sessions.set(sid,
            {
                user: email,
                fullname: dbUser[0].fullname,
                logged: Date.now()
            });
        console.log(this.sessions);
        //burtgel amjilttai uyd response oo 200 bolgoh, user-ina neriig, id bucaah
        res.status(200);
        res.cookie("session_id", sid);
        res.send({
            result: "OK",
            username: dbUser[0].fullname
        });
        res.send(result);
    }
    //hereglegchiin medeelliig avah method
    async getUsers(req, res) { 
        try {
            //db-iin selectUsers methodiig duudaj resultd hadgalah
            const result = await dbUser.selectUsers();
            //response status aa 200 bolgod medeelluude hamt ilgeeh
            res.status(200).send(result);
            return;
        } catch (error) {
            res.status(500).send("Error occured in getUser");
        }

    }
    //login batalgaajuulah method
    async verifyLogin(req, res) {
        //email pass aa requestees avna
        const email = req.body.email, pass = req.body.password;
        //db-iin login methodiig duudaj hariug n hadgalna
        const dbUser = await db_user.login(email, pass);
        //hariu n hoosn bol response status aa 403 bolgono
        if (dbUser ==null) {
            res.status(403);
            res.end();
            return;
        }

        const sid = Math.floor(Math.random() * 100_000_000_000_000);
        this.sessions.set(sid,
            {
                user: email,
                fullname: dbUser[0].fullname,
                logged: Date.now()
            });
        console.log(this.sessions);
        //hereglegch amjilttai nevtersn bol response status aa 200 bolgood full name iin bucaana 
        res.status(200);
        res.cookie("session_id", sid);
        res.send({
            result: "OK",
            username: dbUser[0].fullname
        });

    }
}
//object uusged exportlono
const user = new User();
export default user;