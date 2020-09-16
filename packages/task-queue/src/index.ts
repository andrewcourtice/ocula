export class TaskQueue {

    private _tasks: Set<Function>;
    private _suppressErrors: boolean;

    constructor(suppressErrors: boolean = false) {
        this._tasks = new Set();
        this._suppressErrors = suppressErrors;
    }

    get suppressErrors() {
        return this._suppressErrors;
    }

    set suppressErrors(value) {
        this._suppressErrors = !!value;
    }

    add(task: Function): void {
        this._tasks.add(task);
    }

    remove(task: Function): void {
        this._tasks.delete(task);
    }

    clear(): void {
        this._tasks.clear();
    }

    run(...args: any[]): void {
        this._tasks.forEach(task => {
            try {
                task(...args);
            } catch (error) {
                if (!this._suppressErrors) {
                    throw error;
                }
            } finally {
                this.remove(task);
            }
        });
    }

}

export default new TaskQueue();