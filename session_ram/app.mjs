import path from 'path';
import express from 'express';
import { login } from './login.mjs'
import { register } from './register.mjs';
import { getusers } from './users.mjs';
import swaggerUi from "swagger-ui-express";
import swaggerJsondoc from "swagger-jsdoc";
const app = express()
const port = 3000
const __dirname = path.resolve(path.dirname(''));
//json data huleej avdg bolno
app.use(express.json());
//static file zam aa zov zaana css zurg evdrhgui
app.use(express.static(path.join(__dirname, 'public')));
//static file bolon swaggert optionuudig todrhoiloh
const options = {
    root: path.join(__dirname),
    swaggerDefinition: {
        // Swagger/OpenAPI version
        openapi: "3.0.0",
        // API mdeelluud
        info: {
            title: "TEK API",
            version: "1.0.0",
            description:
                "API for TEK community", 
            license: {
                name: "NUM",
                url: "https://num.edu.mn/"
            },
            contact: {
                name: "WebDevAdmin",
                url: "https://www.num.edu.mn/",
                email: "21B1NUM0165@num.edu.mn"
            }
        },
        // Server iin medeelel
        servers: [
            {
                url: "http://localhost:3000/"
            }
        ]
    },
     //  Swagger documentation aguulj bui file iin zam(path)
    apis: ["session_ram/app.mjs"]
};
//documentation oo uusgeh
const specs = swaggerJsondoc(options);
app.use("/docs", swaggerUi.serve);
app.get(
    "/docs",
    swaggerUi.setup(specs, {
        explorer: true
    })
);
/**
 * @swagger
 * tags:
 *  -
 *   name: "Authentication"
 *   description: Хэрэглэгч баталгаажуулалт
 *      
 *  - 
 *   name: "Registration"
 *   description: Хэрэглэгч бүртгүүлэлт 
 *
 *  - 
 *   name: "Users"
 *   description: Хэрэглэгчийн мэдээлэлтэй холбоотой 
 *  
 *  - 
 *   name: "Static Files"
 *   description: Файлтай холбоотой  
 */
/**
 * @swagger
 * paths:
 *  /:
 *    get:
 *      tags: 
 *        - Static Files
 *      summary: Нэвтрэх хуудас
 *      responses:
 *        "200":
 *          description: Нэвтрэх хуудас амжилттай дамжуулагдав.
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
 *      summary: Хэрэгдэгчийг баталгаажуулах
 *      requestBody:
 *        description: Хэрэглэгчийн мэдээлэл шаардлагатай
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                email:
 *                  type: string
 *                password:
 *                  type: string
 *      responses:
 *        "200":
 *          description: Нэвтрэлт амжилттай.
 *        "403":
 *          description: Нэвтрэх мэдээлэл хангалтгүй.
 */
app.post('/login', login.verifyLogin.bind(login));

/**
 * @swagger
 * paths:
 *  /register:
 *    get:
 *      tags:
 *        - Static Files
 *      summary: Бүртгүүлэх хуудас
 *      responses:
 *        "200":
 *          description: Бүртгүүлэх хуудас амжилттай дамжуулагдав.
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
 *      summary: Шинэ хэрэглэгч бүртгэх
 *      requestBody:
 *        description: хэрэглэгчийн мэдээлэл шаардлагатай.
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                email:
 *                  type: string
 *                fullname:
 *                  type: string
 *                password:
 *                  type: string
 *      responses:
 *        "200":
 *          description: Хэрэглэгчийг амжилттай бүртгэв.
 *        "400":
 *          description: Хэрэглэгчийн мэдээлэл хангалтгүй.
 *        "500":
 *          description: Бүртгэл амжилтгүй.
 */
app.post('/registeruser', register.verifyRegister.bind(register));

/**
 * @swagger
 * paths:
 *  /users:
 *    get:
 *      tags:
 *        - Users
 *      summary: Хэрэглэгчийн мэдээлэл авах
 *      responses:
 *        "200":
 *          description: Хэрэглэгчийн мэдээлэл амжилттай дамжуулагдав.
 *        "404":
 *          description: Хэрэглэгчийн мэдээлэл олдсонгүй.
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  type: object
 *                  properties:
 *                    id:
 *                      type: integer
 *                    loginname:
 *                      type: string
 *                    fullname:
 *                      type: string
 */
app.get('/users', getusers.get.bind(getusers));
/**
 * @swagger
 * paths:
 *  /index.html:
 *    get:
 *      tags:
 *        - Static Files
 *      summary: Нүүр хуудас
 *      responses:
 *        "200":
 *          description: Нүүр хуудас амжилттай дамжуулагдав.
 *          content:
 *            text/html:
 *              schema:
 *                type: string
 */
app.get('/index.html', (req, res) => {
    res.sendFile("index.html", options);
});
/**
 * @swagger
 * paths:
 *  /js_now.html:
 *    get:
 *      tags:
 *        - Static Files
 *      summary: Кино хуудас
 *      responses:
 *        "200":
 *          description: Кино хуудас амжилттай дамжуулагдав.
 *          content:
 *            text/html:
 *              schema:
 *                type: string
 */
app.get('/js_now.html', (req, res) => {
    res.sendFile("js_now.html", options);
});

/**
 * @swagger
 * paths:
 *  /movie.html:
 *    get:
 *      tags:
 *        - Static Files
 *      summary: Кино2 хуудас
 *      responses:
 *        "200":
 *          description: Кино хуудас амжилттай дамжуулагдав.
 *          content:
 *            text/html:
 *              schema:
 *                type: string
 */
app.get('/movie.html', (req, res) => {
    res.sendFile("movie.html", options);
});
/**
 * @swagger
 * paths:
 *  /ticketing.html:
 *    get:
 *      tags:
 *        - Static Files
 *      summary: Захиалга хуудас
 *      responses:
 *        "200":
 *          description: Захиалга хуудас амжилттай дамжуулагдав.
 *          content:
 *            text/html:
 *              schema:
 *                type: string
 */
app.get('/ticketing.html', (req, res) => {
    res.sendFile("ticketing.html", options);
});
/**
 * @swagger
 * paths:
 *  /login.html:
 *    get:
 *      tags:
 *        - Static Files
 *      summary: Нэвтрэх хуудас
 *      responses:
 *        "200":
 *          description: Нэвтрэх хуудас амжилттай дамжуулагдав.
 *          content:
 *            text/html:
 *              schema:
 *                type: string
 */
app.get('/login.html', (req, res) => {
    res.sendFile("login.html", options);
})
app.listen(port, () => console.log(`Example app listening on port http://localhost:${port}`))