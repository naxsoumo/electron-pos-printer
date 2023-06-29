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
/**
 * Copyright (c) 2022. Author Hubert Formin <hformin@gmail.com>.
 *     This file is called the the render process main html file in renderer/index.html
 *     This page renders data into the view.
 *     Render events are sent from the main process, this process on successful render replies with success of failure event
 */
require("./index.css");
var utils_1 = require("./utils");
var ipcRender = require('electron').ipcRenderer;
var JsBarcode = require("jsbarcode");
var body = document.getElementById('main');
/**
 * Initialize container in html view, by setting the width and margins specified in the PosPrinter options
 */
ipcRender.on('body-init', function (event, arg) {
    body.style.width = (arg === null || arg === void 0 ? void 0 : arg.width) || '100%';
    body.style.margin = (arg === null || arg === void 0 ? void 0 : arg.margin) || 0;
    event.sender.send('body-init-reply', { status: true, error: null });
});
/**
 * Listen to render event form the main process,
 * Once the main process sends line data, render this data in the web page
 */
ipcRender.on('render-line', renderDataToHTML);
/**
 * @function
 * @name generatePageText
 * @param event {any} IpcEvent
 * @param arg {pass argument of type PosPrintData}
 * @description Render data as HTML to page
 * */
function renderDataToHTML(event, arg) {
    var _a, _b, _c;
    return __awaiter(this, void 0, void 0, function () {
        var _d, img, e_1, container, qrCode, e_2, barcodeWrapperEl, barcodeEl, tableContainer, table, tHeader_1, tBody, tFooter_1, _i, _e, headerArg, _f, th, _loop_1, _g, _h, bodyRow, _j, _k, footerArg, _l, footerTh;
        return __generator(this, function (_m) {
            switch (_m.label) {
                case 0:
                    _d = arg.line.type;
                    switch (_d) {
                        case 'text': return [3 /*break*/, 1];
                        case 'image': return [3 /*break*/, 2];
                        case 'qrCode': return [3 /*break*/, 6];
                        case 'barCode': return [3 /*break*/, 10];
                        case 'table': return [3 /*break*/, 11];
                    }
                    return [3 /*break*/, 32];
                case 1:
                    try {
                        body.appendChild((0, utils_1.generatePageText)(arg.line));
                        // sending msg
                        event.sender.send('render-line-reply', { status: true, error: null });
                    }
                    catch (e) {
                        event.sender.send('render-line-reply', { status: false, error: e.toString() });
                    }
                    return [2 /*return*/];
                case 2:
                    _m.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, (0, utils_1.renderImageToPage)(arg.line)];
                case 3:
                    img = _m.sent();
                    body.appendChild(img);
                    event.sender.send('render-line-reply', { status: true, error: null });
                    return [3 /*break*/, 5];
                case 4:
                    e_1 = _m.sent();
                    event.sender.send('render-line-reply', { status: false, error: e_1.toString() });
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
                case 6:
                    _m.trys.push([6, 8, , 9]);
                    container = document.createElement('div');
                    container.style.display = 'flex';
                    container.style.justifyContent = ((_a = arg.line) === null || _a === void 0 ? void 0 : _a.position) || 'left';
                    qrCode = document.createElement('canvas');
                    qrCode.setAttribute('id', "qrCode".concat(arg.lineIndex));
                    (0, utils_1.applyElementStyles)(qrCode, { 'textAlign': arg.line.position ? '-webkit-' + arg.line.position : '-webkit-left' });
                    container.appendChild(qrCode);
                    body.appendChild(container);
                    return [4 /*yield*/, (0, utils_1.generateQRCode)("qrCode".concat(arg.lineIndex), {
                            value: arg.line.value,
                            width: arg.line.width,
                            height: arg.line.height,
                        })];
                case 7:
                    _m.sent();
                    // $(`#qrcode${barcodeNumber}`).attr('style',arg.style);
                    event.sender.send('render-line-reply', { status: true, error: null });
                    return [3 /*break*/, 9];
                case 8:
                    e_2 = _m.sent();
                    event.sender.send('render-line-reply', { status: false, error: e_2.toString() });
                    return [3 /*break*/, 9];
                case 9: return [2 /*return*/];
                case 10:
                    try {
                        barcodeWrapperEl = document.createElement('div');
                        barcodeEl = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                        barcodeEl.setAttributeNS(null, 'id', "barCode-".concat(arg.lineIndex));
                        barcodeWrapperEl.appendChild(barcodeEl);
                        body.appendChild(barcodeWrapperEl);
                        if ((_b = arg.line) === null || _b === void 0 ? void 0 : _b.style) {
                            (0, utils_1.applyElementStyles)(barcodeWrapperEl, arg.line.style);
                        }
                        else {
                            barcodeWrapperEl.style.display = 'flex';
                            barcodeWrapperEl.style.justifyContent = ((_c = arg.line) === null || _c === void 0 ? void 0 : _c.position) || 'left';
                        }
                        JsBarcode("#barCode-".concat(arg.lineIndex), arg.line.value, {
                            // format: "",
                            lineColor: "#000",
                            textMargin: 0,
                            fontOptions: 'bold',
                            fontSize: arg.line.fontsize || 12,
                            width: parseInt(arg.line.width) || 4,
                            height: parseInt(arg.line.height) || 40,
                            displayValue: !!arg.line.displayValue
                        });
                        // send
                        event.sender.send('render-line-reply', { status: true, error: null });
                    }
                    catch (e) {
                        event.sender.send('render-line-reply', { status: false, error: e.toString() });
                    }
                    return [2 /*return*/];
                case 11:
                    tableContainer = document.createElement('div');
                    tableContainer.setAttribute('id', "table-container-".concat(arg.lineIndex));
                    table = document.createElement('table');
                    table.setAttribute('id', "table".concat(arg.lineIndex));
                    table = (0, utils_1.applyElementStyles)(table, __assign({}, arg.line.style));
                    tHeader_1 = document.createElement('thead');
                    tHeader_1 = (0, utils_1.applyElementStyles)(tHeader_1, arg.line.tableHeaderStyle);
                    tBody = document.createElement('tbody');
                    tBody = (0, utils_1.applyElementStyles)(tBody, arg.line.tableBodyStyle);
                    tFooter_1 = document.createElement('tfoot');
                    tFooter_1 = (0, utils_1.applyElementStyles)(tFooter_1, arg.line.tableFooterStyle);
                    if (!arg.line.tableHeader) return [3 /*break*/, 19];
                    _i = 0, _e = arg.line.tableHeader;
                    _m.label = 12;
                case 12:
                    if (!(_i < _e.length)) return [3 /*break*/, 19];
                    headerArg = _e[_i];
                    if (!(typeof headerArg === "object")) return [3 /*break*/, 17];
                    _f = headerArg.type;
                    switch (_f) {
                        case 'image': return [3 /*break*/, 13];
                        case 'text': return [3 /*break*/, 15];
                    }
                    return [3 /*break*/, 16];
                case 13: return [4 /*yield*/, (0, utils_1.renderImageToPage)(headerArg)
                        .then(function (img) {
                        var th = document.createElement("th");
                        th.appendChild(img);
                        tHeader_1.appendChild(th);
                    }).catch(function (e) {
                        event.sender.send('render-line-reply', { status: false, error: e.toString() });
                    })];
                case 14:
                    _m.sent();
                    return [3 /*break*/, 16];
                case 15:
                    tHeader_1.appendChild((0, utils_1.generateTableCell)(headerArg, 'th'));
                    return [3 /*break*/, 16];
                case 16: return [3 /*break*/, 18];
                case 17:
                    th = document.createElement("th");
                    th.innerHTML = headerArg;
                    tHeader_1.appendChild(th);
                    _m.label = 18;
                case 18:
                    _i++;
                    return [3 /*break*/, 12];
                case 19:
                    if (!arg.line.tableBody) return [3 /*break*/, 23];
                    _loop_1 = function (bodyRow) {
                        var rowTr, _o, bodyRow_1, colArg, _p, td;
                        return __generator(this, function (_q) {
                            switch (_q.label) {
                                case 0:
                                    rowTr = document.createElement('tr');
                                    _o = 0, bodyRow_1 = bodyRow;
                                    _q.label = 1;
                                case 1:
                                    if (!(_o < bodyRow_1.length)) return [3 /*break*/, 8];
                                    colArg = bodyRow_1[_o];
                                    if (!(typeof colArg === 'object')) return [3 /*break*/, 6];
                                    _p = colArg.type;
                                    switch (_p) {
                                        case 'image': return [3 /*break*/, 2];
                                        case 'text': return [3 /*break*/, 4];
                                    }
                                    return [3 /*break*/, 5];
                                case 2: return [4 /*yield*/, (0, utils_1.renderImageToPage)(colArg)
                                        .then(function (img) {
                                        var th = document.createElement("td");
                                        th.appendChild(img);
                                        rowTr.appendChild(th);
                                    }).catch(function (e) {
                                        event.sender.send('render-line-reply', { status: false, error: e.toString() });
                                    })];
                                case 3:
                                    _q.sent();
                                    return [3 /*break*/, 5];
                                case 4:
                                    rowTr.appendChild((0, utils_1.generateTableCell)(colArg));
                                    return [3 /*break*/, 5];
                                case 5: return [3 /*break*/, 7];
                                case 6:
                                    td = document.createElement("td");
                                    td.innerHTML = colArg;
                                    rowTr.appendChild(td);
                                    _q.label = 7;
                                case 7:
                                    _o++;
                                    return [3 /*break*/, 1];
                                case 8:
                                    tBody.appendChild(rowTr);
                                    return [2 /*return*/];
                            }
                        });
                    };
                    _g = 0, _h = arg.line.tableBody;
                    _m.label = 20;
                case 20:
                    if (!(_g < _h.length)) return [3 /*break*/, 23];
                    bodyRow = _h[_g];
                    return [5 /*yield**/, _loop_1(bodyRow)];
                case 21:
                    _m.sent();
                    _m.label = 22;
                case 22:
                    _g++;
                    return [3 /*break*/, 20];
                case 23:
                    if (!arg.line.tableFooter) return [3 /*break*/, 31];
                    _j = 0, _k = arg.line.tableFooter;
                    _m.label = 24;
                case 24:
                    if (!(_j < _k.length)) return [3 /*break*/, 31];
                    footerArg = _k[_j];
                    if (!(typeof footerArg === 'object')) return [3 /*break*/, 29];
                    _l = footerArg.type;
                    switch (_l) {
                        case 'image': return [3 /*break*/, 25];
                        case 'text': return [3 /*break*/, 27];
                    }
                    return [3 /*break*/, 28];
                case 25: return [4 /*yield*/, (0, utils_1.renderImageToPage)(footerArg)
                        .then(function (img) {
                        var footerTh = document.createElement("th");
                        footerTh.appendChild(img);
                        tFooter_1.appendChild(footerTh);
                    }).catch(function (e) {
                        event.sender.send('render-line-reply', { status: false, error: e.toString() });
                    })];
                case 26:
                    _m.sent();
                    return [3 /*break*/, 28];
                case 27:
                    tFooter_1.appendChild((0, utils_1.generateTableCell)(footerArg, 'th'));
                    return [3 /*break*/, 28];
                case 28: return [3 /*break*/, 30];
                case 29:
                    footerTh = document.createElement("th");
                    footerTh.innerHTML = footerArg;
                    tFooter_1.appendChild(footerTh);
                    _m.label = 30;
                case 30:
                    _j++;
                    return [3 /*break*/, 24];
                case 31:
                    // render table
                    table.appendChild(tHeader_1);
                    table.appendChild(tBody);
                    table.appendChild(tFooter_1);
                    tableContainer.appendChild(table);
                    body.appendChild(tableContainer);
                    // send
                    event.sender.send('render-line-reply', { status: true, error: null });
                    return [2 /*return*/];
                case 32: return [2 /*return*/];
            }
        });
    });
}
