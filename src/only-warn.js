const getEslintModules = require('./get-eslint-modules')
const {
  getOnlyWarnConfig,
  isRuleIdExcluded,
  mayFatalAsWarning
} = require('./settings')

const unpatchedVerify = Symbol('verify')

/**
 * Patch the verify method and downgrade the errors to warnings.
 */
function patch(LinterPrototype) {
  if (LinterPrototype[unpatchedVerify]) {
    return
  }
  LinterPrototype[unpatchedVerify] = LinterPrototype.verify
  LinterPrototype.verify = function() {
    const messages = LinterPrototype[unpatchedVerify].apply(this, arguments)
    const onlyWarnConfig = getOnlyWarnConfig(arguments[1])
    messages.forEach(message => {
      if (isRuleIdExcluded(message, onlyWarnConfig)) {
        return
      }
      errorAsWarning(message)
      mayFatalAsWarning(message, onlyWarnConfig)
    })
    return messages
  }
}

function errorAsWarning(message) {
  if (message.severity === 2) {
    message.severity = 1
  }
}

/**
 * Remove the patch
 */
function unpatch(LinterPrototype) {
  if (LinterPrototype[unpatchedVerify]) {
    LinterPrototype.verify = LinterPrototype[unpatchedVerify]
    delete LinterPrototype[unpatchedVerify]
  }
}

function enable() {
  for (const eslint of getEslintModules()) {
    patch((eslint.Linter && eslint.Linter.prototype) || eslint.linter)
  }
}
function disable() {
  for (const eslint of getEslintModules()) {
    unpatch((eslint.Linter && eslint.Linter.prototype) || eslint.linter)
  }
}
enable()
module.exports = { enable, disable }
