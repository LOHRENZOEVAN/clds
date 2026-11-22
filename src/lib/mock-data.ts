import { Post, Publication, DocumentationProject, TeamMember, ExternalLink, CldsEvent } from '@/types';

export const INITIAL_POSTS: Post[] = [
  {
    id: 'post-1',
    title: 'Launching the CLDS Community Language Documentation Training in Bamenda',
    slug: 'launching-clds-community-language-documentation-training',
    excerpt: 'Equipping university students and native language activists across the North West Region of Cameroon with modern audio-visual recording and linguistic transcription methods.',
    content: `Cameroon is celebrated as one of the world's most linguistically diverse landscapes with more than 280 indigenous languages spoken across its territories. However, the future of these languages faces unprecedented challenges. Younger generations are rapidly shifting toward dominant national and regional languages—including English, French, Fulfulde, Cameroon Pidgin, and Camfranglais.

Until now, documentation efforts have frequently been led from outside the country, with precious cultural and linguistic data locked in Western institutions. CLDS is committed to reversing this trend.

Our Bamenda training workshop convenes 25 youth researchers from the University of Bamenda and regional universities. Participants undergo intensive hands-on modules in:
1. Portable digital recording and ethical fieldwork protocols.
2. Community consent and participatory archiving.
3. Transcription and annotation using open-source tools like ELAN and FLEx.
4. Building local digital repositories that remain accessible to native communities.

"Our goal is not merely to capture words, but to sustain the social, botanical, and cosmological wisdom encoded within our mother tongues," noted the training coordinator.`,
    author: 'CLDS Fieldwork Team',
    category: 'Workshop',
    publishedAt: '2026-10-15',
    coverImage: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=80',
    tags: ['Bamenda', 'Fieldwork', 'Capacity Building', 'Grassfields Languages'],
    featured: true,
  },
  {
    id: 'post-2',
    title: 'Decolonizing Language Archiving: Why Local Custodianship Matters in Cameroon',
    slug: 'decolonizing-language-archiving-local-custodianship',
    excerpt: 'Analyzing the legacy of external documentation programs like ELDP and DOBES, and why Cameroonian communities must hold the keys to their own cultural records.',
    content: `Since 2006, the Endangered Languages Documentation Programme (ELDP) has funded 19 projects in Cameroon. Yet, out of those 19 projects, only half were led by six Cameroonian linguists. Similarly, the German DOBES programme funded three documentation projects on Cameroonian languages spearheaded by European scholars with Cameroonian assistants.

In almost all these historical scenarios, the resulting audio recordings, video reels, and lexical manuscripts were transferred directly to European servers and archives. For the Cameroonian elders and village communities who shared their stories, songs, and knowledge, these materials have remained practically inaccessible.

CLDS was established in Bamenda specifically to change this reality. By training local linguists and establishing an open, community-accessible digital repository right here in Cameroon, we ensure that:
- Community speakers retain primary ownership and rights over their cultural heritage.
- Pedagogical materials can be developed locally for schools and cultural centers.
- Equal, non-extractive partnerships are forged between Cameroonian researchers and international institutions.`,
    author: 'Dr. Fidelis N. & CLDS Working Group',
    category: 'Research',
    publishedAt: '2026-09-28',
    coverImage: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=1200&q=80',
    tags: ['Archiving', 'Ethics', 'Language Rights', 'Cameroon Linguistics'],
    featured: true,
  },
  {
    id: 'post-3',
    title: 'Oral Traditions & Ritual Songs of the Grassfields: Documentation Updates from Boyo and Mezam',
    slug: 'oral-traditions-ritual-songs-grassfields',
    excerpt: 'Field notes from recent documentation missions recording elder songsters and traditional medicinal vocabulary in endangered dialects of the Western Grassfields.',
    content: `Our fieldwork fellows recently returned from field deployments across the valleys of Boyo and Mezam divisions. Armed with high-fidelity directional microphones and solar charging kits, the teams documented over 45 hours of high-definition audio and 4K video capturing:
- Royal court praise poetry and sacred incantations.
- Ethnobotanical taxonomies and traditional medical terms from hereditary herbalists.
- Interactive conversational games and folktales narrated to children around evening fires.

All documented data is being prepared according to FAIR and CARE principles for local archiving in Bamenda.`,
    author: 'Fieldwork Research Unit',
    category: 'Fieldwork',
    publishedAt: '2026-09-04',
    coverImage: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=1200&q=80',
    tags: ['Oral Traditions', 'Ethnobotany', 'Bamenda', 'Grassfields'],
    featured: false,
  },
];

