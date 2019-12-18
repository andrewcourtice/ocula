const IS_LOCAL = process.env.NODE_ENV === 'development';

export async function getForecast(latitude: number, longitude: number) {
    if (IS_LOCAL) {
        return import(/* webpackChunkName: 'mock-data' */ './_data/forecast.json');
    }
    const response = await fetch(`/api/weather/forecast?latitude=${latitude}&longitude=${longitude}`);

    return response.json();
}
