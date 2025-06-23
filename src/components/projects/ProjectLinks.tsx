import React from "react";
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import { openInNewTab } from "../../utils/NewTab";
import { ProjectLinkProps } from "./Projects";

const ProjectLinks: React.FC<{ items: ProjectLinkProps[] }> = ({ items }) => {
    return (
        <Stack direction="row" spacing={1}>
            {items.map((item, idx) => (
                <IconButton key={idx} onClick={() => openInNewTab(item.url)} sx={{ p: 0 }}>
                    <Box component="img" src={item.logo} alt="item" sx={{ height: 30, width: 30, mr: 1 }} />
                </IconButton>
            ))}
        </Stack>
    );
}

export default ProjectLinks;
