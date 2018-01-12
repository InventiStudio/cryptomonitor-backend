import glob from 'glob'
import path from 'path'

const CODE_ROOT = process.env.NODE_ENV === 'production' ? 'build' : 'src'

const CONTROLLERS_PATH = `${CODE_ROOT}/modules/**/*.controller.js`
const MODELS_PATH      = `${CODE_ROOT}/modules/**/*.model.js`
const RELATIONS_PATH   = `${CODE_ROOT}/modules/relations.js`

function preparePathToRequire(p) {
  return path.relative(__dirname, `${process.cwd()}/${p}`)
}

function loadFilesFrom(dir) {
  return glob
    .sync(dir)
    .map(preparePathToRequire)
    .map(require)
}

export default {
  loadModels:      () => loadFilesFrom(MODELS_PATH),
  loadControllers: () => loadFilesFrom(CONTROLLERS_PATH),
  loadRelations:   () => loadFilesFrom(RELATIONS_PATH),
  load() {
    this.loadModels()
    this.loadControllers()
    this.loadRelations()
  },
}
