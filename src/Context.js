import React, {useState, createContext} from 'react'

export const globalContext = createContext({});

const Context = ({children}) => {
    const [brushColor, setBrushColor] = useState('black');
    const [brushSize, setBrushSize] = useState(5);
    const [brushAction, setBrushAction] = useState('brush');
   
    const [image, setImage] = useState('');

    const [xPixel, setXPixel] = useState(0);
    const [yPixel, setYPixel] = useState(0);
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);

    const [context, setContext] = useState(null);
    const [undoArr, setUndoArr] = useState([]);
    const [arrIdx, setArrIdx] = useState(-1);

    const obj = {
      brushColor, setBrushColor, brushSize, setBrushSize, brushAction, setBrushAction, setImage, image,
      xPixel, setXPixel, yPixel, setYPixel, context, setContext, undoArr, setUndoArr, arrIdx, setArrIdx,
      width, setWidth, height, setHeight
    };

  return (
    <globalContext.Provider value={obj}>
        {children}
    </globalContext.Provider >
  )
}

export default Context
