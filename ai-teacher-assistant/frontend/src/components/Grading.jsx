import React, { useState } from 'react';

function Grading() {
  const [submission, setSubmission] = useState('');
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleGrade = async () => {
    if (!submission.trim()) return;
    
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:5000/grade', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          submission: submission,
          rubric: {
            model_answer: "A good essay should have a clear thesis, supporting arguments, and a conclusion. It should be well-structured and free of grammatical errors.",
            feedback_comments: [
              "Your essay demonstrates strong critical thinking and good organization.",
              "Try to provide more evidence to support your claims and check your grammar."
            ]
          }
        })
      });
      const data = await response.json();
      setResult(data);
    } catch (error) {
      setResult({ error: "Failed to grade assignment" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grading">
      <h2>AI Assignment Grading</h2>
      
      <div className="editor">
        <textarea
          value={submission}
          onChange={(e) => setSubmission(e.target.value)}
          placeholder="Paste student essay here..."
          rows="10"
        />
        <button onClick={handleGrade} disabled={isLoading}>
          {isLoading ? 'Grading...' : 'Grade Assignment'}
        </button>
      </div>
      
      {result && (
        <div className={`result ${result.error ? 'error' : ''}`}>
          {result.error ? (
            <p>{result.error}</p>
          ) : (
            <>
              <h3>Results</h3>
              <div className="grade-circle">
                {result.grade}%
              </div>
              <p><strong>Feedback:</strong> {result.feedback}</p>
              <p><small>Similarity score: {result.similarity_score.toFixed(2)}</small></p>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default Grading;