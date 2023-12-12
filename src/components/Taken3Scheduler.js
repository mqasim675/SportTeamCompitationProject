// MatchScheduler.js

import React, { useState } from "react";

const MatchScheduler = ({ selectedPairs }) => {
  const [scheduledMatches, setScheduledMatches] = useState([]);

  const handleScheduleMatches = () => {
    if (selectedPairs.length < 2) {
      alert("Select at least two pairs to schedule matches.");
      return;
    }

    // Flatten the array of pairs to get all team members
    const allTeamMembers = selectedPairs.flat();

    // Shuffle the array randomly
    const shuffledTeamMembers = shuffleArray(allTeamMembers);

    // Schedule matches
    const matches = [];
    for (let i = 0; i < shuffledTeamMembers.length; i += 2) {
      const match = {
        team1: shuffledTeamMembers[i],
        team2: shuffledTeamMembers[i + 1],
      };
      matches.push(match);
    }

    setScheduledMatches(matches);
  };

  // Function to shuffle an array randomly
  const shuffleArray = (array) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-2">Match Scheduler For Taken3Game:</h2>
      <button
        onClick={handleScheduleMatches}
        className="bg-purple-500 text-white px-4 py-2 rounded"
      >
        Schedule Matches 
      </button>

      {scheduledMatches.length > 0 && (
        <div className="mt-4">
          <h2 className="text-xl font-bold mb-2">Scheduled Matches:</h2>
          <table className="table-auto w-full">
            <thead>
              <tr>
                <th className="px-4 py-2">Match</th>
                <th className="px-4 py-2">Team 1</th>
                <th className="px-4 py-2">Team 2</th>
              </tr>
            </thead>
            <tbody>
              {scheduledMatches.map((match, index) => (
                <tr key={index}>
                  <td className="border px-4 py-2">{index + 1}</td>
                  <td className="border px-4 py-2">{match.team1?.name || "N/A"}</td>
                  <td className="border px-4 py-2">{match.team2?.name || "N/A"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MatchScheduler;
