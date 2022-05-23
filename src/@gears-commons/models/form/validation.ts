export interface Validation {
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    allowedExtensions?: string[];
    minWidth?: number;
    maxWidth?: number;
    minHeight?: number;
    maxHeight?: number;
}
