import { Link } from 'react-router-dom';

export default function HeroSection() {
    return (
        <section className='hero'>
            <p className='eyebrow'>SVG Badge Microservice</p>
            <h1>Show Your Skills With Visual Progress Badges.</h1>
            <p className='hero-copy'>
                Skill Progress creates embeddable SVG images from a skill icon
                or custom image URL, with optional proficiency bars to
                communicate confidence at a glance.
            </p>
            <div className='hero-actions'>
                <Link className='button button-primary' to='/builder'>
                    Open Builder
                </Link>
                <a
                    className='button button-secondary'
                    href='/progress?skill=js&level=4'
                >
                    Try API Example
                </a>
            </div>
        </section>
    );
}
