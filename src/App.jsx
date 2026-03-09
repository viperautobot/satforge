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
    backgroundColor: '#ffffff',
    color: '#000000',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    backgroundColor: '#1a1a2e',
    color: '#ffffff',
    padding: '1rem 2rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontFamily: '"Syne", sans-serif',
    fontSize: '1.5rem',
    fontWeight: 'bold',
  },
  nav: {
    display: 'flex',
    gap: '1rem',
  },
  navButton: {
    backgroundColor: 'transparent',
    color: '#ffffff',
    border: 'none',
    padding: '0.5rem 1rem',
    cursor: 'pointer',
    fontSize: '1rem',
    borderBottom: '2px solid transparent',
    transition: 'border-color 0.3s',
  },
  navButtonActive: {
    borderBottomColor: '#00d4ff',
  },
  content: {
    flex: 1,
    padding: '2rem',
    maxWidth: '1200px',
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
    border: '1px solid #cccccc',
    fontSize: '1rem',
    marginBottom: '1rem',
    width: '100%',
    boxSizing: 'border-box',
  },
  card: {
    backgroundColor: '#f5f5f5',
    border: '1px solid #dddddd',
    borderRadius: '4px',
    padding: '1.5rem',
    marginBottom: '1.5rem',
  },
  questionCard: {
    backgroundColor: '#ffffff',
    border: '2px solid #1a1a2e',
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
    border: '2px solid #cccccc',
    backgroundColor: '#ffffff',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'all 0.3s',
  },
  filterContainer: {
    display: 'flex',
    gap: '1rem',
    marginBottom: '2rem',
    flexWrap: 'wrap',
  },
  filterLabel: {
    display: 'flex',
    gap: '0.5rem',
    alignItems: 'center',
  },
};

// ============================================================================
// LOGIN SCREEN
// ============================================================================
function LoginScreen({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (email && password) {
      onLogin({ email });
    }
  };

  return (
    <div style={styles.content}>
      <h1 style={{ fontFamily: '"Syne", sans-serif', fontSize: '2.5rem' }}>SATforge</h1>
      <p style={{ fontSize: '1.1rem', marginBottom: '2rem' }}>Your AI-powered SAT prep companion.</p>
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
  );
}

