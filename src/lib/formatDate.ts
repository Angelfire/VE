type GetFormattedDateProps = {
  date: string | number | Date
  options?: Intl.DateTimeFormatOptions | {}
  locale?: Intl.LocalesArgument | string
}

export function getFormattedDate({
  date,
  options = {},
  locale = "en-US"
}: GetFormattedDateProps) {
  const formatOptions: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "short",
    year: "numeric",
    ...options,
  }

  return new Date(date).toLocaleDateString(locale, formatOptions)
}
