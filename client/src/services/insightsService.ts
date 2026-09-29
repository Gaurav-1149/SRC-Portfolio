import { insightsData as staticInsights, InsightPost } from '../data/insightsData.js';

export type { InsightPost };

const LOCAL_STORAGE_KEY = 'src_firm_published_insights';

function getStoredLocal(): InsightPost[] | null {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : null;
  } catch {
    return null;
  }
}

function saveStoredLocal(insights: InsightPost[]): void {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(insights));
  } catch (err) {
    console.error('Failed to save to localStorage:', err);
  }
}

export async function fetchAllInsights(): Promise<InsightPost[]> {
  try {
    const res = await fetch('/api/insights');
    if (res.ok) {
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        saveStoredLocal(json.data);
        return json.data;
      }
    }
  } catch (err) {
    console.warn('Backend API unavailable, falling back to local store:', err);
  }

  // Fallback to localStorage or static fallback
  const local = getStoredLocal();
  if (local) {
    return local;
  }

  saveStoredLocal(staticInsights);
  return staticInsights;
}

export async function createNewInsight(post: Omit<InsightPost, 'id'>): Promise<InsightPost> {
  const baseSlug = post.title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  const fallbackId = `${baseSlug || 'insight'}-${Date.now().toString().slice(-4)}`;

  const newInsight: InsightPost = {
    ...post,
    id: fallbackId,
  };

  try {
    const res = await fetch('/api/insights', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(post),
    });

    if (res.ok) {
      const json = await res.json();
      if (json.success && json.data) {
        // Update local cache
        const current = getStoredLocal() || staticInsights;
        const updated = [json.data, ...current.filter((item) => item.id !== json.data.id)];
        saveStoredLocal(updated);
        return json.data;
      }
    }
  } catch (err) {
    console.warn('Server offline, saving insight locally:', err);
  }

  // Local fallback save
  const current = getStoredLocal() || staticInsights;
  const updated = [newInsight, ...current.filter((item) => item.id !== newInsight.id)];
  saveStoredLocal(updated);
  return newInsight;
}

export async function updateExistingInsight(id: string, post: Partial<InsightPost>): Promise<InsightPost> {
  try {
    const res = await fetch(`/api/insights/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(post),
    });

    if (res.ok) {
      const json = await res.json();
      if (json.success && json.data) {
        const current = getStoredLocal() || staticInsights;
        const updated = current.map((item) => (item.id === id ? json.data : item));
        saveStoredLocal(updated);
        return json.data;
      }
    }
  } catch (err) {
    console.warn('Server offline, updating insight locally:', err);
  }

  // Local fallback update
  const current = getStoredLocal() || staticInsights;
  let updatedPost: InsightPost | null = null;
  const updated = current.map((item) => {
    if (item.id === id) {
      updatedPost = { ...item, ...post };
      return updatedPost;
    }
    return item;
  });
  saveStoredLocal(updated);
  return updatedPost || ({ ...post, id } as InsightPost);
}

export async function deleteExistingInsight(id: string): Promise<boolean> {
  try {
    const res = await fetch(`/api/insights/${id}`, {
      method: 'DELETE',
    });
    if (res.ok) {
      const current = getStoredLocal() || staticInsights;
      const updated = current.filter((item) => item.id !== id);
      saveStoredLocal(updated);
      return true;
    }
  } catch (err) {
    console.warn('Server offline, deleting insight locally:', err);
  }

  // Local fallback delete
  const current = getStoredLocal() || staticInsights;
  const updated = current.filter((item) => item.id !== id);
  saveStoredLocal(updated);
  return true;
}
