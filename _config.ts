import lume from "lume/mod.ts";
import nunjucks from "lume/plugins/nunjucks.ts";
import prism from "lume/plugins/prism.ts";
import "npm:prismjs@1.29.0/components/prism-yaml.js";
import "npm:prismjs@1.29.0/components/prism-typescript.js"


import admonitionPlugin from "./markdown-it/admonition.ts";
import codeblockTitlePlugin from "./markdown-it/codeblock-title.ts";
import relativeLinksPlugin from "./markdown-it/relative-path.ts";

import Prism from "./prism.ts";



const site = lume({
  server: {
    port: 3210
  },
}, );

site.copy("fonts");
site.copy("icons");
site.copy("images");
site.copy("movies");
site.copy("styles");
site.copy("toc.js");
site.data("layout", "/_includes/layout.njk");



site.use(prism({cssSelector: 'code'}));
site.use(nunjucks({ includes: "_includes" }));



export default site;
