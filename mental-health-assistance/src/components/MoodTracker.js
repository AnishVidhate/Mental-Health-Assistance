
import React, { useState } from 'react';
import { Container, Card, Button, ProgressBar, Form } from 'react-bootstrap';
import MoodGraphs from './MoodGraphs';
import questions from '../data/moodQuestions';

const MoodTracker = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState(Array(questions.length).fill(0));
  const [showGraphs, setShowGraphs] = useState(false);
  const [moodNote, setMoodNote] = useState('');

  const handleAnswer = (value) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = value;
    setAnswers(newAnswers);
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowGraphs(true);
    }
  };

  const handleBackToTracking = () => {
    setShowGraphs(false);
    setCurrentQuestion(0);
  };

  const handleSaveNote = () => {
    if (!moodNote.trim()) {
      alert('Please write something before saving.');
      return;
    }

    const today = new Date().toISOString().split('T')[0];
    const filename = `mood_note_${today}.txt`;

    const blob = new Blob([moodNote], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();

    setMoodNote('');
  };

  const handleCancelNote = () => {
    setMoodNote('');
  };

  if (showGraphs) {
    return <MoodGraphs answers={answers} onBack={handleBackToTracking} />;
  }

  return (
    <Container className="mood-tracker mt-5">
      <Card className="text-center shadow-lg p-4" style={{ borderRadius: '15px' }}>
        <Card.Body>
          <h3 className="text-primary mb-3">🌿 Mood Tracker</h3>
          <ProgressBar 
            now={(currentQuestion + 1) * (100 / questions.length)} 
            label={`${currentQuestion + 1}/${questions.length}`}
            className="mb-4"
          />
          <h5 className="mb-4">{questions[currentQuestion]}</h5>
          <div className="rating-buttons d-flex justify-content-center">
            {[1, 2, 3, 4, 5].map((value) => (
              <Button 
                key={value}
                variant="outline-primary" 
                className="mx-2 px-3 py-2"
                onClick={() => handleAnswer(value)}
              >
                {value}
              </Button>
            ))}
          </div>
        </Card.Body>
      </Card>

      {/* Mood Journal Section (Restored) */}
      <Card className="mt-4 shadow-sm p-4" style={{ borderRadius: '15px', backgroundColor: '#f8f9fa' }}>
        <Card.Body>
          <h4 className="text-secondary mb-3">📝 How are you feeling today?</h4>
          <Form.Group>
            <Form.Control 
              as="textarea" 
              rows={5} 
              placeholder="Write about your day, your thoughts, or anything on your mind..."
              className="p-3"
              value={moodNote}
              onChange={(e) => setMoodNote(e.target.value)}
              style={{ borderRadius: '10px', resize: 'none' }}
            />
          </Form.Group>
          <div className="mt-3 d-flex justify-content-end">
            <Button variant="success" className="me-2" onClick={handleSaveNote}>
              💾 Save Note
            </Button>
            <Button variant="danger" onClick={handleCancelNote}>
              🔄 Cancel
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default MoodTracker;
