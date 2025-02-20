export function safeParseJson<T>(value: string | null): T | null {
  if (!value) return null

  try {
    return JSON.parse(value) as T
  } catch (error) {
    console.error('Failed to parse JSON from localStorage:', error)
    return null
  }
}
