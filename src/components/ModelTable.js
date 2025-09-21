import React, { useMemo } from 'react';
import { Table, Space, Avatar, Typography, Tag, Button, Tooltip, Empty, Spin } from '@douyinfe/semi-ui';
import { IconLink, IconFile, IconCode, IconCheckCircleStroked, IconSearch } from '@douyinfe/semi-icons';
import PropTypes from 'prop-types';

const { Text } = Typography;

const MedalAvatar = React.memo(({ rank }) => {
  if (rank === 1) return <Avatar className="medal-gold" size="medium" aria-label="Gold medal">🥇</Avatar>;
  if (rank === 2) return <Avatar className="medal-silver" size="medium" aria-label="Silver medal">🥈</Avatar>;
  if (rank === 3) return <Avatar className="medal-bronze" size="medium" aria-label="Bronze medal">🥉</Avatar>;
  return <Text strong className="rank-text" aria-label={`Rank ${rank}`}>{rank}</Text>;
});

MedalAvatar.displayName = 'MedalAvatar';
MedalAvatar.propTypes = {
  rank: PropTypes.number.isRequired
};

const ModelCell = React.memo(({ model, verified, openSource }) => (
  <Space align="center" style={{ width: '100%' }}>
    <Text strong style={{ 
      flex: 1, 
      overflow: 'hidden', 
      textOverflow: 'ellipsis', 
      whiteSpace: 'nowrap' 
    }}>
      {model}
    </Text>
    {verified && <IconCheckCircleStroked style={{ color: 'var(--semi-color-success)' }} aria-label="Verified" />}
    {openSource && <Tag color="light-green" size="small">Open</Tag>}
  </Space>
));

ModelCell.displayName = 'ModelCell';
ModelCell.propTypes = {
  model: PropTypes.string.isRequired,
  verified: PropTypes.bool,
  openSource: PropTypes.bool
};

const ActionButton = React.memo(({ url, icon: Icon, label, disabled }) => (
  <Tooltip content={label} position="top">
    <span style={{ display: 'inline-block' }}>
      <Button 
        icon={<Icon />} 
        size="small" 
        type="tertiary" 
        disabled={disabled}
        onClick={() => url && window.open(url, '_blank')}
        aria-label={label}
      />
    </span>
  </Tooltip>
));

ActionButton.displayName = 'ActionButton';
ActionButton.propTypes = {
  url: PropTypes.string,
  icon: PropTypes.elementType.isRequired,
  label: PropTypes.string.isRequired,
  disabled: PropTypes.bool
};

const ModelTable = React.memo(({ data, loading, searchText }) => {
  const filteredData = useMemo(() => {
    if (!searchText) return data;
    
    return data.filter(item => 
      item.object_name.toLowerCase().includes(searchText.toLowerCase()) ||
      item.organization.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [data, searchText]);

  const columns = useMemo(() => [
    {
      title: '#',
      dataIndex: 'rank',
      key: 'rank',
      width: 80,
      align: 'center',
      render: (text, record, index) => <MedalAvatar rank={index + 1} />
    },
    {
      title: 'Model',
      dataIndex: 'object_name',
      key: 'model',
      width: 280,
      render: (text, record) => (
        <ModelCell 
          model={record.object_name} 
          verified={record.verified} 
          openSource={record.open_source} 
        />
      )
    },
    {
      title: '% Resolved',
      children: [
        {
          title: 'Overall',
          dataIndex: 'score',
          key: 'score',
          width: 100,
          align: 'right',
          sorter: (a, b) => a.score - b.score,
          render: (score) => (
            <Text strong style={{ color: 'var(--semi-color-primary)' }}>
              {score.toFixed(2)}%
            </Text>
          )
        },
        {
          title: 'Go',
          dataIndex: 'score_go',
          key: 'score_go',
          width: 90,
          align: 'right',
          sorter: (a, b) => a.score_go - b.score_go,
          render: (score) => <Text>{score.toFixed(2)}%</Text>
        },
        {
          title: 'Python',
          dataIndex: 'score_python',
          key: 'score_python',
          width: 90,
          align: 'right',
          sorter: (a, b) => a.score_python - b.score_python,
          render: (score) => <Text>{score.toFixed(2)}%</Text>
        },
        {
          title: 'Node.js',
          dataIndex: 'score_nodejs',
          key: 'score_nodejs',
          width: 90,
          align: 'right',
          sorter: (a, b) => a.score_nodejs - b.score_nodejs,
          render: (score) => <Text>{score.toFixed(2)}%</Text>
        }
      ]
    },
    {
      title: 'Organization',
      dataIndex: 'organization',
      key: 'organization',
      width: 150,
      sorter: (a, b) => a.organization.localeCompare(b.organization)
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      width: 120,
      sorter: (a, b) => new Date(a.date) - new Date(b.date)
    },
    {
      title: 'Site',
      key: 'site',
      width: 80,
      align: 'center',
      render: (text, record) => (
        <ActionButton 
          url={record.site} 
          icon={IconLink} 
          label={record.site ? 'Official Site' : 'No Link'} 
          disabled={!record.site}
        />
      )
    },
    {
      title: 'Logs',
      key: 'logs',
      width: 80,
      align: 'center',
      render: (text, record) => (
        <ActionButton 
          url={record.logs} 
          icon={IconFile} 
          label={record.logs ? 'Evaluation Logs' : 'No Logs'} 
          disabled={!record.logs}
        />
      )
    },
    {
      title: 'Trajs',
      key: 'trajs',
      width: 80,
      align: 'center',
      render: (text, record) => (
        <ActionButton 
          url={record.trajs} 
          icon={IconCode} 
          label={record.trajs ? 'Code Trajectories' : 'No Trajectories'} 
          disabled={!record.trajs}
        />
      )
    }
  ], []);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '48px' }}>
        <Spin size="large" aria-label="Loading models..." />
      </div>
    );
  }

  if (filteredData.length === 0) {
    return (
      <Empty 
        title={searchText ? "No models found" : "No models available"}
        description={searchText ? "Try adjusting your search criteria" : "Check back later"}
        image={<IconSearch style={{ fontSize: 48, color: 'var(--semi-color-text-2)' }} />}
      />
    );
  }

  return (
    <Table
      columns={columns}
      dataSource={filteredData}
      pagination={false}
      scroll={{ x: 'max-content' }}
      rowKey="object_name"
      loading={loading}
      aria-label="Model leaderboard"
    />
  );
});

ModelTable.displayName = 'ModelTable';
ModelTable.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    object_name: PropTypes.string.isRequired,
    score: PropTypes.number.isRequired,
    score_go: PropTypes.number.isRequired,
    score_python: PropTypes.number.isRequired,
    score_nodejs: PropTypes.number.isRequired,
    organization: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    site: PropTypes.string,
    logs: PropTypes.string,
    trajs: PropTypes.string,
    verified: PropTypes.bool,
    open_source: PropTypes.bool
  })).isRequired,
  loading: PropTypes.bool,
  searchText: PropTypes.string
};

export default ModelTable;