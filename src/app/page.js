'use client';

import React, { useState } from 'react';
import TreeVisualization from './components/TreeVisualization';
import DataTable from './components/DataTable';
import SongsTable from './components/SongsTable';

export default function Home() {
  const [word, setWord] = useState('');
  //const [info, setInfo] = useState("adsawdawdaw");
  const [isLoading, setIsLoading] = useState(false);
  const [treeData, setTreeData] = useState(null);
  const [bfsData, setBfsData] = useState(null);
  const [dfsData, setDfsData] = useState(null);

  // NEW
  const [highestOccurrence, setHighestOccurrence] = useState('None');
  const [lowestOccurrence, setLowestOccurrence] = useState('None');
  const [artistWithHighestOccurrences, setArtistWithHighestOccurrences] = useState('None');


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

      // NEW
      setHighestOccurrence(data.highestOccurrence);
      setLowestOccurrence(data.lowestOccurrence);
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
        </div> 
        <div className="custom-center">
          {treeData && 
            <>
              <div className="custom-info">
                <h3>Highest Occurrence</h3>
                <p>{highestOccurrence}</p>
              </div>
              <div className="custom-info">
                <h3>Lowest Occurrence</h3>
                <p>{lowestOccurrence}</p>
              </div>
              <div className="custom-info">
                <h3>Artist with Highest Occurrences</h3>
                <p>{artistWithHighestOccurrences}</p>
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