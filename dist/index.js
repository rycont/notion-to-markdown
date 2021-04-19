"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
exports.__esModule = true;
exports.getTable = exports.getArticlesWithTag = exports.getTags = exports.getArticleWithBriefId = exports.getTableInfo = exports.getTableContent = exports.convertToMarkdown = exports.getPageContent = void 0;
var types_1 = require("./types");
var node_fetch_1 = __importStar(require("node-fetch"));
var fetcher = global.fetch || node_fetch_1["default"];
var PolyHeaders = global.Headers || node_fetch_1.Headers;
var getPage = function (pageId) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, fetcher("https://www.notion.so/api/v3/loadPageChunk", {
                    body: JSON.stringify({
                        "pageId": pageId,
                        "limit": 50,
                        "cursor": {
                            "stack": [[{
                                        "table": "block",
                                        "id": pageId,
                                        "index": 0
                                    }]]
                        },
                        "chunkNumber": 0,
                        "verticalColumns": false
                    }),
                    headers: new PolyHeaders({
                        "content-type": "application/json"
                    }),
                    method: "POST"
                })];
            case 1: return [4 /*yield*/, (_a.sent()).json()];
            case 2: return [2 /*return*/, _a.sent()];
        }
    });
}); };
var parseStyle = function (type, attributes) {
    return Object.fromEntries(attributes.map(function (attribute) { return [
        ({
            'a': 'link',
            'e': 'latex'
        })[attribute[0]] || attribute[0],
        attribute[1] || true
    ]; }));
};
var isAvaliable = function (d) { return !!d; };
var getPageContent = function (pageId) { return __awaiter(void 0, void 0, void 0, function () {
    var fetchedPage, converted;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, getPage(pageId)];
            case 1:
                fetchedPage = _a.sent();
                converted = Object.values(fetchedPage.recordMap.block).map(function (block) {
                    var _a, _b, _c, _d;
                    if (!block.value)
                        return null;
                    if ((_a = block.value.properties) === null || _a === void 0 ? void 0 : _a.title)
                        return block.value.properties.title.map(function (element) {
                            var _a, _b, _c;
                            return ({
                                text: element[0],
                                properties: element[1] && ((_a = block === null || block === void 0 ? void 0 : block.value) === null || _a === void 0 ? void 0 : _a.type) && parseStyle((_b = block === null || block === void 0 ? void 0 : block.value) === null || _b === void 0 ? void 0 : _b.type, element[1]),
                                type: (_c = block.value) === null || _c === void 0 ? void 0 : _c.type
                            });
                        });
                    if ((_b = block.value.properties) === null || _b === void 0 ? void 0 : _b.source)
                        return [{
                                text: ((_d = (_c = block.value.properties) === null || _c === void 0 ? void 0 : _c.caption) === null || _d === void 0 ? void 0 : _d[0][0]) || '',
                                type: types_1.BlockType.image,
                                properties: {
                                    src: block.value.properties.source[0][0]
                                }
                            }];
                    return null;
                }).filter(function (row) { return isAvaliable(row); });
                return [2 /*return*/, {
                        title: converted[0][0].text,
                        content: converted.slice(1)
                    }];
        }
    });
}); };
exports.getPageContent = getPageContent;
var applyInlineType = function (intend) {
    var _a;
    if (!intend.properties)
        return intend.text;
    if ((_a = intend.properties) === null || _a === void 0 ? void 0 : _a.latex)
        return "$" + intend.properties.latex + "$";
    var decorated = (intend.properties ? (Object.keys(intend.properties).map(function (key) { return ({
        i: '_',
        b: '**',
        c: '`'
    })[key] || ''; }, '')) : []).reduce(function (acc, current) { return (current + acc + current); }, intend.text);
    return decorated;
};
var applyBlockType = function (intend, before) {
    var _a, _b;
    // latex
    if ((_a = intend.properties) === null || _a === void 0 ? void 0 : _a.latex)
        return "$$\n" + intend.properties.latex + "\n$$";
    if (intend.type === types_1.BlockType.text)
        return before;
    // image
    if (intend.type === types_1.BlockType.image)
        return "![" + before + "](" + ((_b = intend === null || intend === void 0 ? void 0 : intend.properties) === null || _b === void 0 ? void 0 : _b.src) + ")";
    // code
    if (intend.type === types_1.BlockType.code)
        return "```\n" + before + "\n```";
    return (({
        text: '',
        header: '# ',
        sub_header: '## ',
        sub_sub_header: '### ',
        quote: '> ',
        numbered_list: '1. ',
        page: '# ',
        code: '```' // not used.
    })[intend.type] || '') + before;
};
var renderers = [
    applyInlineType,
    applyBlockType
];
var convertToMarkdown = function (content) {
    return content.map(function (row) { return row === null || row === void 0 ? void 0 : row.map(function (intend) {
        var rendered = renderers.reduce(function (before, current) { return current(intend, before); }, '');
        return rendered;
    }).join(''); }).join('\n\n');
};
exports.convertToMarkdown = convertToMarkdown;
var processArticleTable = function (blocks) { return Object.values(blocks).slice(2).filter(function (block) { var _a; return ((_a = block.value) === null || _a === void 0 ? void 0 : _a.type) === types_1.BlockType.page; }).map(function (block) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
    return ({
        pageId: ((_a = block.value) === null || _a === void 0 ? void 0 : _a.id) || '',
        title: ((_d = (_c = (_b = block === null || block === void 0 ? void 0 : block.value) === null || _b === void 0 ? void 0 : _b.properties) === null || _c === void 0 ? void 0 : _c.title) === null || _d === void 0 ? void 0 : _d[0][0]) || '',
        tags: ((_j = (_h = (_g = (_f = (_e = block === null || block === void 0 ? void 0 : block.value) === null || _e === void 0 ? void 0 : _e.properties) === null || _f === void 0 ? void 0 : _f["s3#F"]) === null || _g === void 0 ? void 0 : _g[0]) === null || _h === void 0 ? void 0 : _h[0]) === null || _j === void 0 ? void 0 : _j.split(',')) || []
    });
}).filter(function (page) { return page.pageId; }); };
var getTableContent = function (info) { return __awaiter(void 0, void 0, void 0, function () {
    var collectionData;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, fetcher("https://www.notion.so/api/v3/queryCollection", {
                    body: JSON.stringify({
                        "collectionId": info.collectionId,
                        "collectionViewId": info.viewId,
                        "query": {
                            "aggregations": [
                                {
                                    "aggregator": "count"
                                }
                            ]
                        },
                        "loader": {
                            "type": "table",
                            "limit": 50,
                            "searchQuery": "",
                            "userTimeZone": "Asia/Seoul",
                            "loadContentCover": true
                        }
                    }),
                    headers: new PolyHeaders({
                        "content-type": "application/json"
                    }),
                    method: "POST"
                })];
            case 1: return [4 /*yield*/, (_a.sent()).json()];
            case 2:
                collectionData = _a.sent();
                if (!collectionData.recordMap.block)
                    throw new Error("Cannot access article");
                return [2 /*return*/, processArticleTable(collectionData.recordMap.block)];
        }
    });
}); };
exports.getTableContent = getTableContent;
var getTableInfo = function (pageId) { return __awaiter(void 0, void 0, void 0, function () {
    var pageData, tableBlock, collectionId, _a, viewId;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, getPage(pageId)];
            case 1:
                pageData = _b.sent();
                tableBlock = (Object.values(pageData.recordMap.block)[0]).value;
                if (!tableBlock)
                    throw new Error("Cannot find table");
                collectionId = tableBlock.collection_id, _a = __read(tableBlock.view_ids, 1), viewId = _a[0];
                return [2 /*return*/, {
                        collectionId: collectionId,
                        viewId: viewId
                    }];
        }
    });
}); };
exports.getTableInfo = getTableInfo;
var getArticleWithBriefId = function (tableId, briefId) { return __awaiter(void 0, void 0, void 0, function () {
    var table, page, _a, _b;
    var _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0: return [4 /*yield*/, exports.getTable(tableId)];
            case 1:
                table = _d.sent();
                page = table.find(function (page) { return page.pageId.startsWith(briefId); });
                if (!(page === null || page === void 0 ? void 0 : page.pageId)) return [3 /*break*/, 3];
                _a = [__assign({}, page)];
                _c = {};
                _b = exports.convertToMarkdown;
                return [4 /*yield*/, exports.getPageContent(page.pageId)];
            case 2: return [2 /*return*/, __assign.apply(void 0, _a.concat([(_c.content = _b.apply(void 0, [(_d.sent()).content]), _c)]))];
            case 3: throw new Error("Cannot find article");
        }
    });
}); };
exports.getArticleWithBriefId = getArticleWithBriefId;
var getTags = function (tableId) { return __awaiter(void 0, void 0, void 0, function () {
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = Set.bind;
                return [4 /*yield*/, exports.getTable(tableId)];
            case 1: return [2 /*return*/, __spread.apply(void 0, [new (_a.apply(Set, [void 0, (_b.sent()).map(function (e) { return e.tags; }).flat()]))()])];
        }
    });
}); };
exports.getTags = getTags;
var getArticlesWithTag = function (tableId, tag) { return __awaiter(void 0, void 0, void 0, function () {
    var table, collectionData;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, exports.getTableInfo(tableId)];
            case 1:
                table = _a.sent();
                return [4 /*yield*/, fetcher("https://www.notion.so/api/v3/queryCollection", {
                        body: JSON.stringify({
                            "collectionId": table.collectionId,
                            "collectionViewId": table.viewId,
                            "query": {
                                "aggregations": [
                                    {
                                        "aggregator": "count"
                                    }
                                ],
                                "filter": {
                                    "operator": "and",
                                    "filters": [
                                        {
                                            "property": "s3#F",
                                            "filter": {
                                                "operator": "enum_contains",
                                                "value": {
                                                    "type": "exact",
                                                    "value": tag
                                                }
                                            }
                                        }
                                    ]
                                }
                            },
                            "loader": {
                                "type": "table",
                                "limit": 50,
                                "searchQuery": "",
                                "userTimeZone": "Asia/Seoul",
                                "loadContentCover": true
                            }
                        }),
                        headers: new PolyHeaders({
                            "content-type": "application/json"
                        }),
                        method: "POST"
                    })];
            case 2: return [4 /*yield*/, (_a.sent()).json()];
            case 3:
                collectionData = _a.sent();
                return [2 /*return*/, processArticleTable(collectionData.recordMap.block)];
        }
    });
}); };
exports.getArticlesWithTag = getArticlesWithTag;
var getTable = function (pageId) { return __awaiter(void 0, void 0, void 0, function () { var _a; return __generator(this, function (_b) {
    switch (_b.label) {
        case 0:
            _a = exports.getTableContent;
            return [4 /*yield*/, exports.getTableInfo(pageId)];
        case 1: return [4 /*yield*/, _a.apply(void 0, [_b.sent()])];
        case 2: return [2 /*return*/, _b.sent()];
    }
}); }); };
exports.getTable = getTable;
