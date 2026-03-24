/** Fixed categories for builder chips and icon entries. */
export const SKILL_CATEGORIES = [
    'Language',
    'Frontend',
    'Backend',
    'Database',
    'CloudAndDevOps',
    'DataAndML',
    'MobileAndGame',
    'DesignAndCreative',
    'ToolsAndEditor',
    'Platform',
    'Other',
] as const;

export type SkillCategory = (typeof SKILL_CATEGORIES)[number];

export function skilliconsDevIconUrl(slug: string): string {
    return `https://skillicons.dev/icons?i=${encodeURIComponent(slug)}`;
}

/** Extra searchable strings per slug; slug itself is always searched. */
export const SKILL_ICON_ALIASES: Record<string, readonly string[]> = {
    js: ['javascript', 'ecmascript'],
    ts: ['typescript'],
    py: ['python'],
    cs: ['csharp', 'c#'],
    cpp: ['c++', 'cplusplus'],
    go: ['golang'],
    php: ['php hypertext'],
    ps: ['photoshop', 'adobe photoshop'],
    ae: ['after effects', 'adobe after effects'],
    xd: ['adobe xd'],
    md: ['markdown'],
    ai: ['adobe illustrator', 'illustrator'],
    pr: ['premiere', 'adobe premiere', 'premiere pro'],
    html: ['hypertext markup'],
    css: ['cascading style sheets'],
    wasm: ['webassembly'],
    react: ['reactjs', 'react.js'],
    vue: ['vuejs', 'vue.js'],
    nextjs: ['next.js', 'next'],
    nuxtjs: ['nuxt.js', 'nuxt'],
    nodejs: ['node', 'node.js'],
    postgres: ['postgresql', 'psql'],
    mongodb: ['mongo'],
    kubernetes: ['k8s', 'kube'],
    gcp: ['google cloud'],
    aws: ['amazon web services'],
    vscode: ['visual studio code', 'vs code'],
    vscodium: ['vs codium'],
    visualstudio: ['visual studio', 'msvc'],
    tailwind: ['tailwindcss', 'tailwind css'],
    materialui: ['mui', 'material ui'],
    styledcomponents: ['styled components'],
    threejs: ['three.js', 'three js'],
    rollupjs: ['rollup', 'rollup.js'],
    solidjs: ['solid.js'],
    alpinejs: ['alpine.js'],
    svelte: ['sveltejs'],
    angular: ['angularjs', 'angular.js'],
    graphql: ['gql'],
    ruby: ['rb'],
    dotnet: ['.net', 'net framework'],
    bash: ['shell', 'sh'],
    neovim: ['nvim'],
    pytorch: ['torch'],
    tensorflow: ['tf'],
    sklearn: ['scikit-learn', 'scikit learn'],
};

const LANGUAGE = new Set([
    'swift',
    'kotlin',
    'c',
    'cs',
    'cpp',
    'crystal',
    'clojure',
    'dart',
    'elixir',
    'forth',
    'fortran',
    'go',
    'haskell',
    'haxe',
    'java',
    'js',
    'ts',
    'lua',
    'nim',
    'ocaml',
    'perl',
    'php',
    'py',
    'r',
    'ruby',
    'rust',
    'scala',
    'swift',
    'v',
    'zig',
    'coffeescript',
    'solidity',
    'vala',
    'wasm',
    'aiscript',
    'matlab',
    'octave',
    'latex',
    'regex',
    'gherkin',
    'pkl',
]);

const FRONTEND = new Set([
    'html',
    'css',
    'sass',
    'less',
    'tailwind',
    'bootstrap',
    'materialui',
    'windicss',
    'react',
    'vue',
    'svelte',
    'angular',
    'astro',
    'nextjs',
    'nuxtjs',
    'remix',
    'gatsby',
    'webpack',
    'vite',
    'rollupjs',
    'ember',
    'alpinejs',
    'lit',
    'solidjs',
    'htmx',
    'emotion',
    'styledcomponents',
    'pug',
    'redux',
    'jquery',
    'd3',
    'threejs',
    'p5js',
    'babel',
    'gulp',
    'vuetify',
    'pinia',
    'reactivex',
]);

