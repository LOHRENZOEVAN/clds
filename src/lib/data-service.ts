import { Post, Publication, DocumentationProject, TeamMember, ExternalLink, CldsEvent, FirebaseConfigStatus } from '@/types';
import { db, storage, isFirebaseConfigured, firebaseConfig } from './firebase';
import { 
  collection, 
  getDocs, 
  doc, 
  getDoc, 
  setDoc, 
  deleteDoc, 
  query, 
  orderBy 
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { 
  INITIAL_POSTS, 
  INITIAL_PUBLICATIONS, 
  INITIAL_PROJECTS, 
  INITIAL_EVENTS,
  INITIAL_TEAM, 
  INITIAL_LINKS 
} from './mock-data';

// Local storage keys
const STORAGE_KEYS = {
  POSTS: 'clds_posts_v1',
  PUBLICATIONS: 'clds_publications_v1',
  PROJECTS: 'clds_projects_v1',
  EVENTS: 'clds_events_v1',
  TEAM: 'clds_team_v1',
  LINKS: 'clds_links_v1',
  ADMIN_AUTH: 'clds_admin_auth_session',
};

// Safe localStorage getter
function getLocal<T>(key: string, defaultValue: T): T {
  if (typeof window === 'undefined') return defaultValue;
  try {
    const raw = localStorage.getItem(key);
    if (!raw) {
      localStorage.setItem(key, JSON.stringify(defaultValue));
      return defaultValue;
    }
    return JSON.parse(raw) as T;
  } catch (err) {
    console.error(`Error reading ${key} from localStorage`, err);
    return defaultValue;
  }
}

// Safe localStorage setter
function setLocal<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.error(`Error writing ${key} to localStorage`, err);
  }
}

// ==================== AUTHENTICATION (Private Admin) ====================
export function checkAdminSession(): boolean {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem(STORAGE_KEYS.ADMIN_AUTH) === 'authenticated';
}

export function setAdminSession(authStatus: boolean): void {
  if (typeof window === 'undefined') return;
  if (authStatus) {
    localStorage.setItem(STORAGE_KEYS.ADMIN_AUTH, 'authenticated');
  } else {
    localStorage.removeItem(STORAGE_KEYS.ADMIN_AUTH);
  }
}

// Live Firebase config status
export function getFirebaseStatus(): FirebaseConfigStatus {
  return {
    isConfigured: isFirebaseConfigured,
    projectId: firebaseConfig.projectId,
    storageBucket: firebaseConfig.storageBucket,
    authDomain: firebaseConfig.authDomain,
    hasApiKey: Boolean(firebaseConfig.apiKey),
  };
}

// ==================== POSTS ====================
export async function getPosts(): Promise<Post[]> {
  if (isFirebaseConfigured && db) {
    try {
      const q = query(collection(db, 'posts'), orderBy('publishedAt', 'desc'));
      const snapshot = await getDocs(q);
      if (!snapshot.empty) {
        return snapshot.docs.map(d => ({ id: d.id, ...d.data() } as Post));
      }
    } catch (err) {
      console.warn('Firestore fetch failed, falling back to local store', err);
    }
  }
  return getLocal<Post[]>(STORAGE_KEYS.POSTS, INITIAL_POSTS);
}

export async function getPost(id: string): Promise<Post | null> {
  if (isFirebaseConfigured && db) {
    try {
      const docRef = doc(db, 'posts', id);
      const snapshot = await getDoc(docRef);
      if (snapshot.exists()) {
        return { id: snapshot.id, ...snapshot.data() } as Post;
      }
    } catch (err) {
      console.warn('Firestore single post fetch error', err);
    }
  }
  const posts = getLocal<Post[]>(STORAGE_KEYS.POSTS, INITIAL_POSTS);
  return posts.find(p => p.id === id || p.slug === id) || null;
}

export async function savePost(post: Post): Promise<Post> {
  const postToSave: Post = {
    ...post,
    id: post.id || `post-${Date.now()}`,
    slug: post.slug || post.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''),
    publishedAt: post.publishedAt || new Date().toISOString().split('T')[0],
  };

  if (isFirebaseConfigured && db) {
    try {
      await setDoc(doc(db, 'posts', postToSave.id), postToSave);
    } catch (err) {
      console.error('Error saving post to Firestore', err);
    }
  }

  const posts = getLocal<Post[]>(STORAGE_KEYS.POSTS, INITIAL_POSTS);
  const index = posts.findIndex(p => p.id === postToSave.id);
  if (index >= 0) {
    posts[index] = postToSave;
  } else {
    posts.unshift(postToSave);
  }
  setLocal(STORAGE_KEYS.POSTS, posts);

  return postToSave;
}

