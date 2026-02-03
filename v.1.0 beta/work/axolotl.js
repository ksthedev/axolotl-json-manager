                      // * ████ Axolotl Json Manager Library ████ * \\

import fs from "fs"

class axolotljson {
  static json = class {

    static _normalize(path) {
      return path.endsWith(".json") ? path : path + ".json"
    }

    static create(path, pretty = true, force = false) {
      path = this._normalize(path)

      if (fs.existsSync(path) && !force) {
        throw new Error(`[Axolotl Json] File ${path} already exists`)
      }

      fs.writeFileSync(
        path,
        JSON.stringify({}, null, pretty ? 2 : 0),
        "utf-8"
      )
    }

    static read(path) {
      path = this._normalize(path)

      if (!fs.existsSync(path)) {
        throw new Error(`[Axolotl Json] File ${path} doesn't exist`)
      }

      try {
        return JSON.parse(fs.readFileSync(path, "utf-8"))
      } catch {
        throw new Error(`[Axolotl Json] Invalid JSON: ${path}`)
      }
    }

    static write(path, obj, pretty = true) {
      path = this._normalize(path)

      fs.writeFileSync(
        path,
        JSON.stringify(obj, null, pretty ? 2 : 0),
        "utf-8"
      )
    }

    static addKey(path, key, value, pretty = true) {
      const obj = this.read(path)
      obj[key] = value
      this.write(path, obj, pretty)
    }

    static removeKey(path, key, pretty = true) {
      const obj = this.read(path)
      delete obj[key]
      this.write(path, obj, pretty)
    }

    static get(path, key) {
      const obj = this.read(path)
      return obj[key]
    }

    static addPath(path, dotPath, value, pretty = true) {
      const obj = this.read(path)
      const keys = dotPath.split(".")
      let current = obj

      for (let i = 0; i < keys.length - 1; i++) {
        current[keys[i]] ??= {}
        current = current[keys[i]]
      }

      current[keys.at(-1)] = value
      this.write(path, obj, pretty)
    }

    static delete(path, force = false) {
      path = this._normalize(path)

      if (!fs.existsSync(path)) {
        throw new Error(`[Axolotl Json] File ${path} doesn't exist`)
      }

      if (!force) {
        throw new Error(
          `[Axolotl Json] Blocked! Use force=true to delete ${path}`
        )
      }

      fs.unlinkSync(path)
    }

    static exists(path) {
      path = this._normalize(path)
      return fs.existsSync(path)
    }

    static merge(pretty = true, ...files) {
      const result = {}

      for (let path of files) {
        path = this._normalize(path)

        if (!fs.existsSync(path)) {
          throw new Error(`[Axolotl Json] ${path} doesn't exist`)
        }

        let data
        try {
          data = JSON.parse(fs.readFileSync(path, "utf-8"))
        } catch {
          throw new Error(`[Axolotl Json] Invalid JSON: ${path}`)
        }

        Object.assign(result, data)
      }

      return JSON.stringify(result, null, pretty ? 2 : 0)
    }
  }
}

export default axolotljson;