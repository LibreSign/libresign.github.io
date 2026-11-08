import { mkdir, rm, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'

export const destination = 'https://docs.libresign.coop'
export const redirects = new Map([
  ['index.html', `${destination}/developer_manual/`],
  ['Getting-started.html', `${destination}/developer_manual/api/guide-api.html`],
  ['api/index.html', `${destination}/developer_manual/api/openapi.html`],
  ['pt/index.html', `${destination}/developer_manual/`],
  ['pt/Getting-started.html', `${destination}/developer_manual/api/guide-api.html`],
  ['pt/api/index.html', `${destination}/developer_manual/api/openapi.html`],
  ['releases.html', 'https://github.com/LibreSign/libresign/releases'],
  ['404.html', `${destination}/developer_manual/`],
])

function htmlEscape(value) {
  return value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')
}

export function redirectPage(target) {
  const escaped = htmlEscape(target)
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="robots" content="noindex, follow">
  <meta http-equiv="refresh" content="0; url=${escaped}">
  <link rel="canonical" href="${escaped}">
  <title>LibreSign documentation has moved</title>
</head>
<body>
  <p>The LibreSign documentation has moved. <a href="${escaped}">Open the current documentation</a>.</p>
</body>
</html>
`
}

export async function build(outputDir) {
  await rm(outputDir, { recursive: true, force: true })
  for (const [file, url] of redirects) {
    const targetFile = join(outputDir, file)
    await mkdir(dirname(targetFile), { recursive: true })
    await writeFile(targetFile, redirectPage(url))
  }
}

if (process.argv[1] && import.meta.url === new URL(`file://${process.argv[1]}`).href) {
  await build(process.argv[2] ?? 'dist')
}
