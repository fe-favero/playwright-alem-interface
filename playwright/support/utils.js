export function generateULID() {
    const ENCODING = "0123456789ABCDEFGHJKMNPQRSTVWXYZ";
    const TIME_LEN = 10;
    const RANDOM_LEN = 16;

    function encodeTime(now, len) {
        let time = now;
        let str = "";
        for (let i = len - 1; i >= 0; i--) {
            str = ENCODING[time % 32] + str;
            time = Math.floor(time / 32);
        }
        return str;
    }

    function encodeRandom(len) {
        let str = "";
        for (let i = 0; i < len; i++) {
            const rand = Math.floor(Math.random() * 32);
            str += ENCODING[rand];
        }
        return str;
    }

    const time = Date.now();
    const timePart = encodeTime(time, TIME_LEN);
    const randomPart = encodeRandom(RANDOM_LEN);

    return timePart + randomPart;
}