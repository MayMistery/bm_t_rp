import React from 'react';
import { Layout, Typography, Space, Switch, Button } from '@douyinfe/semi-ui';
import { IconSun, IconMoon } from '@douyinfe/semi-icons';
import PropTypes from 'prop-types';

const { Header } = Layout;
const { Title } = Typography;

const AppHeader = React.memo(({ 
  title, 
  darkMode, 
  onThemeChange, 
  onScrollTo, 
  leaderboardRef, 
  aboutRef, 
  citeRef 
}) => (
  <Header 
    className="app-header visible"
    role="banner"
    aria-label="Main navigation"
  >
    <div className="header-content">
      <div className="logo-section">
        <Title 
          heading={1} 
          style={{ 
            color: 'white', 
            margin: 0, 
            fontWeight: 800,
            fontSize: '1.8rem',
            letterSpacing: '-0.03em',
            textShadow: '0 2px 4px rgba(0,0,0,0.3)',
            background: 'linear-gradient(45deg, #ffffff, #f0f8ff)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}
          aria-label={title}
        >
          {title}
        </Title>
      </div>
      <Space className="nav-links" size="large">
        <Button 
          type="primary"
          theme="solid"
          size="large"
          onClick={() => onScrollTo(leaderboardRef)}
          style={{ 
            fontWeight: 700,
            borderRadius: '10px',
            padding: '10px 24px',
            fontSize: '1rem',
            boxShadow: '0 4px 12px rgba(255,255,255,0.2)',
            background: 'linear-gradient(135deg, #ffffff, #f0f8ff)',
            color: '#667eea',
            border: 'none',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'translateY(-2px)';
            e.target.style.boxShadow = '0 6px 16px rgba(255,255,255,0.3)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = '0 4px 12px rgba(255,255,255,0.2)';
          }}
        >
          Leaderboard
        </Button>
        <Button 
          type="tertiary"
          theme="borderless"
          size="large"
          onClick={() => onScrollTo(aboutRef)}
          style={{ 
            color: 'white',
            fontWeight: 600,
            borderRadius: '10px',
            padding: '10px 24px',
            fontSize: '1rem',
            border: '2px solid rgba(255,255,255,0.4)',
            backgroundColor: 'rgba(255,255,255,0.1)',
            backdropFilter: 'blur(10px)',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = 'rgba(255,255,255,0.2)';
            e.target.style.borderColor = 'rgba(255,255,255,0.6)';
            e.target.style.transform = 'translateY(-1px)';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = 'rgba(255,255,255,0.1)';
            e.target.style.borderColor = 'rgba(255,255,255,0.4)';
            e.target.style.transform = 'translateY(0)';
          }}
        >
          About
        </Button>
        <Button 
          type="tertiary"
          theme="borderless"
          size="large"
          onClick={() => onScrollTo(citeRef)}
          style={{ 
            color: 'white',
            fontWeight: 600,
            borderRadius: '10px',
            padding: '10px 24px',
            fontSize: '1rem',
            border: '2px solid rgba(255,255,255,0.4)',
            backgroundColor: 'rgba(255,255,255,0.1)',
            backdropFilter: 'blur(10px)',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = 'rgba(255,255,255,0.2)';
            e.target.style.borderColor = 'rgba(255,255,255,0.6)';
            e.target.style.transform = 'translateY(-1px)';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = 'rgba(255,255,255,0.1)';
            e.target.style.borderColor = 'rgba(255,255,255,0.4)';
            e.target.style.transform = 'translateY(0)';
          }}
        >
          Cite
        </Button>
        <Switch 
          checked={darkMode}
          onChange={onThemeChange}
          checkedText={<IconMoon aria-label="Dark mode" />} 
          uncheckedText={<IconSun aria-label="Light mode" />}
          aria-label="Toggle dark mode"
          size="large"
          style={{ 
            transform: 'scale(1.1)'
          }}
        />
      </Space>
    </div>
  </Header>
));

AppHeader.displayName = 'AppHeader';
AppHeader.propTypes = {
  title: PropTypes.string.isRequired,
  darkMode: PropTypes.bool.isRequired,
  onThemeChange: PropTypes.func.isRequired,
  onScrollTo: PropTypes.func.isRequired,
  leaderboardRef: PropTypes.object.isRequired,
  aboutRef: PropTypes.object.isRequired,
  citeRef: PropTypes.object.isRequired
};

export default AppHeader;