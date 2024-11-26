import Fuse from 'fuse.js';
import { Note } from '@/models/notes';

const fuseOptions = {
  keys: ['title', 'content'],
  threshold: 0.3,
  includeScore: true,
};

export const searchNotes = (notes: Note[], searchQuery: string): Note[] => {
  if (!searchQuery.trim()) return [];
  
  const fuse = new Fuse(notes, fuseOptions);
  const results = fuse.search(searchQuery);
  
  return results.map(result => result.item);
};