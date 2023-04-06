import React, {useState, createContext} from 'react'

export const globalContext = createContext({});

const Context = ({children}) => {
    const [brushColor, setBrushColor] = useState('black');
    const [brushSize, setBrushSize] = useState(1);
    const [brushAction, setBrushAction] = useState('brush');
   
    const [image, setImage] = useState('');
    const [blur, setBlur] = useState(0);
    const [brightness, setBrightness] = useState(1);
    const [grayScale, setGrayScale] = useState(0);
    const [saturate, setSaturate] = useState(1);
    const [invert, setInvert] = useState(0);

    const obj = {
      brushColor, setBrushColor, brushSize, setBrushSize, brushAction, setBrushAction, setImage, image,
      blur, setBlur, brightness, setBrightness, grayScale, setGrayScale, saturate, setSaturate,invert, setInvert
    }

  return (
    <globalContext.Provider value={obj}>
        {children}
    </globalContext.Provider >
  )
}

export default Context
