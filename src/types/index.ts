export interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  category: 'Fieldwork' | 'Announcement' | 'Workshop' | 'Community' | 'Research';
  publishedAt: string;
  coverImage?: string;
  tags?: string[];
  featured?: boolean;
}

export interface Publication {
  id: string;
  title: string;
  authors: string[];
  year: number;
  type: 'Research Paper' | 'Grammar Sketch' | 'Dictionary' | 'Report' | 'Policy Brief' | 'Documentation Guide';
  abstract: string;
  downloadUrl?: string;
  fileSize?: string;
  fileFormat?: string;
  externalUrl?: string;
  languageCovered?: string;
  keywords?: string[];
  featured?: boolean;
}

export interface DocumentationProject {
  id: string;
  title: string;
  languageName: string;
  alternateNames?: string[];
  region: string;
  geneticAffiliation: string;
  status: 'Active' | 'Completed' | 'Archived' | 'Community In-Progress';
  summary: string;
  description: string;
  leadResearcher: string;
  communityConsultants: string[];
  startedYear: number;
  archiveRepository?: string;
  mediaCount?: {
    audioHours?: number;
    videoHours?: number;
    textPages?: number;
  };
  sampleAudioUrl?: string;
  coverImage?: string;
}

export interface CldsEvent {
  id: string;
  title: string;
  slug: string;
  eventType: 'Workshop' | 'Conference' | 'Community Forum' | 'Training Clinic' | 'Webinar';
  startDate: string;
  endDate?: string;
  time?: string;
  location: string;
  region: string;
  summary: string;
  description: string;
  organizer: string;
  registrationUrl?: string;
  isUpcoming: boolean;
  coverImage?: string;
  featured?: boolean;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  affiliation?: string;
  avatarUrl?: string;
  email?: string;
  socialLinks?: {
    twitter?: string;
    linkedin?: string;
    orcid?: string;
  };
}

export interface ExternalLink {
  id: string;
  title: string;
  url: string;
  category: 'Language Archive' | 'University Partner' | 'Funding Program' | 'Community Portal';
  description: string;
  isPartner?: boolean;
}

export interface FirebaseConfigStatus {
  isConfigured: boolean;
  projectId?: string;
  storageBucket?: string;
  authDomain?: string;
  hasApiKey: boolean;
}
