import React, {useRef,useEffect,useState,useCallback} from 'react'
import "./Canvas.css"

//
const colors =["black","Red","Green","blue","pink","orange","violet","brown","cyan","skyblue","lightblue","#33FFCC"] 
//['#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6',          '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',         '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A',          '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',         '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC',          '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',         '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680',          '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',         '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3',          '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF'];

function Canvas() {
    const canvasRef = useRef(null);
  const ctx = useRef(null);

  const [selectedSize, setSelectedSize] = useState(10)
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [mouseDown, setMouseDown] = useState(false);
  const [lastPosition, setLastPosition] = useState({
    x:0,
    y:0
  });

  
  useEffect(() => {
      if(canvasRef.current){
          ctx.current=canvasRef.current.getContext('2d');
        }
    }, []);
    
    const getPosition=(e)=>{
      const rect = canvasRef.current.getBoundingClientRect();
    //   console.log(e.clientX - rect.left);
      return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      }
    }

  const draw = useCallback((x,y)=>{
    if(mouseDown){
      ctx.current.beginPath();
      ctx.current.strokeStyle = selectedColor;
      ctx.current.lineWidth = selectedSize;
      ctx.current.lineJoin = 'round';
      ctx.current.moveTo(lastPosition.x,lastPosition.y);
      ctx.current.lineTo(x, y);
      ctx.current.closePath();
      ctx.current.stroke();

      setLastPosition({
        x,
        y
      })
    }
  },[lastPosition,mouseDown,selectedColor,setLastPosition])

  const onMouseDown=(e)=>{
    setLastPosition(getPosition(e))
    // console.log(getPosition(e));
    setMouseDown(true)
  }

  const onMouseUp=(e)=>{
    setMouseDown(false)
  }
  const onMouseMove = (e) => {
      let {x,y}=getPosition(e)
    draw(x,y)
  }

   const clear = () => {
    ctx.current.clearRect(0, 0, ctx.current.canvas.width, ctx.current.canvas.height)
  }
  

    return (
        <div className='draw_area'>
            <canvas style={{border:"1px solid #000"}}
            className='canvas'
       width={1200}
       height={560}

       ref={canvasRef}
       onMouseDown={onMouseDown}
       onMouseUp={onMouseUp}
       onMouseLeave={onMouseUp}
       onMouseMove={onMouseMove}
       />
      <br />
      {/* <select value={selectedColor} key={"a"}  onChange={(e)=>setSelectedColor(e.target.value)}>
        {colors.map(color => <option key={color} value={color}>{color}</option>) }
      </select> */}
      <div className='tools'>
      <div className='color-palate'>
          {colors.map(color =>
            <span className='foo'
            key={color}
            style={{backgroundColor:color}} 
            title={color} 
            onClick={(e)=>setSelectedColor(e.target.title)} 
            />
            )}
      </div>
      <input type="range" min={2} max={20} title="Brush Size" defaultValue={10} name="size" onChange={(e)=>setSelectedSize(e.target.value)} />
      <br />
      <div>
      <button title='Eraser' onClick={(e)=>setSelectedColor('white')}>🧽</button>
      <button title='Clear All' onClick={clear}>🗑</button>
      </div>
            </div>
        </div>
    )
}

export default Canvas
