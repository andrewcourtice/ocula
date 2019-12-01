export async function getForecast(locationId: number, days: number = 1) {
    const response = await fetch(`/api/weather/forecast?location=${locationId}&days=${days}`);

    return response.json();
}