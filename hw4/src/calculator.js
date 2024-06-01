class Calculator {
    static main(month1, day1, month2, day2, year) {
        if (month1 < 1 || month1 > 12) {
            throw new Error("invalid month1");
        }
        if (month2 < 1 || month2 > 12) {
            throw new Error("invalid month2");
        }
        if (day1 < 1 || day1 > 31) {
            throw new Error("invalid day1");
        }
        if (day2 < 1 || day2 > 31) {
            throw new Error("invalid day2");
        }
        if (year < 1 || year > 10000) {
            throw new Error("invalid year");
        }
        if (month1 === month2 && day1 > day2) {
            throw new Error("day1 must be less than day2 if month1 is equal to month2");
        }
        if (month1 > month2) {
            throw new Error("month1 must be less than month2");
        }

        return this.#calculate(month1, day1, month2, day2, year);
    }

    static #calculate(month1, day1, month2, day2, year) {
        let numDays;

        if (month2 === month1) {
            numDays = day2 - day1;
        } else {
            // ignore 0 index
            let daysIn = [0, 31, 0, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
            if (this.#isLeapYear(year))
                daysIn[2] = 29;
            else
                daysIn[2] = 28;

            numDays = day2 + (daysIn[month1] - day1);

            for (let i = month1 + 1; i <= month2 - 1; i++)
                numDays += daysIn[i];
        }
        return numDays;
    }

    static #isLeapYear(year) {
        return ((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0);
    }
}

module.exports = Calculator;