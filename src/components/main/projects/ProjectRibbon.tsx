import React from 'react';
import { Box, Chip } from '@mui/material';

export type ProjectType = 'office' | 'personal' | 'client' | 'open-source';

interface ProjectRibbonProps {
  type: ProjectType;
}

const ribbonConfig = {
  office: {
    color: '#1976d2',
    bgColor: 'rgba(25, 118, 210, 0.1)',
    text: 'Office',
    icon: '🏢'
  },
  personal: {
    color: '#9c27b0',
    bgColor: 'rgba(156, 39, 176, 0.1)',
    text: 'Personal',
    icon: '👤'
  },
  client: {
    color: '#ff9800',
    bgColor: 'rgba(255, 152, 0, 0.1)',
    text: 'Client',
    icon: '🤝'
  },
  'open-source': {
    color: '#4caf50',
    bgColor: 'rgba(76, 175, 80, 0.1)',
    text: 'Open Source',
    icon: '🌐'
  }
};

const ProjectRibbon: React.FC<ProjectRibbonProps> = ({ type }) => {
  const config = ribbonConfig[type];

  return (
    <Box
      sx={{
        position: 'absolute',
        top: 12,
        right: 12,
        zIndex: 2,
      }}
    >
      <Chip
        icon={<span style={{ fontSize: '12px' }}>{config.icon}</span>}
        label={config.text}
        size="small"
        sx={{
          backgroundColor: config.bgColor,
          color: config.color,
          border: `1px solid ${config.color}20`,
          fontSize: '11px',
          fontWeight: 500,
          height: '24px',
          '& .MuiChip-icon': {
            marginLeft: '6px',
            marginRight: '-2px',
          },
          '& .MuiChip-label': {
            paddingLeft: '4px',
            paddingRight: '8px',
          },
          backdropFilter: 'blur(8px)',
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        }}
      />
    </Box>
  );
};

export default ProjectRibbon;