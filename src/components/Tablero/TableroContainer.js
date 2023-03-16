import React, { useEffect } from 'react'
import TableroChild from './TableroChild'
import useTablero from '../../hooks/useTablero'
import './tablero.css'

const TableroContainer = () => {

    const { tablero, load, createGrid, changeLife, play } = useTablero();

    useEffect(() => {
    }, [tablero])

    return (
        <>
            <div className='tablero'>
                <div className='panelControls'>
                    <div onClick={() => createGrid(40)} className="btn">crear</div>
                    <div onClick={() => play(100)} className="btn">Jugar</div>
                </div>
                <div className='conntentTablero'>
                    {
                        load
                            ? <></>
                            : tablero.map((ele, id) => {
                                return <TableroChild data={ele} key={id} action={changeLife} />
                            })
                    }
                </div>
            </div>
        </>
    )
}

export default TableroContainer