import initialiseApplication from './application';
import initialiseWorker from './worker';

export default function start() {
    initialiseApplication();
    initialiseWorker();
}