export async function deletePost(id: string): Promise<void> {
  if (isFirebaseConfigured && db) {
    try {
      await deleteDoc(doc(db, 'posts', id));
    } catch (err) {
      console.error('Error deleting post from Firestore', err);
    }
  }

  const posts = getLocal<Post[]>(STORAGE_KEYS.POSTS, INITIAL_POSTS);
  setLocal(STORAGE_KEYS.POSTS, posts.filter(p => p.id !== id));
}

// ==================== PUBLICATIONS ====================
export async function getPublications(): Promise<Publication[]> {
  if (isFirebaseConfigured && db) {
    try {
      const q = query(collection(db, 'publications'), orderBy('year', 'desc'));
      const snapshot = await getDocs(q);
      if (!snapshot.empty) {
        return snapshot.docs.map(d => ({ id: d.id, ...d.data() } as Publication));
      }
    } catch (err) {
      console.warn('Firestore publications fetch error', err);
    }
  }
  return getLocal<Publication[]>(STORAGE_KEYS.PUBLICATIONS, INITIAL_PUBLICATIONS);
}

export async function savePublication(pub: Publication): Promise<Publication> {
  const pubToSave: Publication = {
    ...pub,
    id: pub.id || `pub-${Date.now()}`,
  };

  if (isFirebaseConfigured && db) {
    try {
      await setDoc(doc(db, 'publications', pubToSave.id), pubToSave);
    } catch (err) {
      console.error('Error saving publication to Firestore', err);
    }
  }

  const list = getLocal<Publication[]>(STORAGE_KEYS.PUBLICATIONS, INITIAL_PUBLICATIONS);
  const idx = list.findIndex(p => p.id === pubToSave.id);
  if (idx >= 0) {
    list[idx] = pubToSave;
  } else {
    list.unshift(pubToSave);
  }
  setLocal(STORAGE_KEYS.PUBLICATIONS, list);

  return pubToSave;
}

export async function deletePublication(id: string): Promise<void> {
  if (isFirebaseConfigured && db) {
    try {
      await deleteDoc(doc(db, 'publications', id));
    } catch (err) {
      console.error('Error deleting publication from Firestore', err);
    }
  }

  const list = getLocal<Publication[]>(STORAGE_KEYS.PUBLICATIONS, INITIAL_PUBLICATIONS);
  setLocal(STORAGE_KEYS.PUBLICATIONS, list.filter(p => p.id !== id));
}

// ==================== PROJECTS ====================
export async function getProjects(): Promise<DocumentationProject[]> {
  if (isFirebaseConfigured && db) {
    try {
      const snapshot = await getDocs(collection(db, 'projects'));
      if (!snapshot.empty) {
        return snapshot.docs.map(d => ({ id: d.id, ...d.data() } as DocumentationProject));
      }
    } catch (err) {
      console.warn('Firestore projects fetch error', err);
    }
  }
  return getLocal<DocumentationProject[]>(STORAGE_KEYS.PROJECTS, INITIAL_PROJECTS);
}

export async function getProject(id: string): Promise<DocumentationProject | null> {
  if (isFirebaseConfigured && db) {
    try {
      const snapshot = await getDoc(doc(db, 'projects', id));
      if (snapshot.exists()) {
        return { id: snapshot.id, ...snapshot.data() } as DocumentationProject;
      }
    } catch (err) {
      console.warn('Firestore project fetch error', err);
    }
  }
  const list = getLocal<DocumentationProject[]>(STORAGE_KEYS.PROJECTS, INITIAL_PROJECTS);
  return list.find(p => p.id === id) || null;
}

export async function saveProject(project: DocumentationProject): Promise<DocumentationProject> {
  const projToSave: DocumentationProject = {
    ...project,
    id: project.id || `proj-${Date.now()}`,
  };

  if (isFirebaseConfigured && db) {
    try {
      await setDoc(doc(db, 'projects', projToSave.id), projToSave);
    } catch (err) {
      console.error('Error saving project to Firestore', err);
    }
  }

  const list = getLocal<DocumentationProject[]>(STORAGE_KEYS.PROJECTS, INITIAL_PROJECTS);
  const idx = list.findIndex(p => p.id === projToSave.id);
  if (idx >= 0) {
    list[idx] = projToSave;
  } else {
    list.unshift(projToSave);
  }
  setLocal(STORAGE_KEYS.PROJECTS, list);

  return projToSave;
}

