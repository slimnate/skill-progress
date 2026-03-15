import type { Feature } from './homeData';

type FeatureSectionProps = {
    features: Feature[];
};

export default function FeatureSection({ features }: FeatureSectionProps) {
    return (
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
    );
}
