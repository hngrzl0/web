import path from 'path';
import express from 'express';
//import cookieParser from 'cookie-parser';
import { login } from './login.mjs'
import { register } from './register.mjs';


const app = express()
const port = 3000
const __dirname = path.resolve(path.dirname(''));
const options = {
    root: path.join(__dirname)
};
//app.use(cookieParser());
app.use(express.json());

login.users.set('zul', { fullname: "Zul", password: "123" });
login.users.set('admin', { fullname: "Admin", password: "123" });


app.get('/', (req, res) => {
    res.sendFile("./login.html", options);
})

app.post('/login', login.verifyLogin.bind(login));

app.get('/register', (req, res) => {
    res.sendFile("create.html", options);
});

app.post('/registeruser', register.verifyRegister.bind(register));

app.get('/emails', (req, res) => {
    if (!login.sessions.has(Number(req.cookies.session_id)))
    {
        res.sendFile('./forbidden.html', options);
        return;
    }

    res.send(`<html><h1>Inbox for ${login.sessions.get(Number(req.cookies.session_id)).fullname} </h1><ul><li>Email1</li><li>Email2</li></ul></html>`);
})

app.listen(port, () => console.log(`Example app listening on port http://localhost:${port}`))