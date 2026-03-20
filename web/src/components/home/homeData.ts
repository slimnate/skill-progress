export type Example = {
    label: string;
    url: string;
};

export type Feature = {
    icon: string;
    title: string;
    description: string;
};

export type Parameter = {
    name: string;
    required: string;
    description: string;
};

export type CustomIcon = {
    name: string;
    file: string;
};

export const examples: Example[] = [
    {
        label: 'JavaScript - Level 4',
        url: 'https://skill-progress-production.up.railway.app/progress?skill=js&level=4&size=64',
    },
    {
        label: 'React - Flat Style',
        url: 'https://skill-progress-production.up.railway.app/progress?skill=react&level=4&style=flat&size=64',
    },
    {
        label: 'Convex - Custom Colors',
        url: 'https://skill-progress-production.up.railway.app/progress?skill=convex&level=4&size=64&startColor=667eea&endColor=764ba2',
    },
    {
        label: 'TypeScript - Icon Only',
        url: 'https://skill-progress-production.up.railway.app/progress?skill=ts&size=64',
    },
];

export const features: Feature[] = [
    {
        icon: '🖼️',
        title: 'Flexible Inputs',
        description:
            'Generate SVG badges from skill names or custom image URLs.',
    },
    {
        icon: '📊',
        title: 'Proficiency Levels',
        description: 'Show proficiency with level-based bars from 1 to 5.',
    },
    {
        icon: '🎯',
        title: 'Icon-Only Mode',
        description: 'Return icon-only output when level is omitted.',
    },
    {
        icon: '🎨',
        title: 'Visual Customization',
        description: 'Customize size, style, and gradient colors.',
    },
    {
        icon: '🔗',
        title: 'Easy Embedding',
        description: 'Embed directly in Markdown, HTML, docs, and portfolios.',
    },
];

export const parameters: Parameter[] = [
    {
        name: 'skill',
        required: 'One of skill or image',
        description: 'Skill name from skill-icons or custom icon keys.',
    },
    {
        name: 'image',
        required: 'One of skill or image',
        description: 'Direct URL to an icon image (SVG, PNG, JPG, JPEG).',
    },
    {
        name: 'level',
        required: 'Optional',
        description: 'Proficiency level from 1 to 5. Omit for icon-only mode.',
    },
    {
        name: 'size',
        required: 'Optional',
        description: 'Output size in pixels from 16 to 512 (default: 48).',
    },
    {
        name: 'style',
        required: 'Optional',
        description: 'Progress style: rounded (default) or flat.',
    },
    {
        name: 'startColor',
        required: 'Optional (with endColor)',
        description: 'Gradient start hex color without #.',
    },
    {
        name: 'endColor',
        required: 'Optional (with startColor)',
        description: 'Gradient end hex color without #.',
    },
];

export const customIcons: CustomIcon[] = [
    { name: 'convex', file: 'Convex-Dark.svg' },
    { name: 'workos', file: 'WorkOS-Dark.svg' },
    { name: 'svg', file: 'SVG-Dark.svg' },
    { name: 'ios', file: 'iOS-Dark.svg' },
    { name: 'ios-light', file: 'iOS-Light.svg' },
    { name: 'apple', file: 'Apple-Dark.svg' },
    { name: 'apple-light', file: 'Apple-Light.svg' },
    { name: 'cursor', file: 'Cursor-Dark.svg' },
    { name: 'railway', file: 'Railway-Dark.svg' },
    { name: 'chrome', file: 'Chrome-Dark.svg' },
    { name: 'jira', file: 'Jira.svg' },
    { name: 'salesforce', file: 'Salesforce-Dark.svg' },
    { name: 'socketio', file: 'SocketIO-Dark.svg' },
    { name: 'sourcetree', file: 'SourceTree.svg' },
    { name: 'wpf', file: 'WPF-Dark.svg' },
    { name: 'jekyll', file: 'Jekyll-Dark.svg' },
];

export const quickstartExampleUrl =
    'https://skill-progress-production.up.railway.app/progress?skill=js&level=4&size=48';