const BACKEND = new Set([
    'express',
    'fastapi',
    'django',
    'flask',
    'spring',
    'laravel',
    'rails',
    'nestjs',
    'symfony',
    'rocket',
    'actix',
    'elysia',
    'ktor',
    'hibernate',
    'apollo',
    'graphql',
    'nodejs',
    'deno',
    'bun',
    'socketio',
    'appwrite',
    'adonis',
]);

const DATABASE = new Set([
    'mongodb',
    'mysql',
    'postgres',
    'redis',
    'dynamodb',
    'cassandra',
    'prisma',
    'sequelize',
    'sqlite',
    'elasticsearch',
    'planetscale',
    'supabase',
    'firebase',
]);

const CLOUD_DEVOPS = new Set([
    'aws',
    'azure',
    'gcp',
    'docker',
    'kubernetes',
    'terraform',
    'ansible',
    'jenkins',
    'nginx',
    'cloudflare',
    'netlify',
    'vercel',
    'heroku',
    'gitlab',
    'github',
    'githubactions',
    'git',
    'bitbucket',
    'openshift',
    'openstack',
    'prometheus',
    'grafana',
    'rabbitmq',
    'kafka',
    'convex',
    'workos',
    'salesforce',
    'workers',
]);

const DATA_ML = new Set([
    'pytorch',
    'tensorflow',
    'sklearn',
    'opencv',
    'ai',
    'processing',
]);

const MOBILE_GAME = new Set([
    'androidstudio',
    'flutter',
    'unity',
    'unreal',
    'godot',
    'robloxstudio',
    'electron',
    'tauri',
    'bevy',
    'gamemakerstudio',
    'haxeflixel',
    'ios',
    'ios-light',
]);

const DESIGN = new Set([
    'figma',
    'xd',
    'ae',
    'ps',
    'blender',
    'sketchup',
    'webflow',
    'svg',
]);

const TOOLS = new Set([
    'vscode',
    'vim',
    'neovim',
    'idea',
    'webstorm',
    'pycharm',
    'phpstorm',
    'eclipse',
    'sublime',
    'atom',
    'emacs',
    'clion',
    'rider',
    'visualstudio',
    'vscodium',
    'postman',
    'replit',
    'notion',
    'obsidian',
    'codepen',
    'devto',
    'stackoverflow',
    'jira',
    'sourcetree',
    'cursor',
    'cmake',
    'gradle',
    'maven',
    'nix',
    'chrome',
    'selenium',
    'cypress',
    'jest',
    'vitest',
]);

const PLATFORM = new Set([
    'linux',
    'windows',
    'ubuntu',
    'debian',
    'arch',
    'bsd',
    'apple',
    'apple-light',
    'raspberrypi',
    'plan9',
    'mint',
    'kali',
    'redhat',
    'wpf',
    'gtk',
    'qt',
    'ros',
]);

export function categorizeSkillIconSlug(slug: string): SkillCategory {
    if (LANGUAGE.has(slug)) {
        return 'Language';
    }
    if (FRONTEND.has(slug)) {
        return 'Frontend';
    }
    if (BACKEND.has(slug)) {
        return 'Backend';
    }
    if (DATABASE.has(slug)) {
        return 'Database';
    }
    if (CLOUD_DEVOPS.has(slug)) {
        return 'CloudAndDevOps';
    }
    if (DATA_ML.has(slug)) {
        return 'DataAndML';
    }
    if (MOBILE_GAME.has(slug)) {
        return 'MobileAndGame';
    }
    if (DESIGN.has(slug)) {
        return 'DesignAndCreative';
    }
    if (TOOLS.has(slug)) {
        return 'ToolsAndEditor';
    }
    if (PLATFORM.has(slug)) {
        return 'Platform';
    }
    return 'Other';
}

export function aliasesForSkillSlug(slug: string): readonly string[] {
    return SKILL_ICON_ALIASES[slug] ?? [];
}