export async function deleteProject(id: string): Promise<void> {
  if (isFirebaseConfigured && db) {
    try {
      await deleteDoc(doc(db, 'projects', id));
    } catch (err) {
      console.error('Error deleting project from Firestore', err);
    }
  }

  const list = getLocal<DocumentationProject[]>(STORAGE_KEYS.PROJECTS, INITIAL_PROJECTS);
  setLocal(STORAGE_KEYS.PROJECTS, list.filter(p => p.id !== id));
}

// ==================== EVENTS ====================
export async function getEvents(): Promise<CldsEvent[]> {
  if (isFirebaseConfigured && db) {
    try {
      const q = query(collection(db, 'events'), orderBy('startDate', 'desc'));
      const snapshot = await getDocs(q);
      if (!snapshot.empty) {
        return snapshot.docs.map(d => ({ id: d.id, ...d.data() } as CldsEvent));
      }
    } catch (err) {
      console.warn('Firestore events fetch error', err);
    }
  }
  return getLocal<CldsEvent[]>(STORAGE_KEYS.EVENTS, INITIAL_EVENTS);
}

export async function getEvent(id: string): Promise<CldsEvent | null> {
  if (isFirebaseConfigured && db) {
    try {
      const snapshot = await getDoc(doc(db, 'events', id));
      if (snapshot.exists()) {
        return { id: snapshot.id, ...snapshot.data() } as CldsEvent;
      }
    } catch (err) {
      console.warn('Firestore event fetch error', err);
    }
  }
  const events = getLocal<CldsEvent[]>(STORAGE_KEYS.EVENTS, INITIAL_EVENTS);
  return events.find(e => e.id === id || e.slug === id) || null;
}

export async function saveEvent(event: CldsEvent): Promise<CldsEvent> {
  const toSave: CldsEvent = {
    ...event,
    id: event.id || `event-${Date.now()}`,
    slug: event.slug || event.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''),
  };

  if (isFirebaseConfigured && db) {
    try {
      await setDoc(doc(db, 'events', toSave.id), toSave);
    } catch (err) {
      console.error('Error saving event to Firestore', err);
    }
  }

  const list = getLocal<CldsEvent[]>(STORAGE_KEYS.EVENTS, INITIAL_EVENTS);
  const idx = list.findIndex(e => e.id === toSave.id);
  if (idx >= 0) {
    list[idx] = toSave;
  } else {
    list.unshift(toSave);
  }
  setLocal(STORAGE_KEYS.EVENTS, list);

  return toSave;
}

export async function deleteEvent(id: string): Promise<void> {
  if (isFirebaseConfigured && db) {
    try {
      await deleteDoc(doc(db, 'events', id));
    } catch (err) {
      console.error('Error deleting event from Firestore', err);
    }
  }

  const list = getLocal<CldsEvent[]>(STORAGE_KEYS.EVENTS, INITIAL_EVENTS);
  setLocal(STORAGE_KEYS.EVENTS, list.filter(e => e.id !== id));
}

// ==================== TEAM ====================
export async function getTeam(): Promise<TeamMember[]> {
  if (isFirebaseConfigured && db) {
    try {
      const snapshot = await getDocs(collection(db, 'team'));
      if (!snapshot.empty) {
        return snapshot.docs.map(d => ({ id: d.id, ...d.data() } as TeamMember));
      }
    } catch (err) {
      console.warn('Firestore team fetch error', err);
    }
  }
  return getLocal<TeamMember[]>(STORAGE_KEYS.TEAM, INITIAL_TEAM);
}

export async function saveTeamMember(member: TeamMember): Promise<TeamMember> {
  const toSave: TeamMember = {
    ...member,
    id: member.id || `team-${Date.now()}`,
  };

  if (isFirebaseConfigured && db) {
    try {
      await setDoc(doc(db, 'team', toSave.id), toSave);
    } catch (err) {
      console.error('Error saving team member to Firestore', err);
    }
  }

  const list = getLocal<TeamMember[]>(STORAGE_KEYS.TEAM, INITIAL_TEAM);
  const idx = list.findIndex(t => t.id === toSave.id);
  if (idx >= 0) {
    list[idx] = toSave;
  } else {
    list.push(toSave);
  }
  setLocal(STORAGE_KEYS.TEAM, list);

  return toSave;
}

