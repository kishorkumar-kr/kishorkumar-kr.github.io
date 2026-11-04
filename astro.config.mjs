// @ts-check
import { defineConfig } from 'astro/config';

// GitHub Pages:
//  - User site (repo named <username>.github.io): set SITE to https://<username>.github.io and leave BASE as '/'.
//  - Project site (any other repo name): set BASE to '/<repo-name>'.
// The deploy workflow sets these automatically from the repo name.
export default defineConfig({
  site: 'https://kishorkumar-kr.github.io',
  base: process.env.BASE ?? '/',
  output: 'static',
});
