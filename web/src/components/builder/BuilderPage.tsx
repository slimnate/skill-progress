import { useState } from 'react';
import BuilderForm from './BuilderForm';
import BuilderLinkPanel from './BuilderLinkPanel';
import BuilderPreview from './BuilderPreview';
import type { BuilderFields } from './builderTypes';
import { useBuilderBadge } from './useBuilderBadge';

const initialFields: BuilderFields = {
    skill: 'js',
    image: '',
    level: '4',
    size: '64',
    style: 'rounded',
    startColor: '',
    endColor: '',
};

export default function BuilderPage() {
    const [fields, setFields] = useState<BuilderFields>(initialFields);
    const [copyMessage, setCopyMessage] = useState('');
    const { previewUrl, validationMessage } = useBuilderBadge(fields);
    const fullUrl = previewUrl;

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
                <BuilderForm
                    fields={fields}
                    updateField={updateField}
                    validationMessage={validationMessage}
                />

                <article className='builder-card'>
                    <BuilderPreview previewUrl={previewUrl} />
                    <BuilderLinkPanel
                        fullUrl={fullUrl}
                        copyMessage={copyMessage}
                        onCopyClick={handleCopyClick}
                    />
                </article>
            </div>
        </section>
    );
}
