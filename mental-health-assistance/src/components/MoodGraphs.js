
import React from 'react';
import { Container, Card, Row, Col, Button } from 'react-bootstrap';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend } from 'chart.js';
import Navbar from './Navbar';
import labels from '../data/labels';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend);

const MoodGraphs = ({ answers, onBack }) => {
  const past7Days = Array.from({ length: 7 }, () => Math.floor(Math.random() * 5) + 1);

  const moodTrendData = {
    labels: ['Day 7', 'Day 6', 'Day 5', 'Day 4', 'Day 3', 'Day 2', 'Yesterday', 'Today'],
    datasets: [
      {
        label: 'Mood Score',
        data: [...past7Days, answers.reduce((a, b) => a + b, 0) / answers.length],
        borderColor: 'rgba(75,192,192,1)',
        backgroundColor: 'rgba(75,192,192,0.2)',
        fill: true,
      }
    ]
  };

  const todayMoodData = {
    labels: labels,
    datasets: [{
      label: 'Score',
      data: answers,
      borderColor: 'rgba(153,102,255,1)',
      backgroundColor: 'rgba(153,102,255,0.2)',
      fill: true,
    }]
  };

  return (
    <>
      <Navbar />
      <Container className="mood-graphs mt-5">
        <h2 className="text-center mb-4">Your Mood Analysis</h2>
        <Row>
          <Col md={6}>
            <Card className="mb-4">
              <Card.Body>
                <h5>Past Few Days Mood</h5>
                <div style={{ height: '300px' }}>
                  <Line data={moodTrendData} options={{ responsive: true, maintainAspectRatio: false }} />
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6}>
            <Card>
              <Card.Body>
                <h5>Today's Mood Breakdown</h5>
                <div style={{ height: '300px' }}>
                  <Line data={todayMoodData} options={{ responsive: true, maintainAspectRatio: false }} />
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <div className="text-center mt-4">
          <Button variant="primary" onClick={onBack}>
            🔄 Back to Mood Tracking
          </Button>
        </div>
      </Container>
    </>
  );
};

export default MoodGraphs;
