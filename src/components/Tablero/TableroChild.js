import React from 'react'
import './tablero.css'

const TableroChild = ({data =[], action}) => {

  return (
    <div className='row'>
        {data.map((ele)=>{ 
            return (
                <div key={ele[0].id} className='child' onClick={()=>action(ele[0].id)}>
                    {ele[0].poblacion}
                </div> 
                )
        })
        }
    </div>
  ) 
} 

export default TableroChild 