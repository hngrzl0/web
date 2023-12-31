
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

app.get('/users', async (req, res) => await user.getUsers(req, res));

app.listen(port, () => console.log(`Example app listening on port http://localhost:${port}`))