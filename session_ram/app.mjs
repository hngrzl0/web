import path from 'path';
import express from 'express';
import { login } from './login.mjs'
import { register } from './register.mjs';
import { getusers } from './users.mjs';
const app = express()
const port = 3000
const __dirname = path.resolve(path.dirname(''));
const options = {
    root: path.join(__dirname)
};
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (req, res) => {
    res.sendFile("./login.html", options);
})

app.post('/login', login.verifyLogin.bind(login));

app.get('/register', (req, res) => {
    res.sendFile("create.html", options);
});
app.post('/registeruser', register.verifyRegister.bind(register));
app.get('/users', getusers.get.bind(getusers));
app.listen(port, () => console.log(`Example app listening on port http://localhost:${port}`))