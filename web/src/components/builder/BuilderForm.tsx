import type { BuilderFields } from './builderTypes';

type BuilderFormProps = {
    fields: BuilderFields;
    updateField: <K extends keyof BuilderFields>(
        key: K,
        value: BuilderFields[K],
    ) => void;
    validationMessage: string;
};

export default function BuilderForm({
    fields,
    updateField,
    validationMessage,
}: BuilderFormProps) {
    return (
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
                    onChange={(e) => updateField('startColor', e.target.value)}
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
    );
}
