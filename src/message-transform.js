/**
 * Downgrade errors to warning
 */
function errorAsWarning(message) {
  if (message.severity === 2) {
    message.severity = 1
  }
}
exports.errorAsWarning = errorAsWarning

/**
 * Downgrade fatal errors to warning if 'fatal-as-warning' is enabled in the settings
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
exports.mayFatalAsWarning = mayFatalAsWarning