// ============================================================================
// HOME SCREEN
// ============================================================================
function HomeScreen({ user }) {
  const stats = {
    totalQuestions: QUESTIONS.length,
    topics: [...new Set(QUESTIONS.map(q => q.topic))].length,
  };

  return (
    <div style={styles.content}>
      <h1 style={{ fontFamily: '"Syne", sans-serif' }}>Welcome back, {user.email}!</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        <div style={styles.card}>
          <h3>{stats.totalQuestions}+</h3>
          <p>Practice questions</p>
        </div>
        <div style={styles.card}>
          <h3>{stats.topics}</h3>
          <p>Topics covered</p>
        </div>
        <div style={styles.card}>
          <h3>AI-Powered</h3>
          <p>Instant tutoring</p>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
        <div style={styles.card}>
          <h3>Practice</h3>
          <p>Master individual topics with guided practice across {stats.totalQuestions}+ questions.</p>
        </div>
        <div style={styles.card}>
          <h3>Full Test</h3>
          <p>Take a timed full-length SAT test from our question bank.</p>
        </div>
        <div style={styles.card}>
          <h3>Analytics</h3>
          <p>Track your progress and identify weak areas across all topics.</p>
        </div>
        <div style={styles.card}>
          <h3>Study Planner</h3>
          <p>Organize your SAT prep with a structured study schedule.</p>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// PRACTICE SCREEN
// ============================================================================
function PracticeScreen({ onAnswer }) {
  const [selectedTopic, setSelectedTopic] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [searchText, setSearchText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const questionsPerPage = 20;

  const topics = ['All', 'Heart of Algebra', 'Reading & Writing', 'Advanced Math', 'Problem Solving & Data'];
  const difficulties = ['All', 'Easy ≤10', 'Medium 15', 'Hard 20', 'Very Hard 25'];

  // Filter questions based on topic, difficulty, and search
  const filteredQuestions = useMemo(() => {
    return QUESTIONS.filter((q) => {
      const matchesTopic = selectedTopic === 'All' || q.topic === selectedTopic;
      const matchesDifficulty = selectedDifficulty === 'All' || q.points === parseInt(selectedDifficulty);
      const matchesSearch = searchText === '' || q.question.toLowerCase().includes(searchText.toLowerCase());
      return matchesTopic && matchesDifficulty && matchesSearch;
    });
  }, [selectedTopic, selectedDifficulty, searchText]);

  // Pagination
  const startIdx = (currentPage - 1) * questionsPerPage;
  const paginatedQuestions = filteredQuestions.slice(startIdx, startIdx + questionsPerPage);
  const totalPages = Math.ceil(filteredQuestions.length / questionsPerPage);

  return (
    <div style={styles.content}>
      <h1 style={{ fontFamily: '"Syne", sans-serif' }}>Practice</h1>

      {/* Search */}
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

      {/* Topic Filters */}
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
              backgroundColor: selectedTopic === topic ? '#00d4ff' : '#dddddd',
              color: selectedTopic === topic ? '#000000' : '#666666',
            }}
          >
            {topic}
          </button>
        ))}
      </div>

      {/* Difficulty Filters */}
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
              backgroundColor: selectedDifficulty === diff ? '#00d4ff' : '#dddddd',
              color: selectedDifficulty === diff ? '#000000' : '#666666',
            }}
          >
            {diff}
          </button>
        ))}
      </div>

      {/* Results count */}
      <p style={{ marginBottom: '1rem' }}>
        Showing {paginatedQuestions.length} of {filteredQuestions.length} questions
      </p>

      {/* Questions */}
      {paginatedQuestions.map((q) => (
        <div key={q.id} style={styles.questionCard}>
          <div style={{ marginBottom: '1rem' }}>
            <span style={{ fontWeight: 'bold', marginRight: '1rem' }}>{q.topic}</span>
            <span style={{ color: '#666666' }}>{q.subtopic}</span>
          </div>
          <p style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>{q.question}</p>
          {q.choices.map((choice, idx) => (
            <button
              key={idx}
              style={{
                ...styles.choiceButton,
                borderColor: idx === q.correct ? '#00d4ff' : '#cccccc',
                backgroundColor: idx === q.correct ? '#e0f7ff' : '#ffffff',
              }}
            >
              {String.fromCharCode(65 + idx)}) {choice}
            </button>
          ))}
          <details style={{ marginTop: '1rem' }}>
            <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>Show Explanation</summary>
            <p style={{ marginTop: '0.5rem' }}>{q.explanation}</p>
            <p style={{ color: '#d32f2f' }}>
              <strong>Common trap:</strong> {q.trap}
            </p>
          </details>
        </div>
      ))}

      {/* Pagination */}
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
    // Shuffle and pick 10 random questions for demo (real SAT is ~154 questions in 3 hours)
    const shuffled = [...QUESTIONS].sort(() => Math.random() - 0.5).slice(0, 10);
    setTestQuestions(shuffled);
    setTestStarted(true);
    setTimeRemaining(600); // 10 minutes for demo
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
        <p>Take a timed practice test to gauge your readiness.</p>
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
        <span style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
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
              borderColor: answers[q.id] === idx ? '#00d4ff' : '#cccccc',
              backgroundColor: answers[q.id] === idx ? '#e0f7ff' : '#ffffff',
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
            // Track all answers in analytics
            testQuestions.forEach((tq) => {
              if (answers[tq.id] !== undefined) {
                onAnswer(answers[tq.id] === tq.correct);
              }
            });
            alert(`Test completed! Score: ${correct}/${testQuestions.length}`);
          }}
          style={{ ...styles.button, backgroundColor: '#d32f2f', color: '#ffffff' }}
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
  const totalTopics = [...new Set(QUESTIONS.map(q => q.topic))].length;
  const accuracyRate = stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0;
  
  // Calculate topic breakdown
  const topicStats = {};
  QUESTIONS.forEach(q => {
    if (!topicStats[q.topic]) {
      topicStats[q.topic] = { correct: 0, total: 0 };
    }
  });

  return (
    <div style={styles.content}>
      <h1 style={{ fontFamily: '"Syne", sans-serif' }}>Analytics</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
        <div style={styles.card}>
          <h3>Total Questions Attempted</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>{stats.total}</p>
        </div>
        <div style={styles.card}>
          <h3>Accuracy Rate</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>{accuracyRate}%</p>
        </div>
        <div style={styles.card}>
          <h3>Questions Available</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>{QUESTIONS.length}</p>
        </div>
        <div style={styles.card}>
          <h3>Topics Available</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>{totalTopics}</p>
        </div>
      </div>
      <div style={{ marginTop: '2rem' }}>
        <h2 style={{ fontFamily: '"Syne", sans-serif' }}>Topic Breakdown</h2>
        {[...new Set(QUESTIONS.map(q => q.topic))].map(topic => {
          const topicQuestions = QUESTIONS.filter(q => q.topic === topic);
          return (
            <div key={topic} style={styles.card}>
              <h4>{topic}</h4>
              <p>{topicQuestions.length} questions available</p>
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
        <p>Set weekly study goals and track your progress toward test day.</p>
      </div>
    </div>
  );
}

// ============================================================================
// MAIN APP
// ============================================================================
export default function App() {
  const [user, setUser] = useState(null);
  const [currentScreen, setCurrentScreen] = useState('home');
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
        <div>SATforge</div>
        <div style={styles.nav}>
          <button
            onClick={() => setCurrentScreen('home')}
            style={{
              ...styles.navButton,
              ...(currentScreen === 'home' ? styles.navButtonActive : {}),
            }}
          >
            Home
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
          <button
            onClick={() => setUser(null)}
            style={{
              ...styles.navButton,
            }}
          >
            Logout
          </button>
        </div>
      </div>
      {currentScreen === 'home' && <HomeScreen user={user} />}
      {currentScreen === 'practice' && <PracticeScreen onAnswer={updateStats} />}
      {currentScreen === 'test' && <TestScreen onAnswer={updateStats} />}
      {currentScreen === 'analytics' && <AnalyticsScreen stats={stats} />}
      {currentScreen === 'planner' && <PlannerScreen />}
    </div>
  );
}
