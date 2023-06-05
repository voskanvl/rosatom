import { defineConfig } from "vite"
// import vitePugPlugin from "vite-plugin-pug-transformer";
import vitePugPlugin from "./vite-plugin-pug-edited"
import { resolve, extname, posix } from "path"
import { readFileSync, readdirSync } from "fs"
import * as yaml from "js-yaml"
import colors from "picocolors"
import * as fs from "fs"
import * as path from "path"
import sassGlobImports from "vite-plugin-sass-glob-import"

const merge = () => {
    console.log(`now merging data files`)
    const fn = { json: JSON.stringify, yaml: yaml.load, yml: yaml.load }
    const files = readdirSync(resolve("src/data"))
    return files.reduce(
        (acc, file) => ({
            ...acc,
            ...fn[extname(file).slice(1)](readFileSync(resolve("src/data", file))),
        }),
        {},
    )
}

function htmlsFiles() {
    let files = fs.readdirSync(path.resolve(process.cwd()))
    files = files
        .filter(e => path.extname(e) === ".html")
        .map(e => path.basename(e).replace(".html", ""))
    return files
}
const htmls = htmlsFiles()

const input = htmls.reduce((acc, e) => ({ ...acc, [e]: resolve(e + ".html") }), {})

export default defineConfig({
    // plugins: [pugPlugin.default(options, locals)],
    plugins: [vitePugPlugin({ pugLocals: merge }), sassGlobImports()],
    build: {
        rollupOptions: {
            input: {
                main: resolve("index.html"),
                ...input,
            },
            output: {
                entryFileNames: `assets/[name].js`,
                chunkFileNames: `assets/[name].js`,
                assetFileNames: `assets/[name].[ext]`,
            },
        },
    },
    resolve: {
        alias: {
            "@": resolve("./src"),
            "@var": resolve("./src/sass/_variables.sass"),
        },
    },
})
