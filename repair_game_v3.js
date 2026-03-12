const fs = require('fs');
const path = 'game.js';
let content = fs.readFileSync(path, 'utf8');

// 1. 精准的欧洲菜品数据（包含仰望星空派和正确的星级/排序）
const EUROPE_READY = [
    {
        "name": { "en": "Baguette", "zh": "法棍" },
        "dim": 6, "stars": 1,
        "mask": [[0, 0, 0, 0, 1, 2], [0, 0, 0, 1, 2, 1], [0, 0, 1, 2, 1, 0], [0, 1, 2, 1, 0, 0], [1, 2, 1, 0, 0, 0], [1, 1, 0, 0, 0, 0]],
        "desktopDim": 12,
        "desktopMask": [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2], [0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 3, 1], [0, 0, 0, 0, 0, 0, 2, 3, 4, 3, 1, 2], [0, 0, 0, 0, 0, 2, 3, 3, 3, 1, 2, 0],
            [0, 0, 0, 0, 2, 3, 4, 3, 1, 2, 0, 0], [0, 0, 0, 2, 3, 3, 3, 1, 2, 0, 0, 0], [0, 0, 2, 3, 4, 3, 1, 2, 0, 0, 0, 0], [0, 2, 3, 3, 3, 1, 2, 0, 0, 0, 0, 0],
            [2, 3, 4, 3, 1, 2, 0, 0, 0, 0, 0, 0], [2, 3, 3, 1, 2, 0, 0, 0, 0, 0, 0, 0], [2, 1, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0], [1, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        ],
        "colors": { "1": "#8b4513", "2": "#d2691e", "3": "#f4a460", "4": "#ffe4b5" },
        "story": { "en": "Simple flour and water, the soul of Paris.", "zh": "面粉与水的奇迹，它是巴黎的呼吸。" }
    },
    {
        "name": { "en": "Croissant", "zh": "牛角包" },
        "dim": 7, "stars": 1,
        "mask": [[0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 1, 1, 0, 0], [0, 1, 1, 2, 2, 1, 1], [1, 2, 2, 2, 2, 2, 2], [1, 2, 2, 1, 1, 2, 2], [0, 1, 1, 0, 0, 1, 1], [0, 0, 0, 0, 0, 0, 0]],
        "desktopDim": 12,
        "colors": { "1": "#a04000", "2": "#d35400", "3": "#e67e22", "4": "#f39c12" },
        "story": { "en": "Layered crispy morning.", "zh": "层层叠叠的酥脆，唤醒沉睡的味蕾。" }
    },
    {
        "name": { "en": "Cheese", "zh": "奶酪" },
        "dim": 8, "stars": 2,
        "mask": [[0, 0, 1, 1, 1, 1], [0, 1, 1, 1, 1, 1], [1, 1, 1, 0, 1, 1], [1, 1, 1, 1, 1, 1], [1, 0, 1, 1, 0, 1], [1, 1, 1, 1, 1, 1]],
        "desktopDim": 12,
        "colors": { "1": "#ffb300", "2": "#ff8f00", "3": "#ffca28", "4": "#ffe082" },
        "story": { "en": "Time is gold.", "zh": "时间是奶酪最好的调味师。" }
    },
    {
        "name": { "en": "Macaron Tower", "zh": "马卡龙塔" },
        "dim": 10, "stars": 3,
        "mask": [[0, 0, 0, 1, 1, 0, 0, 0], [0, 0, 0, 1, 1, 0, 0, 0], [0, 0, 2, 2, 2, 2, 0, 0], [0, 0, 2, 2, 2, 2, 0, 0], [0, 3, 3, 3, 3, 3, 3, 0], [0, 3, 3, 3, 3, 3, 3, 0], [4, 4, 4, 4, 4, 4, 4, 4]],
        "desktopDim": 12,
        "colors": { "1": "#ff80ab", "2": "#b39ddb", "3": "#80deea", "4": "#ffe082" },
        "story": { "en": "Sweet gems.", "zh": "五彩斑斓的小圆饼，叠起少女心的梦。" }
    },
    {
        "name": { "en": "Stargazy Pie", "zh": "仰望星空派" },
        "dim": 10, "stars": 3,
        "mask": [
            [0, 0, 2, 0, 0, 0, 0, 2, 0, 0], [0, 0, 2, 0, 0, 0, 0, 2, 0, 0], [0, 0, 1, 1, 1, 1, 1, 1, 0, 0], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 3, 1, 1, 1, 1, 3, 3, 1], [1, 3, 3, 1, 1, 1, 1, 3, 3, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [0, 1, 1, 1, 1, 1, 1, 1, 1, 0]
        ],
        "desktopDim": 16,
        "desktopMask": [
            [0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0], [0, 0, 0, 2, 5, 5, 2, 0, 0, 0, 2, 5, 5, 2, 0, 0], [0, 0, 0, 2, 5, 6, 2, 0, 0, 0, 2, 5, 6, 2, 0, 0], [0, 0, 2, 2, 2, 2, 2, 2, 0, 2, 2, 2, 2, 2, 2, 0],
            [3, 3, 3, 0, 0, 0, 0, 3, 3, 0, 0, 0, 0, 3, 3, 3], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 4, 4, 4, 4, 1, 1, 1, 1, 4, 4, 4, 4, 1, 1], [1, 4, 6, 6, 6, 6, 4, 1, 1, 4, 6, 6, 6, 6, 4, 1],
            [1, 4, 6, 6, 6, 6, 4, 1, 1, 4, 6, 6, 6, 6, 4, 1], [1, 1, 4, 4, 4, 4, 1, 1, 1, 1, 4, 4, 4, 4, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 3, 3, 1, 1, 3, 3, 1, 1, 1, 1, 1],
            [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0], [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0]
        ],
        "colors": { "1": "#e0c090", "2": "#78909c", "3": "#ffee58", "4": "#5d4037", "5": "#cfd8dc", "6": "#263238" },
        "story": { "en": "Cornish magic.", "zh": "康沃尔郡的奇迹。鱼头仰望星空，在那层金黄酥脆的派皮之下，藏着大海的秘密。" }
    },
    {
        "name": { "en": "Neapolitan Pizza", "zh": "拿坡里披萨" },
        "dim": 11, "stars": 4,
        "mask": [[0, 0, 1, 1, 1, 1, 1, 0, 0], [0, 1, 2, 2, 2, 2, 2, 1, 0], [1, 2, 3, 3, 3, 4, 3, 2, 1], [1, 2, 3, 6, 3, 3, 3, 2, 1], [1, 2, 3, 3, 3, 6, 3, 2, 1], [1, 2, 4, 3, 3, 3, 3, 2, 1], [0, 1, 2, 2, 2, 2, 2, 1, 0], [0, 0, 1, 1, 1, 1, 1, 0, 0]],
        "desktopDim": 16,
        "desktopMask": [
            [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0], [0, 0, 1, 1, 2, 2, 2, 2, 2, 2, 1, 1, 0, 0], [0, 1, 2, 2, 3, 3, 3, 3, 3, 3, 2, 2, 1, 0], [1, 2, 3, 3, 3, 4, 4, 4, 4, 3, 3, 3, 2, 1],
            [1, 2, 3, 4, 4, 4, 4, 4, 4, 4, 4, 3, 2, 1], [1, 2, 3, 4, 4, 5, 5, 4, 4, 5, 5, 3, 2, 1], [1, 2, 3, 4, 4, 6, 6, 4, 4, 6, 6, 3, 2, 1], [1, 2, 3, 4, 4, 4, 4, 4, 4, 4, 4, 3, 2, 1],
            [0, 1, 2, 2, 3, 3, 3, 3, 3, 3, 2, 2, 1, 0], [0, 0, 1, 1, 2, 2, 2, 2, 2, 2, 1, 1, 0, 0]
        ],
        "colors": { "1": "#a04000", "2": "#e67e22", "3": "#c0392b", "4": "#f1c40f", "5": "#922b21", "6": "#27ae60" },
        "story": { "en": "Thin crust and basil.", "zh": "意式经典。薄底焦香，满溢着罗勒与芝士的热情。" }
    },
    {
        "name": { "en": "Black Forest", "zh": "黑森林蛋糕" },
        "dim": 11, "stars": 4,
        "mask": [[0, 0, 1, 1, 1, 1, 0, 0], [0, 1, 2, 3, 2, 3, 1, 0], [1, 2, 2, 2, 2, 2, 2, 1], [1, 4, 4, 4, 4, 4, 4, 1], [1, 2, 2, 2, 2, 2, 2, 1], [1, 4, 4, 4, 4, 4, 4, 1], [0, 1, 1, 1, 1, 1, 1, 0]],
        "desktopDim": 18,
        "colors": { "1": "#212121", "2": "#3e2723", "3": "#c0392b", "4": "#fafafa" },
        "story": { "en": "Chocolate and cherry.", "zh": "巧克力、奶油与樱桃的浪漫。那是来自黑森林的甜美诱惑。" }
    },
    {
        "name": { "en": "Paella", "zh": "西班牙海鲜饭" },
        "dim": 13, "stars": 5,
        "mask": [[0, 0, 1, 1, 1, 1, 1, 1, 0, 0], [0, 1, 2, 2, 2, 2, 2, 2, 1, 0], [1, 2, 3, 3, 4, 4, 3, 3, 2, 1], [1, 2, 3, 5, 4, 4, 5, 3, 2, 1], [1, 2, 4, 4, 4, 4, 4, 4, 2, 1], [1, 2, 6, 7, 3, 3, 6, 7, 2, 1], [0, 1, 2, 2, 2, 2, 1, 0]],
        "desktopDim": 20,
        "colors": { "1": "#333", "2": "#616161", "3": "#ffca28", "4": "#ff7043", "5": "#27ae60", "6": "#f44336", "7": "#fff176" },
        "story": { "en": "Seafood treasure.", "zh": "地中海的阳光。藏红花染就的金黄米饭，托起鲜虾与贝类的馈赠。" }
    },
    {
        "name": { "en": "Greek Salad", "zh": "希腊沙拉" },
        "dim": 13, "stars": 5,
        "mask": [[0, 0, 1, 1, 1, 1, 1, 0, 0], [0, 1, 2, 2, 3, 3, 2, 1, 0], [1, 2, 4, 4, 5, 5, 4, 2, 1], [1, 2, 6, 6, 2, 2, 6, 2, 1], [0, 1, 1, 1, 1, 1, 1, 0]],
        "desktopDim": 18,
        "colors": { "1": "#cfd8dc", "2": "#f5f5f5", "3": "#81c784", "4": "#e57373", "5": "#4caf50", "6": "#212121" },
        "story": { "en": "Healthy Greek vibes.", "zh": "地中海的和风，伴着橄榄与咸奶酪的清爽。" }
    },
    {
        "name": { "en": "Sausage Platter", "zh": "德式香肠拼盘" },
        "dim": 13, "stars": 5,
        "mask": [[0, 0, 1, 1, 1, 1, 0, 0], [0, 1, 2, 2, 2, 2, 1, 0], [1, 2, 3, 3, 3, 3, 2, 1], [1, 2, 4, 4, 4, 4, 2, 1], [1, 2, 2, 2, 2, 2, 2, 1], [0, 1, 1, 1, 1, 1, 1, 0]],
        "desktopDim": 18,
        "colors": { "1": "#d7ccc8", "2": "#efebe9", "3": "#8d6e63", "4": "#795548", "5": "#ffb300" },
        "story": { "en": "Rustic hearty meal.", "zh": "粗犷豪放的满足感。滋滋冒油的烤肠是肉食爱好者的终极浪漫。" }
    }
];

