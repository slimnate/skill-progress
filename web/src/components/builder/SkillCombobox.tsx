import { useCallback, useEffect, useId, useMemo, useRef, useState } from 'react';
import {
    allSkillIconEntries,
    skillEntryBySlug,
    type SkillIconEntry,
} from '../../data/icons';
import {
    SKILL_CATEGORIES,
    type SkillCategory,
} from '../../data/skillIconMeta';
import { rankSkillIconEntries } from './fuzzySkillMatch';

const CATEGORY_LABELS: Record<SkillCategory, string> = {
    Language: 'Language',
    Frontend: 'Frontend',
    Backend: 'Backend',
    Database: 'Database',
    CloudAndDevOps: 'Cloud & DevOps',
    DataAndML: 'Data & ML',
    MobileAndGame: 'Mobile & Game',
    DesignAndCreative: 'Design & Creative',
    ToolsAndEditor: 'Tools & Editor',
    Platform: 'Platform',
    Other: 'Other',
};

type SkillComboboxProps = {
    value: string;
    onValueChange: (next: string) => void;
    onSkillPicked: (slug: string) => void;
    categoryFilter: SkillCategory | null;
    onCategoryChange: (next: SkillCategory | null) => void;
    recentSlugs: string[];
};

const LIST_MAX = 80;

export default function SkillCombobox({
    value,
    onValueChange,
    onSkillPicked,
    categoryFilter,
    onCategoryChange,
    recentSlugs,
}: SkillComboboxProps) {
    const listId = useId();
    const inputId = useId();
    const [open, setOpen] = useState(false);
    const [highlighted, setHighlighted] = useState(0);
    const wrapRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const ranked = useMemo(() => {
        return rankSkillIconEntries(
            value,
            allSkillIconEntries,
            categoryFilter,
        ).slice(0, LIST_MAX);
    }, [value, categoryFilter]);

    useEffect(() => {
        setHighlighted(0);
    }, [value, categoryFilter, ranked.length]);

    const selectEntry = useCallback(
        (entry: SkillIconEntry) => {
            onValueChange(entry.slug);
            onSkillPicked(entry.slug);
            setOpen(false);
            inputRef.current?.blur();
        },
        [onSkillPicked, onValueChange],
    );

    const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (!open && (e.key === 'ArrowDown' || e.key === 'ArrowUp')) {
            setOpen(true);
            e.preventDefault();
            return;
        }
        if (!open) {
            return;
        }
        if (e.key === 'Escape') {
            setOpen(false);
            e.preventDefault();
            return;
        }
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setHighlighted((i) => Math.min(i + 1, ranked.length - 1));
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setHighlighted((i) => Math.max(i - 1, 0));
        } else if (e.key === 'Enter' && ranked.length > 0) {
            e.preventDefault();
            selectEntry(ranked[highlighted]);
        }
    };

    useEffect(() => {
        function onDocPointerDown(ev: MouseEvent) {
            if (!wrapRef.current?.contains(ev.target as Node)) {
                setOpen(false);
            }
        }
        document.addEventListener('pointerdown', onDocPointerDown);
        return () => document.removeEventListener('pointerdown', onDocPointerDown);
    }, []);

    const known = skillEntryBySlug.get(value.trim());

    return (
        <div className='skill-combobox' ref={wrapRef}>
            <div className='builder-category-chips' role='group' aria-label='Filter by category'>
                <button
                    type='button'
                    className={
                        categoryFilter === null
                            ? 'builder-chip builder-chip-active'
                            : 'builder-chip'
                    }
                    aria-pressed={categoryFilter === null}
                    onClick={() => onCategoryChange(null)}
                >
                    All
                </button>
                {SKILL_CATEGORIES.map((cat) => (
                    <button
                        key={cat}
                        type='button'
                        className={
                            categoryFilter === cat
                                ? 'builder-chip builder-chip-active'
                                : 'builder-chip'
                        }
                        aria-pressed={categoryFilter === cat}
                        onClick={() =>
                            onCategoryChange(categoryFilter === cat ? null : cat)
                        }
                    >
                        {CATEGORY_LABELS[cat]}
                    </button>
                ))}
            </div>

            {recentSlugs.length > 0 ? (
                <div className='builder-recent-skills'>
                    <span className='builder-recent-label'>Recent</span>
                    <div className='builder-recent-chips'>
                        {recentSlugs.map((slug) => (
                            <button
                                key={slug}
                                type='button'
                                className='builder-recent-chip'
                                onClick={() => {
                                    onValueChange(slug);
                                    onSkillPicked(slug);
                                }}
                            >
                                {slug}
                            </button>
                        ))}
                    </div>
                </div>
            ) : null}

            <label htmlFor={inputId} className='builder-sr-only'>
                Skill slug
            </label>
            <input
                ref={inputRef}
                id={inputId}
                type='text'
                className='skill-combobox-input'
                autoComplete='off'
                autoCorrect='off'
                spellCheck={false}
                role='combobox'
                aria-expanded={open}
                aria-controls={listId}
                aria-autocomplete='list'
                aria-activedescendant={
                    open && ranked[highlighted]
                        ? `${listId}-opt-${highlighted}`
                        : undefined
                }
                value={value}
                onChange={(e) => {
                    onValueChange(e.target.value);
                    setOpen(true);
                }}
                onFocus={() => setOpen(true)}
                onKeyDown={onKeyDown}
                placeholder='Search skill name or alias…'
            />

            {value.trim() && !known ? (
                <p className='skill-combobox-hint'>
                    Slug not in local list; preview may still work via skillicons.dev.
                </p>
            ) : null}

            {open && ranked.length > 0 ? (
                <ul
                    id={listId}
                    className='skill-combobox-list'
                    role='listbox'
                    aria-label='Matching skills'
                >
                    {ranked.map((entry, index) => (
                        <li
                            key={entry.slug}
                            id={`${listId}-opt-${index}`}
                            role='option'
                            aria-selected={index === highlighted}
                            className={
                                index === highlighted
                                    ? 'skill-combobox-option skill-combobox-option-active'
                                    : 'skill-combobox-option'
                            }
                            onMouseEnter={() => setHighlighted(index)}
                            onMouseDown={(ev) => {
                                ev.preventDefault();
                                selectEntry(entry);
                            }}
                        >
                            <img
                                src={entry.url}
                                alt=''
                                width={28}
                                height={28}
                                loading='lazy'
                                className='skill-combobox-thumb'
                            />
                            <span className='skill-combobox-slug'>{entry.slug}</span>
                            {entry.aliases.length > 0 ? (
                                <span className='skill-combobox-aliases'>
                                    {entry.aliases.slice(0, 3).join(', ')}
                                    {entry.aliases.length > 3 ? '…' : ''}
                                </span>
                            ) : null}
                        </li>
                    ))}
                </ul>
            ) : null}
        </div>
    );
}
