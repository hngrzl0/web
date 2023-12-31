
import path from 'path';
import express from 'express';
import cookieParser from 'cookie-parser';
import user from "./routes/users.mjs";

const app = express()
const port = 3000
const __dirname = path.resolve(path.dirname(''));
const options = {
    root: path.join(__dirname)
};
app.use(cookieParser());
app.use(express.json());
app.get('/', (req, res) => {
    res.sendFile("./login.html", options);
})

app.post('/login', (req, res)=> user.verifyLogin(req, res));

app.get('/register', (req, res) => {
    res.sendFile("create.html", options);
});
app.post('/registeruser', (req, res)=>user.verifyRegister(req, res));
app.get('/emails', (req, res) => {
    console.log(user.sessions);
    if (!user.sessions.has(Number(req.cookies.session_id)))
    {
        res.sendFile('./forbidden.html', options);
        return;
    }
    res.send(`<html><h1>Inbox for ${user.sessions.get(Number(req.cookies.session_id)).fullname} </h1><ul><li>Email1</li><li>Email2</li></ul></html>`);
});


app.get('/users', async (req, res) => await user.getUsers(req, res));

app.listen(port, () => console.log(`Example app listening on port http://localhost:${port}`))