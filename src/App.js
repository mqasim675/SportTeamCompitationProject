import React, { useState, useEffect } from "react";
import MatchSchedule from "./components/MatchSchedule";
import TeamScores from "./components/TeamScores";
import MatchScheduler from './components/Taken3Scheduler'
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const generateRandomPair = (names) => {
  if (names.length < 2) {
    return [null, null, names];
  }

  const shuffledNames = shuffleArray([...names]);

  const name1 = shuffledNames.pop();
  const name2 = shuffledNames.pop();

  return [name1, name2, shuffledNames];
};

const App = () => {
  const initialNames = [
    { id: 1, name: "Muqarab Sb" },
    { id: 2, name: "Akash Sb" },
    { id: 3, name: "Talha Sb" },
    { id: 4, name: "Moiz bahi" },
    { id: 5, name: "Daniyal bahi" },
    { id: 6, name: "Usama bahi" },
    { id: 7, name: "Usama Babar" },
    { id: 8, name: "Ihtsham bahi" },
    { id: 9, name: "Asad bahi" },
    { id: 10, name: "Ahmad bahi" },
    { id: 11, name: "Adeel bahi" },
    { id: 12, name: "Haroon bahi" },
    { id: 13, name: "Akrama hayat" },
    { id: 14, name: "Subbiyal" },
    { id: 15, name: "Ifrahim" },
    { id: 16, name: "Ammad" },
    { id: 17, name: "Junaid jr" },
    { id: 18, name: "Muhammad Qasim" },
  ];

  const [names, setNames] = useState(initialNames);
  const [selectedPairs, setSelectedPairs] = useState([]);
  const [currentPair, setCurrentPair] = useState([]);
  const [groupCounter, setGroupCounter] = useState(0);
  const [teamScores, setTeamScores] = useState([]);

  useEffect(() => {
    localStorage.setItem("selectedPairs", JSON.stringify(selectedPairs));
  }, [selectedPairs]);

  const handleGroupButtonClick = () => {
    if (currentPair.length === 0) {
      const [name1, name2, updatedNames] = generateRandomPair(names);
      setCurrentPair([name1, name2]);
      setNames(updatedNames);
    } else {
      setSelectedPairs([...selectedPairs, currentPair]);
      setCurrentPair([]);

      if (names.length === 0) {
        alert("All members have been selected!");
      }

      setGroupCounter(groupCounter + 1);
    }
  };
 
 

  return (
    <div className="min-h-screen flex items-center justify-center">
    <div className="text-center">
      <h1 className="text-2xl font-bold mb-4">GeeksHub Gaming Tournament</h1>
      <button
        onClick={handleGroupButtonClick}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        {currentPair.length === 0 ? "Generate Pair" : "Create Group"}
      </button>
      {selectedPairs.length > 0 && (
        <div className="mt-4">
          <h2 className="text-xl font-bold mb-2">Selected Groups For Table Football:</h2>
          <table className="table-auto w-full">
            <thead>
              <tr>
                <th className="px-4 py-2">Group</th>
                <th className="px-4 py-2">Member 1</th>
                <th className="px-4 py-2">Member 2</th>
              </tr>
            </thead>
            <tbody>
              {selectedPairs.map((pair, index) => (
                <tr key={index}>
                  <td className="border px-4 py-2">{index + 1}</td>
                  <td className="border px-4 py-2">{pair[0].name}</td>
                  <td className="border px-4 py-2">{pair[1].name}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <MatchSchedule selectedPairs={selectedPairs} />
          <MatchScheduler selectedPairs={selectedPairs} />
        </div>
      )}
      <div className="mt-4">
        <TeamScores teamScores={teamScores} setTeamScores={setTeamScores} />
      </div>
    </div>
  </div>
  );
};

export default App;
