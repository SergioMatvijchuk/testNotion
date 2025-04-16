const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();


const PORT = 5000;
const corsOptions = {
    origin: 'http://localhost:3000', // Разрешаем доступ только с этого домена
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
    credentials: true,  // Разрешаем отправку cookies
};

app.use(cors(corsOptions));  // Используем настройки CORS

app.use(express.json());

app.use(cookieParser());

app.get('/', (req, res) => {
    res.send('Hell oworld!');
});

app.listen(PORT, () => {
    {
        console.log(`Server is running on http://localhost:5000`);
    }
})




// POST-запрос для создания данных
app.post('/create', (req, res) => {

    const { email, code } = req.body;  // получаем данные из тела запроса
    const user = {
        email: email,
        token: 'bla-=bla-bla token',
        ava: 'some img',
        name: 'azeka'
    };
    res.json({
        message: `User was created`,
        status: `success`,
        user: user
    });
});

app.post('/test', (req, res) => {
    console.log('startTest');

    const token = JSON.parse(req.cookies.user).token;
    console.log("Token = " + token);

    if (!token) {
        console.log("Ne Token");

    } else {
        console.log('Token');
    }
})

app.post('/imgriff/pages', (req, res) => {

    const pagestypes = ['empty', 'board', 'list', 'calendur', 'table', 'galllery', 'library'];

    const list = {
        id: 'айди листа',
        parent_page: 'id',
        board_id: 'id',
        title: 'Название списка',
        internal_content: [{
            id: 'айди карт',
            list_id: 'id_page',
            title: 'имя карты',
            description: 'описание карты',
            number: 'номер ',
            color: 'color',
            index: ' положение в строке',
            date: 'date',
            file: {
                id: 'id',
                name: 'file_name',
                url: 'url_file',
            },

        }],
        createdAt: 'date',
        deleteDt: 'date'

    };

    const table = {
        id: 'id',
        parent_page_id: 'idParent',
        title: 'table name',
        rows: 'int',
        columns: 'int',
        cards: [
            [
                {
                    id: 'id',
                    table_id: 'id',
                    data: 'data',
                    background: 'color',
                    foreground: 'color',
                    row: 'int',
                    column: 'int'
                },
            ]
        ],
        createdAt: 'date',
        deleteAt: 'date',
    };

    const board = {
        id: 'id',
        title: 'title',
        parent_page: 'id',
        created_at: 'date',
        delete_at: 'date',
        internal_content:
            [
                {
                    id: 'id',
                    parent_page: 'id',
                    board_id: 'id',
                    title: 'Название списка',
                    InternalContent: {
                        id: 'айди карт',
                        listId: 'id_page',
                        title: 'имя карты',
                        description: 'описание карты',
                        number: 'номер ',
                        color: 'color',
                        index: ' положение в строке',
                        date: 'date',
                        file: {
                            id: 'id',
                            name: 'file_name',
                            url: 'url_file',
                        },

                    },
                    createdAt: 'date',
                    deleteDt: 'date'
                }
            ]
    };
    const calendar = {
        id: 'id',
        title: 'name',
        parent_page: 'id',
        created_at: 'date',
        deleted_at: 'date',
        internal_content: [
            {
                id: 'id',
                title: 'name',
                description: 'description',
                planed_date: 'date',
                number: 'number',
                color: 'color',
                calendar_id: 'date',
                file: {
                    id: 'id',
                    name: 'file_name',
                    url: 'url_file',
                },
            }
        ]
    };

    const gallery = {
        id: 'id',
        title: 'name',
        parent_page: 'id',
        created_at: 'date',
        delete_at: 'date',
        internal_content: [
            {
                id: 'id',
                title: 'name',
                url: 'url_file',
                description: 'name',
                color: 'color',
                galery_id: 'id',
                date: 'date',
                number: 'number'
            }
        ]
    };
    const emptypage = [
        {
            id: 'id_emptypage_1',
            title: 'name1',
            text: 'description1',
            parent_page: 'id1'
        },
        {
            id: 'id_emptypage_2',
            title: 'name2',
            text: 'description2',
            parent_page: 'id2'
        }
    ];


    const pages = [{
        id: 'id_page1',
        owner_id: 'id',
        title: 'EmptyPagenumber1',
        banner: 'banner.img',
        icon: 'icon.ico',
        slug: 'slug.page',
        type: 'empty',
        delete_date: 'date',
        content: 'ссылка на эту страницу'
    },
    {
        id: 'id_page2',
        owner_id: 'id',
        title: 'BoardNumber1',
        banner: 'banner.img',
        icon: 'icon.ico',
        slug: 'slug.page',
        type: 'board',
        delete_date: 'date',
        content: 'ссылка на эту страницу'
    },
    {
        id: 'id_page3',
        owner_id: 'id',
        title: 'Календарь 2025',
        banner: 'banner.img',
        icon: 'icon.ico',
        slug: 'calendar_2025',
        type: 'board',
        delete_date: 'date',
        content: 'ссылка на эту страницу'
    }, {
        id: 'id_page4',
        owner_id: 'id',
        title: 'BoardNumber1',
        banner: 'banner.img',
        icon: 'icon.ico',
        slug: 'slug.page',
        type: 'board',
        delete_date: 'date',
        content: 'Приходит страница через новый запрос по слагу ?? null'
    },
    ]


    const token = JSON.parse(req.cookies.user).token;
    console.log(token);
    const user = JSON.parse(req.cookies.user);

    if (!token) {
        console.log("Ne Token");

    } else {
        console.log('Token');
        res.json({
            message: `ales gut`,
            status: `success`,
            user: user,
            pages
        });
    }




})

