import React, {useState, useEffect} from 'react'
import TableroChild from './TableroChild'
import './tablero.css'

const TableroContainer = () => {
    const [tablero, setTablero] = useState([])
    const [load, setLoad] = useState(true)

    const createGrid = (num) =>{
        let tabla = []
        let tabla2 = []
        let idd = ""
        for(let i=0; i< num; i++){
            for(let j=0; j< num; j++){
                idd = i.toString() + j.toString()
                tabla.push([{id:idd,life:false}])
            } 
            tabla2.push(tabla)
            tabla = []
        }
        setTablero(tabla2)
        setLoad(false)
    }


 useEffect(()=>{
    createGrid(20);
 },[])



  return (
    <>
    <div className='tablero'>
    
        {
            load
            ? <></>
            : tablero.map((ele, id)=>{
                return <TableroChild data={ele} key={id}/>
            })
        }
    </div>
    </>
  )
}

export default TableroContainer