import { format, parseISO } from 'date-fns';

export function formatDate(date: string): string {
  return format(parseISO(date), 'MMMM dd, yyyy');
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
}

export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

export function createImageUrl(path: string | null): string {
  if (!path) return 'https://images.pexels.com/photos/3768763/pexels-photo-3768763.jpeg';
  return path;
}