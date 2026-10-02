import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // app/generated is Prisma's auto-generated client output (gitignored,
  // regenerated on every install) - it's not hand-written code and isn't
  // meant to be linted. Without this, `next build` lints the generated,
  // minified client and fails every production build.
  { ignores: ["app/generated/**"] },
  ...compat.extends("next/core-web-vitals", "next/typescript"),
];

export default eslintConfig;