export const INITIAL_EVENTS: CldsEvent[] = [
  {
    id: 'event-1',
    title: 'Fieldwork Audio Engineering & FLEx Annotation Clinic',
    slug: 'fieldwork-audio-engineering-flex-clinic',
    eventType: 'Training Clinic',
    startDate: '2026-12-05',
    endDate: '2026-12-08',
    time: '09:00 AM - 04:30 PM WAT',
    location: 'CLDS Archival Lab & Digital Studio, Bamenda',
    region: 'North West Region, Cameroon',
    summary: 'A 4-day intensive practical training for university linguistics students on acoustic calibration, directional microphone setup, and Fieldworks Language Explorer (FLEx) interlinear glossing.',
    description: `Targeting student researchers and community documenters from the University of Bamenda and regional colleges.
Participants will receive hands-on training covering:
1. Directional acoustic recording under tropical highland fieldwork conditions.
2. Metadata collection compliant with Open Language Archives Community (OLAC) standards.
3. Rapid dictionary building and morphological tagging using FLEx.
4. Exporting data to local offline community repositories.`,
    organizer: 'CLDS Technology & Archiving Directorate',
    registrationUrl: 'mailto:contact@clds-cameroon.org?subject=Register%20FLEx%20Clinic',
    isUpcoming: true,
    coverImage: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80',
    featured: true,
  },
  {
    id: 'event-2',
    title: 'Cameroon Indigenous Languages & Sustainable Archiving Forum',
    slug: 'cameroon-indigenous-languages-archiving-forum',
    eventType: 'Conference',
    startDate: '2027-01-18',
    endDate: '2027-01-20',
    time: '08:30 AM - 05:00 PM WAT',
    location: 'Conference Centre, Bamenda / Hybrid Virtual',
    region: 'North West Region, Cameroon',
    summary: 'National symposium bringing together traditional custodians, village councils, linguists, and educational policymakers to address mother-tongue preservation across Cameroon’s 280+ languages.',
    description: `In commemoration of the International Decade of Indigenous Languages (IDIL), CLDS hosts community delegates, university researchers, and policy representatives.
Key focus tracks:
- De-centering extractive European archiving: establishing African repositories.
- Orthography and literacy development for unwritten Cameroonian tongues.
- Community ownership, intellectual property rights, and sacred speech protocols.
- Mother-tongue early childhood literacy models.`,
    organizer: 'CLDS & University Linguistic Partners',
    registrationUrl: 'mailto:contact@clds-cameroon.org?subject=Register%20IDIL%20Forum',
    isUpcoming: true,
    coverImage: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80',
    featured: true,
  },
  {
    id: 'event-3',
    title: 'Grassfields Elder Storytelling & Oral Heritage Evening',
    slug: 'grassfields-elder-storytelling-evening',
    eventType: 'Community Forum',
    startDate: '2026-10-24',
    time: '05:00 PM - 08:30 PM WAT',
    location: 'Bafut Royal Palace Grounds, North West Region',
    region: 'North West Region, Cameroon',
    summary: 'Community gathering featuring master storytellers and praise singers, recorded with multicam video for community children and digital archiving.',
    description: 'An evening celebration of indigenous oral literature, proverbs, and musical riddles presented in Bafut and neighboring Grassfields languages with simultaneous student transcription.',
    organizer: 'CLDS Community Engagement Unit & Bafut Cultural Association',
    isUpcoming: false,
    coverImage: 'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=1200&q=80',
    featured: false,
  },
];

