import GenerateHashUseCase from "./lib/generate_hash";
import GenerateHtopUseCase from "./lib/generate_htop";
import {HashAlgorithm} from "./lib/hash_algorithm";
import {KeyObject} from "crypto";

export interface HtopOption {
    digits: number
    hashAlgorithm: HashAlgorithm
}

export default class Htop {

    constructor(
        private readonly generateHashUseCase: GenerateHashUseCase = GenerateHashUseCase.getInstance(),
        private readonly generateHtopUseCase: GenerateHtopUseCase = GenerateHtopUseCase.getInstance(),
    ) {
    }

    generate(
        key: KeyObject,
        counter: string,
        option?: Partial<HtopOption>
    ): number {
        const digits = option?.digits ?? 6
        const hashString = this.generateHashUseCase.invoke(key, counter, option?.hashAlgorithm);
        return this.generateHtopUseCase.invoke(hashString, digits);
    }
}