import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const target = process.env.MICROLAB_PUBLIC_URL?.trim();
if (process.env.TAURI_BUILD === '1' && !target) {
  throw new Error('Set MICROLAB_PUBLIC_URL to a public HTTPS production URL before building a desktop release.');
}
if (target && !/^https:\/\//i.test(target)) {
  throw new Error('MICROLAB_PUBLIC_URL must use HTTPS.');
}
if (target && new URL(target).hostname.endsWith('.higgsfield.app')) {
  throw new Error('Use a public production endpoint; the current Higgsfield URL requires authentication.');
}
const template = await readFile(resolve('native/desktop/index.html'), 'utf8');
const output = resolve('dist/desktop/index.html');
await mkdir(resolve('dist/desktop'), { recursive: true });
await writeFile(output, template.replace('%MICROLAB_PUBLIC_URL%', target ? JSON.stringify(target) : 'null'));
console.log(target ? 'Desktop shell configured with the public production URL.' : 'Desktop shell left in setup mode; no public URL configured.');
