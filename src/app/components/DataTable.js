"use client";
import React from 'react';

// Component data table, requires the button action(in this case handleSubmit), the word we are looking for and the method to dave that word
const DataTable = ({ handleSubmit, word, setWord}) => {
    // Returns the left side of the screen, not including both tables
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
