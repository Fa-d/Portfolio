import React from 'react';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import SectionContainer from '../common/SectionContainer';
import SectionHeader from '../common/SectionHeader';
import { EmptyState, ErrorState } from '../common/DataStates';
import { useJsonData } from '../../utils/useJsonData';

export interface SkillsProps {
    title: string;
    image: string; // Path to image, e.g., /assets/kotlin.png
}

const Skills: React.FC = () => {
    const { data, loading, error, retry } = useJsonData<SkillsProps[]>('/data/skills.json');
    const items = data ?? [];

    return (
        <SectionContainer id="skills">
            <SectionHeader title="Skills" />
            {error ? (
                <ErrorState what="skills" onRetry={retry} />
            ) : (
                <Box component="ul" sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5, listStyle: 'none' }}>
                    {loading
                        ? Array.from({ length: 10 }).map((_, index) => (
                            <Box component="li" key={index}>
                                <Skeleton variant="rounded" width={130} height={52} sx={{ borderRadius: 3 }} />
                            </Box>
                        ))
                        : items.map((item) => (
                            <Box component="li" key={item.title}>
                                <Paper
                                    variant="outlined"
                                    sx={{
                                        py: 1.25,
                                        px: 2,
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 1.5,
                                        borderRadius: 3,
                                    }}
                                >
                                    <Box
                                        component="img"
                                        src={item.image}
                                        alt=""
                                        width={28}
                                        height={28}
                                        loading="lazy"
                                        decoding="async"
                                        sx={{ objectFit: 'contain' }}
                                    />
                                    <Typography variant="body1" sx={{ fontWeight: 500 }}>{item.title}</Typography>
                                </Paper>
                            </Box>
                        ))}
                </Box>
            )}
            {!loading && !error && items.length === 0 && <EmptyState message="No skills listed yet." />}
        </SectionContainer>
    );
};

export default Skills;
