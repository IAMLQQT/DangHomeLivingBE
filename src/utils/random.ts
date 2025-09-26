export function randomOtp(numberChar: number) {
    return Math.floor(Math.random() * 1000000)
    .toString()
    .padStart(numberChar, "0");
}