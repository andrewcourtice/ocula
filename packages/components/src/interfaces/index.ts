export interface IPromisePayload {
    resolve(value?: any): void;
    reject(value?: any): void;
};