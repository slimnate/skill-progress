type BuilderLinkPanelProps = {
    fullUrl: string;
    copyMessage: string;
    onCopyClick: () => void;
};

export default function BuilderLinkPanel({
    fullUrl,
    copyMessage,
    onCopyClick,
}: BuilderLinkPanelProps) {
    return (
        <>
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
                onClick={onCopyClick}
            >
                Copy link
            </button>
            {copyMessage ? <p className='builder-help'>{copyMessage}</p> : null}
        </>
    );
}
