import React from 'react';
import { Card, Typography, Space, Button } from '@douyinfe/semi-ui';
import { IconInfoCircle, IconBookStroked } from '@douyinfe/semi-icons';
import PropTypes from 'prop-types';

const { Title, Paragraph } = Typography;

const InfoCard = React.memo(({ type, content, links }) => {
  const isAbout = type === 'about';
  const Icon = isAbout ? IconInfoCircle : IconBookStroked;
  const color = isAbout ? 'var(--semi-color-primary)' : 'var(--semi-color-success)';

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content.bibtex);
      // Could add toast notification here
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <Card className={`${type}-card`}>
      <Space align="start" style={{ width: '100%' }}>
        <Icon style={{ fontSize: 24, color, flexShrink: 0 }} />
        <div style={{ flex: 1 }}>
          <Title heading={3} style={{ marginBottom: 16 }}>
            {content.title}
          </Title>
          
          {isAbout ? (
            <>
              <Paragraph>{content.description}</Paragraph>
              <Paragraph>{content.coverage}</Paragraph>
              <Paragraph>
                <strong>{content.featuresTitle}</strong>
              </Paragraph>
              <ul style={{ marginLeft: 20, marginBottom: 16 }}>
                {content.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </>
          ) : (
            <>
              <Paragraph>{content.description}</Paragraph>
              <Card style={{ backgroundColor: 'var(--semi-color-fill-0)', marginBottom: 16 }}>
                <pre style={{ margin: 0, fontSize: 14, whiteSpace: 'pre-wrap' }}>
                  {content.bibtex}
                </pre>
              </Card>
              <Space>
                <Button 
                  type="primary" 
                  onClick={handleCopy}
                  aria-label="Copy citation to clipboard"
                >
                  {content.copyButton}
                </Button>
                <Button 
                  type="secondary" 
                  onClick={() => window.open(links.code, '_blank')}
                  aria-label="View GitHub repository"
                >
                  {content.githubButton}
                </Button>
              </Space>
            </>
          )}
        </div>
      </Space>
    </Card>
  );
});

InfoCard.displayName = 'InfoCard';
InfoCard.propTypes = {
  type: PropTypes.oneOf(['about', 'cite']).isRequired,
  content: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    coverage: PropTypes.string,
    featuresTitle: PropTypes.string,
    features: PropTypes.arrayOf(PropTypes.string),
    bibtex: PropTypes.string,
    copyButton: PropTypes.string,
    githubButton: PropTypes.string
  }).isRequired,
  links: PropTypes.shape({
    code: PropTypes.string
  }).isRequired
};

export default InfoCard;