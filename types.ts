
export enum ProjectStatus {
  BRIEF = 'Brief',
  CONCEPT = 'Concept',
  WORLD_BIBLE = 'World Bible',
  CONCEPT_ART = 'Concept Art',
  VISUAL_DECK = 'Visual Deck',
  STORYBOARD_PLAN = 'Storyboard Plan',
  STORYBOARD = 'Storyboard',
  AUDIO = 'Audio',
  FINAL_FILM = 'Final Film',
  COMPLETED = 'Completed',
}

export interface CreativeBrief {
  title: string;
  logline: string;
  genre: string;
  targetAudience: string;
  keyThemes: string;
  visualStyle: string;
}

export interface Concept {
  title: string;
  logline: string;
  synopsis: string;
}

export interface Project {
  id: string;
  title: string;
  status: ProjectStatus;
  brief: CreativeBrief;
  concepts?: Concept[];
  approvedConcept?: Concept;
  script?: string;
  lastUpdated: string;
  thumbnailUrl: string;
}
