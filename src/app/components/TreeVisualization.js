
'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Tree from 'react-d3-tree';

const CustomNode = ({ nodeDatum, setTooltip }) => {
    const handleMouseOver = (event) => {
        setTooltip({
            visible: true,
            content: `
                <div><strong>Name:</strong> ${nodeDatum.name}</div>
                <div><strong>Artist:</strong> ${nodeDatum.attributes.artist}</div>
                <div><strong>Album:</strong> ${nodeDatum.attributes.album}</div>
                <div><strong>Release Date:</strong> ${nodeDatum.attributes.releaseDate}</div>
            `,
            x: event.clientX,
            y: event.clientY,
        });
    };

    const handleMouseOut = () => {
        setTooltip({ visible: false });
    };

    return (
        <g>
            <circle 
                r={100} 
                className="node-circle"
                onMouseOver={handleMouseOver}
                onMouseOut={handleMouseOut}
            />
            <text 
                x={0} 
                dy={3} 
                textAnchor="middle" 
                dominantBaseline="middle"
                style={{ fill: '#EEEEEE', fontSize: '18px', stroke: 'none' }}
                className="custom-node-text"
            >
                {nodeDatum.name}
            </text>
        </g>
    );
};


const TreeVisualization = ({ treeData }) => {
    const [data, setData] = useState(null);
    const [tooltip, setTooltip] = useState({ visible: false, content: '', x: 0, y: 0 });
    const treeContainer = useRef(null);

    const convertToD3TreeFormat = useCallback((node) => {
        if (!node) return null;
        return {
            name: node.name,
            attributes: node.attributes,
            children: node.children ? node.children.map(convertToD3TreeFormat) : undefined
        };
    }, []);

    useEffect(() => {
        if (treeData) {
            const convertedData = convertToD3TreeFormat(treeData);
            setData(convertedData);
        }
    }, [treeData, convertToD3TreeFormat]);

    const dimensions = treeContainer.current
        ? treeContainer.current.getBoundingClientRect()
        : { width: 900, height: 600 };

    return (
        <div ref={treeContainer} className="custom-tree-bckg">
            {data && (
                <Tree
                    data={data}
                    dimensions={dimensions}
                    orientation="vertical"
                    translate={{ x: dimensions.width / 2, y: 250 }}
                    zoomable
                    nodeSize={{ x: 250, y: 250 }}
                    renderCustomNodeElement={(rd3tProps) => (
                        <CustomNode {...rd3tProps} setTooltip={setTooltip} />
                    )}
                    pathFunc="diagonal"
                    linkClassFunc={() => 'custom-link'}
                />
            )}
            {tooltip.visible && (
                <div
                    className="tooltip"
                    style={{
                        left: `${tooltip.x}px`,
                        top: `${tooltip.y}px`,
                        transform: 'translate(-50%, -100%)',
                        opacity: tooltip.visible ? 1 : 0,
                    }}
                    dangerouslySetInnerHTML={{ __html: tooltip.content }}
                />
            )}
        </div>
    );
};


export default TreeVisualization;
