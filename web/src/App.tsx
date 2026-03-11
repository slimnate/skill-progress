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

export default function App() {
    return (
        <>
            <header>
                <nav>
                    <ul>
                        <li className="navbar-logo">
                            <a href="/">skill-progress</a>
                        </li>
                        <li className="navbar-item">
                            <a href="/builder">Builder</a>
                        </li>
                    </ul>
                </nav>
            </header>

            <main>
                <section className="hero">
                    <p className='eyebrow'>SVG Badge Microservice</p>
                    <h1>Show Your Skills With Visual Progress Badges.</h1>
                    <p className="hero-copy">
                        Skill Progress creates embeddable SVG images from a
                        skill icon or custom image URL, with optional
                        proficiency bars to communicate confidence at a glance.
                    </p>
                    <div className="hero-actions">
                        <a className="button button-primary" href="/builder">
                            Open Builder
                        </a>
                        <a
                            className="button button-secondary"
                            href="/progress?skill=js&level=4"
                        >
                            Try API Example
                        </a>
                    </div>
                </section>

                <section className='feature-section'>
                    <h2>What It Can Do</h2>
                    <div className="feature-grid">
                        {features.map((feature) => (
                            <article
                                className="feature-card"
                                key={feature.title}
                            >
                                <div className="feature-card-header">
                                    <span
                                        className="feature-icon"
                                        aria-hidden="true"
                                    >
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
                    <div className="examples-grid">
                        {examples.map((example) => (
                            <article className="example-card" key={example.url}>
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
                        <code>
                            /progress?image=https://example.com/my-icon.svg
                        </code>
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
            </main>

            <footer>
                <p>Copyright 2026 Skill Progress</p>
            </footer>
        </>
    );
}