export async function deleteTeamMember(id: string): Promise<void> {
  if (isFirebaseConfigured && db) {
    try {
      await deleteDoc(doc(db, 'team', id));
    } catch (err) {
      console.error('Error deleting team member from Firestore', err);
    }
  }

  const list = getLocal<TeamMember[]>(STORAGE_KEYS.TEAM, INITIAL_TEAM);
  setLocal(STORAGE_KEYS.TEAM, list.filter(t => t.id !== id));
}

// ==================== LINKS ====================
export async function getLinks(): Promise<ExternalLink[]> {
  if (isFirebaseConfigured && db) {
    try {
      const snapshot = await getDocs(collection(db, 'links'));
      if (!snapshot.empty) {
        return snapshot.docs.map(d => ({ id: d.id, ...d.data() } as ExternalLink));
      }
    } catch (err) {
      console.warn('Firestore links fetch error', err);
    }
  }
  return getLocal<ExternalLink[]>(STORAGE_KEYS.LINKS, INITIAL_LINKS);
}

export async function saveLink(link: ExternalLink): Promise<ExternalLink> {
  const toSave: ExternalLink = {
    ...link,
    id: link.id || `link-${Date.now()}`,
  };

  if (isFirebaseConfigured && db) {
    try {
      await setDoc(doc(db, 'links', toSave.id), toSave);
    } catch (err) {
      console.error('Error saving link to Firestore', err);
    }
  }

  const list = getLocal<ExternalLink[]>(STORAGE_KEYS.LINKS, INITIAL_LINKS);
  const idx = list.findIndex(l => l.id === toSave.id);
  if (idx >= 0) {
    list[idx] = toSave;
  } else {
    list.unshift(toSave);
  }
  setLocal(STORAGE_KEYS.LINKS, list);

  return toSave;
}

export async function deleteLink(id: string): Promise<void> {
  if (isFirebaseConfigured && db) {
    try {
      await deleteDoc(doc(db, 'links', id));
    } catch (err) {
      console.error('Error deleting link from Firestore', err);
    }
  }

  const list = getLocal<ExternalLink[]>(STORAGE_KEYS.LINKS, INITIAL_LINKS);
  setLocal(STORAGE_KEYS.LINKS, list.filter(l => l.id !== id));
}

// ==================== FILE UPLOAD ====================
export async function uploadDocument(
  file: File, 
  folder: 'publications' | 'posts' | 'projects' | 'events' = 'publications'
): Promise<{ url: string; size: string; name: string }> {
  const formattedSize = file.size > 1024 * 1024 
    ? `${(file.size / (1024 * 1024)).toFixed(1)} MB` 
    : `${Math.round(file.size / 1024)} KB`;

  if (isFirebaseConfigured && storage) {
    try {
      const cleanName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
      const storagePath = `clds-documents/${folder}/${Date.now()}_${cleanName}`;
      const storageRef = ref(storage, storagePath);
      const snapshot = await uploadBytes(storageRef, file);
      const downloadUrl = await getDownloadURL(snapshot.ref);
      return {
        url: downloadUrl,
        size: formattedSize,
        name: file.name,
      };
    } catch (err) {
      console.error('Firebase Storage upload error, falling back to local object reader', err);
    }
  }

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      resolve({
        url: reader.result as string,
        size: formattedSize,
        name: file.name,
      });
    };
    reader.onerror = error => reject(error);
    reader.readAsDataURL(file);
  });
}

// Reset data to default initial seed
export function resetDataToDefaults(): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEYS.POSTS, JSON.stringify(INITIAL_POSTS));
  localStorage.setItem(STORAGE_KEYS.PUBLICATIONS, JSON.stringify(INITIAL_PUBLICATIONS));
  localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(INITIAL_PROJECTS));
  localStorage.setItem(STORAGE_KEYS.EVENTS, JSON.stringify(INITIAL_EVENTS));
  localStorage.setItem(STORAGE_KEYS.TEAM, JSON.stringify(INITIAL_TEAM));
  localStorage.setItem(STORAGE_KEYS.LINKS, JSON.stringify(INITIAL_LINKS));
}
