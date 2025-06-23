import React from "react";
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { ProjectLanguageProps } from "./Projects";

const ProjectLanguages: React.FC<{ items: ProjectLanguageProps[] }> = ({ items }) => {
    return (
        <Stack direction="row" spacing={1}>
            {items.map((item, idx) => (
                <Box component="img" key={idx} src={item.logo} alt="item" sx={{ height: 30, width: 30, mr: 1, cursor: 'pointer' }} />
            ))}
        </Stack>
    );
}

export default ProjectLanguages;
