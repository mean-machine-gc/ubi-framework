import Prism from "npm:prismjs@1.29.0";
import "npm:prismjs@1.29.0/components/prism-typescript.js";
import "npm:prismjs@1.29.0/components/prism-diff.js";
import "npm:prismjs@1.29.0/components/prism-json.js";
import "npm:prismjs@1.29.0/components/prism-bash.js";
import "npm:prismjs@1.29.0/components/prism-json5.js";
import "npm:prismjs@1.29.0/components/prism-jsx.js";
import "npm:prismjs@1.29.0/components/prism-tsx.js";
import "npm:prismjs@1.29.0/components/prism-yaml.js";


Prism.languages.jsonc = Prism.languages.json5;

export default Prism;
