const fs = require('fs');
const path = 'game.js';
let content = fs.readFileSync(path, 'utf8');

// 1. 定义那个“最完美时刻”的烤鸭和东坡肉
const beijingDuck = {
    "name": { "en": "Peking Duck", "zh": "北京烤鸭" },
    "stars": 5,
    "dim": 10,
    "mask": [
        [0, 0, 0, 0, 0, 4, 4, 4, 0, 0],
        [0, 0, 0, 4, 4, 4, 4, 4, 4, 0],
        [0, 2, 4, 4, 4, 8, 8, 4, 4, 2],
        [0, 4, 4, 4, 8, 4, 4, 4, 4, 2],
        [2, 4, 4, 4, 4, 4, 4, 4, 4, 4],
        [2, 4, 4, 4, 4, 4, 4, 4, 4, 4],
        [0, 5, 5, 4, 4, 4, 4, 4, 4, 5],
        [1, 1, 5, 5, 5, 5, 5, 5, 5, 1],
        [0, 1, 1, 6, 1, 7, 1, 7, 1, 0],
        [0, 0, 1, 1, 1, 1, 1, 1, 0, 0]
    ],
    "desktopDim": 26,
    "desktopMask": [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 3, 3, 3, 3, 2, 2, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 3, 3, 3, 4, 4, 3, 3, 3, 2, 2, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 2, 2, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 3, 3, 2, 2, 2, 0, 0],
        [0, 0, 0, 0, 0, 2, 2, 3, 3, 3, 4, 4, 4, 4, 8, 8, 4, 4, 4, 4, 3, 3, 3, 2, 2, 0],
        [0, 0, 0, 2, 2, 3, 4, 4, 4, 4, 4, 4, 8, 8, 8, 8, 8, 4, 4, 4, 4, 4, 3, 3, 2, 2],
        [0, 0, 2, 3, 3, 4, 4, 4, 4, 4, 4, 8, 8, 8, 8, 8, 8, 8, 4, 4, 4, 4, 4, 3, 3, 2],
        [0, 2, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 8, 8, 8, 8, 4, 4, 4, 4, 4, 4, 4, 3, 3],
        [2, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 3, 3],
        [2, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 3, 3],
        [2, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 3, 3],
        [5, 5, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 3, 3, 5, 5],
        [5, 5, 5, 5, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 3, 3, 3, 5, 5, 5],
        [5, 5, 5, 5, 5, 5, 5, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 3, 3, 3, 5, 5, 5, 5, 5],
        [1, 5, 5, 5, 5, 5, 5, 5, 5, 5, 4, 4, 4, 4, 4, 4, 3, 3, 3, 5, 5, 5, 5, 5, 5, 1],
        [1, 1, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 1, 1],
        [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
        [0, 0, 1, 1, 1, 1, 6, 6, 6, 6, 1, 7, 7, 7, 7, 7, 7, 1, 1, 1, 1, 1, 1, 1, 0, 0],
        [0, 0, 0, 1, 1, 6, 6, 6, 6, 6, 6, 1, 7, 7, 7, 7, 7, 7, 7, 1, 1, 1, 1, 0, 0, 0],
        [0, 0, 0, 0, 1, 6, 6, 6, 6, 6, 6, 1, 7, 7, 7, 7, 7, 7, 7, 1, 1, 1, 0, 0, 0, 0],
        [0, 0, 0, 0, 1, 6, 6, 6, 6, 6, 6, 1, 7, 7, 7, 7, 7, 7, 7, 1, 1, 1, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 1, 6, 6, 6, 6, 1, 1, 1, 7, 7, 7, 7, 7, 1, 1, 1, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ],
    "colors": { "1": "#f8f9fa", "2": "#a04000", "3": "#d35400", "4": "#e67e22", "5": "#2ecc71", "6": "#3e2723", "7": "#faf9f6", "8": "#f39c12" },
    "story": { "en": "Royal delicacy with perfectly crisped skin from old Beijing.", "zh": "金红油亮，皮酥肉嫩。北京饮食文化的皇冠明珠。" }
};

const dongpoPork = {
    "name": { "en": "Dongpo Pork", "zh": "东坡肉" },
    "stars": 4,
    "dim": 10,
    "mask": [
        [0, 0, 0, 0, 2, 2, 0, 0, 0, 0],
        [0, 0, 2, 2, 5, 5, 2, 2, 0, 0],
        [0, 2, 3, 3, 5, 5, 3, 3, 2, 0],
        [0, 2, 4, 4, 5, 5, 4, 4, 2, 0],
        [0, 2, 3, 3, 5, 5, 3, 3, 2, 0],
        [0, 2, 4, 4, 5, 5, 4, 4, 2, 0],
        [0, 2, 2, 2, 2, 2, 2, 2, 2, 0],
        [6, 6, 1, 1, 1, 1, 1, 1, 6, 6],
        [0, 6, 6, 6, 6, 6, 6, 6, 6, 0],
        [0, 0, 1, 1, 1, 1, 1, 1, 0, 0]
    ],
    "desktopDim": 18,
    "desktopMask": [
        [0, 0, 0, 0, 0, 0, 0, 0, 7, 7, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 2, 2, 2, 5, 5, 2, 2, 2, 0, 0, 0, 0, 0],
        [0, 0, 0, 2, 2, 9, 9, 2, 5, 5, 2, 9, 9, 2, 2, 0, 0, 0],
        [0, 0, 2, 2, 2, 2, 2, 2, 5, 5, 2, 2, 2, 2, 2, 2, 0, 0],
        [0, 2, 2, 3, 3, 10, 10, 3, 5, 5, 3, 10, 10, 3, 3, 2, 0, 0],
        [0, 2, 3, 3, 3, 3, 3, 3, 5, 5, 3, 3, 3, 3, 3, 3, 2, 0],
        [1, 2, 4, 4, 4, 4, 4, 4, 5, 5, 4, 4, 4, 4, 4, 4, 2, 1],
        [1, 2, 4, 4, 4, 4, 4, 4, 5, 5, 4, 4, 4, 4, 4, 4, 2, 1],
        [1, 2, 3, 3, 3, 3, 3, 3, 5, 5, 3, 3, 3, 3, 3, 3, 2, 1],
        [1, 2, 3, 3, 3, 3, 3, 3, 5, 5, 3, 3, 3, 3, 3, 3, 2, 1],
        [1, 2, 4, 4, 4, 4, 4, 4, 5, 5, 4, 4, 4, 4, 4, 4, 2, 1],
        [1, 2, 4, 4, 4, 4, 4, 4, 5, 5, 4, 4, 4, 4, 4, 4, 2, 1],
        [0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0],
        [0, 1, 6, 6, 6, 6, 0, 0, 0, 0, 0, 0, 6, 6, 6, 6, 1, 0],
        [0, 1, 6, 1, 1, 6, 6, 6, 6, 6, 6, 6, 6, 1, 1, 6, 1, 0],
        [0, 0, 1, 1, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 1, 1, 0, 0],
        [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
        [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0]
    ],
    "colors": { "1": "#f8f9fa", "2": "rgba(216, 108, 45, 1)", "3": "#e7a97aff", "4": "#f7db8cff", "5": "#fbc02d", "6": "#8bc34a", "7": "#689f38", "8": "#c66c28ff", "9": "#fffde7", "10": "#f17427ff" },
    "story": { "en": "Perfectly layered pork belly with a golden tie and emerald surroundings.", "zh": "肥瘦相间的艺术。嫩粉、乳白与金黄绳结，交织出跨越时空的软糯。" }
};

const asiaOrder = [
    { en: "Onigiri", stars: 1, dim: 6 },
    { en: "Kushiyaki", stars: 1, dim: 6 },
    { en: "Tanghulu", stars: 1, dim: 8 },
    { en: "Xiao Long Bao", stars: 1, dim: 6 },
    { en: "Spring Rolls", stars: 2, dim: 6 },
    { en: "Sushi Bento", stars: 2, dim: 6 },
    { en: "Ramen", stars: 3, dim: 8 },
    { en: "Bibimbap", stars: 3, dim: 8 },
    { en: "Dongpo Pork", stars: 4, dim: 10, data: dongpoPork },
    { en: "Peking Duck", stars: 5, dim: 10, data: beijingDuck }
];

const startMarker = 'const FOOD_LEVELS = ';
const pieceMarker = 'class Piece {';
const startIdx = content.indexOf(startMarker);
const searchEndIdx = content.indexOf(pieceMarker);
const lastBraceIdx = content.lastIndexOf('};', searchEndIdx);

if (startIdx !== -1 && lastBraceIdx !== -1) {
    const dataString = content.substring(startIdx + startMarker.length, lastBraceIdx + 2);
    let FOOD_LEVELS;
    try {
        FOOD_LEVELS = new Function('return ' + dataString)();
    } catch (e) { console.error("Parsing failed", e); process.exit(1); }

    const currentAsiaMap = {};
    FOOD_LEVELS.asia.forEach(d => { currentAsiaMap[d.name.en] = d; });
    const newAsia = [];
    asiaOrder.forEach(cfg => {
        let dish = cfg.data || currentAsiaMap[cfg.en];
        if (dish) { dish.stars = cfg.stars; dish.dim = cfg.dim; newAsia.push(dish); }
    });
    FOOD_LEVEL_RES = FOOD_LEVELS;
    FOOD_LEVEL_RES.asia = newAsia;

    // 2. 还原星星渲染逻辑 (还原回最满意的单行样式)
    const showDishesPattern = /item\.innerHTML = `[\s\S]*?<\/div>[\s\S]*?<\/div>\s*`;/m;
    const replacementHTML = `item.innerHTML = \`
            <span class="dish-name">\${levelData.name[currentLang]}</span>
            \${completedLevels[key] ? '<span class="served-badge">' + I18N[currentLang].served + '</span>' : ''}
            <span class="difficulty-stars">\${'★'.repeat(levelData.stars || 1)}\${'☆'.repeat(5 - (levelData.stars || 1))}</span>
        \`;`;
    content = content.replace(showDishesPattern, replacementHTML);

    function customStringify(obj, indent = 8) {
        if (Array.isArray(obj) && obj.length > 0 && typeof obj[0] === 'number') return '[' + obj.join(', ') + ']';
        if (Array.isArray(obj)) {
            let res = '[\n';
            for (let i = 0; i < obj.length; i++) res += ' '.repeat(indent + 4) + customStringify(obj[i], indent + 4) + (i === obj.length - 1 ? '' : ',') + '\n';
            res += ' '.repeat(indent) + ']';
            return res;
        }
        if (typeof obj === 'object' && obj !== null) {
            let res = '{\n';
            const keys = Object.keys(obj);
            for (let i = 0; i < keys.length; i++) {
                const key = keys[i];
                res += ' '.repeat(indent + 4) + JSON.stringify(key) + ': ' + customStringify(obj[key], indent + 4) + (i === keys.length - 1 ? '' : ',') + '\n';
            }
            res += ' '.repeat(indent) + '}';
            return res;
        }
        return JSON.stringify(obj);
    }
    let newLevelsCode = 'const FOOD_LEVELS = {\n';
    const regions = Object.keys(FOOD_LEVEL_RES);
    regions.forEach((region, rIdx) => {
        newLevelsCode += '    ' + JSON.stringify(region) + ': [\n';
        FOOD_LEVEL_RES[region].forEach((level, lIdx) => {
            newLevelsCode += '        ' + customStringify(level, 8) + (lIdx === FOOD_LEVEL_RES[region].length - 1 ? '' : ',') + '\n';
        });
        newLevelsCode += '    ]' + (rIdx === regions.length - 1 ? '' : ',') + '\n';
    });
    newLevelsCode += '};';
    const finalContent = content.substring(0, startIdx) + newLevelsCode + '\n\n' + content.substring(lastBraceIdx + 2);
    fs.writeFileSync(path, finalContent);
    console.log("Success: Reverted JS structure to pre-merge state while keeping data.");
}
