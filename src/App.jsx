import React, { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import QUESTIONS_DATA from './questions.json';

// Use imported questions
const QUESTIONS = QUESTIONS_DATA;

// ============================================================================
// STYLES
// ============================================================================
const styles = {
  container: {
    fontFamily: '"IBM Plex Sans", sans-serif',
    backgroundColor: '#0f0f1e',
    color: '#ffffff',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    backgroundColor: '#0a0a14',
    color: '#ffffff',
    padding: '1.5rem 2rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid #1a3a4a',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    fontSize: '1.5rem',
    fontWeight: 'bold',
    fontFamily: '"Syne", sans-serif',
  },
  logoIcon: {
    width: '32px',
    height: '32px',
    backgroundColor: '#00d4ff',
    borderRadius: '6px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.2rem',
  },
  nav: {
    display: 'flex',
    gap: '2rem',
  },
  navButton: {
    backgroundColor: 'transparent',
    color: '#999999',
    border: 'none',
    padding: '0.5rem 0',
    cursor: 'pointer',
    fontSize: '0.95rem',
    borderBottom: '2px solid transparent',
    transition: 'all 0.3s',
  },
  navButtonActive: {
    color: '#ffffff',
    borderBottomColor: '#00d4ff',
  },
  tutorButton: {
    backgroundColor: '#1a3a4a',
    color: '#00d4ff',
    border: '1px solid #00d4ff',
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '0.95rem',
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    padding: '2rem',
    maxWidth: '1400px',
    margin: '0 auto',
    width: '100%',
  },
  button: {
    backgroundColor: '#00d4ff',
    color: '#000000',
    border: 'none',
    padding: '0.75rem 1.5rem',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: 'bold',
    transition: 'background-color 0.3s',
  },
  buttonHover: {
    backgroundColor: '#00a8cc',
  },
  input: {
    padding: '0.75rem',
    borderRadius: '4px',
    border: '1px solid #333333',
    fontSize: '1rem',
    marginBottom: '1rem',
    width: '100%',
    boxSizing: 'border-box',
    backgroundColor: '#1a1a2e',
    color: '#ffffff',
  },
  card: {
    backgroundColor: '#1a1a2e',
    border: '1px solid #333333',
    borderRadius: '8px',
    padding: '1.5rem',
    cursor: 'pointer',
    transition: 'all 0.3s',
  },
  cardHover: {
    borderColor: '#00d4ff',
    transform: 'translateY(-4px)',
  },
  dashboard: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '1.5rem',
  },
  questionCard: {
    backgroundColor: '#1a1a2e',
    border: '2px solid #333333',
    borderRadius: '4px',
    padding: '1.5rem',
    marginBottom: '1.5rem',
  },
  choiceButton: {
    display: 'block',
    width: '100%',
    padding: '0.75rem',
    marginBottom: '0.75rem',
    textAlign: 'left',
    border: '2px solid #333333',
    backgroundColor: '#0f0f1e',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'all 0.3s',
    color: '#ffffff',
  },
  filterContainer: {
    display: 'flex',
    gap: '1rem',
    marginBottom: '2rem',
    flexWrap: 'wrap',
  },
};

