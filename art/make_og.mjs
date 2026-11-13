// Renders the share image (1200x630) with the site's own font and mark: node art/make_og.mjs (needs Playwright + Chromium).
import { chromium } from '@playwright/test'
import { writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { fileURLToPath } from 'node:url'
const root = fileURLToPath(new URL('..', import.meta.url)).replace(/\/$/, '')
const font=`file://${root}/src/app/fonts/Geist.woff2`, mono=`file://${root}/src/app/fonts/GeistMono.woff2`
const mark='<svg viewBox="0 0 32 32" fill="none" stroke="#fff" stroke-width="1.6" stroke-linecap="square" stroke-linejoin="miter" width="190" height="190"><circle cx="16" cy="16" r="13.2"/><path d="M6 16L8.6 8L11.6 23.6L14.2 11L16.6 19.4L18.6 14L20.2 16H31"/></svg>'
const html=`<style>@font-face{font-family:G;src:url(${font});font-weight:100 900}@font-face{font-family:GM;src:url(${mono});font-weight:100 900}
*{margin:0;box-sizing:border-box}body{width:1200px;height:630px;background:#000;color:#fff;font-family:G;position:relative;overflow:hidden}
.dots{position:absolute;inset:0;background-image:radial-gradient(rgba(255,255,255,.22) 1.6px,transparent 1.7px);background-size:40px 40px;opacity:.55}
.glow{position:absolute;inset:0;background:radial-gradient(60% 80% at 82% 50%,rgba(255,255,255,.10),transparent 70%)}
.m{position:absolute;right:92px;top:50%;transform:translateY(-50%)}
.t{position:absolute;left:72px;bottom:84px}.k{font-family:GM;font-size:20px;letter-spacing:.14em;opacity:.6;margin-bottom:22px}
h1{font-size:104px;line-height:.95;letter-spacing:-.055em;font-weight:600}h2{margin-top:26px;font-size:30px;font-weight:400;opacity:.7;letter-spacing:-.01em}
.c{position:absolute;width:30px;height:30px;border:3px solid rgba(255,255,255,.5)}.c1{left:36px;top:36px;border-right:0;border-bottom:0}.c2{right:36px;bottom:36px;border-left:0;border-top:0}</style>
<div class="dots"></div><div class="glow"></div><div class="c c1"></div><div class="c c2"></div><div class="m">${mark}</div>
<div class="t"><p class="k">LOW NOISE / SOFTWARE STUDIO</p><h1>Low Noise</h1><h2>Custom software, with less noise.</h2></div>`
const b = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || undefined })
const p = await b.newPage({ viewport: { width: 1200, height: 630 } })
const tmp = tmpdir() + '/ln-og.html'; writeFileSync(tmp, html); await p.goto('file://' + tmp); await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(400)
for (const f of ['opengraph-image.png','twitter-image.png']) await p.screenshot({ path: `${root}/src/app/${f}` })
await b.close(); console.log('og written')
