export type LogLevel = 'debug' | 'info' | 'warn' | 'error'

export type LogMeta = Record<string, unknown>

export interface LoggerOptions {
  /** Prefix shown on every line, e.g. "api" or "api:db". */
  name?: string
  /** Minimum level to print. Defaults to "info". */
  level?: LogLevel
}

export interface Logger {
  debug(message: string, meta?: LogMeta): void
  info(message: string, meta?: LogMeta): void
  warn(message: string, meta?: LogMeta): void
  error(message: string, meta?: LogMeta): void
  /** Create a logger that shares this level and appends `name` to the prefix. */
  child(name: string): Logger
}

const LEVEL_WEIGHT: Record<LogLevel, number> = {
  debug: 10,
  info: 20,
  warn: 30,
  error: 40,
}

export function createLogger(options: LoggerOptions = {}): Logger {
  const { name, level = 'info' } = options
  const threshold = LEVEL_WEIGHT[level]

  const log = (lvl: LogLevel, message: string, meta?: LogMeta) => {
    if (LEVEL_WEIGHT[lvl] < threshold) return

    const scope = name ? ` [${name}]` : ''
    const prefix = `${new Date().toISOString()} ${lvl.toUpperCase().padEnd(5)}${scope}`

    if (meta) console[lvl](prefix, message, meta)
    else console[lvl](prefix, message)
  }

  return {
    debug: (message, meta) => log('debug', message, meta),
    info: (message, meta) => log('info', message, meta),
    warn: (message, meta) => log('warn', message, meta),
    error: (message, meta) => log('error', message, meta),
    child: (childName) => createLogger({ level, name: name ? `${name}:${childName}` : childName }),
  }
}

/** Ready-to-use default logger. */
export const logger = createLogger()
