import fs from "node:fs";
import path from "node:path";

// ponytail: image shows once public/assets/products/<slug>.jpg exists; until then the card uses its tint.
export const productImg = (slug: string) =>
  fs.existsSync(path.join(process.cwd(), "public/assets/products", `${slug}.jpg`)) ? `/assets/products/${slug}.jpg` : null;
