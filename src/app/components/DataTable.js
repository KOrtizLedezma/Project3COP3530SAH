"use client";
import React from 'react';

const DataTable = ({ handleSubmit, word, setWord}) => {

    return (
        <div >
            <div>
                <p className="custom-title">
                    Song Association Helper
                </p>
            </div>
            <div className="custom-center">
                <input 
                    className="custom-input-field" 
                    placeholder="Please insert a word"
                    value={word}
                    onChange={(e) => setWord(e.target.value)}
                />
                <button 
                    className="custom-button"
                    onClick={handleSubmit}
                >
                    Search
                </button>
            </div>
        </div>
    );
};

export default DataTable;
