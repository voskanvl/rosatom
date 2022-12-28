import Splide, { Options } from "@splidejs/splide"

export class MSplides {
    splides: Map<string, Options>
    instances: Record<string, Splide> = {}
    constructor(splides?: Map<string, Options>) {
        this.splides = splides || new Map()
        if (this.splides.size) this.init()
    }

    private allSplides(fn: 'mount' | 'refresh') {
        this.splides.forEach((value, key) => {
            this.instances[key] = new Splide(key, value)[fn]()
        })
    }

    init() {
        this.allSplides('mount')
    }

    refresh() {
        this.allSplides("refresh")
    }
    add(key: string, option: Options = {}) {
        this.splides.set(key, option)
        this.instances[key] = new Splide(key, option)['mount']()
    }
}