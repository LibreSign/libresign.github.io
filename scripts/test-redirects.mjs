import assert from 'node:assert/strict'
import { readFile, mkdtemp, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { build, redirects } from './build-redirects.mjs'

const output = await mkdtemp(join(tmpdir(), 'libresign-redirect-'))
try {
  await build(output)
  assert.equal(redirects.size, 8)
  for (const [page, target] of redirects) {
    const content = await readFile(join(output, page), 'utf8')
    assert.match(content, /<meta name="robots" content="noindex, follow">/)
    assert.ok(content.includes(`<meta http-equiv="refresh" content="0; url=${target}">`), page)
    assert.ok(content.includes(`<link rel="canonical" href="${target}">`), page)
    assert.ok(content.includes(`<a href="${target}">`), page)
    assert.ok(!content.includes('VuePress'), page)
  }
  assert.equal(redirects.get('404.html'), redirects.get('index.html'))
  console.log(`Validated ${redirects.size} legacy redirects and the 404 fallback`)
} finally {
  await rm(output, { recursive: true, force: true })
}
