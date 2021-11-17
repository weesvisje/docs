import { promises as fs } from 'fs'

/**
 * Check if the file exists, funny that nodejs doesn't have this by default
 * @param filePath filePath
 * @returns `true` if the file exists, `false` if it doesn't
 */
export default async function exists(filePath: string): Promise<boolean> {
  try {
    await fs.access(filePath)
    return true
  } catch {
    return false
  }
}
