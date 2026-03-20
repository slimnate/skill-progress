import type { CustomIcon } from './homeData';

type IconsSectionProps = {
    customIcons: CustomIcon[];
};

export default function IconsSection({ customIcons }: IconsSectionProps) {
    return (
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
                <code>/progress?image=https://example.com/my-icon.svg</code>.
            </p>
            <p className='icons-copy'>
                It also includes these custom icons available in this
                repository:
            </p>
            <div className='icons-grid'>
                {customIcons.map((icon) => (
                    <article className='icon-card' key={icon.name}>
                        <img src={`/icons/${icon.file}`} alt={`${icon.name} icon`} />
                        <p>{icon.name}</p>
                    </article>
                ))}
            </div>
        </section>
    );
}
