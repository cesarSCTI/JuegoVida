import React from 'react'

const Instructions = () => {
  return (
    <div>
        <p>El juego funciona con 10 generaciones como minimo para mostrar por default el comportamiento de la población</p>
        <ol>
            <li><b>Crear el tablero:</b> Esto lo hacemos en el boton "Crear"</li>
            <li><b>Semilla inicial:</b> Dale Click en las celdas donde quierar sembrar la poblacion.</li>
            <li><b>Generaciones:</b> Ajusta la cantidad de generaciones que quieras probar.</li>
            <li><b>Jugar:</b> Aqui solo queda ver el comportamiento, dale click en "Jugar"</li>
        </ol>
    </div>
  )
}

export default Instructions