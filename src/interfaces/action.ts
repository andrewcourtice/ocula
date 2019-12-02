export default interface IAction<T> {
    state: T,
    getters: object,
    commit: <T = any>(mutation: string, payload: T) => void
    dispatch: <T = any>(action: string, payload: T) => void
};