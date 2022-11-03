export class IndentWorker {
    indent: number;

    constructor(indent: number) {
        this.indent = indent;
    }

    public get(level = 1): string {
        return " ".repeat(this.indent * level);
    }
}