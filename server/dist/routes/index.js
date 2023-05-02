"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var User_1 = require("../model/User");
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var fs_1 = __importDefault(require("fs"));
var circular_json_1 = __importDefault(require("circular-json"));
var bcrypt_1 = __importDefault(require("bcrypt"));
var router = (0, express_1.Router)();
// Authentification //
router.post('/login', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, user, isMatch, token, err_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, email = _a.email, password = _a.password;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 4, , 5]);
                return [4 /*yield*/, User_1.UserModel.findOne({ email: email })];
            case 2:
                user = _b.sent();
                if (!user) {
                    console.log('user not found');
                    return [2 /*return*/, res.status(404).json({ message: 'User not found' })];
                }
                return [4 /*yield*/, user.comparePassword(password)];
            case 3:
                isMatch = _b.sent();
                if (!isMatch) {
                    return [2 /*return*/, res.status(401).json({ message: 'Incorrect password' })];
                }
                token = jsonwebtoken_1.default.sign({ userId: user.id }, 'secret_key');
                return [2 /*return*/, res.status(200).json({ token: token, user: user })];
            case 4:
                err_1 = _b.sent();
                console.error(err_1);
                return [2 /*return*/, res.status(500).json({ message: 'Server error' })];
            case 5: return [2 /*return*/];
        }
    });
}); });
router.post('/register', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, user, token, err_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, email = _a.email, password = _a.password;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                user = new User_1.UserModel({ email: email, password: password });
                return [4 /*yield*/, user.save()];
            case 2:
                _b.sent();
                token = jsonwebtoken_1.default.sign({ userId: user.id }, 'secret_key');
                return [2 /*return*/, res.status(201).json({ token: token })];
            case 3:
                err_2 = _b.sent();
                console.error(err_2);
                return [2 /*return*/, res.status(500).json({ message: 'Server Error' })];
            case 4: return [2 /*return*/];
        }
    });
}); });
// Update profil
router.put('/changePassword/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, updatePassword;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body;
                return [4 /*yield*/, bcrypt_1.default.hash(req.body.password, 10)];
            case 1:
                _a.password = _b.sent();
                return [4 /*yield*/, User_1.UserModel.findByIdAndUpdate(req.params.id, req.body, { new: true })];
            case 2:
                updatePassword = _b.sent();
                res.json(updatePassword);
                return [2 /*return*/];
        }
    });
}); });
router.put('/changeEmail/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var updateEmail;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, User_1.UserModel.findByIdAndUpdate(req.params.id, req.body, { new: true })];
            case 1:
                updateEmail = _a.sent();
                res.json(updateEmail);
                return [2 /*return*/];
        }
    });
}); });
// Admin
router.get('/users', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var users;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, User_1.UserModel.find()];
            case 1:
                users = _a.sent();
                res.json(users);
                return [2 /*return*/];
        }
    });
}); });
router.delete("/users/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, User_1.UserModel.findByIdAndDelete(req.params.id)];
            case 1:
                user = _a.sent();
                if (!user)
                    return [2 /*return*/, res.status(404).json({ message: "User not found" })];
                return [2 /*return*/, res.json(user)];
            case 2:
                error_1 = _a.sent();
                return [2 /*return*/, res.status(500).send(error_1)];
            case 3: return [2 /*return*/];
        }
    });
}); });
// Modify JSON 
router.post('/modifyJSON', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var json, data;
    return __generator(this, function (_a) {
        json = req.body.json;
        data = circular_json_1.default.stringify(req.body);
        fs_1.default.writeFile("./json/data.json", data, function (err) {
            if (err) {
                console.error(err);
                return;
            }
            console.log("Données enregistrées avec succès!");
        });
        return [2 /*return*/];
    });
}); });
exports.default = router;
