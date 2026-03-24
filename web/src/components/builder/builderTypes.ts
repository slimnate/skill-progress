export type BuilderSource = 'skill' | 'image';

export type BuilderFields = {
    skill: string;
    image: string;
    level: string;
    size: string;
    style: string;
    startColor: string;
    endColor: string;
};

export type BuilderDerivedState = {
    canGenerate: boolean;
    previewUrl: string;
    validationMessage: string;
};
