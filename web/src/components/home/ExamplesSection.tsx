import type { Example } from './homeData';

type ExamplesSectionProps = {
    examples: Example[];
};

export default function ExamplesSection({ examples }: ExamplesSectionProps) {
    return (
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
    );
}
