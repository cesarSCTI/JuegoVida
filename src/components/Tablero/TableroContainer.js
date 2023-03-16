import React, { useEffect } from 'react'
import TableroChild from './TableroChild'
import useTablero from '../../hooks/useTablero'
import './tablero.css'
import Instructions from '../Instructions/Instructions'

const TableroContainer = () => {

    const { tablero, load, createGrid, changeLife, play, edge, handleEdge, reset } = useTablero();

    useEffect(() => {
    }, [tablero])

    return (
        <>
            <div className='tablero'>
                <div className='panelControls'>
                    <div onClick={reset} className="btnReset">Reset</div>
                    <div onClick={() => createGrid(30)} className="btn">crear</div>
                    <div className='containerEdge'>
                        <label>Digitar la cantidad de generaciones a mostrar</label>
                        <input type="number" name= "edge" value={edge} onChange={handleEdge} />
                    </div>
                    
                    <div onClick={() => play(edge)} className="btn">Jugar</div>
                </div>
                <div className='conntentTablero'>
                    {
                        load
                            ? <Instructions/>
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