
import { Project, ProjectStatus } from '../types';

export const MOCK_PROJECTS: Project[] = [
  {
    id: 'proj-1',
    title: 'Starlight Odyssey',
    status: ProjectStatus.STORYBOARD,
    lastUpdated: '2024-05-23T14:30:00Z',
    thumbnailUrl: 'https://picsum.photos/seed/galaxy/400/300',
    brief: {
      title: 'Starlight Odyssey',
      logline: 'A lone astronaut discovers a sentient star that communicates through constellations, leading her on a quest to save its dying galaxy.',
      genre: 'Sci-Fi Adventure',
      targetAudience: 'Young Adults',
      keyThemes: 'Discovery, sacrifice, communication',
      visualStyle: 'Cosmic, ethereal, inspired by Hubble telescope imagery with a touch of Ghibli-esque character design.',
    },
  },
  {
    id: 'proj-2',
    title: 'The Clockwork Alchemist',
    status: ProjectStatus.CONCEPT,
    lastUpdated: '2024-05-24T10:00:00Z',
    thumbnailUrl: 'https://picsum.photos/seed/steampunk/400/300',
    brief: {
      title: 'The Clockwork Alchemist',
      logline: 'In a steampunk city powered by alchemy, a disgraced inventor must build a mechanical heart to save his daughter, while evading the clutches of a powerful guild.',
      genre: 'Steampunk Fantasy',
      targetAudience: 'Teens and Adults',
      keyThemes: 'Family, redemption, technology vs. magic',
      visualStyle: 'Victorian-era mechanics, glowing alchemical symbols, intricate brass and copper designs.',
    },
  },
  {
    id: 'proj-3',
    title: ' Whispers of the Deep',
    status: ProjectStatus.BRIEF,
    lastUpdated: '2024-05-22T09:15:00Z',
    thumbnailUrl: 'https://picsum.photos/seed/ocean/400/300',
    brief: {
      title: 'Whispers of the Deep',
      logline: 'A marine biologist encounters a bioluminescent creature with the ability to project memories, forcing her to confront a personal tragedy she has long suppressed.',
      genre: 'Psychological Thriller',
      targetAudience: 'Adults',
      keyThemes: 'Memory, grief, the unknown',
      visualStyle: 'Dark, atmospheric, deep-sea bioluminescence, claustrophobic submarine interiors.',
    },
  },
];
