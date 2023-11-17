import fs from "fs";

const loadFile = (file: string): object => {
  try {
    const data = fs.readFileSync(file, "utf8");
    return JSON.parse(data);
  } catch (error) {
    return {};
  }
};

const saveFile = (file: string, users: any): void => {
  fs.writeFileSync(file, JSON.stringify(users, null, 2));
};

export { loadFile, saveFile };