// ============================================================================
// LOGIN SCREEN
// ============================================================================
function LoginScreen({ onLogin }) {
  const [email, setEmail] = useState('demo@sat-down.com');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (email && password) {
      onLogin({ email });
    }
  };

  return (
    <div style={styles.content}>
      <div style={{ maxWidth: '600px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
          <div style={styles.logoIcon}>⬜</div>
          <h1 style={{ fontFamily: '"Syne", sans-serif', fontSize: '2rem', margin: 0 }}>SAT-down</h1>
        </div>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>PREP PLATFORM</h2>
        <p style={{ fontSize: '1.1rem', marginBottom: '2rem', color: '#999999' }}>Your AI-powered SAT prep companion.</p>
        <div style={{ maxWidth: '400px' }}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
          />
          <button onClick={handleLogin} style={styles.button}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// DASHBOARD SCREEN
// ============================================================================
function DashboardScreen({ user, onNavigate }) {
  const [hoveredCard, setHoveredCard] = useState(null);

  const cards = [
    { id: 'practice', icon: '✏️', title: 'Start Practice', subtitle: 'Adaptive questions', screen: 'practice' },
    { id: 'test', icon: '📋', title: 'Take a Test', subtitle: 'Full simulation', screen: 'test' },
    { id: 'score', icon: '📊', title: 'Score Tracker', subtitle: 'Complete a simulation test to see your predicted score.', screen: null },
    { id: 'tutor', icon: '🤖', title: 'AI Tutor', subtitle: 'Instant guidance', screen: null },
  ];

  return (
    <div style={styles.content}>
      <h1 style={{ fontFamily: '"Syne", sans-serif', fontSize: '2rem', marginBottom: '0.5rem' }}>
        Welcome back, {user.email.split('@')[0]}.
      </h1>
      <p style={{ color: '#999999', marginBottom: '2rem' }}>Your dashboard is ready. Complete your first session to begin tracking progress.</p>

      <div style={styles.dashboard}>
        {cards.map((card) => (
          <div
            key={card.id}
            onClick={() => card.screen && onNavigate(card.screen)}
            onMouseEnter={() => setHoveredCard(card.id)}
            onMouseLeave={() => setHoveredCard(null)}
            style={{
              ...styles.card,
              ...(hoveredCard === card.id ? styles.cardHover : {}),
              cursor: card.screen ? 'pointer' : 'default',
            }}
          >
            <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>{card.icon}</div>
            <h3 style={{ marginBottom: '0.5rem', fontWeight: 'bold' }}>{card.title}</h3>
            <p style={{ color: '#999999', fontSize: '0.9rem', margin: 0 }}>{card.subtitle}</p>
          </div>
        ))}
      </div>

      {/* Placeholder for Score Tracker */}
      <div style={{ marginTop: '2rem', padding: '2rem', backgroundColor: '#1a1a2e', borderRadius: '8px', border: '1px solid #333333' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', minHeight: '200px', flexDirection: 'column' }}>
          <div style={{ fontSize: '3rem' }}>📊</div>
          <div style={{ textAlign: 'center' }}>
            <h3 style={{ marginBottom: '0.5rem' }}>No score data yet</h3>
            <p style={{ color: '#999999' }}>Take your first full-length simulation test to generate a baseline score prediction.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// PRACTICE SCREEN
// ============================================================================
function PracticeScreen({ onAnswer, onNavigateHome }) {
  const [selectedTopic, setSelectedTopic] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [searchText, setSearchText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const questionsPerPage = 20;

  const topics = ['All', 'Heart of Algebra', 'Reading & Writing', 'Advanced Math', 'Problem Solving & Data'];
  const difficulties = ['All', 'Easy ≤10', 'Medium 15', 'Hard 20', 'Very Hard 25'];

  const filteredQuestions = useMemo(() => {
    return QUESTIONS.filter((q) => {
      const matchesTopic = selectedTopic === 'All' || q.topic === selectedTopic;
      const matchesDifficulty = selectedDifficulty === 'All' || q.points === parseInt(selectedDifficulty);
      const matchesSearch = searchText === '' || q.question.toLowerCase().includes(searchText.toLowerCase());
      return matchesTopic && matchesDifficulty && matchesSearch;
    });
  }, [selectedTopic, selectedDifficulty, searchText]);

  const startIdx = (currentPage - 1) * questionsPerPage;
  const paginatedQuestions = filteredQuestions.slice(startIdx, startIdx + questionsPerPage);
  const totalPages = Math.ceil(filteredQuestions.length / questionsPerPage);

  return (
    <div style={styles.content}>
      <h1 style={{ fontFamily: '"Syne", sans-serif' }}>Practice</h1>

      <input
        type="text"
        placeholder="Search questions..."
        value={searchText}
        onChange={(e) => {
          setSearchText(e.target.value);
          setCurrentPage(1);
        }}
        style={styles.input}
      />

      <div style={styles.filterContainer}>
        <span style={{ fontWeight: 'bold' }}>Topic:</span>
        {topics.map((topic) => (
          <button
            key={topic}
            onClick={() => {
              setSelectedTopic(topic);
              setCurrentPage(1);
            }}
            style={{
              ...styles.button,
              backgroundColor: selectedTopic === topic ? '#00d4ff' : '#333333',
              color: selectedTopic === topic ? '#000000' : '#ffffff',
            }}
          >
            {topic}
          </button>
        ))}
      </div>

      <div style={styles.filterContainer}>
        <span style={{ fontWeight: 'bold' }}>Difficulty:</span>
        {difficulties.map((diff) => (
          <button
            key={diff}
            onClick={() => {
              setSelectedDifficulty(diff);
              setCurrentPage(1);
            }}
            style={{
              ...styles.button,
              backgroundColor: selectedDifficulty === diff ? '#00d4ff' : '#333333',
              color: selectedDifficulty === diff ? '#000000' : '#ffffff',
            }}
          >
            {diff}
          </button>
        ))}
      </div>

      <p style={{ marginBottom: '1rem', color: '#999999' }}>
        Showing {paginatedQuestions.length} of {filteredQuestions.length} questions
      </p>

      {paginatedQuestions.map((q) => (
        <div key={q.id} style={styles.questionCard}>
          <div style={{ marginBottom: '1rem' }}>
            <span style={{ fontWeight: 'bold', marginRight: '1rem', color: '#00d4ff' }}>{q.topic}</span>
            <span style={{ color: '#999999' }}>{q.subtopic}</span>
          </div>
          <p style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>{q.question}</p>
          {q.choices.map((choice, idx) => (
            <button
              key={idx}
              style={{
                ...styles.choiceButton,
                borderColor: idx === q.correct ? '#00d4ff' : '#333333',
                backgroundColor: idx === q.correct ? '#1a3a4a' : '#0f0f1e',
              }}
            >
              {String.fromCharCode(65 + idx)}) {choice}
            </button>
          ))}
          <details style={{ marginTop: '1rem' }}>
            <summary style={{ cursor: 'pointer', fontWeight: 'bold', color: '#00d4ff' }}>Show Explanation</summary>
            <p style={{ marginTop: '0.5rem' }}>{q.explanation}</p>
            <p style={{ color: '#ff6b6b' }}>
              <strong>Common trap:</strong> {q.trap}
            </p>
          </details>
        </div>
      ))}

      {totalPages > 1 && (
        <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', marginTop: '2rem' }}>
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            style={{ ...styles.button, opacity: currentPage === 1 ? 0.5 : 1 }}
          >
            Previous
          </button>
          <span style={{ alignSelf: 'center', fontWeight: 'bold' }}>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            style={{ ...styles.button, opacity: currentPage === totalPages ? 0.5 : 1 }}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

// ============================================================================
// TEST SCREEN
// ============================================================================
function TestScreen({ onAnswer }) {
  const [testStarted, setTestStarted] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(null);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [answers, setAnswers] = useState({});
  const [testQuestions, setTestQuestions] = useState([]);

  const startTest = () => {
    const shuffled = [...QUESTIONS].sort(() => Math.random() - 0.5).slice(0, 10);
    setTestQuestions(shuffled);
    setTestStarted(true);
    setTimeRemaining(600);
    setCurrentQuestionIdx(0);
    setAnswers({});
  };

  useEffect(() => {
    if (!testStarted || timeRemaining === null) return;
    if (timeRemaining === 0) {
      setTestStarted(false);
      alert('Time up! Test submitted.');
      return;
    }
    const timer = setTimeout(() => setTimeRemaining(timeRemaining - 1), 1000);
    return () => clearTimeout(timer);
  }, [testStarted, timeRemaining]);

  if (!testStarted) {
    return (
      <div style={styles.content}>
        <h1 style={{ fontFamily: '"Syne", sans-serif' }}>Full Test</h1>
        <p style={{ color: '#999999' }}>Take a timed practice test to gauge your readiness.</p>
        <button onClick={startTest} style={styles.button}>
          Start Test
        </button>
      </div>
    );
  }

  const q = testQuestions[currentQuestionIdx];
  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;

  return (
    <div style={styles.content}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <h2>Question {currentQuestionIdx + 1} of {testQuestions.length}</h2>
        <span style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#00d4ff' }}>
          {minutes}:{seconds < 10 ? '0' : ''}{seconds}
        </span>
      </div>

      <div style={styles.questionCard}>
        <p style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>{q.question}</p>
        {q.choices.map((choice, idx) => (
          <button
            key={idx}
            onClick={() => {
              setAnswers({ ...answers, [q.id]: idx });
              if (currentQuestionIdx < testQuestions.length - 1) {
                setCurrentQuestionIdx(currentQuestionIdx + 1);
              }
            }}
            style={{
              ...styles.choiceButton,
              borderColor: answers[q.id] === idx ? '#00d4ff' : '#333333',
              backgroundColor: answers[q.id] === idx ? '#1a3a4a' : '#0f0f1e',
            }}
          >
            {String.fromCharCode(65 + idx)}) {choice}
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
        <button
          onClick={() => setCurrentQuestionIdx(Math.max(0, currentQuestionIdx - 1))}
          disabled={currentQuestionIdx === 0}
          style={{ ...styles.button, opacity: currentQuestionIdx === 0 ? 0.5 : 1 }}
        >
          Previous
        </button>
        <button
          onClick={() => {
            setTestStarted(false);
            const correct = testQuestions.filter(
              (tq) => answers[tq.id] === tq.correct
            ).length;
            testQuestions.forEach((tq) => {
              if (answers[tq.id] !== undefined) {
                onAnswer(answers[tq.id] === tq.correct);
              }
            });
            alert(`Test completed! Score: ${correct}/${testQuestions.length}`);
          }}
          style={{ ...styles.button, backgroundColor: '#ff6b6b', color: '#ffffff' }}
        >
          Submit Test
        </button>
        <button
          onClick={() => setCurrentQuestionIdx(Math.min(testQuestions.length - 1, currentQuestionIdx + 1))}
          disabled={currentQuestionIdx === testQuestions.length - 1}
          style={{ ...styles.button, opacity: currentQuestionIdx === testQuestions.length - 1 ? 0.5 : 1 }}
        >
          Next
        </button>
      </div>
    </div>
  );
}

// ============================================================================
// ANALYTICS SCREEN
// ============================================================================
function AnalyticsScreen({ stats }) {
  const accuracyRate = stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0;

  return (
    <div style={styles.content}>
      <h1 style={{ fontFamily: '"Syne", sans-serif' }}>Analytics</h1>
      <div style={styles.dashboard}>
        <div style={styles.card}>
          <h3>Total Questions Attempted</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#00d4ff', margin: 0 }}>{stats.total}</p>
        </div>
        <div style={styles.card}>
          <h3>Accuracy Rate</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#00d4ff', margin: 0 }}>{accuracyRate}%</p>
        </div>
        <div style={styles.card}>
          <h3>Questions Available</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#00d4ff', margin: 0 }}>{QUESTIONS.length}</p>
        </div>
        <div style={styles.card}>
          <h3>Topics Available</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#00d4ff', margin: 0 }}>{[...new Set(QUESTIONS.map(q => q.topic))].length}</p>
        </div>
      </div>
      <div style={{ marginTop: '2rem' }}>
        <h2 style={{ fontFamily: '"Syne", sans-serif' }}>Topic Breakdown</h2>
        {[...new Set(QUESTIONS.map(q => q.topic))].map(topic => {
          const topicQuestions = QUESTIONS.filter(q => q.topic === topic);
          return (
            <div key={topic} style={styles.card}>
              <h4>{topic}</h4>
              <p style={{ color: '#999999' }}>{topicQuestions.length} questions available</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ============================================================================
// PLANNER SCREEN
// ============================================================================
function PlannerScreen() {
  return (
    <div style={styles.content}>
      <h1 style={{ fontFamily: '"Syne", sans-serif' }}>Study Planner</h1>
      <div style={styles.card}>
        <h3>Your Study Schedule</h3>
        <p style={{ color: '#999999' }}>Set weekly study goals and track your progress toward test day.</p>
      </div>
    </div>
  );
}

// ============================================================================
// MAIN APP
// ============================================================================
export default function App() {
  const [user, setUser] = useState(null);
  const [currentScreen, setCurrentScreen] = useState('dashboard');
  const [stats, setStats] = useState({ correct: 0, total: 0 });

  const updateStats = (isCorrect) => {
    setStats(prev => ({
      correct: prev.correct + (isCorrect ? 1 : 0),
      total: prev.total + 1
    }));
  };

  if (!user) {
    return (
      <div style={styles.container}>
        <LoginScreen onLogin={setUser} />
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={styles.logo}>
          <div style={styles.logoIcon}>⬜</div>
          <div>
            <div>SAT-down</div>
            <div style={{ fontSize: '0.7rem', color: '#999999', fontWeight: 'normal' }}>PREP PLATFORM</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <div style={styles.nav}>
            <button
              onClick={() => setCurrentScreen('dashboard')}
              style={{
                ...styles.navButton,
                ...(currentScreen === 'dashboard' ? styles.navButtonActive : {}),
              }}
            >
              Dashboard
            </button>
            <button
              onClick={() => setCurrentScreen('practice')}
              style={{
                ...styles.navButton,
                ...(currentScreen === 'practice' ? styles.navButtonActive : {}),
              }}
            >
              Practice
            </button>
            <button
              onClick={() => setCurrentScreen('test')}
              style={{
                ...styles.navButton,
                ...(currentScreen === 'test' ? styles.navButtonActive : {}),
              }}
            >
              Test
            </button>
            <button
              onClick={() => setCurrentScreen('analytics')}
              style={{
                ...styles.navButton,
                ...(currentScreen === 'analytics' ? styles.navButtonActive : {}),
              }}
            >
              Analytics
            </button>
            <button
              onClick={() => setCurrentScreen('planner')}
              style={{
                ...styles.navButton,
                ...(currentScreen === 'planner' ? styles.navButtonActive : {}),
              }}
            >
              Planner
            </button>
          </div>
          <button style={styles.tutorButton}>💬 Ask AI Tutor</button>
          <button
            onClick={() => setUser(null)}
            style={styles.navButton}
          >
            Logout
          </button>
        </div>
      </div>
      {currentScreen === 'dashboard' && <DashboardScreen user={user} onNavigate={setCurrentScreen} />}
      {currentScreen === 'practice' && <PracticeScreen onAnswer={updateStats} />}
      {currentScreen === 'test' && <TestScreen onAnswer={updateStats} />}
      {currentScreen === 'analytics' && <AnalyticsScreen stats={stats} />}
      {currentScreen === 'planner' && <PlannerScreen />}
    </div>
  );
}
