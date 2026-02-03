import fs from "fs";
import path from "path";

const levels = new Map<number, string>();

levels.set(1, fs.readFileSync(path.resolve("./img/skill-1.svg"), "utf8"));
levels.set(2, fs.readFileSync(path.resolve("./img/skill-2.svg"), "utf8"));
levels.set(3, fs.readFileSync(path.resolve("./img/skill-3.svg"), "utf8"));
levels.set(4, fs.readFileSync(path.resolve("./img/skill-4.svg"), "utf8"));
levels.set(5, fs.readFileSync(path.resolve("./img/skill-5.svg"), "utf8"));

const getLevelSvg = (level: number): string => {
    return levels.get(level) || "";
};

export { getLevelSvg };
