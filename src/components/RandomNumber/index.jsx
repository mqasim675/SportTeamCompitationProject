// App.js

import React, { useState, useEffect } from "react";

const generateRandomPair = (names) => {
  const randomIndex1 = Math.floor(Math.random() * names.length);
  let randomIndex2 = Math.floor(Math.random() * names.length);
  while (randomIndex2 === randomIndex1) {
    randomIndex2 = Math.floor(Math.random() * names.length);
  }

  return [names[randomIndex1], names[randomIndex2]];
};

const RamdomNumber = () => {
  const initialNames = [
    { id: 1, name: "Name1" },
    { id: 2, name: "Name2" },
    { id: 3, name: "Name3" },
    { id: 4, name: "Name4" },
    { id: 5, name: "Name5" },
    { id: 6, name: "Name6" },
    { id: 7, name: "Name7" },
    { id: 8, name: "Name8" },
    { id: 9, name: "Name9" },
    { id: 10, name: "Name10" },
    // Add more names as needed
  ];

  const [names, setNames] = useState(initialNames);
  const [selectedPairs, setSelectedPairs] = useState([]);
  const [currentPair, setCurrentPair] = useState([]);
  const [groupCounter, setGroupCounter] = useState(0);

  useEffect(() => {
    // Save to local storage
    localStorage.setItem("selectedPairs", JSON.stringify(selectedPairs));
  }, [selectedPairs]);

  const handleGroupButtonClick = () => {
    if (currentPair.length === 0) {
      const pair = generateRandomPair(names);
      setCurrentPair(pair);
    } else {
      setSelectedPairs([...selectedPairs, currentPair]);
      setCurrentPair([]);
      setGroupCounter(groupCounter + 1);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Name Grouping App</h1>
        <button
          onClick={handleGroupButtonClick}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          {currentPair.length === 0 ? "Generate Pair" : "Create Group"}
        </button>
        {selectedPairs.length > 0 && (
          <div className="mt-4">
            <h2 className="text-xl font-bold mb-2">Selected Groups:</h2>
            <ul>
              {selectedPairs.map((pair, index) => (
                <li key={index}>
                  Group {index + 1}: {pair[0].name}, {pair[1].name}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default RamdomNumber;
