import './TableComponent.css';
import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { putChangesOfPage } from '../../../dataManager';


export function TableComponent(state) {

    const path = 'img/mainPage/icons/'
    const staticImage = {
        iconPlus: 'iconPlus2',
        iconList: 'iconList',
    }

    const { setComponent, updateLeftMenu } = state;
    const [cards, setCards] = useState([]);
    const [inputTitle, setInputTitle] = useState('');
    const [page, setPage] = useState({});
    const lastPageRef = useRef({});
    const lastCardsRef = useRef([]);





    Object.entries(staticImage).forEach(([key, value]) => {
        staticImage[key] = path + value + '.svg'
    });
    const [data, setData] = useState(
        [
            [``, ``, ``],
            [``, ``, ``],
            [``, ``, ``],
        ]
    )
    const dataRef = useRef(data);
    useEffect(() => {
        dataRef.current = data;
    }, [data]);


    const pageProps = {
        banner: state.data.banner,
        icon: state.data.icon,
        id: state.data.id,
        slug: state.data.slug,
        title: state.data.title,
        type: state.data.type,
        content: state.data.content
    }


    useEffect(() => {
        console.log("State", state);

        const initialPage = {
            "title": pageProps.title,
            "banner": pageProps.banner,
            "icon": pageProps.icon,
            "type": pageProps.type,
            "content": pageProps.content?.internalContent || [],
            "slug": pageProps.slug
        };
        setPage(initialPage);
        setCards(initialPage.content);
        setInputTitle(initialPage.title);

        const rows = Math.max(...initialPage.content.map(c => c.row)) + 1;
        const cols = Math.max(...initialPage.content.map(c => c.col)) + 1;

        const table = Array.from({ length: rows }, (_, row) =>
            Array.from({ length: cols }, (_, col) =>
                initialPage.content.find(c => c.row === row && c.col === col) || {
                    id: 'temp_',
                    row,
                    col,
                    data: '',
                    foreground: '#000000',
                    background: '#ffffff',
                }
            )
        );

        setData(table);
        lastPageRef.current = initialPage;


        return () => {
            console.log("data", dataRef.current);


            const transformedArr = dataRef.current?.flatMap((rowArr, rowIndex) =>
                rowArr.map((cell, colIndex) => ({
                    id: cell.id,
                    data: cell.data,
                    row: rowIndex,
                    col: colIndex,
                    foreground: "#000000",
                    background: "#ffffff",
                }))
            );


            const c = transformedArr;
            const p = lastPageRef.current;
         

            p.content = c
                .map(item => ({
                    ...item,
                    id: item.id?.includes("temp") ? null : item.id,
                    files: Array.isArray(item.files)
                        ? item.files.map(file => (file))
                        : []
                }));

            console.log("PPPPPP", p);

            putChangesOfPage(p);
            updateLeftMenu();
        }
    }, []);

    useEffect(() => {
        setPage(prev => ({
            ...prev, title: inputTitle
        }));
    }, [inputTitle]);

    useEffect(() => {
        lastPageRef.current = page;
    }, [page])


    useEffect(() => {
        setPage(prev => ({
            ...prev, content: cards
        }))
        lastCardsRef.current = cards;
    }, [cards]);

    const addNewCol = () => {
        const newArr = data.map((row, rowIndex) => {
            const newColIndex = row.length;
            return [
                ...row,
                {
                    id: "temp_" + row + rowIndex,
                    row: rowIndex,
                    col: newColIndex,
                    data: '',
                    foreground: '#000000',
                    background: '#ffffff',
                }
            ];
        });
        setData(newArr);
    }

    const addNewRow = () => {
        const newRowIndex = data.length;
        const cols = data[0]?.length || 0;

        const newRow = Array.from({ length: cols }, (_, colIndex) => ({
            id: "temp_" + newRowIndex + cols,
            row: newRowIndex,
            col: colIndex,
            data: '',
            foreground: '#000000',
            background: '#ffffff',
        }));

        setData([...data, newRow]);
    }

    /**предотвращение неудачного сброса */
    const handleDragOver = (e) => {
        e.preventDefault();
    };
    /**start перетаскивания */
    const handleDragStart = (e, rowIndex, colIndex) => {
        e.dataTransfer.setData("draggedRowIndex", rowIndex);
        e.dataTransfer.setData("draggedColIndex", colIndex);
    }

    /**дроп ячейки */
    const handleDrop = (e, rowIndex, colIndex) => {

        if (e.target.id === 'newCol' || e.target.id === 'newRow') {
            return;
        }

        const draggedColIndex = e.dataTransfer.getData("draggedColIndex");
        const draggedRowIndex = e.dataTransfer.getData("draggedRowIndex");

        if (draggedRowIndex === "" || draggedColIndex === "") {
            console.error('Invalid dragged indices');
            return;
        }

        const updateData = [...data];

        const temp = updateData[draggedRowIndex][draggedColIndex];
        updateData[draggedRowIndex][draggedColIndex] = updateData[rowIndex][colIndex];
        updateData[rowIndex][colIndex] = temp;
        setData(updateData);
    }


    return (
        <div className="tableComponent">
            <div>
                <input
                    type='text'
                    className='inputName'
                    value={inputTitle}
                    onChange={(e) => {
                        setInputTitle(e.target.value);
                    }}
                />
                <hr />
            </div>
            <div className='scrollableVertical scrollable'>
                <table>
                    <thead>
                        <tr>

                        </tr>
                    </thead>
                    <tbody>
                        {console.log("DATA", data)
                        }
                        {data.map((row, rowIndex) => (
                            <tr key={rowIndex}>
                                {row.map((cell, colIndex) => (
                                    <td
                                        key={colIndex}
                                        draggable
                                        onDragStart={(e) => handleDragStart(e, rowIndex, colIndex)}
                                        onDrop={(e) => handleDrop(e, rowIndex, colIndex)}
                                        onDragOver={handleDragOver}
                                    >
                                        <input
                                            type="text"
                                            value={cell.data}
                                            onChange={(e) => {
                                                const updatedData = [...data];
                                                console.log("UpdatedData", updatedData);

                                                updatedData[rowIndex][colIndex].data = e.target.value;
                                                setData(updatedData);
                                            }}
                                        />
                                    </td>
                                ))}
                                {rowIndex === 0 ? (
                                    <td id='newCol' onClick={addNewCol}>
                                        <img src={staticImage.iconPlus} alt="" />
                                        <input type="submit" value="New" />
                                    </td>
                                ) : null}
                            </tr>
                        ))}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td id='newRow' onClick={addNewRow}>
                                <img src={staticImage.iconPlus} alt="" />
                                <input type="submit" value="New" />
                            </td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>

    )
}