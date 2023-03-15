import React from 'react'
import './tablero.css'

const TableroChild = ({data =[]}) => {
  return (
    <div className='row'>
        {data.map((ele)=>{ 
            return <div key={ele[0].id} className='child'>{ele[0].id}0</div> 
        })
        }
    </div>
  )
}

export default TableroChild