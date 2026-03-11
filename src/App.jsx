import React, { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import QUESTIONS_DATA from './questions.json';

const QUESTIONS = QUESTIONS_DATA;

// SVG Icon Components
const BookIcon = ({ size = 24, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
  </svg>
);

const CheckCircleIcon = ({ size = 24, color = '#58CC02' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
    <polyline points="22 4 12 14.01 9 11.01"></polyline>
  </svg>
);

const TrendingUpIcon = ({ size = 24, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 17"></polyline>
    <polyline points="17 6 23 6 23 12"></polyline>
  </svg>
);

const ZapIcon = ({ size = 24, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
  </svg>
);

const SettingsIcon = ({ size = 24, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
    <circle cx="12" cy="12" r="3"></circle>
    <path d="M12 1v6m0 6v6"></path>
    <path d="M4.22 4.22l4.24 4.24m5.08 5.08l4.24 4.24"></path>
    <path d="M1 12h6m6 0h6"></path>
    <path d="M4.22 19.78l4.24-4.24m5.08-5.08l4.24-4.24"></path>
  </svg>
);

const LogOutIcon = ({ size = 24, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
    <polyline points="16 17 21 12 16 7"></polyline>
    <line x1="21" y1="12" x2="9" y2="12"></line>
  </svg>
);

const MoonIcon = ({ size = 24, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
  </svg>
);

const SunIcon = ({ size = 24, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
    <circle cx="12" cy="12" r="5"></circle>
    <line x1="12" y1="1" x2="12" y2="3"></line>
    <line x1="12" y1="21" x2="12" y2="23"></line>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
    <line x1="1" y1="12" x2="3" y2="12"></line>
    <line x1="21" y1="12" x2="23" y2="12"></line>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
  </svg>
);

const SearchIcon = ({ size = 24, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
    <circle cx="11" cy="11" r="8"></circle>
    <path d="m21 21-4.35-4.35"></path>
  </svg>
);

// Color Themes
const lightTheme = {
  bg: '#ffffff',
  bgSecondary: '#f8f9fa',
  bgTertiary: '#f0f2f5',
  text: '#1a1a1a',
  textSecondary: '#666666',
  textTertiary: '#999999',
  border: '#e0e0e0',
  primary: '#1CB0F6',
  primaryDark: '#0A8FD4',
  success: '#58CC02',
  danger: '#FF6B6B',
  overlay: 'rgba(0, 0, 0, 0.1)',
};

const darkTheme = {
  bg: '#0f0f1e',
  bgSecondary: '#1a1a2e',
  bgTertiary: '#252540',
  text: '#ffffff',
  textSecondary: '#e0e0e0',
  textTertiary: '#999999',
  border: '#333333',
  primary: '#1CB0F6',
  primaryDark: '#0A8FD4',
  success: '#58CC02',
  danger: '#FF6B6B',
  overlay: 'rgba(255, 255, 255, 0.1)',
};

const getTheme = (isDark) => isDark ? darkTheme : lightTheme;

// ============================================================================
// LOGIN SCREEN
// ============================================================================
function LoginScreen({ onLogin, isDark }) {
  const theme = getTheme(isDark);
  const [email, setEmail] = useState('demo@sat-down.com');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    if (email && password) {
      setLoading(true);
      setTimeout(() => {
        onLogin({ email });
        setLoading(false);
      }, 500);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleLogin();
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: theme.bg,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
    }}>
      <div style={{
        width: '100%',
        maxWidth: '420px',
      }}>
        {/* Logo */}
        <div style={{
          marginBottom: '2rem',
          textAlign: 'center',
        }}>
          <div style={{
            fontSize: '3.5rem',
            marginBottom: '1rem',
            fontWeight: '700',
            background: `linear-gradient(135deg, ${theme.primary}, ${theme.success})`,
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            letterSpacing: '-1px',
          }}>
            SAT-down
          </div>
          <p style={{
            color: theme.textSecondary,
            fontSize: '0.9rem',
            fontWeight: '600',
            letterSpacing: '2px',
            textTransform: 'uppercase',
            margin: '0.5rem 0 0 0',
          }}>
            Master the SAT
          </p>
        </div>

        {/* Form */}
        <div style={{
          backgroundColor: theme.bgSecondary,
          borderRadius: '12px',
          padding: '2rem',
          border: `1px solid ${theme.border}`,
        }}>
          <p style={{
            color: theme.textSecondary,
            textAlign: 'center',
            marginBottom: '1.5rem',
            fontSize: '0.95rem',
          }}>
            Welcome back! Continue your prep journey.
          </p>

          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyPress={handleKeyPress}
            style={{
              width: '100%',
              padding: '0.875rem 1rem',
              borderRadius: '8px',
              border: `2px solid ${theme.border}`,
              backgroundColor: theme.bg,
              color: theme.text,
              fontSize: '1rem',
              marginBottom: '1rem',
              fontFamily: 'inherit',
              boxSizing: 'border-box',
              transition: 'all 0.2s',
            }}
            onFocus={(e) => e.target.style.borderColor = theme.primary}
            onBlur={(e) => e.target.style.borderColor = theme.border}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyPress={handleKeyPress}
            style={{
              width: '100%',
              padding: '0.875rem 1rem',
              borderRadius: '8px',
              border: `2px solid ${theme.border}`,
              backgroundColor: theme.bg,
              color: theme.text,
              fontSize: '1rem',
              marginBottom: '1.5rem',
              fontFamily: 'inherit',
              boxSizing: 'border-box',
              transition: 'all 0.2s',
            }}
            onFocus={(e) => e.target.style.borderColor = theme.primary}
            onBlur={(e) => e.target.style.borderColor = theme.border}
          />

          <button
            onClick={handleLogin}
            disabled={loading || !email || !password}
            style={{
              width: '100%',
              padding: '0.95rem',
              borderRadius: '8px',
              border: 'none',
              backgroundColor: theme.primary,
              color: '#000000',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s',
              opacity: loading || !email || !password ? 0.6 : 1,
            }}
            onHover={(e) => !loading && (e.target.style.backgroundColor = theme.primaryDark)}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>

          <p style={{
            textAlign: 'center',
            color: theme.textTertiary,
            fontSize: '0.85rem',
            marginTop: '1rem',
          }}>
            Demo mode: any password works
          </p>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// HEADER COMPONENT
// ============================================================================
function Header({ currentScreen, onScreenChange, user, isDark, onThemeToggle, onLogout }) {
  const theme = getTheme(isDark);
  const [hoveredNav, setHoveredNav] = useState(null);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BookIcon },
    { id: 'practice', label: 'Practice', icon: BookIcon },
    { id: 'test', label: 'Test', icon: CheckCircleIcon },
    { id: 'analytics', label: 'Analytics', icon: TrendingUpIcon },
  ];

  return (
    <div style={{
      backgroundColor: theme.bgSecondary,
      borderBottom: `1px solid ${theme.border}`,
      padding: '1rem 2rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      position: 'sticky',
      top: 0,
      zIndex: 100,
    }}>
      {/* Logo */}
      <div style={{
        fontSize: '1.5rem',
        fontWeight: '700',
        color: theme.primary,
        letterSpacing: '-0.5px',
        cursor: 'pointer',
      }}>
        SAT-down
      </div>

      {/* Navigation */}
      <div style={{
        display: 'flex',
        gap: '2rem',
        alignItems: 'center',
      }}>
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onScreenChange(item.id)}
            onMouseEnter={() => setHoveredNav(item.id)}
            onMouseLeave={() => setHoveredNav(null)}
            style={{
              backgroundColor: 'transparent',
              border: 'none',
              color: currentScreen === item.id ? theme.primary : theme.textSecondary,
              fontSize: '0.95rem',
              fontWeight: currentScreen === item.id ? '600' : '500',
              cursor: 'pointer',
              padding: '0.5rem 0',
              borderBottom: currentScreen === item.id ? `2px solid ${theme.primary}` : '2px solid transparent',
              transition: 'all 0.2s',
            }}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Right Actions */}
      <div style={{
        display: 'flex',
        gap: '1rem',
        alignItems: 'center',
      }}>
        <button
          onClick={onThemeToggle}
          style={{
            backgroundColor: 'transparent',
            border: 'none',
            color: theme.text,
            cursor: 'pointer',
            padding: '0.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          title={isDark ? 'Light mode' : 'Dark mode'}
        >
          {isDark ? (
            <SunIcon size={20} color={theme.primary} />
          ) : (
            <MoonIcon size={20} color={theme.primary} />
          )}
        </button>

        <button
          onClick={onLogout}
          style={{
            backgroundColor: 'transparent',
            border: `1px solid ${theme.border}`,
            color: theme.text,
            padding: '0.5rem 1rem',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '0.9rem',
            fontWeight: '500',
            transition: 'all 0.2s',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = theme.bgTertiary;
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = 'transparent';
          }}
        >
          <LogOutIcon size={16} />
          Logout
        </button>
      </div>
    </div>
  );
}

// ============================================================================
// DASHBOARD SCREEN
// ============================================================================
function DashboardScreen({ user, onNavigate, isDark }) {
  const theme = getTheme(isDark);
  const [hoveredCard, setHoveredCard] = useState(null);

  const cards = [
    {
      id: 'practice',
      icon: BookIcon,
      title: 'Start Practice',
      subtitle: 'Master topics with adaptive questions',
      screen: 'practice',
      accent: theme.primary,
    },
    {
      id: 'test',
      icon: CheckCircleIcon,
      title: 'Full-Length Test',
      subtitle: 'Take a timed practice simulation',
      screen: 'test',
      accent: theme.success,
    },
    {
      id: 'streak',
      icon: ZapIcon,
      title: 'Your Streak',
      subtitle: '0 days · Keep learning daily',
      screen: null,
      accent: '#FFA500',
    },
    {
      id: 'score',
      icon: TrendingUpIcon,
      title: 'Score Prediction',
      subtitle: 'Complete a test to see your score',
      screen: 'analytics',
      accent: theme.success,
    },
  ];

  return (
    <div style={{
      backgroundColor: theme.bg,
      minHeight: 'calc(100vh - 70px)',
      padding: '2rem',
    }}>
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
      }}>
        {/* Welcome Section */}
        <div style={{
          marginBottom: '3rem',
        }}>
          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: '700',
            color: theme.text,
            margin: '0 0 0.5rem 0',
            letterSpacing: '-0.5px',
          }}>
            Welcome, {user.email.split('@')[0]}! 👋
          </h1>
          <p style={{
            color: theme.textSecondary,
            fontSize: '1.05rem',
            margin: 0,
          }}>
            Ready to master the SAT? Let's get started.
          </p>
        </div>

        {/* Cards Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.5rem',
          marginBottom: '3rem',
        }}>
          {cards.map((card) => (
            <div
              key={card.id}
              onClick={() => card.screen && onNavigate(card.screen)}
              onMouseEnter={() => setHoveredCard(card.id)}
              onMouseLeave={() => setHoveredCard(null)}
              style={{
                backgroundColor: theme.bgSecondary,
                border: `2px solid ${hoveredCard === card.id ? card.accent : theme.border}`,
                borderRadius: '12px',
                padding: '1.5rem',
                cursor: card.screen ? 'pointer' : 'default',
                transition: 'all 0.3s',
                transform: hoveredCard === card.id ? 'translateY(-4px)' : 'translateY(0)',
                boxShadow: hoveredCard === card.id ? `0 8px 24px ${theme.overlay}` : 'none',
              }}
            >
              <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '1rem',
                marginBottom: '1rem',
              }}>
                <div style={{
                  color: card.accent,
                  flex: '0 0 auto',
                }}>
                  <card.icon size={28} color={card.accent} />
                </div>
                <div style={{ flex: 1 }}>
                  <h3 style={{
                    fontSize: '1.2rem',
                    fontWeight: '600',
                    color: theme.text,
                    margin: '0 0 0.25rem 0',
                  }}>
                    {card.title}
                  </h3>
                  <p style={{
                    color: theme.textSecondary,
                    fontSize: '0.9rem',
                    margin: 0,
                  }}>
                    {card.subtitle}
                  </p>
                </div>
              </div>
              {card.screen && (
                <div style={{
                  marginTop: '1rem',
                  paddingTop: '1rem',
                  borderTop: `1px solid ${theme.border}`,
                  fontSize: '0.85rem',
                  color: theme.textTertiary,
                }}>
                  Click to get started →
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Quick Stats */}
        <div style={{
          backgroundColor: theme.bgSecondary,
          border: `1px solid ${theme.border}`,
          borderRadius: '12px',
          padding: '2rem',
        }}>
          <h2 style={{
            fontSize: '1.3rem',
            fontWeight: '600',
            color: theme.text,
            margin: '0 0 1.5rem 0',
          }}>
            Your Progress
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
            gap: '2rem',
          }}>
            <div>
              <div style={{
                fontSize: '2rem',
                fontWeight: '700',
                color: theme.primary,
                marginBottom: '0.5rem',
              }}>
                0
              </div>
              <div style={{
                color: theme.textSecondary,
                fontSize: '0.9rem',
              }}>
                Questions Solved
              </div>
            </div>
            <div>
              <div style={{
                fontSize: '2rem',
                fontWeight: '700',
                color: theme.success,
                marginBottom: '0.5rem',
              }}>
                0%
              </div>
              <div style={{
                color: theme.textSecondary,
                fontSize: '0.9rem',
              }}>
                Accuracy Rate
              </div>
            </div>
            <div>
              <div style={{
                fontSize: '2rem',
                fontWeight: '700',
                color: '#FFA500',
                marginBottom: '0.5rem',
              }}>
                0
              </div>
              <div style={{
                color: theme.textSecondary,
                fontSize: '0.9rem',
              }}>
                Day Streak
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// PRACTICE SCREEN
// ============================================================================
function PracticeScreen({ isDark }) {
  const theme = getTheme(isDark);
  const [selectedTopic, setSelectedTopic] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [searchText, setSearchText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const questionsPerPage = 10;

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
    <div style={{
      backgroundColor: theme.bg,
      minHeight: 'calc(100vh - 70px)',
      padding: '2rem',
    }}>
      <div style={{
        maxWidth: '1000px',
        margin: '0 auto',
      }}>
        {/* Header */}
        <div style={{
          marginBottom: '2rem',
        }}>
          <h1 style={{
            fontSize: '2rem',
            fontWeight: '700',
            color: theme.text,
            margin: '0 0 0.5rem 0',
          }}>
            Practice Questions
          </h1>
          <p style={{
            color: theme.textSecondary,
            margin: 0,
          }}>
            Found {filteredQuestions.length} question{filteredQuestions.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Search */}
        <div style={{
          position: 'relative',
          marginBottom: '2rem',
        }}>
          <SearchIcon size={20} color={theme.textTertiary} style={{
            position: 'absolute',
            left: '1rem',
            top: '50%',
            transform: 'translateY(-50%)',
            pointerEvents: 'none',
          }} />
          <input
            type="text"
            placeholder="Search questions..."
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
              setCurrentPage(1);
            }}
            style={{
              width: '100%',
              padding: '0.875rem 1rem 0.875rem 3rem',
              borderRadius: '8px',
              border: `2px solid ${theme.border}`,
              backgroundColor: theme.bgSecondary,
              color: theme.text,
              fontSize: '1rem',
              fontFamily: 'inherit',
              boxSizing: 'border-box',
              transition: 'all 0.2s',
            }}
            onFocus={(e) => e.target.style.borderColor = theme.primary}
            onBlur={(e) => e.target.style.borderColor = theme.border}
          />
        </div>

        {/* Filters */}
        <div style={{
          marginBottom: '2rem',
        }}>
          <div style={{
            marginBottom: '1rem',
          }}>
            <label style={{
              display: 'block',
              fontSize: '0.9rem',
              fontWeight: '600',
              color: theme.text,
              marginBottom: '0.75rem',
            }}>
              Topic
            </label>
            <div style={{
              display: 'flex',
              gap: '0.75rem',
              flexWrap: 'wrap',
            }}>
              {topics.map((topic) => (
                <button
                  key={topic}
                  onClick={() => {
                    setSelectedTopic(topic);
                    setCurrentPage(1);
                  }}
                  style={{
                    padding: '0.625rem 1rem',
                    borderRadius: '6px',
                    border: `2px solid ${selectedTopic === topic ? theme.primary : theme.border}`,
                    backgroundColor: selectedTopic === topic ? theme.primary : 'transparent',
                    color: selectedTopic === topic ? '#000000' : theme.text,
                    fontSize: '0.9rem',
                    fontWeight: '500',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    fontFamily: 'inherit',
                  }}
                >
                  {topic}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label style={{
              display: 'block',
              fontSize: '0.9rem',
              fontWeight: '600',
              color: theme.text,
              marginBottom: '0.75rem',
            }}>
              Difficulty
            </label>
            <div style={{
              display: 'flex',
              gap: '0.75rem',
              flexWrap: 'wrap',
            }}>
              {difficulties.map((diff) => (
                <button
                  key={diff}
                  onClick={() => {
                    setSelectedDifficulty(diff);
                    setCurrentPage(1);
                  }}
                  style={{
                    padding: '0.625rem 1rem',
                    borderRadius: '6px',
                    border: `2px solid ${selectedDifficulty === diff ? theme.primary : theme.border}`,
                    backgroundColor: selectedDifficulty === diff ? theme.primary : 'transparent',
                    color: selectedDifficulty === diff ? '#000000' : theme.text,
                    fontSize: '0.9rem',
                    fontWeight: '500',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    fontFamily: 'inherit',
                  }}
                >
                  {diff}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Questions */}
        {paginatedQuestions.map((q, idx) => (
          <div
            key={q.id}
            style={{
              backgroundColor: theme.bgSecondary,
              border: `1px solid ${theme.border}`,
              borderRadius: '8px',
              padding: '1.5rem',
              marginBottom: '1.5rem',
            }}
          >
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'start',
              marginBottom: '1rem',
            }}>
              <div>
                <span style={{
                  display: 'inline-block',
                  backgroundColor: theme.primary,
                  color: '#000000',
                  padding: '0.25rem 0.75rem',
                  borderRadius: '4px',
                  fontSize: '0.75rem',
                  fontWeight: '600',
                  marginRight: '0.75rem',
                }}>
                  {q.topic}
                </span>
                <span style={{
                  color: theme.textTertiary,
                  fontSize: '0.85rem',
                }}>
                  {q.subtopic}
                </span>
              </div>
              <span style={{
                color: theme.textSecondary,
                fontSize: '0.9rem',
                fontWeight: '500',
              }}>
                {q.points} pts
              </span>
            </div>

            <p style={{
              fontSize: '1.05rem',
              color: theme.text,
              marginBottom: '1.5rem',
              lineHeight: '1.6',
            }}>
              {q.question}
            </p>

            <div style={{
              display: 'grid',
              gap: '0.75rem',
              marginBottom: '1rem',
            }}>
              {q.choices.map((choice, choiceIdx) => (
                <button
                  key={choiceIdx}
                  style={{
                    padding: '0.875rem 1rem',
                    borderRadius: '6px',
                    border: `2px solid ${theme.border}`,
                    backgroundColor: theme.bg,
                    color: theme.text,
                    fontSize: '0.95rem',
                    textAlign: 'left',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    fontFamily: 'inherit',
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.borderColor = theme.primary;
                    e.target.style.backgroundColor = theme.bgSecondary;
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.borderColor = theme.border;
                    e.target.style.backgroundColor = theme.bg;
                  }}
                >
                  <strong>{String.fromCharCode(65 + choiceIdx)})</strong> {choice}
                </button>
              ))}
            </div>

            <details style={{
              marginTop: '1rem',
            }}>
              <summary style={{
                cursor: 'pointer',
                fontWeight: '600',
                color: theme.primary,
                padding: '0.75rem',
                marginLeft: '-0.75rem',
              }}>
                Show Explanation
              </summary>
              <div style={{
                marginTop: '1rem',
                paddingTop: '1rem',
                borderTop: `1px solid ${theme.border}`,
                color: theme.textSecondary,
              }}>
                <p style={{ marginTop: 0 }}>{q.explanation}</p>
                <p style={{
                  color: theme.danger,
                  fontWeight: '500',
                  marginBottom: 0,
                }}>
                  ⚠️ Common trap: {q.trap}
                </p>
              </div>
            </details>
          </div>
        ))}

        {/* Pagination */}
        {totalPages > 1 && (
          <div style={{
            display: 'flex',
            gap: '1rem',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '2rem',
          }}>
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              style={{
                padding: '0.75rem 1.5rem',
                borderRadius: '6px',
                border: `2px solid ${theme.border}`,
                backgroundColor: 'transparent',
                color: theme.text,
                fontSize: '0.9rem',
                fontWeight: '600',
                cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                opacity: currentPage === 1 ? 0.5 : 1,
                transition: 'all 0.2s',
                fontFamily: 'inherit',
              }}
            >
              ← Previous
            </button>
            <span style={{
              color: theme.textSecondary,
              fontWeight: '600',
            }}>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              style={{
                padding: '0.75rem 1.5rem',
                borderRadius: '6px',
                border: `2px solid ${theme.border}`,
                backgroundColor: 'transparent',
                color: theme.text,
                fontSize: '0.9rem',
                fontWeight: '600',
                cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                opacity: currentPage === totalPages ? 0.5 : 1,
                transition: 'all 0.2s',
                fontFamily: 'inherit',
              }}
            >
              Next →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================================================
// TEST SCREEN
// ============================================================================
function TestScreen({ isDark }) {
  const theme = getTheme(isDark);
  const [testStarted, setTestStarted] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(null);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [answers, setAnswers] = useState({});
  const [testQuestions, setTestQuestions] = useState([]);

  const startTest = () => {
    const shuffled = [...QUESTIONS].sort(() => Math.random() - 0.5).slice(0, 5);
    setTestQuestions(shuffled);
    setTestStarted(true);
    setTimeRemaining(300);
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
      <div style={{
        backgroundColor: theme.bg,
        minHeight: 'calc(100vh - 70px)',
        padding: '2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <div style={{
          maxWidth: '500px',
          textAlign: 'center',
        }}>
          <div style={{
            fontSize: '3rem',
            marginBottom: '1.5rem',
            color: theme.primary,
          }}>
            ⚡
          </div>
          <h1 style={{
            fontSize: '2rem',
            fontWeight: '700',
            color: theme.text,
            marginBottom: '1rem',
          }}>
            Ready for a Test?
          </h1>
          <p style={{
            color: theme.textSecondary,
            fontSize: '1.05rem',
            marginBottom: '2rem',
            lineHeight: '1.6',
          }}>
            Take a timed practice test to see how well you perform under pressure. Perfect for gauge your readiness.
          </p>
          <button
            onClick={startTest}
            style={{
              padding: '1rem 2rem',
              borderRadius: '8px',
              border: 'none',
              backgroundColor: theme.primary,
              color: '#000000',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s',
              fontFamily: 'inherit',
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = theme.primaryDark}
            onMouseLeave={(e) => e.target.style.backgroundColor = theme.primary}
          >
            Start Test Now
          </button>
        </div>
      </div>
    );
  }

  const q = testQuestions[currentQuestionIdx];
  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;

  return (
    <div style={{
      backgroundColor: theme.bg,
      minHeight: 'calc(100vh - 70px)',
      padding: '2rem',
    }}>
      <div style={{
        maxWidth: '900px',
        margin: '0 auto',
      }}>
        {/* Progress Bar */}
        <div style={{
          marginBottom: '2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <div>
            <div style={{
              fontSize: '0.9rem',
              color: theme.textSecondary,
              marginBottom: '0.5rem',
            }}>
              Question {currentQuestionIdx + 1} of {testQuestions.length}
            </div>
            <div style={{
              width: '300px',
              height: '6px',
              backgroundColor: theme.bgSecondary,
              borderRadius: '3px',
              overflow: 'hidden',
            }}>
              <div style={{
                width: `${((currentQuestionIdx + 1) / testQuestions.length) * 100}%`,
                height: '100%',
                backgroundColor: theme.primary,
                transition: 'width 0.3s',
              }} />
            </div>
          </div>
          <div style={{
            fontSize: '1.5rem',
            fontWeight: '700',
            color: timeRemaining < 60 ? theme.danger : theme.primary,
          }}>
            {minutes}:{seconds < 10 ? '0' : ''}{seconds}
          </div>
        </div>

        {/* Question */}
        <div style={{
          backgroundColor: theme.bgSecondary,
          border: `1px solid ${theme.border}`,
          borderRadius: '8px',
          padding: '2rem',
          marginBottom: '2rem',
        }}>
          <p style={{
            fontSize: '1.2rem',
            color: theme.text,
            marginBottom: '1.5rem',
            lineHeight: '1.7',
          }}>
            {q.question}
          </p>

          <div style={{
            display: 'grid',
            gap: '1rem',
          }}>
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
                  padding: '1rem',
                  borderRadius: '6px',
                  border: `2px solid ${answers[q.id] === idx ? theme.primary : theme.border}`,
                  backgroundColor: answers[q.id] === idx ? theme.primary : theme.bg,
                  color: answers[q.id] === idx ? '#000000' : theme.text,
                  fontSize: '1rem',
                  textAlign: 'left',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  fontFamily: 'inherit',
                  fontWeight: '500',
                }}
                onMouseEnter={(e) => {
                  if (answers[q.id] !== idx) {
                    e.target.style.backgroundColor = theme.bgTertiary;
                    e.target.style.borderColor = theme.primary;
                  }
                }}
                onMouseLeave={(e) => {
                  if (answers[q.id] !== idx) {
                    e.target.style.backgroundColor = theme.bg;
                    e.target.style.borderColor = theme.border;
                  }
                }}
              >
                <strong>{String.fromCharCode(65 + idx)}.</strong> {choice}
              </button>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div style={{
          display: 'flex',
          gap: '1rem',
          justifyContent: 'space-between',
        }}>
          <button
            onClick={() => setCurrentQuestionIdx(Math.max(0, currentQuestionIdx - 1))}
            disabled={currentQuestionIdx === 0}
            style={{
              padding: '0.875rem 1.5rem',
              borderRadius: '6px',
              border: `2px solid ${theme.border}`,
              backgroundColor: 'transparent',
              color: theme.text,
              fontSize: '0.95rem',
              fontWeight: '600',
              cursor: currentQuestionIdx === 0 ? 'not-allowed' : 'pointer',
              opacity: currentQuestionIdx === 0 ? 0.5 : 1,
              transition: 'all 0.2s',
              fontFamily: 'inherit',
            }}
          >
            ← Back
          </button>

          {currentQuestionIdx === testQuestions.length - 1 ? (
            <button
              onClick={() => {
                setTestStarted(false);
                const correct = testQuestions.filter(
                  (tq) => answers[tq.id] === tq.correct
                ).length;
                alert(`Test completed! Score: ${correct}/${testQuestions.length}`);
              }}
              style={{
                padding: '0.875rem 2rem',
                borderRadius: '6px',
                border: 'none',
                backgroundColor: theme.success,
                color: '#000000',
                fontSize: '0.95rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s',
                fontFamily: 'inherit',
              }}
              onMouseEnter={(e) => e.target.style.opacity = 0.8}
              onMouseLeave={(e) => e.target.style.opacity = 1}
            >
              ✓ Finish Test
            </button>
          ) : (
            <button
              onClick={() => setCurrentQuestionIdx(Math.min(testQuestions.length - 1, currentQuestionIdx + 1))}
              style={{
                padding: '0.875rem 1.5rem',
                borderRadius: '6px',
                border: 'none',
                backgroundColor: theme.primary,
                color: '#000000',
                fontSize: '0.95rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s',
                fontFamily: 'inherit',
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = theme.primaryDark}
              onMouseLeave={(e) => e.target.style.backgroundColor = theme.primary}
            >
              Next →
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// ANALYTICS SCREEN
// ============================================================================
function AnalyticsScreen({ isDark }) {
  const theme = getTheme(isDark);

  return (
    <div style={{
      backgroundColor: theme.bg,
      minHeight: 'calc(100vh - 70px)',
      padding: '2rem',
    }}>
      <div style={{
        maxWidth: '1000px',
        margin: '0 auto',
      }}>
        <h1 style={{
          fontSize: '2rem',
          fontWeight: '700',
          color: theme.text,
          marginBottom: '2rem',
        }}>
          Analytics
        </h1>

        {/* Stats Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '1.5rem',
          marginBottom: '2rem',
        }}>
          {[
            { label: 'Questions Solved', value: '0', icon: BookIcon, color: theme.primary },
            { label: 'Accuracy Rate', value: '0%', icon: CheckCircleIcon, color: theme.success },
            { label: 'Streak', value: '0', icon: ZapIcon, color: '#FFA500' },
            { label: 'Time Invested', value: '0h', icon: TrendingUpIcon, color: theme.primary },
          ].map((stat, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: theme.bgSecondary,
                border: `1px solid ${theme.border}`,
                borderRadius: '8px',
                padding: '1.5rem',
              }}
            >
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'start',
                marginBottom: '1rem',
              }}>
                <div>
                  <p style={{
                    fontSize: '0.9rem',
                    color: theme.textSecondary,
                    margin: '0 0 0.5rem 0',
                  }}>
                    {stat.label}
                  </p>
                  <div style={{
                    fontSize: '2rem',
                    fontWeight: '700',
                    color: stat.color,
                  }}>
                    {stat.value}
                  </div>
                </div>
                <div style={{ color: stat.color }}>
                  <stat.icon size={24} color={stat.color} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Topics Breakdown */}
        <div style={{
          backgroundColor: theme.bgSecondary,
          border: `1px solid ${theme.border}`,
          borderRadius: '8px',
          padding: '2rem',
        }}>
          <h2 style={{
            fontSize: '1.2rem',
            fontWeight: '600',
            color: theme.text,
            marginBottom: '1.5rem',
          }}>
            Topics Breakdown
          </h2>
          <div style={{
            display: 'grid',
            gap: '1rem',
          }}>
            {['Heart of Algebra', 'Reading & Writing', 'Advanced Math', 'Problem Solving & Data'].map((topic) => (
              <div
                key={topic}
                style={{
                  padding: '1.25rem',
                  backgroundColor: theme.bg,
                  borderRadius: '6px',
                  border: `1px solid ${theme.border}`,
                }}
              >
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '0.75rem',
                }}>
                  <span style={{ fontWeight: '600', color: theme.text }}>{topic}</span>
                  <span style={{ color: theme.textSecondary }}>0/0 correct</span>
                </div>
                <div style={{
                  width: '100%',
                  height: '6px',
                  backgroundColor: theme.bgSecondary,
                  borderRadius: '3px',
                  overflow: 'hidden',
                }}>
                  <div style={{
                    width: '0%',
                    height: '100%',
                    backgroundColor: theme.primary,
                  }} />
                </div>
              </div>
            ))}
          </div>
        </div>
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
  const [isDark, setIsDark] = useState(true);

  if (!user) {
    return <LoginScreen onLogin={setUser} isDark={isDark} />;
  }

  return (
    <div style={{
      backgroundColor: getTheme(isDark).bg,
      color: getTheme(isDark).text,
      minHeight: '100vh',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
      transition: 'background-color 0.3s, color 0.3s',
    }}>
      <Header
        currentScreen={currentScreen}
        onScreenChange={setCurrentScreen}
        user={user}
        isDark={isDark}
        onThemeToggle={() => setIsDark(!isDark)}
        onLogout={() => setUser(null)}
      />
      {currentScreen === 'dashboard' && <DashboardScreen user={user} onNavigate={setCurrentScreen} isDark={isDark} />}
      {currentScreen === 'practice' && <PracticeScreen isDark={isDark} />}
      {currentScreen === 'test' && <TestScreen isDark={isDark} />}
      {currentScreen === 'analytics' && <AnalyticsScreen isDark={isDark} />}
    </div>
  );
}
