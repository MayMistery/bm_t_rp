import React from 'react';
import { Button, Space } from '@douyinfe/semi-ui';
import { IconLink, IconGithubLogo, IconFile, IconUpload } from '@douyinfe/semi-icons';
import PropTypes from 'prop-types';

const ActionButtons = React.memo(({ links }) => {
  const handleOpenLink = (url) => {
    if (url) window.open(url, '_blank', 'noopener,noreferrer');
  };

  const buttons = [
    { icon: IconLink, label: 'Paper', url: links.paper, type: 'primary' },
    { icon: IconGithubLogo, label: 'Code', url: links.code, type: 'secondary' },
    { icon: IconFile, label: 'Data', url: links.data, type: 'secondary' },
    { icon: IconUpload, label: 'Submit', url: links.submit, type: 'secondary' }
  ];

  return (
    <Space>
      {buttons.map(({ icon: Icon, label, url, type }) => (
        <Button
          key={label}
          type={type}
          icon={<Icon />}
          onClick={() => handleOpenLink(url)}
          disabled={!url}
          aria-label={`Open ${label}`}
        >
          {label}
        </Button>
      ))}
    </Space>
  );
});

ActionButtons.displayName = 'ActionButtons';
ActionButtons.propTypes = {
  links: PropTypes.shape({
    paper: PropTypes.string,
    code: PropTypes.string,
    data: PropTypes.string,
    submit: PropTypes.string
  }).isRequired
};

export default ActionButtons;