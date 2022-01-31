import { DefaultSerializer } from "v8";

export const luhnCheck = (strToTest: string): boolean => {

	if (typeof strToTest !== 'string') return false;
	if (strToTest.length === 0) return false;

	let digit = 0;
    let sum = 0;
    let length = strToTest.length;
    let odd = false;

    for (let i = (length - 1); i >= 0; i--) {
        digit = parseInt(strToTest[i], 10) | 0;

        if (odd === true) digit = digit * 2 | 0; 
        if (digit > 9) digit = digit - 9;
        odd = !odd;
        sum += digit;
    }

    return sum % 10 === 0;

};