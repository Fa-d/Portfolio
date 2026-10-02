import React from "react";
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import { ProjectLanguageProps } from "./Projects";
import { labelForAsset } from "./assetLabels";

const ProjectLanguages: React.FC<{ items: ProjectLanguageProps[] }> = ({ items }) => {
    return (
        <Stack direction="row" spacing={1} aria-label="Technologies">
            {items.map((item, idx) => {
                const label = labelForAsset(item.logo);
                return (
                    <Tooltip key={idx} title={label}>
                        <Box
                            component="img"
                            src={item.logo}
                            alt={label}
                            width={26}
                            height={26}
                            loading="lazy"
                            decoding="async"
                            sx={{ objectFit: 'contain' }}
                        />
                    </Tooltip>
                );
            })}
        </Stack>
    );
}

export default ProjectLanguages;
