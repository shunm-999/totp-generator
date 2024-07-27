import Totp from "./totp";
import GenerateHashKeyUseCase from "./lib/generate_hash_key";

GenerateHashKeyUseCase.getInstance().invoke().then((key) => {
    const totp = new Totp().generate(key)
    console.log(totp);
});
