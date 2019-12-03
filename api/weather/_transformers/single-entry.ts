export default function transformSingleEntry(days) {
    return days.map(day => day.entries[0]);
}