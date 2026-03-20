import { useMemo } from 'react';
import type { BuilderDerivedState, BuilderFields } from './builderTypes';

export function useBuilderBadge(fields: BuilderFields): BuilderDerivedState {
    const hasSkillOrImage =
        fields.skill.trim().length > 0 || fields.image.trim().length > 0;
    const startColor = fields.startColor.trim().replace(/^#/, '');
    const endColor = fields.endColor.trim().replace(/^#/, '');
    const colorsArePaired =
        (startColor.length === 0 && endColor.length === 0) ||
        (startColor.length > 0 && endColor.length > 0);
    const canGenerate = hasSkillOrImage && colorsArePaired;

    const queryString = useMemo(() => {
        if (!canGenerate) {
            return '';
        }
        const params = new URLSearchParams();
        if (fields.skill.trim()) {
            params.set('skill', fields.skill.trim());
        }
        if (fields.image.trim()) {
            params.set('image', fields.image.trim());
        }
        if (fields.level.trim()) {
            params.set('level', fields.level.trim());
        }
        if (fields.size.trim()) {
            params.set('size', fields.size.trim());
        }
        if (fields.style.trim()) {
            params.set('style', fields.style.trim());
        }
        if (startColor && endColor) {
            params.set('startColor', startColor);
            params.set('endColor', endColor);
        }
        return params.toString();
    }, [canGenerate, endColor, fields, startColor]);

    const progressBaseUrl = useMemo(
        () => new URL('/progress', window.location.origin).toString(),
        [],
    );
    const previewUrl = queryString ? `${progressBaseUrl}?${queryString}` : '';
    const validationMessage = !hasSkillOrImage
        ? 'Enter a skill or image URL to generate a badge.'
        : !colorsArePaired
          ? 'Enter both start and end colors together, or leave both empty.'
          : '';

    return {
        canGenerate,
        previewUrl,
        validationMessage,
    };
}
