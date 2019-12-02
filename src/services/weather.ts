export async function getForecast(locationId: number, days: number = 7) {
    const response = await fetch(`/api/weather/forecast?location=${locationId}&days=${days}`);

    return response.json();
}