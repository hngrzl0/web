
import path from 'path';
import express from 'express';
import cookieParser from 'cookie-parser';
import user from "./routes/users.mjs";
//express n node.js d zoriulsan framework
const app = express();
const port = 3000; 
//odoogin directory
const __dirname = path.resolve(path.dirname(''));
//static filed hereglegdh options tdrhoiloh
const options = {
    root: path.join(__dirname)
};
app.use(cookieParser());
//json huseltee zadlah
app.use(express.json());
//static fileduuda todrhoilj ugsnuur zam evdrehgui
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (req, res) => {
    res.sendFile("./login.html", options);
})
//nevtrehdee post huselt ilgeeh uyd user class iin method duudagdna
app.post('/login', (req, res)=> user.verifyLogin(req, res));

app.get('/register', (req, res) => {
    res.sendFile("create.html", options);
});
//user burtguulehdee post huselt ilgeej user classiin method duudagdna
app.post('/registeruser', (req, res)=>user.verifyRegister(req, res));
//hereglegchiin medeelel avhd user class iin getUsers method duudagdna
app.get('/users', async (req, res) => await user.getUsers(req, res));

app.listen(port, () => console.log(`Example app listening on port http://localhost:${port}`))