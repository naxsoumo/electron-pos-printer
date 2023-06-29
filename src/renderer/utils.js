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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateQRCode = exports.isValidHttpUrl = exports.applyElementStyles = exports.isBase64 = exports.renderImageToPage = exports.generateTableCell = exports.generatePageText = void 0;
var fs_1 = require("fs");
var path_1 = require("path");
var QRCode = require('qrcode');
/**
 * @function
 * @name generatePageText
 * @param arg {pass argument of type PosPrintData}
 * @description used for type text, used to generate type text
 * */
function generatePageText(arg) {
    var text = arg.value;
    var div = document.createElement('div');
    div.innerHTML = text;
    div = applyElementStyles(div, arg.style);
    return div;
}
exports.generatePageText = generatePageText;
/**
 * @function
 * @name generateTableCell
 * @param arg {pass argument of type PosPrintData}
 * @param type {string}
 * @description used for type text, used to generate type text
 * */
function generateTableCell(arg, type) {
    if (type === void 0) { type = 'td'; }
    var text = arg.value;
    var cellElement;
    cellElement = document.createElement(type);
    cellElement.innerHTML = text;
    cellElement = applyElementStyles(cellElement, __assign({ padding: '7px 2px' }, arg.style));
    return cellElement;
}
exports.generateTableCell = generateTableCell;
/**
 * @function
 * @name renderImageToPage
 * @param arg {pass argument of type PosPrintData}
 * @description get image from path and return it as a html img
 * */
function renderImageToPage(arg) {
    var _this = this;
    return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
        var uri, img_con, image_format, data, ext, img;
        return __generator(this, function (_a) {
            img_con = document.createElement('div');
            image_format = ['apng', 'bmp', 'gif', 'ico', 'cur', 'jpeg', 'jpg', 'jpeg', 'jfif', 'pjpeg',
                'pjp', 'png', 'svg', 'tif', 'tiff', 'webp'];
            img_con = applyElementStyles(img_con, {
                width: '100%',
                display: 'flex',
                justifyContent: (arg === null || arg === void 0 ? void 0 : arg.position) || 'left'
            });
            if (arg.url) {
                if (!isValidHttpUrl(arg.url) && !isBase64(arg.url)) {
                    return [2 /*return*/, reject("Invalid url: ".concat(arg.url))];
                }
                uri = arg.url;
            }
            else if (arg.path) {
                // file mut be
                try {
                    data = fs_1.default.readFileSync(arg.path);
                    ext = path_1.default.extname(arg.path).slice(1);
                    if (image_format.indexOf(ext) === -1) {
                        reject(new Error(ext + ' file type not supported, consider the types: ' + image_format.join()));
                    }
                    if (ext === 'svg') {
                        ext = 'svg+xml';
                    }
                    // insert image
                    uri = 'data:image/' + ext + ';base64,' + data.toString('base64');
                }
                catch (e) {
                    reject(e);
                }
            }
            img = document.createElement("img");
            img = applyElementStyles(img, __assign({ height: arg.height, width: arg.width }, arg.style));
            img.src = uri;
            // appending
            img_con.prepend(img);
            resolve(img_con);
            return [2 /*return*/];
        });
    }); });
}
exports.renderImageToPage = renderImageToPage;
/**
 * @function
 * @name generateTableCell
 * @param str {string}
 * @description Checks if a string is a base64 string
 * */
function isBase64(str) {
    return Buffer.from(str, 'base64').toString('base64') === str;
}
exports.isBase64 = isBase64;
/**
 * @function
 * @name generateTableCell
 * @param element {PageElement}
 * @param style {PrintDataStyle}
 * @description Apply styles to created elements on print web page.
 * */
function applyElementStyles(element, style) {
    for (var _i = 0, _a = Object.keys(style); _i < _a.length; _i++) {
        var styleProp = _a[_i];
        if (!style[styleProp]) {
            continue;
        }
        element.style[styleProp] = style[styleProp];
    }
    return element;
}
exports.applyElementStyles = applyElementStyles;
/**
 * @function
 * @name generateTableCell
 * @param url {string}
 * @description Checks is if a string is a valid URL
 * */
function isValidHttpUrl(url) {
    var validURL;
    try {
        validURL = new URL(url);
    }
    catch (_) {
        return false;
    }
    return validURL.protocol === "http:" || validURL.protocol === "https:";
}
exports.isValidHttpUrl = isValidHttpUrl;
/**
 * @function
 * @name generateTableCell
 * @param elementId {string}
 * @param options {object}
 * @description Generate QR in page
 * */
function generateQRCode(elementId, _a) {
    var value = _a.value, _b = _a.height, height = _b === void 0 ? 15 : _b, _c = _a.width, width = _c === void 0 ? 1 : _c;
    return new Promise(function (resolve, reject) {
        var element = document.getElementById(elementId), options = {
            width: width,
            height: height,
            errorCorrectionLevel: 'H',
            color: '#000',
        };
        QRCode.toCanvas(element, value, options)
            .then(resolve)
            .catch(function (error) {
            reject(error);
        });
    });
}
exports.generateQRCode = generateQRCode;
