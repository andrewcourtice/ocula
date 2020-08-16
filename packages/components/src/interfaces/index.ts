export interface IPromisePayload {
    resolve(value?: any): void;
    reject(value?: any): void;
};

export interface IConfirmModalPayload {
    message: string;
    confirmLabel?: string;
    cancelLabel?: string;
};