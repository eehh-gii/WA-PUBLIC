// Agungnur.y

// Define the styles as constants
const StrikeStyle = {
    StrikeTilde: '\u0334',
    StrikeStrokeShort: '\u0335',
    StrikeStrokeLong: '\u0336',
    StrikeSolidusShort: '\u0337',
    StrikeSolidusLong: '\u0338'
};

const UnderlineStyle = {
    UnderlineInvertedDoubleArch: '\u032b',
    UnderlineCaron: '\u030c',
    UnderlineCircumflexAccent: '\u0302',
    UnderlineBreve: '\u0306',
    UnderlineInvertedBreve: '\u0311',
    UnderlineTilde: '\u0303',
    UnderlineMacron: '\u0304',
    UnderlineLine: '\u0332',
    UnderlineDoubleLine: '\u0333'
};

const OverlineStyle = {
    OverlineCircumflex: '\u0302',
    OverlineTilde: '\u0303',
    OverlineMacron: '\u0304',
    OverlineLine: '\u0305',
    OverlineBreve: '\u0306',
    OverlineDot: '\u0307',
    OverlineDiaeresis: '\u0308'
};

// Function to apply diacritic marks
function diacritic(text, r) {
    return text.split('').map(c => c + (c !== '\n' ? r : '')).join('');
}

// Text styling functions
function Strikethrough(text, style) {
    return diacritic(text, style);
}

function Underline(text, style) {
    return diacritic(text, style);
}

function Overline(text, style) {
    return diacritic(text, style);
}

function offsetTranslate(text, offsets) {
    return text.split('').map(r => {
        for (const [start, end, replacement] of offsets) {
            if (r >= start && r <= end) {
                return String.fromCharCode(r.charCodeAt(0) + (replacement.charCodeAt(0) - start.charCodeAt(0)));
            }
        }
        return r;
    }).join('');
}

function BoldMan(text) {
    const offsets = [
        ['A', 'Z', '𝐀'],
        ['a', 'z', '𝐚'],
        ['0', '9', '𝟎']
    ];
    return offsetTranslate(text, offsets);
}

function BoldSans(text) {
    const offsets = [
        ['A', 'Z', '𝐀'],
        ['a', 'z', '𝐚'],
        ['0', '9', '𝟎']
    ];
    return offsetTranslate(text, offsets);
}

function ItalicSans(text) {
    const offsets = [
        ['A', 'Z', '𝑨'],
        ['a', 'z', '𝒶']
    ];
    return offsetTranslate(text, offsets);
}

function Cursive(text) {
    const offsets = [
        ['A', 'A', '𝒶'],
        ['B', 'B', '𝒷'],
        ['C', 'D', '𝒸'],
        ['E', 'F', '𝒻'],
        ['G', 'G', '𝒼'],
        ['H', 'H', '𝒽'],
        ['I', 'I', '𝒾'],
        ['J', 'K', '𝒿'],
        ['L', 'L', '𝓁'],
        ['M', 'M', '𝓂'],
        ['N', 'Q', '𝓃'],
        ['R', 'R', '𝓇'],
        ['S', 'Z', '𝓈'],
        ['a', 'd', '𝒶'],
        ['e', 'e', '𝑒'],
        ['f', 'f', '𝒻'],
        ['g', 'g', '𝑔'],
        ['h', 'n', '𝒽'],
        ['o', 'o', '𝑜'],
        ['p', 'z', '𝓅']
    ];
    return offsetTranslate(text, offsets);
}

function Fraktur(text) {
    const offsets = [
        ['A', 'B', '𝔸'],
        ['C', 'C', 'ℭ'],
        ['D', 'G', '𝔻'],
        ['H', 'H', 'ℍ'],
        ['I', 'I', '𝕀'],
        ['J', 'Q', '𝕁'],
        ['R', 'R', 'ℝ'],
        ['S', 'Y', '𝕊'],
        ['Z', 'Z', 'ℨ'],
        ['a', 'z', '𝔞']
    ];
    return offsetTranslate(text, offsets);
}

// Export functions
module.exports = {
    StrikeStyle,
    UnderlineStyle,
    OverlineStyle,
    Strikethrough,
    Underline,
    Overline,
    BoldMan,
    BoldSans,
    ItalicSans,
    Cursive,
    Fraktur
};
