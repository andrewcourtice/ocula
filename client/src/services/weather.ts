export async function getForecast(latitude: number, longitude: number) {
    const response = await fetch(`/api/weather/forecast?latitude=${latitude}&longitude=${longitude}`);

    return response.json();
}
