// const express = require('express');
// const cors = require('cors');
// const cookieParser = require('cookie-parser');
// const { pages } = require('./fakeServerData');
// const app = express();
// /**config server */

// const PORT = 5000;
// const corsOptions = {
//     origin: 'http://localhost:3000', // Разрешаем доступ только с этого домена
//     methods: ['GET', 'POST'],
//     allowedHeaders: ['Content-Type'],
//     credentials: true,  // Разрешаем отправку cookies
// };
// app.use(cors(corsOptions));  // Используем настройки CORS
// app.use(express.json());
// app.use(cookieParser());

// /**local data */



// app.get('/', (req, res) => {
//     res.send('Hell oworld!');
// });

// app.get('/getPageBySlug', (req, res) => {
//     console.log("Зашли в getPageById");

//     const { slug } = req.query;
//     if (slug) {
//         console.log(`Have request with slug ${slug}`);
        
//         const page = pages.find((item => item.id === id));
//         res.json({
//             message: `data with ID : ${id}`,
//             res: page
//         });

//     } else {
//         res.status(404).json({ error: `Id not have` });
//     }
// })



// app.listen(PORT, () => {
//     {
//         console.log(`Server is running on http://localhost:5000`);
//     }
// })




// // POST-запрос для создания данных
// app.post('/create', (req, res) => {

//     const { email, code } = req.body;  // получаем данные из тела запроса
//     const user = {
//         email: email,
//         token: 'bla-=bla-bla token',
//         ava: 'some img',
//         name: 'azeka'
//     };
//     res.json({
//         message: `User was created`,
//         status: `success`,
//         user: user
//     });
// });

// app.post('/test', (req, res) => {
//     console.log('startTest');

//     const token = JSON.parse(req.cookies.user).token;
//     console.log("Token = " + token);

//     if (!token) {
//         console.log("Ne Token");

//     } else {
//         console.log('Token');
//     }
// })

// app.post('/imgriff/pages', (req, res) => {

//     const token = JSON.parse(req.cookies.user).token;
//     console.log(token);
//     const user = JSON.parse(req.cookies.user);

//     if (!token) {
//         console.log("Ne Token");

//     } else {
//         console.log('Token');
//         res.json({
//             message: `ales gut`,
//             status: `success`,
//             user: user,
//             pages
//         });
//     }
// })

