const numberToPersianWords = (num: number): string => {
    const persianNumbers: { [key: number]: string } = {
        0: "صفر", 1: "یک", 2: "دو", 3: "سه", 4: "چهار",
        5: "پنج", 6: "شش", 7: "هفت", 8: "هشت", 9: "نه",
        10: "ده", 11: "یازده", 12: "دوازده", 13: "سیزده",
        14: "چهارده", 15: "پانزده", 16: "شانزده", 17: "هفده",
        18: "هجده", 19: "نوزده", 20: "بیست", 30: "سی", 40: "چهل",
        50: "پنجاه", 60: "شصت", 70: "هفتاد", 80: "هشتاد", 90: "نود",
        100: "صد", 200: "دویست", 300: "سیصد", 400: "چهارصد",
        500: "پانصد", 600: "ششصد", 700: "هفتصد", 800: "هشتصد", 900: "نهصد",
        1000: "یک هزار", 1000000: "یک میلیون", 1000000000: "یک میلیارد"
    };

    if (num === 0) return persianNumbers[0];
    if (num in persianNumbers) return persianNumbers[num];

    let result = "";
    
    // Handle billions
    if (num >= 1000000000) {
        const billions = Math.floor(num / 1000000000);
        result += `${numberToPersianWords(billions)} میلیارد `;
        num %= 1000000000;
        if (num > 0) result += "و ";
    }

    // Handle millions
    if (num >= 1000000) {
        const millions = Math.floor(num / 1000000);
        result += `${numberToPersianWords(millions)} میلیون `;
        num %= 1000000;
        if (num > 0) result += "و ";
    }

    // Handle thousands
    if (num >= 1000) {
        const thousands = Math.floor(num / 1000);
        result += `${numberToPersianWords(thousands)} هزار `;
        num %= 1000;
        if (num > 0) result += "و ";
    }

    // Handle hundreds
    if (num >= 100) {
        const hundreds = Math.floor(num / 100) * 100;
        result += `${numberToPersianWords(hundreds)} `;
        num %= 100;
        if (num > 0) result += "و ";
    }

    // Handle tens and units
    if (num > 0) {
        if (num < 20) {
            result += `${persianNumbers[num]} `;
        } else {
            const tens = Math.floor(num / 10) * 10;
            const units = num % 10;
            result += `${persianNumbers[tens]}`;
            if (units > 0) {
                result += ` و ${persianNumbers[units]}`;
            }
        }
    }

    return result.replace(/\s+/g, ' ').trim();
};

export const formatPrice = (value: string | number): { persian: string; formattedNumber: string } => {
    const number = typeof value === 'string' ? parseFloat(value.replace(/,/g, '')) : value;

    if (isNaN(number)) return { 
        persian: '۰ تومان (صفر تومان)', 
        formattedNumber: '۰ تومان' 
    };

    const formattedNumber = new Intl.NumberFormat('fa-IR').format(number) + ' تومان';
    const persianWords = number === 0 ? 'صفر تومان' : `${numberToPersianWords(number)} تومان`;

    return {
        persian: persianWords,
        formattedNumber: formattedNumber
    };
};