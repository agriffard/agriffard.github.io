#!/usr/bin/env node
/* eslint-disable no-console */
import { cp } from 'node:fs/promises';
import { existsSync } from 'node:fs';

const src = new URL('../dist/pagefind', import.meta.url);
const dest = new URL('../public/pagefind', import.meta.url);

if (!existsSync(src)) {
  console.error('Source dist/pagefind not found, skipping copy.');
  process.exit(0);
}

try {
  await cp(src, dest, { recursive: true });
  console.log('Copied dist/pagefind to public/pagefind');
} catch (err) {
  console.error('Failed to copy Pagefind assets:', err);
  process.exit(1);
}
