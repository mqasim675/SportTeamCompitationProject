// MatchSchedule.js

import React, { useState, useEffect } from "react";

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const MatchSchedule = ({ selectedPairs }) => {
  const [matchSchedule, setMatchSchedule] = useState([]);

  useEffect(() => {
    if (selectedPairs && selectedPairs.length > 1) {
      const shuffledPairs = shuffleArray([...selectedPairs]);
      const schedule = [];

      for (let i = 0; i < shuffledPairs.length; i += 2) {
        const team1 = shuffledPairs[i] || [];
        const team2 = shuffledPairs[i + 1] || [];

        const match = {
          team1,
          team2,
        };
        schedule.push(match);
      }

      setMatchSchedule(schedule);
    }
  }, [selectedPairs]);

  return (
    <div>
      <h2 className="text-xl font-bold mb-2">Match Schedule For Table Football:</h2>
      <table>
        <thead>
          <tr>
            <th>Match</th>
            <th>Team 1 Member 1</th>
            <th>Team 1 Member 2</th>
            <th>Team 2 Member 1</th>
            <th>Team 2 Member 2</th>
          </tr>
        </thead>
        <tbody>
          {matchSchedule.map((match, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{match.team1[0]?.name || "Team 1"}</td>
              <td>{match.team1[1]?.name || "Team 1"}</td>
              <td>{match.team2[0]?.name || "Team 2"}</td>
              <td>{match.team2[1]?.name || "Team 2"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MatchSchedule;
