import GenerateHashUseCase from "./lib/generate_hash";
import GenerateHtopUseCase from "./lib/generate_htop";

const generateHash = GenerateHashUseCase.getInstance();
const generateHtop = GenerateHtopUseCase.getInstance();

const hashString = generateHash.invoke("secret", "Hello, World!");

const htop = generateHtop.invoke(hashString, 6);

console.log(hashString);
console.log(htop);