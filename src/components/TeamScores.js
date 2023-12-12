// TeamScores.js

import React, { useState } from "react";

const TeamScores = ({ teamScores, setTeamScores }) => {
  const [newScore, setNewScore] = useState({
    id: "",
    teamName: "",
    score: "",
  });
  const [showAddScoreModal, setShowAddScoreModal] = useState(false);
  const [showUpdateScoreModal, setShowUpdateScoreModal] = useState(false);
  const [selectedScore, setSelectedScore] = useState(null);

  const handleAddScore = () => {
    setTeamScores([...teamScores, newScore]);
    setNewScore({ id: "", teamName: "", score: "" });
    setShowAddScoreModal(false);
  };

  const handleUpdateScore = () => {
    if (selectedScore) {
      const updatedScores = teamScores.map((score) =>
        score.id === selectedScore.id
          ? { ...newScore, id: selectedScore.id }
          : score
      );
      setTeamScores(updatedScores);
      setShowUpdateScoreModal(false);
      setNewScore({ id: "", teamName: "", score: "" });
      setSelectedScore(null); // Reset selectedScore after the update
    }
  };

  const handleDeleteScore = () => {
    if (selectedScore) {
      const updatedScores = teamScores.filter((score) => score.id !== selectedScore.id);
      setTeamScores(updatedScores);
      setShowUpdateScoreModal(false);
      setSelectedScore(null); // Reset selectedScore after the delete
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-2">Team Scores:</h2>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">Team Name</th>
            <th className="px-4 py-2">Score</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {teamScores.map((score) => (
            <tr key={score.id}>
              <td className="border px-4 py-2">{score.teamName}</td>
              <td className="border px-4 py-2">{score.score}</td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => {
                    setNewScore({ ...score });
                    setShowUpdateScoreModal(true);
                  }}
                >
                  Update
                </button>
                <button
                  onClick={() => {
                    setSelectedScore({ ...score });
                    setShowUpdateScoreModal(true);
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add Score Modal */}
      {showAddScoreModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowAddScoreModal(false)}>
              &times;
            </span>
            <h2>Add Team Score</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleAddScore();
              }}
            >
              <label>
                Team Name:
                <input
                  type="text"
                  value={newScore.teamName}
                  onChange={(e) =>
                    setNewScore({ ...newScore, teamName: e.target.value })
                  }
                  required
                />
              </label>
              <label>
                Score:
                <input
                  type="number"
                  value={newScore.score}
                  onChange={(e) =>
                    setNewScore({ ...newScore, score: e.target.value })
                  }
                  required
                />
              </label>
              <button type="submit">Add Score</button>
            </form>
          </div>
        </div>
      )}

      {/* Update/Delete Score Modal */}
      {showUpdateScoreModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowUpdateScoreModal(false)}>
              &times;
            </span>
            <h2>Update Team Score</h2>
            <form onSubmit={(e) => { e.preventDefault(); handleUpdateScore(); }}>
              <label>
                Team Name:
                <input
                  type="text"
                  value={newScore.teamName}
                  onChange={(e) => setNewScore({ ...newScore, teamName: e.target.value })}
                  required
                />
              </label>
              <label>
                Score:
                <input
                  type="number"
                  value={newScore.score}
                  onChange={(e) => setNewScore({ ...newScore, score: e.target.value })}
                  required
                />
              </label>
              <button type="submit">Update Score</button>
            </form>
            <button onClick={() => handleDeleteScore()}>Delete</button>
          </div>
        </div>
      )}

      {/* Add Score Button */}
      <div className="mt-4">
        <button
          onClick={() => setShowAddScoreModal(true)}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Add Team Score
        </button>
      </div>
    </div>
  );
};

export default TeamScores;
