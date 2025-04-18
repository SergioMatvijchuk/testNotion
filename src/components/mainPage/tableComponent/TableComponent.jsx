import './TableComponent.css';
import { useState } from 'react';




export function TableComponent({ cardName }) {
    const [inputNameBoard, setInputNameBoard] = useState(cardName);

    const path = 'img/mainPage/icons/'
    const staticImage = {
        iconPlus: 'iconPlus2',
        iconList: 'iconList',
    }
    Object.entries(staticImage).forEach(([key, value]) => {
        staticImage[key] = path + value + '.svg'
    });



    const [data, setData] = useState(
        [
            [4, 2, 3],
            [4, 5, 6],
            [7, 8, 9],
        ]
    )

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
                    value={inputNameBoard}
                    onChange={(e) => {
                        setInputNameBoard(e.target.value);
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