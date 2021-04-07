/**
 * Get only-warn config if available
 */
function getOnlyWarnConfig(configs) {
  let onlyWarnConfig = {}
  if (Array.isArray(configs)) {
    configs.forEach(config => {
      if (config.settings && config.settings['only-warn']) {
        Object.assign(onlyWarnConfig, config.settings['only-warn'])
      }
    })
  }
  return onlyWarnConfig
}

/**
 * Check if ruleId is excluded
 */
function isRuleIdExcluded(message, onlyWarnConfig) {
  if (message.ruleId && typeof onlyWarnConfig['exclude-id'] === 'string') {
    const excludeRuleIdRegex = new RegExp(onlyWarnConfig['exclude-id'])
    if (excludeRuleIdRegex.test(message.ruleId)) {
      return true
    }
  }
  return false
}

/**
 * Downgrade fatal to warning if 'fatal-as-warning' is enabled in the settings
 */
function mayFatalAsWarning(message, onlyWarnConfig) {
  if (
    message.fatal &&
    typeof onlyWarnConfig['fatal-as-warning'] === 'boolean'
  ) {
    if (onlyWarnConfig['fatal-as-warning']) {
      message.fatal = false
    }
  }
  return
}

module.exports = { getOnlyWarnConfig, isRuleIdExcluded, mayFatalAsWarning }
