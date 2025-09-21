import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { 
  Layout, 
  Typography, 
  Button, 
  Card, 
  Table, 
  Space, 
  Tag, 
  ConfigProvider,
  Input,
  Switch,
  Avatar,
  Tooltip,
  Empty,
  Spin
} from '@douyinfe/semi-ui';
import { 
  IconLink, 
  IconGithubLogo, 
  IconFile, 
  IconUpload, 
  IconCheckCircleStroked,
  IconSun, 
  IconMoon,
  IconSearch,
  IconCode,
  IconInfoCircle,
  IconBookStroked
} from '@douyinfe/semi-icons';
import PropTypes from 'prop-types';
import configData from './config.json';
import './App.css';

const { Content, Footer } = Layout;

// Import components
import AppHeader from './components/Header';
import ActionButtons from './components/ActionButtons';
import SearchBar from './components/SearchBar';
import ModelTable from './components/ModelTable';
import InfoCard from './components/InfoCard';

function App() {
  const [data, setData] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [searchText, setSearchText] = useState('');
  const contentRef = useRef(null);
  const leaderboardRef = useRef(null);
  const aboutRef = useRef(null);
  const citeRef = useRef(null);

  // Memoized values
  const sortedData = useMemo(() => {
    return [...configData.models].sort((a, b) => b.score - a.score);
  }, []);

  const citeBibtex = useMemo(() => 
    `@article{${configData.meta.title.toLowerCase().replace(/ /g, '-')}-${configData.meta.year},
  title={${configData.content.cite.bibtex.title}},
  author={${configData.content.cite.bibtex.author}},
  journal={${configData.content.cite.bibtex.journal}},
  year={${configData.meta.year}},
  url={${configData.links.code}}
}`, [configData]);

  // Effects
  useEffect(() => {
    document.body.setAttribute('theme-mode', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  useEffect(() => {
    setData(sortedData);
  }, [sortedData]);

  // Callbacks
  const handleThemeChange = useCallback((checked) => {
    setDarkMode(checked);
  }, []);

  const handleSearchChange = useCallback((value) => {
    setSearchText(value);
  }, []);

  const handleScrollTo = useCallback((ref) => {
    if (!ref || !ref.current) {
      console.warn('Scroll target ref is null or undefined');
      return;
    }

    try {
      // 使用setTimeout确保DOM已更新
      setTimeout(() => {
        const element = ref.current;
        if (!element) return;

        // 获取元素相对于文档的位置
        const elementRect = element.getBoundingClientRect();
        const absoluteElementTop = elementRect.top + window.pageYOffset;
        const headerOffset = 80; // 固定header高度 + 一些padding
        const scrollTop = absoluteElementTop - headerOffset;

        window.scrollTo({
          top: scrollTop,
          behavior: 'smooth'
        });
      }, 100);
    } catch (error) {
      console.error('Error scrolling to element:', error);
      // 最后的回退方案
      window.scrollTo(0, 0);
    }
  }, []);

  return (
    <ConfigProvider theme={darkMode ? { mode: 'dark' } : { mode: 'light' }}>
      <Layout className="app-layout">
        <AppHeader
          title={configData.meta.title}
          darkMode={darkMode}
          onThemeChange={handleThemeChange}
          onScrollTo={handleScrollTo}
          leaderboardRef={leaderboardRef}
          aboutRef={aboutRef}
          citeRef={citeRef}
        />

        <Content className="app-content" ref={contentRef}>
          <div className="content-wrapper">
            <div style={{ height: '80px' }}></div>
            
            <Card className="leaderboard-card" ref={leaderboardRef}>
              <div className="table-toolbar">
                <ActionButtons links={configData.links} />
                <SearchBar 
                  value={searchText}
                  onChange={handleSearchChange}
                />
              </div>
              <div className="table-container">
                <ModelTable
                  data={data}
                  searchText={searchText}
                />
              </div>
            </Card>

            <div style={{ marginTop: 48 }} ref={aboutRef}>
              <InfoCard
                type="about"
                content={{
                  ...configData.content.about,
                  title: `About ${configData.meta.title}`
                }}
                links={configData.links}
              />
            </div>

            <div style={{ marginTop: 24 }} ref={citeRef}>
              <InfoCard
                type="cite"
                content={{
                  ...configData.content.cite,
                  bibtex: citeBibtex
                }}
                links={configData.links}
              />
            </div>
          </div>
        </Content>

        <Footer className="app-footer" role="contentinfo">
          <Space vertical align="center">
            <Typography.Text type="secondary">
              {configData.content.footer.partners}
            </Typography.Text>
            <Typography.Text type="secondary">
              © {configData.meta.year} {configData.meta.title}. All rights reserved.
            </Typography.Text>
          </Space>
        </Footer>
      </Layout>
    </ConfigProvider>
  );
}

export default App;
