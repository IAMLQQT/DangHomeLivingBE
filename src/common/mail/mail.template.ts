import fs from "fs";
import handlebars from "handlebars";
import path from "path";

export function loadTemplate(mailTemplate: string, replacements: any) {
  const filePath = path.join(__dirname, "./templates/" + mailTemplate);

  const data = fs.readFileSync(filePath, "utf8");
  const template = handlebars.compile(data);

  return template(replacements);
}
