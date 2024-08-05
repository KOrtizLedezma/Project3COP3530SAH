'use client';

import React, { useState } from 'react';
import TreeVisualization from './components/TreeVisualization';
import DataTable from './components/DataTable';
import SongsTable from './components/SongsTable';

export default function Home() {
  const [word, setWord] = useState('');
  const [info, setInfo] = useState("adsawdawdaw");
  const [isLoading, setIsLoading] = useState(true);
  const [treeData, setTreeData] = useState(null);
  const [bfsData, setBfsData] = useState(null);
  const [dfsData, setDfsData] = useState(null);
  const [highestOccurrence, setHighestOccurrence] = useState(null);
  const [lowestOccurrence, setlowestOccurrence] = useState(null);
  const [artistWithHighestOccurrences, setArtistWithHighestOccurrences] = useState(null);

  // Search button action, waits for the response of our route.js after the user inputs the word to loook for
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch(`/api/treeData?word=${encodeURIComponent(word)}`);
      const data = await response.json();
      console.log('Tree data received:', data);

      setTreeData(data.treeData);
      setBfsData(new Set(data.bfsResult));
      setDfsData(new Set(data.dfsResult));
      setHighestOccurrence(data.highestOccurrence);
      setlowestOccurrence(data.lowestOccurrence);
      setArtistWithHighestOccurrences(data.artistWithHighestOccurrences);
    } 
    catch (err) {
      console.error('Error fetching tree data:', err);
    } 
    finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="custom-bckg">
      <div className="custom-data-bckg">
        <div>
          <DataTable handleSubmit={handleSubmit} word={word} setWord={setWord}/>
          {treeData && <SongsTable bfsData={bfsData} dfsData={dfsData} />}
          {!treeData && !isLoading &&
            <div>
              <p className="custom-message">
                Word not found
              </p>
              <p className="custom-message-small">
                Word is not on our data
              </p>
            </div>
          }
        </div> 
        <div className="custom-center-info">
          {treeData && 
            <>
              <div className="custom-info">
                <h3 className='custom-title-info'>
                  Highest Occurrence
                </h3>
                <p className='custom-message-info'>
                  {highestOccurrence}
                </p>
              </div>
              <div className="custom-info">
                <h3 className='custom-title-info'>
                  Lowest Occurrence
                </h3>
                <p className='custom-message-info'>
                  <p className='custom-center-i'>
                    {`${lowestOccurrence.title} by ${lowestOccurrence.artist} with ${lowestOccurrence.count}`}
                  </p>
                </p>
              </div>
              <div className="custom-info">
                <h3 className='custom-title-info'>
                  Artist with Highest Occurrences
                </h3>
                <p className='custom-message-info'>
                  {`${artistWithHighestOccurrences.artist} (${artistWithHighestOccurrences.count} occurrences)`}
                </p>
              </div>
            </>
          }
        </div>
      </div>
      
      <div className="content-container">
        {!treeData && <div className="custom-tree-bckg"></div>}
        {treeData && <TreeVisualization treeData={treeData} />}
      </div>
    </div>
  );
}