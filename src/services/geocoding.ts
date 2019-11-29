export async function reverseGeocode(latitude: number, longitude: number) {
    const response = await fetch(`/api/reverse-geocode?latitude=${latitude}&longitude=${longitude}`);

    return response.json();
}