import Htop from "./hotp";
import {HashAlgorithm} from "./lib/hash_algorithm";

export interface TotpOption {
    digits: number,
    algorithm?: HashAlgorithm,
    period: number,
    timestamp: number
}

export class Totp {

    constructor(private readonly htop: Htop = new Htop()) {
    }

    generate(
        secret: string,
        option?: Partial<TotpOption>,
    ): string {
        const digits = option?.digits ?? 6;
        const hashAlgorithm = option?.algorithm;
        const period = (option?.period ?? 30) * 1000;
        const timestamp = option?.timestamp ?? Date.now();

        const timeStep = Math.floor(timestamp / period);

        const otp = this.htop.generate(secret, timeStep, {
            digits: digits,
            hashAlgorithm: hashAlgorithm,
        })

        return otp.toString().padStart(6, '0')
    }
}