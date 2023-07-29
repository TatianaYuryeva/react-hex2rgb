import React, { useState } from "react";

function Converter(): JSX.Element {

  const handlerSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    }

  const [hex, setHex] = useState('')
  const [bg, setBg] = useState('#ffffff')
  const [rgb, setRgb] = useState('rgb(255, 255, 255)')

  const  handlerChange = ({ target: {value}}: React.ChangeEvent<HTMLInputElement>) => {
    
    if(value.length === 7 && validateHex(value)) {
      setBg(value)
      setRgb(convertHex(value))
    } else if (value.length >= 7) {
      setBg('')
      setRgb('Error')
    } else if (value.length === 0) {
      setBg('#ffffff')
      setRgb('rgb(255, 255, 255)')
    } else if (value.length > 0 && value.length < 7) {
      setBg('#ffffff')
      setRgb('')
    }
    setHex(value)   
  }

  const validateHex = (hex: string) => {
    const regex = /^#(\d|[a-f]){6}/gmi

    if (regex.test(hex)){
      return true
    }

    return false
  }

  const convertHex = (bg: string) => {
    const r = parseInt(bg.slice(1, 3), 16)
    const g = parseInt(bg.slice(3, 5), 16)
    const b = parseInt(bg.slice(5), 16)
    const rgb = [r, g, b]
    return `rgb(${rgb.join(', ')})`
  }

  return (
    <div className="converter" style={{ backgroundColor: `${bg}`}}>
      <div className="container">
        <form onSubmit={handlerSubmit}>
          <input 
            id="hex" 
            placeholder="#ffffff"
            value={hex} 
            onChange={handlerChange}/>
          <div className="rgb">{rgb}</div>
        </form>
      </div>
    </div>
  )
}

export default Converter
