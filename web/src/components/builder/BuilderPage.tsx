import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import BuilderForm from './BuilderForm';
import BuilderLinkPanel from './BuilderLinkPanel';
import BuilderPreview from './BuilderPreview';
import {
    builderFieldsToSearchParams,
    DEFAULT_FIELDS,
    parseBuilderSearchParams,
} from './builderUrlParams';
import type { BuilderFields, BuilderSource } from './builderTypes';
import { useBuilderBadge } from './useBuilderBadge';

function initialFromLocation(): {
    fields: BuilderFields;
    source: BuilderSource;
} {
    if (typeof window === 'undefined') {
        return { fields: DEFAULT_FIELDS, source: 'skill' };
    }
    return parseBuilderSearchParams(
        new URLSearchParams(window.location.search),
    );
}

export default function BuilderPage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [initialBundle] = useState(() => initialFromLocation());
    const [fields, setFields] = useState<BuilderFields>(initialBundle.fields);
    const [source, setSource] = useState<BuilderSource>(initialBundle.source);
    const [copyMessage, setCopyMessage] = useState('');
    const sourceRef = useRef(source);
    const skipParseFromUrl = useRef(false);

    sourceRef.current = source;

    const { previewUrl, validationMessage } = useBuilderBadge(fields);
    const fullUrl = previewUrl;

    function pushUrl(nextFields: BuilderFields, nextSource: BuilderSource) {
        skipParseFromUrl.current = true;
        setSearchParams(
            builderFieldsToSearchParams(nextFields, nextSource),
            { replace: true },
        );
    }

    useEffect(() => {
        if (skipParseFromUrl.current) {
            skipParseFromUrl.current = false;
            return;
        }
        const parsed = parseBuilderSearchParams(searchParams);
        setFields(parsed.fields);
        setSource(parsed.source);
    }, [searchParams]);

    useEffect(() => {
        pushUrl(initialBundle.fields, initialBundle.source);
    }, []);

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
        setFields((prev) => {
            const next = { ...prev, [key]: value };
            pushUrl(next, sourceRef.current);
            return next;
        });
        setCopyMessage('');
    }

    function onSourceChange(next: BuilderSource) {
        if (next === sourceRef.current) {
            return;
        }
        setSource(next);
        setFields((prev) => {
            const f =
                next === 'skill'
                    ? { ...prev, image: '' }
                    : { ...prev, skill: '' };
            pushUrl(f, next);
            return f;
        });
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
                    source={source}
                    onSourceChange={onSourceChange}
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
