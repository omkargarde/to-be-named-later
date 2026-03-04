/**
 * Converts a camelCase or PascalCase string to a human-readable format.
 *
 * @param fieldName - The camelCase or PascalCase string to format (e.g., "firstName", "createdAt")
 * @returns A space-separated string with capitalized first letter (e.g., "First Name", "Created At")
 */
export function formatFieldName(fieldName: string): string {
  let result = "";

  for (let i = 0; i < fieldName.length; i++) {
    const char = fieldName[i];
    if (i === 0) {
      result += char.toUpperCase();
    } else if (char === char.toUpperCase()) {
      result += " " + char;
    } else {
      result += char;
    }
  }

  return result;
}
