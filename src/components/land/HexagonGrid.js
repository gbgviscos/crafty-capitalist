import React from 'react';

function Hexagon({ row, col }) {
    const hexWidth = 50;  // width of a hexagon
    const hexHeight = hexWidth * Math.sqrt(3); // height of the hexagon

    const xOffset = 0.75 * hexWidth;
    const yOffset = hexHeight;

    const x = col * xOffset;
    const y = row * yOffset + (col % 2 === 0 ? 0 : 0.5 * yOffset); 

    return (
        <div 
            className="hexagon" 
            style={{ 
                left: `${x}px`,
                top: `${y}px`
            }}
        />
    );
}

function HexagonGrid({ rows, cols }) {
    const hexagons = [];

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            hexagons.push(<Hexagon key={`${row}-${col}`} row={row} col={col} />);
        }
    }

    return <div className="hexagon-grid">{hexagons}</div>;
}

export default HexagonGrid;
