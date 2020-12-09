import type {
    IForecast
} from '../types/weather';

export async function getForecast(latitude: number, longitude: number, units?: string): Promise<IForecast> {
    const response = await fetch(`/api/weather/forecast?latitude=${latitude}&longitude=${longitude}&units=${units}`);

    return response.json();
}
