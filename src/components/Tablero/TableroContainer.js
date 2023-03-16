import React, { useState, useEffect } from 'react'
import TableroChild from './TableroChild'
import './tablero.css'

const TableroContainer = () => {
    const [tablero, setTablero] = useState([])
    const [load, setLoad] = useState(true)

    const createGrid = (num) => {
        let tabla = []
        let tabla2 = []
        let idd = ""
        for (let i = 0; i < num; i++) {
            for (let j = 0; j < num; j++) {
                idd = i.toString() + j.toString()
                tabla.push([{ id: idd, life: false, poblacion: '' }])
            }
            tabla2.push(tabla)
            tabla = []
        }
        setTablero(tabla2)
        setLoad(false)
    }
    const changeLife = (id) => {
        setTablero(tablero => {
            const stateAux = [...tablero];
            for (let i = 0; i < stateAux.length; i++) {
                for (let j = 0; j < stateAux[i].length; j++) {
                    for (let k = 0; k < stateAux[i][j].length; k++) {
                        if (stateAux[i][j][k].id === id) {
                            stateAux[i][j][k].poblacion = '■';
                            break;
                        }
                    }
                }
            }
            return stateAux;
        });
    }


    useEffect(() => {
        console.log("estado recargado")
    }, [tablero])

    return (
        <>
            <div className='tablero'>
                <button onClick={() => createGrid(40)}>crear</button>
                {
                    load
                        ? <></>
                        : tablero.map((ele, id) => {
                            return <TableroChild data={ele} key={id} action={changeLife} />
                        })
                }
            </div>
        </>
    )
}

export default TableroContainer