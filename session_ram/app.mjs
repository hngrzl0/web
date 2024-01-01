import path from 'path';
import express from 'express';
import { login } from './login.mjs'
import { register } from './register.mjs';
import { getusers } from './users.mjs';
import { setupSwagger } from './swagger.js';
const app = express()
const port = 3000
const __dirname = path.resolve(path.dirname(''));
const options = {
    root: path.join(__dirname)
};
//json data huleej avdg bolno
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
setupSwagger(app);
/**
 * @swagger
 * tags:
 *  -
 *   name: "Authentication"
 *   description: User authentication operations
 *      
 *  - 
 *   name: "Registration"
 *   description: User registration operations 
 *
 *  - 
 *   name: "Users"
 *   description: User-related operations 
 */
/**
 * @swagger
 * paths:
 *  /:
 *    get:
 *      tags: 
 *        - Authentication
 *      summary: Serve login page
 *      responses:
 *        "200":
 *          description: Login page served successfully
 *          content:
 *            text/html:
 *              schema:
 *                type: string
 */
app.get('/', (req, res) => {
    res.sendFile("./login.html", options);
})

/**
 * @swagger
 * paths:
 *  /login:
 *    post:
 *      tags:
 *        - Authentication
 *      summary: Authenticate user
 *      requestBody:
 *        description: User credentials
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                username:
 *                  type: string
 *                password:
 *                  type: string
 *      responses:
 *        "200":
 *          description: Successful authentication
 *        "401":
 *          description: Unauthorized
 */
app.post('/login', login.verifyLogin.bind(login));

/**
 * @swagger
 * paths:
 *  /register:
 *    get:
 *      tags:
 *        - Registration
 *      summary: Serve registration page
 *      responses:
 *        "200":
 *          description: Registration page served successfully
 *          content:
 *            text/html:
 *              schema:
 *                type: string
 */
app.get('/register', (req, res) => {
    res.sendFile("create.html", options);
});

/**
 * @swagger
 * paths:
 *  /registeruser:
 *    post:
 *      tags:
 *        - Registration
 *      summary: Register a new user
 *      requestBody:
 *        description: User registration details
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                username:
 *                  type: string
 *                password:
 *                  type: string
 *                email:
 *                  type: string
 *      responses:
 *        "201":
 *          description: User successfully registered
 *        "400":
 *          description: Bad request
 */
app.post('/registeruser', register.verifyRegister.bind(register));

/**
 * @swagger
 * paths:
 *  /users:
 *    get:
 *      tags:
 *        - Users
 *      summary: Get user data
 *      responses:
 *        "200":
 *          description: User data retrieved successfully
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  type: object
 *                  properties:
 *                    id:
 *                      type: integer
 *                    username:
 *                      type: string
 *                    email:
 *                      type: string
 */
app.get('/users', getusers.get.bind(getusers));
app.get('/index.html', (req, res) => {
    res.sendFile("index.html", options);
});
app.get('/js_now.html', (req, res) => {
    res.sendFile("js_now.html", options);
});
app.get('/movie.html', (req, res) => {
    res.sendFile("movie.html", options);
});
app.get('/ticketing.html', (req, res) => {
    res.sendFile("ticketing.html", options);
});
app.get('/login.html', (req, res) => {
    res.sendFile("login.html", options);
})
app.listen(port, () => console.log(`Example app listening on port http://localhost:${port}`))