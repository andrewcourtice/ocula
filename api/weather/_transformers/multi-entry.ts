export default function transformMultiEntry(days) {
    return days.map(({ entries }) => entries);
}