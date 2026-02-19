class SVG {
    constructor(private source: string) {
        this.source = this.sanitize(source);
    }

    sanitize(string: string): string {
        return string.replace(/<\?xml.*\?>/g, '');
    }

    setAttribute(name: string, value: string): void {
        this.source = this.source.replace(
            new RegExp(`${name}=".*?"`),
            `${name}="${value}"`,
        );
    }

    replaceColor(oldColor: string, newColor: string): void {
        this.source = this.source.replace(
            new RegExp(`#${oldColor}`),
            `#${newColor}`,
        );
    }

    toString(): string {
        return this.source;
    }
}

export { SVG };
