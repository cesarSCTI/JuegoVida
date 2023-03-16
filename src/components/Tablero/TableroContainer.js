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

    function getNeighbors(x, y) {
        const neighbors = [];
        let vivos = 0
        for (let i = x - 1; i <= x + 1; i++) {
          for (let j = y - 1; j <= y + 1; j++) {
            if (i === x && j === y){
                continue;
            } 
            if (i >= 0 && j >= 0 && i < tablero.length && j < tablero[i].length) {
              neighbors.push(tablero[i][j]);
              if(tablero[i][j][0].poblacion == '■'){
                vivos = vivos + 1
              }
            }
          }
        }
        console.log(neighbors)
        console.log(vivos)

        return {vivos, neighbors};
      }

    const play = (generacion) => {
        // Creamos una copia de la matriz poblacion para no modificarla directamente
        let newPoblacion = [...tablero]

        // Recorremos cada celda de la matriz
        for (let i = 0; i < tablero.length; i++) {
            for (let j = 0; j < tablero[i].length; j++) {
            let celda = tablero[i][j][0];
            const {vivos, neighbors}= getNeighbors(i, j);

            if (celda.poblacion == '■' && (vivos == 2 || vivos === 3) ) {
                //celda viva con 2 o 3 vecinos vivos VIVE
                continue;
            } else if (celda.poblacion == '' && vivos === 3) { 
                //Celda muerta con tres vecinas vivias NACE
                newPoblacion[i][j][0].life = true;
                newPoblacion[i][j][0].poblacion = "■";

            }else if (celda.poblacion == '■' && vivos> 3 ){
                //celda viva con mas de 3 vecinos vivos MUERE
                newPoblacion[i][j][0].life = false;
                newPoblacion[i][j][0].poblacion = "";
            }
            }
        }

        // Actualizamos el estado de la matriz poblacion
        setTablero(newPoblacion);

        // Si se especificó una generación, llamamos a la función recursivamente
        if (generacion && generacion > 1) {
            setTimeout(() => {
            play(generacion - 1);
            }, 500);
        }
      }

    useEffect(() => {
        console.log("estado recargado")
    }, [tablero])

    return (
        <>
            <div className='tablero'>
                <div className='panelControls'>
                    <div onClick={() => createGrid(10)} className="btn">crear</div>
                    <div onClick={()=>play(10)} className="btn">Play</div>
                </div>
                
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