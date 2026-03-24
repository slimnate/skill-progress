const STORAGE_KEY = 'skill-progress:builder:recent-skills';
const MAX_RECENTS = 10;

export function readRecentSkillSlugs(): string[] {
    try {
        const raw = sessionStorage.getItem(STORAGE_KEY);
        if (!raw) {
            return [];
        }
        const parsed = JSON.parse(raw) as unknown;
        if (!Array.isArray(parsed)) {
            return [];
        }
        return parsed.filter((x): x is string => typeof x === 'string');
    } catch {
        return [];
    }
}

export function pushRecentSkillSlug(slug: string): void {
    const trimmed = slug.trim();
    if (!trimmed) {
        return;
    }
    const prev = readRecentSkillSlugs().filter((s) => s !== trimmed);
    const next = [trimmed, ...prev].slice(0, MAX_RECENTS);
    try {
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
        /* ignore quota */
    }
}
