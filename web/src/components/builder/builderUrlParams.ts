import type { BuilderFields, BuilderSource } from './builderTypes';

const DEFAULT_FIELDS: BuilderFields = {
    skill: 'js',
    image: '',
    level: '4',
    size: '64',
    style: 'rounded',
    startColor: '',
    endColor: '',
};

function normalizeColor(raw: string | null): string {
    if (raw === null) {
        return '';
    }
    return raw.replace(/^#/, '').trim();
}

export function parseBuilderSearchParams(
    sp: URLSearchParams,
): { fields: BuilderFields; source: BuilderSource } {
    const imageRaw = sp.get('image')?.trim() ?? '';
    const source: BuilderSource = imageRaw ? 'image' : 'skill';

    const skill =
        source === 'skill'
            ? (sp.get('skill')?.trim() ?? DEFAULT_FIELDS.skill)
            : '';
    const image = source === 'image' ? imageRaw : '';

    const level = sp.get('level')?.trim() ?? '';
    const size = sp.get('size')?.trim() ?? DEFAULT_FIELDS.size;
    const style = sp.get('style')?.trim() ?? DEFAULT_FIELDS.style;
    const startColor = normalizeColor(sp.get('startColor'));
    const endColor = normalizeColor(sp.get('endColor'));

    return {
        source,
        fields: {
            skill,
            image,
            level,
            size,
            style,
            startColor,
            endColor,
        },
    };
}

export function builderFieldsToSearchParams(
    fields: BuilderFields,
    source: BuilderSource,
): URLSearchParams {
    const next = new URLSearchParams();
    if (source === 'skill' && fields.skill.trim()) {
        next.set('skill', fields.skill.trim());
    }
    if (source === 'image' && fields.image.trim()) {
        next.set('image', fields.image.trim());
    }
    if (fields.level.trim()) {
        next.set('level', fields.level.trim());
    }
    if (fields.size.trim()) {
        next.set('size', fields.size.trim());
    }
    if (fields.style.trim()) {
        next.set('style', fields.style.trim());
    }
    if (fields.startColor.trim()) {
        next.set('startColor', fields.startColor.trim().replace(/^#/, ''));
    }
    if (fields.endColor.trim()) {
        next.set('endColor', fields.endColor.trim().replace(/^#/, ''));
    }
    return next;
}

export { DEFAULT_FIELDS };
