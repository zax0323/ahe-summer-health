export function formatDate(date, locale = 'zh-CN') {
  return new Intl.DateTimeFormat(locale).format(new Date(date))
}
