export declare class MimeType {
    type: string;
    params: Record<string, string>;
    private constructor();
    toString(): string;
    static create(type: any, params: Record<string, string>): MimeType;
    isIdentical(other: MimeType): Boolean;
    isEqual(other: MimeType): Boolean;
    static fromString(mimeType: string): MimeType;
}
//# sourceMappingURL=MimeType.d.ts.map