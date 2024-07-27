import Htop from "./hotp";
import {HashKey} from "./lib/generate_hash_key";

export interface TotpOption {
    digits: number,
    period: number,
    timestamp: number
}

export default class Totp {

    constructor(private readonly htop: Htop = new Htop()) {
    }

    generate(
        key: HashKey,
        option?: Partial<TotpOption>,
    ): string {
        const digits = option?.digits ?? 6;
        const hashAlgorithm = key.algorithm;
        const period = (option?.period ?? 60) * 1000;
        const timestamp = option?.timestamp ?? Date.now();

        const timeStep = Math.floor(timestamp / period);
        let timeStepString = timeStep.toString()
        while (timeStepString.length < 16) {
            timeStepString = "0" + timeStepString;
        }

        const otp = this.htop.generate(key.key, timeStepString, {
            digits: digits,
            hashAlgorithm: hashAlgorithm,
        })

        let result = otp.toString()
        while (result.length < digits) {
            result = "0" + result
        }
        return result
    }
}