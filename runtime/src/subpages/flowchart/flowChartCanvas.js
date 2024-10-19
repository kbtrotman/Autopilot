import React, { useEffect, useRef, useState } from 'react';
import { dia, shapes } from '@joint/core';
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
    });

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

  // Helper function to create a shape
  const createShape = (ShapeType, { x, y }, size, bodyAttrs, labelText) => {
    return new ShapeType({
      position: { x, y },
      size: size,
      attrs: { 
        body: bodyAttrs,
        label: { text: labelText, fill: 'black', fontSize: 12 }
      },
    });
  };

  // Add shapes to the canvas
  const addShapeToCanvas = (shapeType, x, y) => {
    let element;

  // Usage
  switch (shapeType) {
    case 'start':
      element = createShape(shapes.standard.Ellipse, { x, y }, { width: 100, height: 60 }, { fill: 'lightblue', stroke: 'black', strokeWidth: 2 }, 'Start');
      break;

    case 'decision':
      element = new shapes.standard.Polygon({
        position: { x, y },
        size: { width: 100, height: 100 },
        attrs: { 
          body: { fill: 'orange', stroke: 'black', strokeWidth: 2 },
          label: { text: '?', fill: 'black', fontSize: 12 }
        },
        points: '50,0 100,50 50,100 0,50'
      });
      break;

    case 'input_output':
      element = createShape(shapes.standard.Polygon, { x, y }, { width: 100, height: 60 }, { fill: 'lightcoral', stroke: 'black', strokeWidth: 2 }, 'I/O');
      element.attr('body/points', '0,0 80,0 100,60 20,60');
      break;

    case 'document':
      element = createShape(shapes.standard.Rectangle, { x, y }, { width: 100, height: 60 }, { fill: 'white', stroke: 'black', strokeWidth: 2 }, 'Doc');
      break;

    default:
      return;
  }

    graphRef.current.addCell(element);
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
            <svg width="40" height="30">
              <ellipse cx="20" cy="15" rx="20" ry="15" style={{ fill: 'lightblue', stroke: 'black', strokeWidth: 2 }} />
              <text x="10" y="20" fill="black" fontSize="10">Start</text>
            </svg>
          </div>

          {/* Decision (Diamond) */}
          <div
            className="shape diamond"
            draggable="true"
            onDragStart={(event) => handleDragStart(event, 'decision')}
          >
            <svg width="40" height="40">
              <polygon points="20,0 40,20 20,40 0,20" style={{ fill: 'orange', stroke: 'black', strokeWidth: 2 }} />
              <text x="13" y="25" fill="black" fontSize="10">?</text>
            </svg>
          </div>

          {/* Input/Output (Parallelogram) */}
          <div
            className="shape parallelogram"
            draggable="true"
            onDragStart={(event) => handleDragStart(event, 'input_output')}
          >
            <svg width="50" height="30">
              <polygon points="0,0 40,0 50,30 10,30" style={{ fill: 'lightcoral', stroke: 'black', strokeWidth: 2 }} />
              <text x="15" y="20" fill="black" fontSize="10">I/O</text>
            </svg>
          </div>
          {/* Document (Rectangle with lines) */}
          <div
            className="shape document"
            draggable="true"
            onDragStart={(event) => handleDragStart(event, 'document')}
          >
            <svg width="40" height="30">
              <rect width="40" height="30" style={{ fill: 'white', stroke: 'black', strokeWidth: 2 }} />
              <line x1="10" y1="10" x2="30" y2="10" style={{ stroke: 'black', strokeWidth: 1 }} />
              <line x1="10" y1="20" x2="30" y2="20" style={{ stroke: 'black', strokeWidth: 1 }} />
              <text x="10" y="25" fill="black" fontSize="10">Doc</text>
            </svg>
          </div>
      </div>

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

