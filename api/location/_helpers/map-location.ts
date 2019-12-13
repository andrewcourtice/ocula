export default function(feature) {
    const {
        id,
        text,
        place_name,
        center
    } = feature;

    return {
        id,
        shortName: text,
        longName: place_name,
        latitude: center[1],
        longitude: center[0]
    };
}