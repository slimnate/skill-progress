const examples = [
    {
        label: 'JavaScript - level 4',
        url: 'https://skill-progress-production.up.railway.app/progress?skill=js&level=4&size=64',
    },
    {
        label: 'React - flat style',
        url: 'https://skill-progress-production.up.railway.app/progress?skill=react&level=4&style=flat&size=64',
    },
    {
        label: 'Convex - custom colors',
        url: 'https://skill-progress-production.up.railway.app/progress?skill=convex&level=4&size=64&startColor=667eea&endColor=764ba2',
    },
    {
        label: 'TypeScript - icon only',
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
                    <p className="eyebrow">SVG badge microservice</p>
                    <h1>Show your skills with visual progress badges.</h1>
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

                <section className="feature-section">
                    <h2>What it can do</h2>
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

                <section className="examples-section">
                    <h2>Examples in action</h2>
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

                <section className="quickstart-section">
                    <h2>Quick start</h2>
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
            </main>

            <footer>
                <p>Copyright 2026 Skill Progress</p>
            </footer>
        </>
    );
}
