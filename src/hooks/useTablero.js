import { useState } from 'react';

const useTablero = () => {
    const [tablero, setTablero] = useState([])
    const [load, setLoad] = useState(true)
    const [edge, setEdge] = useState(10)

    const handleEdge = (e) =>{
        if(e.target.value > 10){
            setEdge(e.target.value)
        }else{
            setEdge(10)
        }
    
    }

    const reset = () =>{
        setLoad(true)
        setTablero([])
    }

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
                    if (stateAux[i][j][0].id === id) {
                        stateAux[i][j][0].poblacion = '■';
                        break;
                    }
                }
            }
            return stateAux;
        });
    }

    const getNeighbors = (x, y) => {
        let vivos = 0
        for (let i = x - 1; i <= x + 1; i++) {
            for (let j = y - 1; j <= y + 1; j++) {
                if (i === x && j === y) {
                    continue;
                }
                if (i >= 0 && j >= 0 && i < tablero.length && j < tablero[i].length) {
                    if (tablero[i][j][0].poblacion === '■') {
                        vivos = vivos + 1
                    }
                }
            }
        }
        return vivos;
    }

    const play = (generacion) => {
        let newPoblacion = [...tablero]

        for (let i = 0; i < tablero.length; i++) {
            for (let j = 0; j < tablero[i].length; j++) {
                let celda = tablero[i][j][0];
                let vivos = getNeighbors(i, j);

                if (celda.poblacion === '■' && (vivos === 2 || vivos === 3)) {
                    //celda viva con 2 o 3 vecinos vivos VIVE
                    continue;
                } else if (celda.poblacion === '' && vivos === 3) {
                    //Celda muerta con tres vecinas vivias NACE
                    newPoblacion[i][j][0].life = true;
                    newPoblacion[i][j][0].poblacion = "■";

                } else if (celda.poblacion === '■' && vivos > 3) {
                    //celda viva con mas de 3 vecinos vivos MUERE
                    newPoblacion[i][j][0].life = false;
                    newPoblacion[i][j][0].poblacion = "";
                }
            }
        }

        setTablero(newPoblacion);

        // Cambio generacional
        if (generacion && generacion > 1) {
            setTimeout(() => {
                play(generacion - 1);
            }, 100);
        }
    }

    return { tablero, load, createGrid, changeLife, play, edge, handleEdge, reset }
}

export default useTablero;