export const INITIAL_PUBLICATIONS: Publication[] = [
  {
    id: 'pub-1',
    title: 'Sustaining Linguistic Futures: A Framework for Grassroots Language Documentation in Cameroon',
    authors: ['CLDS Research Directorate', 'University of Bamenda Linguistics Dept.'],
    year: 2026,
    type: 'Research Paper',
    abstract: 'This paper addresses the structural imbalance in African linguistics where documentation materials have historically been archived abroad. It proposes an actionable model for community-centered archiving based in Bamenda, Cameroon, empowering native scholars to lead documentation efforts.',
    downloadUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    fileSize: '2.4 MB',
    fileFormat: 'PDF',
    languageCovered: 'Grassfields Bantu & Regional Languages',
    keywords: ['Linguistic Sovereignty', 'Cameroon', 'Archival Ethics', 'Capacity Building'],
    featured: true,
  },
  {
    id: 'pub-2',
    title: 'A Descriptive Sketch of Tone and Nominal Morphology in Western Grassfields Dialects',
    authors: ['CLDS Working Group on Tone Systems'],
    year: 2025,
    type: 'Grammar Sketch',
    abstract: 'A comprehensive investigation into noun class prefixes, concord markers, and tonal perturbations across endangered speech varieties in the North West Region of Cameroon.',
    downloadUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    fileSize: '4.1 MB',
    fileFormat: 'PDF',
    languageCovered: 'Ring Bantu (Western Grassfields)',
    keywords: ['Phonology', 'Tone', 'Morphology', 'Grassfields Bantu'],
    featured: true,
  },
  {
    id: 'pub-3',
    title: 'Field Guide: Ethical Protocols and Digital Tools for Community Language Documenters in Central Africa',
    authors: ['CLDS Technical Team'],
    year: 2025,
    type: 'Documentation Guide',
    abstract: 'A practical manual written for university students and community documenters. Covers audio capture, video framing, metadata standards, consent forms, and ELAN annotation workflows under Cameroonian fieldwork conditions.',
    downloadUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    fileSize: '3.8 MB',
    fileFormat: 'PDF',
    keywords: ['Manual', 'Fieldwork', 'ELAN', 'Audio Engineering', 'Ethics'],
    featured: false,
  },
  {
    id: 'pub-4',
    title: 'Cameroon Language Policy Brief: Overcoming the Threat of Extinction for 280+ Indigenous Languages',
    authors: ['Policy Advisory Committee, CLDS'],
    year: 2024,
    type: 'Policy Brief',
    abstract: 'A strategic policy brief for education stakeholders, regional councils, and cultural authorities outlining recommendations for mother-tongue early education and community archive funding.',
    downloadUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    fileSize: '1.2 MB',
    fileFormat: 'PDF',
    keywords: ['Policy', 'Education', 'Language Rights', 'Cameroon'],
    featured: false,
  },
];

export const INITIAL_PROJECTS: DocumentationProject[] = [
  {
    id: 'proj-1',
    title: 'Documentation of Endangered Western Grassfields Oral Epics & Ritual Chants',
    languageName: 'Bafut & Neighboring Varieties',
    alternateNames: ['Fut', 'Bife', 'Western Ring'],
    region: 'Mezam Division, North West Region (Bamenda)',
    geneticAffiliation: 'Niger-Congo, Atlantic-Congo, Volta-Congo, Benue-Congo, Bantoid, Southern, Wide Grassfields, Narrow Grassfields, Ring, Center',
    status: 'Active',
    summary: 'Multi-year project preserving elder ceremonial dialogues, agricultural seasonal rituals, and folklore narration with simultaneous acoustic and cultural analysis.',
    description: 'This initiative partners with community elders in the Bafut kingdom and surrounding valleys. Due to rapid urbanization in Bamenda, ceremonial language registers known only to royal heralds and older women cultivators are disappearing. The project has gathered over 80 hours of high-definition audio-visual recordings, transcribed and translated into English and French.',
    leadResearcher: 'Tanyi Emmanuel & Fieldwork Cohort',
    communityConsultants: ['Pa Nkwenti (Elder Historian)', 'Mami Lum Esther (Cultural Custodian)', 'Prince Bih John'],
    startedYear: 2024,
    archiveRepository: 'CLDS Bamenda Local Digital Repository',
    mediaCount: {
      audioHours: 85,
      videoHours: 42,
      textPages: 640,
    },
    coverImage: 'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'proj-2',
    title: 'Limbum Ethnobotanical Taxonomy and Herbal Knowledge Documentation',
    languageName: 'Limbum',
    alternateNames: ['Wimbum', 'Kaka', 'Limbom'],
    region: 'Donga-Mantung Division, North West Region',
    geneticAffiliation: 'Niger-Congo, Bantoid, Grassfields, Nkambe',
    status: 'Active',
    summary: 'Documenting indigenous floral classifications, medicinal plant recipes, and ecological proverbs among traditional healers in the highlands.',
    description: 'Indigenous languages hold intricate knowledge systems of local biodiversity that modern science is only beginning to decipher. This project records Limbum plant names, medicinal applications, and ecological stewardship songs, ensuring youth inherit both the language and the ecological knowledge.',
    leadResearcher: 'Dr. Nfor Celestine',
    communityConsultants: ['Shey Shefa (Traditional Healer)', 'Mami Beri Comfort'],
    startedYear: 2023,
    archiveRepository: 'CLDS Bamenda Archives & Community Library of Nkambe',
    mediaCount: {
      audioHours: 52,
      videoHours: 30,
      textPages: 420,
    },
    coverImage: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'proj-3',
    title: 'Kom Folkloric Songs, Tales, and Weaving Artisanship Vocabulary',
    languageName: 'Kom',
    alternateNames: ['Itangikom', 'Bikom'],
    region: 'Boyo Division, North West Region',
    geneticAffiliation: 'Niger-Congo, Benue-Congo, Grassfields Bantu, Center Ring',
    status: 'Community In-Progress',
    summary: 'Collaborative audiovisual archive of weaving terminologies, birth celebration chants, and folktales narrated in ancestral Kom.',
    description: 'Working alongside women artisans and elder storytellers in Laikom and Fundong, documenting technical terms for traditional embroidery, Raffia bag weaving, and lullabies.',
    leadResearcher: 'Chia Grace & CLDS Student Fellows',
    communityConsultants: ['Nangah Mary', 'Bobe Timah Francis'],
    startedYear: 2025,
    archiveRepository: 'CLDS Bamenda Repository',
    mediaCount: {
      audioHours: 35,
      videoHours: 20,
      textPages: 280,
    },
    coverImage: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1200&q=80',
  },
];

