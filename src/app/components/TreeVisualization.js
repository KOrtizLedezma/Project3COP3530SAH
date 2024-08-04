'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Tree from 'react-d3-tree';

const CustomNode = ({ nodeDatum }) => (
    <g>
        <circle 
            r={100} 
            className="node-circle"
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

const TreeVisualization = ({ treeData }) => {
    const [data, setData] = useState(null);
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
            console.log('Converted Tree Data:', convertedData);
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
                        <CustomNode {...rd3tProps} />
                    )}
                    pathFunc="diagonal"
                    linkClassFunc={() => 'custom-link'}
                />
            )}
        </div>
    );
};

export default TreeVisualization;