import React from 'react';
import { alpha, Chip } from '@mui/material';

export type ProjectType = 'office' | 'personal' | 'client' | 'open-source';

interface ProjectRibbonProps {
  type: ProjectType;
}

const ribbonConfig: Record<ProjectType, { palette: 'primary' | 'secondary' | 'warning' | 'success'; text: string }> = {
  office: { palette: 'primary', text: 'Office' },
  personal: { palette: 'secondary', text: 'Personal' },
  client: { palette: 'warning', text: 'Client' },
  'open-source': { palette: 'success', text: 'Open Source' },
};

const ProjectRibbon: React.FC<ProjectRibbonProps> = ({ type }) => {
  const config = ribbonConfig[type] ?? ribbonConfig.personal;

  return (
    <Chip
      label={config.text}
      size="small"
      sx={(theme) => {
        const color = theme.palette[config.palette];
        const isDark = theme.palette.mode === 'dark';
        return {
          position: 'absolute',
          top: 12,
          right: 12,
          zIndex: 2,
          height: 24,
          fontSize: '0.72rem',
          fontWeight: 600,
          color: isDark ? color.light : color.dark,
          backgroundColor: alpha(theme.palette.background.paper, 0.92),
          border: `1px solid ${alpha(color.main, 0.4)}`,
          backdropFilter: 'blur(6px)',
        };
      }}
    />
  );
};

export default ProjectRibbon;
