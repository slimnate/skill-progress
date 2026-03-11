import { useMemo, useState } from 'react';

const examples = [
    {
        label: 'JavaScript - Level 4',
        url: 'https://skill-progress-production.up.railway.app/progress?skill=js&level=4&size=64',
    },
    {
        label: 'React - Flat Style',
        url: 'https://skill-progress-production.up.railway.app/progress?skill=react&level=4&style=flat&size=64',
    },
    {
        label: 'Convex - Custom Colors',
        url: 'https://skill-progress-production.up.railway.app/progress?skill=convex&level=4&size=64&startColor=667eea&endColor=764ba2',
    },
    {
        label: 'TypeScript - Icon Only',
        url: 'https://skill-progress-production.up.railway.app/progress?skill=ts&size=64',
    },
];

const features = [
    {
        icon: '🖼️',
        title: 'Flexible Inputs',
        description:
            'Generate SVG badges from skill names or custom image URLs.',
    },
    {
        icon: '📊',
        title: 'Proficiency Levels',
        description: 'Show proficiency with level-based bars from 1 to 5.',
    },
    {
        icon: '🎯',
        title: 'Icon-Only Mode',
        description: 'Return icon-only output when level is omitted.',
    },
    {
        icon: '🎨',
        title: 'Visual Customization',
        description: 'Customize size, style, and gradient colors.',
    },
    {
        icon: '🔗',
        title: 'Easy Embedding',
        description: 'Embed directly in Markdown, HTML, docs, and portfolios.',
    },
];

const parameters = [
    {
        name: 'skill',
        required: 'One of skill or image',
        description: 'Skill name from skill-icons or custom icon keys.',
    },
    {
        name: 'image',
        required: 'One of skill or image',
        description: 'Direct URL to an icon image (SVG, PNG, JPG, JPEG).',
    },
    {
        name: 'level',
        required: 'Optional',
        description: 'Proficiency level from 1 to 5. Omit for icon-only mode.',
    },
    {
        name: 'size',
        required: 'Optional',
        description: 'Output size in pixels from 16 to 512 (default: 48).',
    },
    {
        name: 'style',
        required: 'Optional',
        description: 'Progress style: rounded (default) or flat.',
    },
    {
        name: 'startColor',
        required: 'Optional (with endColor)',
        description: 'Gradient start hex color without #.',
    },
    {
        name: 'endColor',
        required: 'Optional (with startColor)',
        description: 'Gradient end hex color without #.',
    },
];

const customIcons = [
    { name: 'convex', file: 'Convex-Dark.svg' },
    { name: 'workos', file: 'WorkOS-Dark.svg' },
    { name: 'svg', file: 'SVG-Dark.svg' },
    { name: 'ios', file: 'iOS-Dark.svg' },
    { name: 'ios-light', file: 'iOS-Light.svg' },
    { name: 'apple', file: 'Apple-Dark.svg' },
    { name: 'apple-light', file: 'Apple-Light.svg' },
    { name: 'cursor', file: 'Cursor-Dark.svg' },
    { name: 'railway', file: 'Railway-Dark.svg' },
    { name: 'chrome', file: 'Chrome-Dark.svg' },
    { name: 'jira', file: 'Jira.svg' },
    { name: 'salesforce', file: 'Salesforce-Dark.svg' },
    { name: 'socketio', file: 'SocketIO-Dark.svg' },
    { name: 'sourcetree', file: 'SourceTree.svg' },
    { name: 'wpf', file: 'WPF-Dark.svg' },
    { name: 'jekyll', file: 'Jekyll-Dark.svg' },
];

type BuilderFields = {
    skill: string;
    image: string;
    level: string;
    size: string;
    style: string;
    startColor: string;
    endColor: string;
};

