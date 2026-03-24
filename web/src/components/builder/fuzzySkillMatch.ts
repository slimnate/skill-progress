import type { SkillIconEntry } from '../../data/icons';
import type { SkillCategory } from '../../data/skillIconMeta';

function normalize(text: string): string {
    return text.toLowerCase().replace(/[^a-z0-9+#.\s]/g, '').trim();
}

function scoreAgainstField(queryNorm: string, fieldRaw: string): number {
    const f = normalize(fieldRaw);
    if (!queryNorm) {
        return 1;
    }
    if (!f) {
        return 0;
    }
    if (f === queryNorm) {
        return 10_000;
    }
    if (f.startsWith(queryNorm)) {
        return 5_000 + Math.max(0, 200 - f.length);
    }
    const idx = f.indexOf(queryNorm);
    if (idx >= 0) {
        return 2_000 + Math.max(0, 200 - idx - f.length);
    }
    let qi = 0;
    let gaps = 0;
    for (let i = 0; i < f.length && qi < queryNorm.length; i++) {
        if (f[i] === queryNorm[qi]) {
            qi++;
        } else {
            gaps++;
        }
    }
    if (qi === queryNorm.length) {
        return Math.max(0, 800 - gaps * 15);
    }
    if (queryNorm.length <= 4) {
        const dist = levenshtein(
            queryNorm,
            f.slice(0, Math.min(f.length, queryNorm.length + 2)),
        );
        if (dist <= 2) {
            return 100 - dist * 30;
        }
    }
    return 0;
}

function levenshtein(a: string, b: string): number {
    const m = a.length;
    const n = b.length;
    if (m === 0) {
        return n;
    }
    if (n === 0) {
        return m;
    }
    const row = new Array<number>(n + 1);
    for (let j = 0; j <= n; j++) {
        row[j] = j;
    }
    for (let i = 1; i <= m; i++) {
        let prev = row[0];
        row[0] = i;
        for (let j = 1; j <= n; j++) {
            const tmp = row[j];
            const cost = a[i - 1] === b[j - 1] ? 0 : 1;
            row[j] = Math.min(row[j] + 1, row[j - 1] + 1, prev + cost);
            prev = tmp;
        }
    }
    return row[n];
}

function scoreEntry(queryNorm: string, entry: SkillIconEntry): number {
    if (!queryNorm) {
        return 1;
    }
    let best = scoreAgainstField(queryNorm, entry.slug);
    for (const a of entry.aliases) {
        best = Math.max(best, scoreAgainstField(queryNorm, a));
    }
    return best;
}

/** Filter by category first, then rank by fuzzy score; empty query returns category-filtered list sorted by slug. */
export function rankSkillIconEntries(
    query: string,
    entries: readonly SkillIconEntry[],
    category: SkillCategory | null,
): SkillIconEntry[] {
    const q = normalize(query);
    let pool =
        category === null
            ? [...entries]
            : entries.filter((e) => e.category === category);
    if (!q) {
        pool.sort((a, b) => a.slug.localeCompare(b.slug));
        return pool;
    }
    const scored = pool
        .map((e) => ({ e, s: scoreEntry(q, e) }))
        .filter((x) => x.s > 0)
        .sort((a, b) => {
            if (b.s !== a.s) {
                return b.s - a.s;
            }
            if (a.e.slug.length !== b.e.slug.length) {
                return a.e.slug.length - b.e.slug.length;
            }
            return a.e.slug.localeCompare(b.e.slug);
        });
    return scored.map((x) => x.e);
}
