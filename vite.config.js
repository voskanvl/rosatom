import { defineConfig } from "vite";
// import pugPlugin from "vite-plugin-pug";
import vitePugPlugin from "./vite-plugin-pug-edited";
import { resolve, extname, posix } from "path";
import { readFileSync, readdirSync } from "fs";
import * as yaml from "js-yaml";
import colors from "picocolors";
import * as fs from "fs";
import * as path from "path";

const options = { pretty: true }; // FIXME: pug pretty is deprecated!
const locals = {
    name: "ШВСМ",
};

const STANDART = "yaml";

function getShortName(file, root) {
    return file.startsWith(root + "/") ? posix.relative(root, file) : file;
}

const merge = () => {
    console.log(`now merging ${STANDART} files`);
    // const fn = { json: JSON.stringify, yaml: yaml.load }[standart];
    const fn = { json: JSON.stringify, yaml: yaml.load };
    const files = readdirSync(resolve(__dirname, "src/data"));
    // const jsons = files.filter(file => extname(file) === "." + STANDART);
    return files.reduce(
        (acc, file) => ({
            ...acc,
            ...fn[extname(file).slice(1)](readFileSync(resolve(__dirname, "src/data", file))),
        }),
        {},
    );
};

function CustomHmr() {
    return {
        name: "custom-hmr",
        enforce: "post",
        // HMR
        handleHotUpdate({ file, server }) {
            if (file.endsWith("." + STANDART)) {
                server.config.logger.info(
                    colors.green(STANDART + " reload ") +
                        colors.dim(getShortName(file, server.config.root)),
                    { clear: true, timestamp: true },
                );
                server.ws.send({
                    type: "full-update",
                });
            }
        },
        transformIndexHtml: vitePugPlugin({ pugLocals: merge() }).transformIndexHtml,
    };
}

function htmlsFiles() {
    let files = fs.readdirSync(path.resolve(process.cwd()));
    files = files
        .filter(e => path.extname(e) === ".html")
        .map(e => path.basename(e).replace(".html", ""));
    return files;
}
// const htmls = ["inner", "issue", "main-texts", "about", "podcast", "about"];
const htmls = htmlsFiles();

const input = htmls.reduce((acc, e) => ({ ...acc, [e]: resolve(__dirname, e + ".html") }), {});

export default defineConfig({
    // plugins: [pugPlugin.default(options, locals)],
    plugins: [vitePugPlugin({ pugLocals: () => merge() })],
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, "index.html"),
                ...input,
            },
        },
    },
    resolve: {
        alias: {
            "@": resolve(__dirname, "./src"),
            "@assets": resolve(__dirname, "./assets"),
            "@var": resolve(__dirname, "./src/sass/_variables.sass"),
        },
    },
});
