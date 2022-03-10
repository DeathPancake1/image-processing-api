"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var morgan_1 = __importDefault(require("morgan"));
var dotenv = __importStar(require("dotenv"));
var fs_1 = __importDefault(require("fs"));
dotenv.config();
var PORT = process.env.PORT || 3000;
var app = (0, express_1.default)();
app.use((0, morgan_1.default)("dev"));
app.get("/", function (req, res) {
    res.send("hello world");
});
app.listen(PORT, function () {
    console.log("Server is starting at prot:".concat(PORT));
});
app.get("/images", function (req, res) {
    if (req.query.filename && req.query.width && req.query.height) {
        try {
            if (fs_1.default.existsSync("./full/" + req.query.filename + ".jpg")) {
                res.send("hello");
            }
            else {
                res.status(404).send("file doesn't exist");
            }
        }
        catch (err) {
            console.log(err);
        }
    }
    else {
        var message = "Parameter error";
        res.status(400).send(message);
    }
});
exports.default = app;
