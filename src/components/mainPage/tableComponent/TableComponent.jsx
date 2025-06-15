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

        lastPageRef.current = initialPage;


        return () => {

            console.log("Data", data);




            const transformedArr = data?.flatMap((rowArr, rowIndex) =>
                rowArr.map((cell, colIndex) => ({
                    data: cell,
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
        const newArr = data.map(row => [...row, '']);
        setData(newArr);
    }

    const addNewRow = () => {
        const newArr = [...data, new Array(data[0].length).fill('')];
        setData(newArr);
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
                                            value={cell}
                                            onChange={(e) => {
                                                const updatedData = [...data];
                                                updatedData[rowIndex][colIndex] = e.target.value;
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