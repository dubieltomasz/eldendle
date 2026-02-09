export function TodaysEldendle(arraySize: number): number {
    return new Date().getDate() % arraySize;
}