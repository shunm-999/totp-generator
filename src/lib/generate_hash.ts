import {createHmac} from 'node:crypto'
import {HashAlgorithm} from "./hash_algorithm";
import {KeyObject} from "crypto";

export default class GenerateHashUseCase {
    static getInstance(): GenerateHashUseCase {
        return new GenerateHashUseCase();
    }

    invoke(
        key: KeyObject,
        text: string,
        algorithm: HashAlgorithm = {
            name: 'sha1',
        }
    ): string {
        return createHmac(
            algorithm.name,
            key
        )
            .update(Buffer.from(text, 'utf-8'))
            .digest('hex')
    }
}