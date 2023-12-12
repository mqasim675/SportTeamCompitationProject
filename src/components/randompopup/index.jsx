// SelectedGroups.js

import React from "react";

const SelectedGroups = ({ selectedPairs }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-md">
        <h2 className="text-2xl font-bold mb-4">All Members Selected!</h2>
        <p>The following groups have been selected:</p>
        <ul>
          {selectedPairs.map((pair, index) => (
            <li key={index}>
              Group {index + 1}: {pair[0].name}, {pair[1].name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SelectedGroups;
