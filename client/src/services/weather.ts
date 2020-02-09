export async function getForecast(latitude: number, longitude: number, units?: string) {
    const response = await fetch(`/api/weather/forecast?latitude=${latitude}&longitude=${longitude}&units=${units}`);

    return response.json();
}
