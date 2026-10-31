# Evelina Beyene — Portfolio

Static one-page portfolio (HTML/CSS/JS, no build step). Deployed on Vercel from `main`.

## Adding real content

| What | Where | How |
| --- | --- | --- |
| Portrait | `assets/img/portrait.jpg` | Uncomment the `<img>` inside `.hero-portrait` in `index.html` |
| Work / influencer / feed images | `assets/img/` | Put an `<img src="…" alt="…">` inside the matching `<figure class="media">` |
| TikTok videos | `assets/video/` | Files named as in each `<video data-src>` — they load automatically |
| CV | `assets/Evelina-Beyene-CV.pdf` | The "Download CV" button appears once the file exists. Use a version without references or phone number — the file is public |
| LinkedIn | footer in `index.html` | Uncomment the LinkedIn link and add the URL |
| Roles & years | Experience list in `index.html` | Replace `Role` / `Year` |

Any `.media` element without an image shows a striped placeholder.

## Local preview

```bash
python3 -m http.server 4173
```
