type BuilderPreviewProps = {
    previewUrl: string;
};

export default function BuilderPreview({ previewUrl }: BuilderPreviewProps) {
    return (
        <>
            <h2>Preview</h2>
            <div className='builder-preview'>
                {previewUrl ? (
                    <img src={previewUrl} alt='Generated badge preview' />
                ) : (
                    <p className='builder-empty'>
                        Add required values to preview your badge.
                    </p>
                )}
            </div>
        </>
    );
}
