import { useRef, useEffect } from 'react';


export function Canvas(props) {
  const canvasRef = useRef(null);


  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    context.fillStyle = &#39;red&#39;;
    context.fillRect(0, 0, props.width, props.height);

    const clickHandler = () =&gt; {
    context.fillStyle = &#39;blue&#39;;
    context.fillRect(0, 0, props.width, props.height);
  };

  canvas.addEventListener(&#39;click&#39;, clickHandler);

  return () =&gt; {
    canvas.removeEventListener(&#39;click&#39;, clickHandler);
  };

}, 
[]);


return <canvas ref={canvasRef} width={props.width} height={props.height} />;
}