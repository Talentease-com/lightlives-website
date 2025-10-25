import type {
  CollectionAfterReadHook,
  GlobalAfterReadHook,
  CollectionBeforeChangeHook,
  GlobalBeforeChangeHook,
  CollectionBeforeDeleteHook,
  CollectionConfig,
  GlobalConfig,
} from 'payload'

// Color codes for terminal output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',

  // Foreground colors
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  red: '\x1b[31m',
}

const timestamp = () => {
  const now = new Date()
  return `${colors.dim}[${now.toLocaleTimeString()}]${colors.reset}`
}

// Log collection operations
export const createCollectionReadLogger =
  (collectionSlug: string): CollectionAfterReadHook =>
  async ({ doc }) => {
    console.log(
      `${timestamp()} ${colors.green}READ${colors.reset} ${colors.bright}Collection:${colors.reset} ${colors.cyan}${collectionSlug}${colors.reset} ${colors.dim}(ID: ${doc.id})${colors.reset}`
    )
    return doc
  }

// Log global operations
export const createGlobalReadLogger =
  (globalSlug: string): GlobalAfterReadHook =>
  async ({ doc }) => {
    console.log(
      `${timestamp()} ${colors.green}READ${colors.reset} ${colors.bright}Global:${colors.reset} ${colors.magenta}${globalSlug}${colors.reset}`
    )
    return doc
  }

// Collection hooks for all operations
export const getCollectionLoggingHooks = (collectionSlug: string) => ({
  beforeChange: [
    (async ({ data, operation }) => {
      const op = operation === 'create' ? 'CREATE' : 'UPDATE'
      const color = operation === 'create' ? colors.blue : colors.yellow
      console.log(
        `${timestamp()} ${color}${op}${colors.reset} ${colors.bright}Collection:${colors.reset} ${colors.cyan}${collectionSlug}${colors.reset} ${colors.dim}(${operation})${colors.reset}`
      )
      return data
    }) as CollectionBeforeChangeHook,
  ],
  afterRead: [createCollectionReadLogger(collectionSlug)],
  beforeDelete: [
    (async ({ id }) => {
      console.log(
        `${timestamp()} ${colors.red}DELETE${colors.reset} ${colors.bright}Collection:${colors.reset} ${colors.cyan}${collectionSlug}${colors.reset} ${colors.dim}(ID: ${id})${colors.reset}`
      )
    }) as CollectionBeforeDeleteHook,
  ],
})

// Global hooks for all operations
export const getGlobalLoggingHooks = (globalSlug: string) => ({
  beforeChange: [
    (async ({ data }) => {
      console.log(
        `${timestamp()} ${colors.yellow}UPDATE${colors.reset} ${colors.bright}Global:${colors.reset} ${colors.magenta}${globalSlug}${colors.reset}`
      )
      return data
    }) as GlobalBeforeChangeHook,
  ],
  afterRead: [createGlobalReadLogger(globalSlug)],
})

// Utility to add logging to an existing collection config
export const withCollectionLogging = (collection: CollectionConfig): CollectionConfig => {
  const existingHooks = collection.hooks || {}
  const loggingHooks = getCollectionLoggingHooks(collection.slug)

  return {
    ...collection,
    hooks: {
      ...existingHooks,
      beforeChange: [...(existingHooks.beforeChange || []), ...loggingHooks.beforeChange],
      afterRead: [...(existingHooks.afterRead || []), ...loggingHooks.afterRead],
      beforeDelete: [...(existingHooks.beforeDelete || []), ...loggingHooks.beforeDelete],
    },
  }
}

// Utility to add logging to an existing global config
export const withGlobalLogging = (global: GlobalConfig): GlobalConfig => {
  const existingHooks = global.hooks || {}
  const loggingHooks = getGlobalLoggingHooks(global.slug)

  return {
    ...global,
    hooks: {
      ...existingHooks,
      beforeChange: [...(existingHooks.beforeChange || []), ...loggingHooks.beforeChange],
      afterRead: [...(existingHooks.afterRead || []), ...loggingHooks.afterRead],
    },
  }
}
