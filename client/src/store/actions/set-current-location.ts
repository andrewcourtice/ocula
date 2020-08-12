import LOCATION from '../../enums/location';

import setLocation from './set-location';

export default function setCurrentLocation(): void {
    setLocation(LOCATION.current);
}