// 2. 找到 FOOD_LEVELS 并替换 europe
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
    } catch (e) {
        process.exit(1);
    }

    FOOD_LEVELS.europe = EUROPE_READY;

    // 美化输出逻辑
    function customStringify(obj, indent = 8) {
        if (Array.isArray(obj) && obj.length > 0 && typeof obj[0] === 'number') return '[' + obj.join(', ') + ']';
        if (Array.isArray(obj)) {
            let res = '[\n';
            for (let i = 0; i < obj.length; i++) {
                res += ' '.repeat(indent + 4) + customStringify(obj[i], indent + 4) + (i === obj.length - 1 ? '' : ',') + '\n';
            }
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
    const regions = Object.keys(FOOD_LEVELS);
    regions.forEach((region, rIdx) => {
        newLevelsCode += '    ' + JSON.stringify(region) + ': [\n';
        FOOD_LEVELS[region].forEach((level, lIdx) => {
            newLevelsCode += '        ' + customStringify(level, 8) + (lIdx === FOOD_LEVELS[region].length - 1 ? '' : ',') + '\n';
        });
        newLevelsCode += '    ]' + (rIdx === regions.length - 1 ? '' : ',') + '\n';
    });
    newLevelsCode += '};';

    content = content.substring(0, startIdx) + newLevelsCode + '\n\n' + content.substring(lastBraceIdx + 2);
}

// 3. 修复 showDishes 中的星星显示逻辑
const oldShowDishesStart = '    FOOD_LEVELS[region].forEach((levelData, idx) => {';
const oldShowDishesEnd = '        dishList.appendChild(item);';
const startLoopIdx = content.indexOf(oldShowDishesStart);
const endLoopIdx = content.indexOf(oldShowDishesEnd);

if (startLoopIdx !== -1 && endLoopIdx !== -1) {
    const loopEnd = content.indexOf('});', endLoopIdx) + 3;
    const newLoop = `    FOOD_LEVELS[region].forEach((levelData, idx) => {
        const key = \`\${region}_\${idx}\`;
        const item = document.createElement('button');
        item.className = 'dish-item';
        if (completedLevels[key]) item.classList.add('stamped');
        item.dataset.region = region;
        item.dataset.level = idx;

        // 获取星星数量，优先使用 stars 属性
        const stars = levelData.stars || 1;

        item.innerHTML = \`
            <span class="dish-name">\${levelData.name[currentLang]}</span>
            \${completedLevels[key] ? '<span class="served-badge">' + I18N[currentLang].served + '</span>' : ''}
            <span class="difficulty-stars">\${'★'.repeat(stars)}\${'☆'.repeat(5 - stars)}</span>
        \`;

        item.addEventListener('click', () => {
            dishScreen.classList.add('hidden');
            gameUI.classList.remove('hidden');
            initGameFromData(levelData, region, idx);
        });

        dishList.appendChild(item);
    });`;

    content = content.substring(0, startLoopIdx) + newLoop + content.substring(loopEnd);
}

fs.writeFileSync(path, content);
console.log("Success: Restored Europe (with Stargazy Pie) and fixed UI Stars.");
