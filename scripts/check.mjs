import { readFileSync, existsSync, readdirSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const html = readFileSync(resolve(root, "index.html"), "utf8");
const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map((m) => m[1]);
const errors = [];
const referencedFiles = new Set();
if (new Set(ids).size !== ids.length) errors.push("Duplicate HTML IDs");
for (const [, value] of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
  if (value.startsWith("#")) {
    if (!ids.includes(value.slice(1))) errors.push(`Missing anchor: ${value}`);
  } else if (!/^(https?:|mailto:)/.test(value)) {
    const file = resolve(root, value.split(/[?#]/)[0]);
    referencedFiles.add(file);
    if (!existsSync(file)) errors.push(`Missing file: ${value}`);
  }
}
for (const [, references] of html.matchAll(/aria-labelledby="([^"]+)"/g)) {
  for (const id of references.split(/\s+/)) {
    if (!ids.includes(id)) errors.push(`Missing accessible label: ${id}`);
  }
}
for (const entry of readdirSync(resolve(root, "assets"), {
  recursive: true,
  withFileTypes: true,
})) {
  if (!entry.isFile() || entry.name.endsWith(".md")) continue;
  const file = resolve(entry.parentPath, entry.name);
  if (!referencedFiles.has(file)) errors.push(`Unreferenced asset: ${file}`);
}
if ((html.match(/class="publication"/g) || []).length !== 3)
  errors.push("Expected three conference publication entries");
if ((html.match(/class="publication preprint"/g) || []).length !== 2)
  errors.push("Expected two preprint entries");
const conferenceSection =
  html.match(/<section id="publications"[\s\S]*?<\/section>/)?.[0] ?? "";
const paperLinks = [
  ...conferenceSection.matchAll(
    /<a\b[^>]*href="([^"]+)"[^>]*>\s*Paper\s*<\/a\s*>/g,
  ),
].map((m) => m[1]);
if (
  paperLinks.length !== 3 ||
  paperLinks.some(
    (url) =>
      !/^https:\/\/(proceedings\.neurips\.cc|aclanthology\.org)\//.test(url),
  )
)
  errors.push("Conference Paper links must use official proceedings");
if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}
console.log(
  "Website checks passed: local assets, section links, unique IDs, three conference papers with official links, and two preprints.",
);
