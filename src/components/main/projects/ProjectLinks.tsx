import React from "react";
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { ProjectLinkProps } from "./Projects";
import { labelForAsset } from "./assetLabels";

const ProjectLinks: React.FC<{ items: ProjectLinkProps[]; projectName: string }> = ({ items, projectName }) => {
    return (
        <Stack direction="row" spacing={0.5}>
            {items.map((item, idx) => {
                const label = labelForAsset(item.logo);
                return (
                    <Tooltip key={idx} title={label}>
                        <IconButton
                            component="a"
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`${projectName} — ${label} (opens in a new tab)`}
                            size="small"
                        >
                            <Box
                                component="img"
                                src={item.logo}
                                alt=""
                                width={26}
                                height={26}
                                loading="lazy"
                                decoding="async"
                                sx={{ objectFit: 'contain' }}
                            />
                        </IconButton>
                    </Tooltip>
                );
            })}
        </Stack>
    );
}

export default ProjectLinks;
