// Membership functions for input variables (0-100)
const low = (x) => {
    if (x <= 30) return 1;
    if (x >= 50) return 0;
    return (50 - x) / 20;
};

const medium = (x) => {
    if (x <= 30 || x >= 70) return 0;
    if (x >= 30 && x <= 50) return (x - 30) / 20;
    if (x >= 50 && x <= 70) return (70 - x) / 20;
    return 0;
};

const high = (x) => {
    if (x <= 50) return 0;
    if (x >= 70) return 1;
    return (x - 50) / 20;
};

// Sugeno output constants
const outputConstants = {
    low: 40,
    medium: 70,
    high: 90,
};

// Rule base
const rules = [
    // Rule 1: If all criteria are low, then output is low
    {
        conditions: (k, kk, kp, se, kst) => low(k) && low(kk) && low(kp) && low(se) && low(kst),
        output: 'low',
    },
    // Rule 2: If any criteria is high and none are low, then output is high
    {
        conditions: (k, kk, kp, se, kst) => (high(k) || high(kk) || high(kp) || high(se) || high(kst)) &&
            !(low(k) || low(kk) || low(kp) || low(se) || low(kst)),
        output: 'high',
    },
    // Rule 3: Default case - medium
    {
        conditions: () => true,
        output: 'medium',
    },
];

// Calculate Sugeno output
export const calculateSugeno = ({ kehadiran, kecepatanKerja, kualitasPelayanan, sikapEtika, kerjaSamaTim }) => {
    const k = Number(kehadiran);
    const kk = Number(kecepatanKerja);
    const kp = Number(kualitasPelayanan);
    const se = Number(sikapEtika);
    const kst = Number(kerjaSamaTim);

    // Fuzzification
    const fuzzyValues = {
        kehadiran: { low: low(k), medium: medium(k), high: high(k) },
        kecepatanKerja: { low: low(kk), medium: medium(kk), high: high(kk) },
        kualitasPelayanan: { low: low(kp), medium: medium(kp), high: high(kp) },
        sikapEtika: { low: low(se), medium: medium(se), high: high(se) },
        kerjaSamaTim: { low: low(kst), medium: medium(kst), high: high(kst) },
    };

    // Rule evaluation
    let totalWeight = 0;
    let weightedSum = 0;

    for (const rule of rules) {
        if (rule.conditions(k, kk, kp, se, kst)) {
            // For simplicity, we use the average of all membership values as the rule weight
            const weight = (
                fuzzyValues.kehadiran[rule.output] +
                fuzzyValues.kecepatanKerja[rule.output] +
                fuzzyValues.kualitasPelayanan[rule.output] +
                fuzzyValues.sikapEtika[rule.output] +
                fuzzyValues.kerjaSamaTim[rule.output]
            ) / 5;

            weightedSum += weight * outputConstants[rule.output];
            totalWeight += weight;
            break; // We use the first matching rule (priority-based)
        }
    }

    // Defuzzification
    const crispOutput = weightedSum / totalWeight;
    return crispOutput;
};