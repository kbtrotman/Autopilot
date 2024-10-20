import React, { useEffect, useRef, useState } from 'react';
import { dia, shapes } from '@joint/core';
import { startEndPorts, pointPorts, inputOutputPorts, metricPorts, taskPorts, scriptPorts} from './flowPorts';
import inputOutputIcon from './images/input_output.jpeg';
import startEndIcon from './images/start_stop.png';
import tasksIcon from './images/task.jpeg';
import scriptsIcon from './images/script.jpeg';
import pointIcon from './images/point.png';
import metricIcon from './images/metric.jpeg';
import './css/styles.css'; // Import styles for the layout

function FlowChartCanvas() {
  const graphRef = useRef(null);
  const paperRef = useRef(null);

  const [selectedElement, setSelectedElement] = useState(null);
  const [elementColor, setElementColor] = useState('#000000');
  const [elementLabel, setElementLabel] = useState('');

  // Initialize the JointJS graph and paper (canvas)
  useEffect(() => {
    const graph = new dia.Graph();
    graphRef.current = graph;
    
    const paper = new dia.Paper({
      el: paperRef.current,
      model: graph,
      width: 800,
      height: 600,
      gridSize: 10,
      drawGrid: true,
      background: {
        color: 'lightgray',
      },
      linkPinning: false,
      defaultLink: () => new shapes.standard.Link(),
      interactive: {
        linkMove: true,   // Enable link creation between ports
        elementMove: true, // Ensure elements can be moved
        magnet: true,      // Ensure magnets (ports) are enabled for interaction
      },
      defaultRouter: {
        name: 'manhattan',  // Use smooth routing by default for all links
        args: { padding: 10 },  // Optional padding around obstacles
      },
    });

    // Event listener for when a link connects to another element's port
    paper.on('link:connect', (linkView, evt, targetMagnet, targetView) => {
      const sourceId = linkView.model.get('source').id;
      const targetId = linkView.model.get('target').id;
      const sourcePort = linkView.model.get('source').port;  // Source port name
      const targetPort = linkView.model.get('target').port;  // Target port name
      
      console.log(sourcePort, targetPort);
      // If valid source and target ports exist, create a link between them
      if (sourceId && targetId && sourcePort && targetPort) {
        const link = createLink(sourceId, sourcePort, targetId, targetPort);
        graphRef.current.addCells([link]);  // Pass the link as an array
      }
    });
    
    // Event listener to update selected element on click
    paper.on('cell:pointerdown', (cellView) => {
      setSelectedElement(cellView.model);
      setElementColor(cellView.model.attr('body/fill') || '#000000');
      setElementLabel(cellView.model.attr('label/text') || '');
    });
    
    return () => {
      paper.remove();
    };
  }, []);

  // Handle shape drag and drop onto the canvas
  const handleDrop = (event) => {
    event.preventDefault();

    const shapeType = event.dataTransfer.getData('shape');
    const position = paperRef.current.getBoundingClientRect();
    const x = event.clientX - position.left;
    const y = event.clientY - position.top;

    if (shapeType) {
      addShapeToCanvas(shapeType, x, y);
    }
  };

  const createImageShape = (imgSrc, { x, y }, size, labelText, portsConfig) => {

    console.log('Creating image shape with ports: ', portsConfig);  // Debug log

    return new shapes.standard.Image({
      position: { x, y },
      size: size,
      attrs: {
        image: {
          'xlink:href': imgSrc,
          width: size.width,
          height: size.height,
        },
        label: {
          text: labelText,
          fill: 'black',
          fontSize: 12,
          refY: '100%',
          yAlignment: 'middle',
          xAlignment: 'middle',
          ref: 'image',
        },
      },
      ports: portsConfig,  // Correctly pass portsConfig here
    });
  };

  const createLink = (sourceId, sourcePort, targetId, targetPort) => {
    return new shapes.standard.Link({
      source: { id: sourceId, port: sourcePort },  // Source element and port
      target: { id: targetId, port: targetPort },  // Target element and port
      attrs: {
        line: {
          stroke: 'black',
          strokeWidth: 2,
          targetMarker: {
            type: 'path',
            d: 'M 10 -5 0 0 10 5 Z',  // Arrow marker at the target
            fill: 'black',
          },
        },
      },
    });
  };

  // Add shapes to the canvas
  const addShapeToCanvas = (shapeType, x, y) => {
    let element;
  
    console.log('Shape Type:', shapeType);  // Debug shape type
    
    switch (shapeType) {
      case 'start':
        console.log('Using Start Ports:', startEndPorts);  // Debug port config
        element = createImageShape(startEndIcon, { x, y }, { width: 100, height: 60 }, 'Start', startEndPorts);
        break;
  
      case 'point':
        console.log('Using Point Ports:', pointPorts);  // Debug port config
        element = createImageShape(pointIcon, { x, y }, { width: 100, height: 60 }, 'Decision', pointPorts);
        break;
  
      case 'input_output':
        console.log('Using IO Ports:', inputOutputPorts);  // Debug port config
        element = createImageShape(inputOutputIcon, { x, y }, { width: 100, height: 60 }, 'I/O', inputOutputPorts);
        break;
  
      case 'metric':
        console.log('Using Metric Ports:', metricPorts);  // Debug port config
        element = createImageShape(metricIcon, { x, y }, { width: 100, height: 60 }, 'Metric', metricPorts);
        break;
  
      case 'task':
        console.log('Using Task Ports:', taskPorts);  // Debug port config
        element = createImageShape(tasksIcon, { x, y }, { width: 100, height: 60 }, 'Task', taskPorts);
        break;
  
      case 'script':
        console.log('Using Script Ports:', scriptPorts);  // Debug port config
        element = createImageShape(scriptsIcon, { x, y }, { width: 100, height: 60 }, 'Script', scriptPorts);
        break;
  
      default:
        console.log('No shape type found.');
        return;
    }
  
    if (element) {
      console.log('Adding element to graph:', element);  // Debug created element
      graphRef.current.addCells(element);
    }
  };
    

  // Allow drag over
  const allowDrop = (event) => {
    event.preventDefault();
  };

  // Handle drag start for shapes
  const handleDragStart = (event, shape) => {
    event.dataTransfer.setData('shape', shape);
  };

  // Handle property changes
  const handlePropertyChange = () => {
    if (selectedElement) {
      selectedElement.attr({
        body: { fill: elementColor },
        label: { text: elementLabel },
      });
    }
  };

  return (
    <div className="container">
      {/* Left-hand toolbar */}
      <div className="toolbar">
        <h4>Shapes</h4>
          {/* Start (Ellipse) */}
          <div
            className="shape ellipse"
            draggable="true"
            onDragStart={(event) => handleDragStart(event, 'start')}
          >
            <img src={startEndIcon} alt="Start" width="100" height="60" />
          </div>

          {/* Decision (Diamond) */}
          <div
            className="shape diamond"
            draggable="true"
            onDragStart={(event) => handleDragStart(event, 'point')}
          >
            <img src={pointIcon} alt="Point" width="100" height="60" />
          </div>

          {/* Input/Output (Parallelogram) */}
          <div
            className="shape parallelogram"
            draggable="true"
            onDragStart={(event) => handleDragStart(event, 'input_output')}
          >
            <img src={inputOutputIcon} alt="Input_Output" width="100" height="60" />
          </div>
          {/* Document (Rectangle with lines) */}
          <div
            className="shape document"
            draggable="true"
            onDragStart={(event) => handleDragStart(event, 'metric')}
          >
            <img src={metricIcon} alt="Metric" width="100" height="60" />
          </div>
          {/* Document (Rectangle with task) */}
          <div
            className="shape rectangle"
            draggable="true"
            onDragStart={(event) => handleDragStart(event, 'task')}
          >
            <img src={tasksIcon} alt="Task" width="100" height="60" />
          </div>

          <div
            className="shape rectangle"
            draggable="true"
            onDragStart={(event) => handleDragStart(event, 'script')}
          >
            <img src={scriptsIcon} alt="Script" width="100" height="60" />
          </div>
      </div>
      {/* Document (Rectangle with task) */}

      {/* Canvas */}
      <div
        className="canvas"
        ref={paperRef}
        onDrop={handleDrop}
        onDragOver={allowDrop}
      />

      {/* Right-hand properties panel */}
      <div className="properties-panel">
        <h4>Properties</h4>
        {selectedElement ? (
          <div>
            <label>Label: </label>
            <input
              type="text"
              value={elementLabel}
              onChange={(e) => setElementLabel(e.target.value)}
            />
            <label>Color: </label>
            <input
              type="color"
              value={elementColor}
              onChange={(e) => setElementColor(e.target.value)}
            />
            <button onClick={handlePropertyChange}>Apply</button>
          </div>
        ) : (
          <p>Select an element to edit its properties.</p>
        )}
      </div>
    </div>
  );
}

export default FlowChartCanvas;

