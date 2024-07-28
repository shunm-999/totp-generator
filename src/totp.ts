import Htop from "./hotp";
import {HashAlgorithm} from "./lib/hash_algorithm";

export interface TotpOption {
    digits: number,
    algorithm: HashAlgorithm,
    period: number,
    timestamp: number
}

export class Totp {

    constructor(private readonly htop: Htop = new Htop()) {
    }

    generate(
        secret: string,
        {
            digits,
            algorithm,
            period,
            timestamp
        }: Partial<TotpOption> = {
            digits: 6,
            algorithm: {name: 'sha1'},
            period: 30,
            timestamp: Date.now()
        },
    ): string {
        const periodMs = (period ?? 30) * 1000;
        const timeStep = Math.floor((timestamp ?? Date.now()) / periodMs);

        const otp = this.htop.generate(secret, timeStep, {
            digits: digits,
            hashAlgorithm: algorithm,
        })

        return otp.toString().padStart(6, '0')
    }
}