export function pluralize(count: number, singularWord: string, pluralizedWord?: string): string {
  const plural = pluralizedWord || `${singularWord}s`
  return count === 1 ? singularWord : plural
}
