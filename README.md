# Evelina Beyene — Portfolio

Static one-page portfolio (HTML/CSS/JS, no build step). Deployed on Vercel from `main`.

## Content

| What | Where |
| --- | --- |
| Portrait, work, influencer and press images | `assets/img/` |
| TikTok videos + poster stills | `assets/video/` (loaded when scrolled into view) |
| CV | `assets/Evelina-Beyene-CV.pdf` |
| Degree certificates, recommendation letter | `assets/docs/` |

The Stockholm University certificate is a copy with the personal identity number removed. Never commit the original.
After changing `styles.css` or `script.js`, bump the `?v=` number in `index.html` so browsers fetch the new version.

## Local preview

```bash
python3 -m http.server 4173
```
