import LOCATION from '../../enums/forecast/location';

import setLocation from './set-location';

export default function setCurrentLocation(): void {
    setLocation(LOCATION.current);
}