export const pagesCollection = {
    "empty": [
        {
            "id": "id_emptypage_1",
            "title": "name1",
            "text": "description1",
            "parent_page": "id1"
        },
        {
            "id": "id_emptypage_2",
            "title": "name2",
            "text": "description2",
            "parent_page": "id2"
        }
    ],
    "board": [
        {
            "id": "board_1",
            "title": "Board 1",
            "parent_page": "id1",
            "created_at": "2025-04-26",
            "delete_at": "2025-05-01",
            "internal_content": [
                {
                    "id": "card_1",
                    "parent_page": "id1",
                    "board_id": "board_1",
                    "title": "Card 1",
                    "InternalContent": {
                        "id": "card_content_1",
                        "listId": "id_list1",
                        "title": "Card Content 1",
                        "description": "Card Description 1",
                        "number": "1",
                        "color": "red",
                        "index": "1",
                        "date": "2025-04-26",
                        "file": {
                            "id": "file_1",
                            "name": "file1.pdf",
                            "url": "https://example.com/file1.pdf"
                        }
                    },
                    "createdAt": "2025-04-26",
                    "deleteDt": "2025-05-01"
                }
            ]
        },
        {
            "id": "board_2",
            "title": "Board 2",
            "parent_page": "id2",
            "created_at": "2025-04-27",
            "delete_at": "2025-05-02",
            "internal_content": [
                {
                    "id": "card_2",
                    "parent_page": "id2",
                    "board_id": "board_2",
                    "title": "Card 2",
                    "InternalContent": {
                        "id": "card_content_2",
                        "listId": "id_list2",
                        "title": "Card Content 2",
                        "description": "Card Description 2",
                        "number": "2",
                        "color": "blue",
                        "index": "2",
                        "date": "2025-04-27",
                        "file": {
                            "id": "file_2",
                            "name": "file2.pdf",
                            "url": "https://example.com/file2.pdf"
                        }
                    },
                    "createdAt": "2025-04-27",
                    "deleteDt": "2025-05-02"
                }
            ]
        }
    ],
    "calendar": [
        {
            "id": "calendar_1",
            "title": "Calendar 1",
            "parent_page": "id1",
            "created_at": "2025-04-26",
            "deleted_at": "2025-05-01",
            "internal_content": [
                {
                    "id": "event_1",
                    "title": "Event 1",
                    "description": "Event Description 1",
                    "planed_date": "2025-05-01",
                    "number": "1",
                    "color": "green",
                    "calendar_id": "2025-05-01",
                    "file": {
                        "id": "file_1",
                        "name": "file1.pdf",
                        "url": "https://example.com/file1.pdf"
                    }
                }
            ]
        },
        {
            "id": "calendar_2",
            "title": "Calendar 2",
            "parent_page": "id2",
            "created_at": "2025-04-27",
            "deleted_at": "2025-05-02",
            "internal_content": [
                {
                    "id": "event_2",
                    "title": "Event 2",
                    "description": "Event Description 2",
                    "planed_date": "2025-05-02",
                    "number": "2",
                    "color": "yellow",
                    "calendar_id": "2025-05-02",
                    "file": {
                        "id": "file_2",
                        "name": "file2.pdf",
                        "url": "https://example.com/file2.pdf"
                    }
                }
            ]
        }
    ],
    "table": [
        {
            "id": "table_1",
            "parent_page_id": "id1",
            "title": "Table 1",
            "rows": 3,
            "columns": 3,
            "cards": [
                [
                    {
                        "id": "card_1",
                        "table_id": "table_1",
                        "data": "Data 1",
                        "background": "red",
                        "foreground": "white",
                        "row": 1,
                        "column": 1
                    }
                ]
            ],
            "createdAt": "2025-04-26",
            "deleteAt": "2025-05-01"
        },
        {
            "id": "table_2",
            "parent_page_id": "id2",
            "title": "Table 2",
            "rows": 2,
            "columns": 2,
            "cards": [
                [
                    {
                        "id": "card_2",
                        "table_id": "table_2",
                        "data": "Data 2",
                        "background": "blue",
                        "foreground": "black",
                        "row": 1,
                        "column": 1
                    }
                ]
            ],
            "createdAt": "2025-04-27",
            "deleteAt": "2025-05-02"
        }
    ],
    "gallery": [
        {
            "id": "gallery_1",
            "title": "Gallery 1",
            "parent_page": "id1",
            "created_at": "2025-04-26",
            "delete_at": "2025-05-01",
            "internal_content": [
                {
                    "id": "image_1",
                    "title": "Image 1",
                    "url": "https://example.com/image1.jpg",
                    "description": "Image Description 1",
                    "color": "red",
                    "galery_id": "gallery_1",
                    "date": "2025-04-26",
                    "number": "1"
                }
            ]
        },
        {
            "id": "gallery_2",
            "title": "Gallery 2",
            "parent_page": "id2",
            "created_at": "2025-04-27",
            "delete_at": "2025-05-02",
            "internal_content": [
                {
                    "id": "image_2",
                    "title": "Image 2",
                    "url": "https://example.com/image2.jpg",
                    "description": "Image Description 2",
                    "color": "blue",
                    "galery_id": "gallery_2",
                    "date": "2025-04-27",
                    "number": "2"
                }
            ]
        }
    ]
}

export const pages = [{
    id: 'id_page1',
    owner_id: 'id',
    title: 'EmptyPagenumber1',
    banner: 'banner.img',
    icon: 'icon.ico',
    slug: 'empty_page_1_unique',
    type: 'empty',
    delete_date: 'date',
    content: 'ссылка на эту страницу'
},
{
    id: 'id_pageEmpTY',
    owner_id: 'id',
    title: 'EmptyPagenumber1',
    banner: 'banner.img',
    icon: 'icon.ico',
    slug: 'empty_page_2_unique',
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
    slug: 'board_page_1_unique',
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
    slug: 'calendar_2025_unique',
    type: 'board',
    delete_date: 'date',
    content: 'ссылка на эту страницу'
},
{
    id: 'id_page4',
    owner_id: 'id',
    title: 'BoardNumber1',
    banner: 'banner.img',
    icon: 'icon.ico',
    slug: 'board_page_2_unique',
    type: 'board',
    delete_date: 'date',
    content: 'Приходит страница через новый запрос по слагу ?? null'
}]
export const pagestypes = ['empty', 'board', 'list', 'calendur', 'table', 'galllery', 'library'];



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