function HomePage() {
    return (
        <>
            <section className='hero'>
                <p className='eyebrow'>SVG Badge Microservice</p>
                <h1>Show Your Skills With Visual Progress Badges.</h1>
                <p className='hero-copy'>
                    Skill Progress creates embeddable SVG images from a skill
                    icon or custom image URL, with optional proficiency bars to
                    communicate confidence at a glance.
                </p>
                <div className='hero-actions'>
                    <a className='button button-primary' href='/builder'>
                        Open Builder
                    </a>
                    <a
                        className='button button-secondary'
                        href='/progress?skill=js&level=4'
                    >
                        Try API Example
                    </a>
                </div>
            </section>

            <section className='feature-section'>
                <h2>What It Can Do</h2>
                <div className='feature-grid'>
                    {features.map((feature) => (
                        <article className='feature-card' key={feature.title}>
                            <div className='feature-card-header'>
                                <span className='feature-icon' aria-hidden='true'>
                                    {feature.icon}
                                </span>
                                <h3>{feature.title}</h3>
                            </div>
                            <p>{feature.description}</p>
                        </article>
                    ))}
                </div>
            </section>

            <section className='examples-section'>
                <h2>Examples in Action</h2>
                <div className='examples-grid'>
                    {examples.map((example) => (
                        <article className='example-card' key={example.url}>
                            <h3>{example.label}</h3>
                            <img src={example.url} alt={example.label} />
                            <code>{example.url}</code>
                        </article>
                    ))}
                </div>
            </section>

            <section className='quickstart-section'>
                <h2>Quick Start</h2>
                <div className='parameter-table-wrapper'>
                    <table className='parameter-table'>
                        <thead>
                            <tr>
                                <th>Parameter</th>
                                <th>Required</th>
                                <th>Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            {parameters.map((parameter) => (
                                <tr key={parameter.name}>
                                    <td>
                                        <code>{parameter.name}</code>
                                    </td>
                                    <td>{parameter.required}</td>
                                    <td>{parameter.description}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <pre>
                    <code>
                        {
                            'https://skill-progress-production.up.railway.app/progress?skill=js&level=4&size=48'
                        }
                    </code>
                </pre>
            </section>

            <section className='icons-section'>
                <h2>Icons</h2>
                <p className='icons-copy'>
                    Skill Progress supports the full icon catalog from{' '}
                    <a
                        href='https://github.com/tandpfun/skill-icons?tab=readme-ov-file#icons-list'
                        target='_blank'
                        rel='noreferrer'
                    >
                        skill-icons
                    </a>{' '}
                    via the <code>skill</code> parameter.
                </p>
                <p className='icons-copy'>
                    You can also use arbitrary image URLs with the{' '}
                    <code>image</code> parameter, for example:{' '}
                    <code>/progress?image=https://example.com/my-icon.svg</code>
                    .
                </p>
                <p className='icons-copy'>
                    It also includes these custom icons available in this
                    repository:
                </p>
                <div className='icons-grid'>
                    {customIcons.map((icon) => (
                        <article className='icon-card' key={icon.name}>
                            <img
                                src={`/icons/${icon.file}`}
                                alt={`${icon.name} icon`}
                            />
                            <p>{icon.name}</p>
                        </article>
                    ))}
                </div>
            </section>
        </>
    );
}

function BuilderPage() {
    const [fields, setFields] = useState<BuilderFields>({
        skill: 'js',
        image: '',
        level: '4',
        size: '64',
        style: 'rounded',
        startColor: '',
        endColor: '',
    });
    const [copyMessage, setCopyMessage] = useState('');

    const hasSkillOrImage =
        fields.skill.trim().length > 0 || fields.image.trim().length > 0;
    const startColor = fields.startColor.trim().replace(/^#/, '');
    const endColor = fields.endColor.trim().replace(/^#/, '');
    const colorsArePaired =
        (startColor.length === 0 && endColor.length === 0) ||
        (startColor.length > 0 && endColor.length > 0);
    const canGenerate = hasSkillOrImage && colorsArePaired;

    const queryString = useMemo(() => {
        if (!canGenerate) {
            return '';
        }
        const params = new URLSearchParams();
        if (fields.skill.trim()) {
            params.set('skill', fields.skill.trim());
        }
        if (fields.image.trim()) {
            params.set('image', fields.image.trim());
        }
        if (fields.level.trim()) {
            params.set('level', fields.level.trim());
        }
        if (fields.size.trim()) {
            params.set('size', fields.size.trim());
        }
        if (fields.style.trim()) {
            params.set('style', fields.style.trim());
        }
        if (startColor && endColor) {
            params.set('startColor', startColor);
            params.set('endColor', endColor);
        }
        return params.toString();
    }, [canGenerate, endColor, fields, startColor]);

    const progressBaseUrl = useMemo(
        () => new URL('/progress', window.location.origin).toString(),
        [],
    );
    const previewUrl = queryString
        ? `${progressBaseUrl}?${queryString}`
        : '';
    const fullUrl = previewUrl;

    const validationMessage = !hasSkillOrImage
        ? 'Enter a skill or image URL to generate a badge.'
        : !colorsArePaired
          ? 'Enter both start and end colors together, or leave both empty.'
          : '';

    async function handleCopyClick() {
        if (!fullUrl) {
            return;
        }
        try {
            await navigator.clipboard.writeText(fullUrl);
            setCopyMessage('Link copied to clipboard.');
        } catch {
            setCopyMessage('Unable to copy automatically. Copy the link field.');
        }
    }

    function updateField<K extends keyof BuilderFields>(
        key: K,
        value: BuilderFields[K],
    ) {
        setFields((prev) => ({ ...prev, [key]: value }));
        setCopyMessage('');
    }

    return (
        <section className='builder-page'>
            <h1>Badge Builder</h1>
            <p className='builder-copy'>
                Set parameters, preview the output, and copy a ready-to-share
                link.
            </p>

            <div className='builder-layout'>
                <article className='builder-card'>
                    <h2>Parameters</h2>
                    <form className='builder-form' onSubmit={(e) => e.preventDefault()}>
                        <label htmlFor='skill'>skill</label>
                        <input
                            id='skill'
                            type='text'
                            value={fields.skill}
                            onChange={(e) => updateField('skill', e.target.value)}
                            placeholder='js, react, convex'
                        />

                        <label htmlFor='image'>image</label>
                        <input
                            id='image'
                            type='url'
                            value={fields.image}
                            onChange={(e) => updateField('image', e.target.value)}
                            placeholder='https://example.com/icon.svg'
                        />

                        <label htmlFor='level'>level</label>
                        <select
                            id='level'
                            value={fields.level}
                            onChange={(e) => updateField('level', e.target.value)}
                        >
                            <option value=''>icon only</option>
                            <option value='1'>1</option>
                            <option value='2'>2</option>
                            <option value='3'>3</option>
                            <option value='4'>4</option>
                            <option value='5'>5</option>
                        </select>

                        <label htmlFor='size'>size</label>
                        <input
                            id='size'
                            type='number'
                            min='16'
                            max='512'
                            value={fields.size}
                            onChange={(e) => updateField('size', e.target.value)}
                        />

                        <label htmlFor='style'>style</label>
                        <select
                            id='style'
                            value={fields.style}
                            onChange={(e) => updateField('style', e.target.value)}
                        >
                            <option value='rounded'>rounded</option>
                            <option value='flat'>flat</option>
                        </select>

                        <label htmlFor='startColor'>startColor</label>
                        <input
                            id='startColor'
                            type='text'
                            value={fields.startColor}
                            onChange={(e) =>
                                updateField('startColor', e.target.value)
                            }
                            placeholder='ff6b6b'
                        />

                        <label htmlFor='endColor'>endColor</label>
                        <input
                            id='endColor'
                            type='text'
                            value={fields.endColor}
                            onChange={(e) => updateField('endColor', e.target.value)}
                            placeholder='4ecdc4'
                        />
                    </form>
                    {validationMessage ? (
                        <p className='builder-help builder-help-error'>
                            {validationMessage}
                        </p>
                    ) : (
                        <p className='builder-help'>
                            Leave <code>level</code> empty for icon-only mode.
                        </p>
                    )}
                </article>

                <article className='builder-card'>
                    <h2>Preview</h2>
                    <div className='builder-preview'>
                        {previewUrl ? (
                            <img src={previewUrl} alt='Generated badge preview' />
                        ) : (
                            <p className='builder-empty'>
                                Add required values to preview your badge.
                            </p>
                        )}
                    </div>

                    <h2>Copy Link</h2>
                    <label htmlFor='builder-url' className='builder-url-label'>
                        Shareable URL
                    </label>
                    <input
                        id='builder-url'
                        type='text'
                        readOnly
                        value={fullUrl}
                        className='builder-url'
                    />
                    <button
                        type='button'
                        className='button button-primary builder-copy-button'
                        disabled={!fullUrl}
                        onClick={handleCopyClick}
                    >
                        Copy link
                    </button>
                    {copyMessage ? <p className='builder-help'>{copyMessage}</p> : null}
                </article>
            </div>
        </section>
    );
}

export default function App() {
    const isBuilderPage =
        window.location.pathname === '/builder' ||
        window.location.pathname === '/builder/';

    return (
        <>
            <header>
                <nav>
                    <ul>
                        <li className='navbar-logo'>
                            <a href='/'>skill-progress</a>
                        </li>
                        <li className='navbar-item'>
                            <a href='/builder'>Builder</a>
                        </li>
                    </ul>
                </nav>
            </header>

            <main>{isBuilderPage ? <BuilderPage /> : <HomePage />}</main>

            <footer>
                <p>Copyright 2026 Skill Progress</p>
            </footer>
        </>
    );
}
