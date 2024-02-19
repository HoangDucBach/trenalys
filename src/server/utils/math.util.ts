export class MathUtil {
    static generateRandomNumber(digits: number = 4) {
        return Math.floor(Math.random() * Math.pow(10, digits));
    }
}
