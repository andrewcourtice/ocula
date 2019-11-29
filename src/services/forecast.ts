export async function getForecast(latitude, longitude, units) {
    const response = await fetch(`/api/forecast?latitude=${latitude}&longitude=${longitude}&units=${units}`);

    return response.json();
}