export const INITIAL_TEAM: TeamMember[] = [
  {
    id: 'team-1',
    name: 'Prof. Fidelis Nkemleke',
    role: 'Executive Director & Principal Investigator',
    affiliation: 'University of Bamenda & CLDS',
    bio: 'Renowned Cameroonian linguist with over 25 years of research into language contact, documentation of Grassfields languages, and corpus linguistics. Passionate about local archival sovereignty.',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    email: 'director@clds-cameroon.org',
  },
  {
    id: 'team-2',
    name: 'Dr. Julius Che',
    role: 'Head of Fieldwork & Community Documentation',
    affiliation: 'CLDS Bamenda',
    bio: 'Specialist in tone systems and syntax of Ring Bantu languages. Has directed multiple documentation field expeditions across Mezam, Menchum, and Momo divisions.',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    email: 'fieldwork@clds-cameroon.org',
  },
  {
    id: 'team-3',
    name: 'Mirabel Lum',
    role: 'Digital Archivist & Data Curator',
    affiliation: 'CLDS Bamenda',
    bio: 'Directs the digitizing, transcription indexing, and long-term storage workflows. Coordinates student annotators and runs community archive access clinics.',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    email: 'archives@clds-cameroon.org',
  },
  {
    id: 'team-4',
    name: 'Emmanuel Forgwe',
    role: 'Technology & Audio-Visual Production Lead',
    affiliation: 'CLDS Bamenda',
    bio: 'Leads digital recording equipment management, mobile solar fieldwork rigs, audio restoration, and the CLDS web portal and database systems.',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    email: 'tech@clds-cameroon.org',
  },
];

export const INITIAL_LINKS: ExternalLink[] = [
  {
    id: 'link-1',
    title: 'SIL Cameroon (SIL Cameroun)',
    url: 'https://www.silcam.org',
    category: 'University Partner',
    description: 'Premier language development, literacy, and linguistic research organization in Cameroon since 1969.',
    isPartner: true,
  },
  {
    id: 'link-2',
    title: 'Endangered Languages Documentation Programme (ELDP)',
    url: 'https://www.eldp.net',
    category: 'Funding Program',
    description: 'International programme funding fieldwork documentation of endangered languages globally.',
  },
  {
    id: 'link-3',
    title: 'Endangered Languages Archive (ELAR)',
    url: 'https://www.elararchive.org',
    category: 'Language Archive',
    description: 'Digital repository for documentation collections of endangered languages.',
  },
  {
    id: 'link-4',
    title: 'DOBES Documentation of Endangered Languages',
    url: 'https://dobes.mpi.nl',
    category: 'Language Archive',
    description: 'Pioneering international archive for audio-visual records of endangered languages.',
  },
  {
    id: 'link-5',
    title: 'The University of Bamenda (UBa)',
    url: 'https://www.uniba.cm',
    category: 'University Partner',
    description: 'Department of Linguistics, collaborating with CLDS to train student fieldworkers.',
    isPartner: true,
  },
  {
    id: 'link-6',
    title: 'University of Yaoundé I - Department of African Languages & Linguistics',
    url: 'https://www.uy1.uninet.cm',
    category: 'University Partner',
    description: 'Foundational institution for linguistic scholarship across Cameroon.',
    isPartner: true,
  },
];
