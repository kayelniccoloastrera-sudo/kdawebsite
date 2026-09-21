# K.D.A Kayel's Digital Arts — website

Plain HTML, CSS and JavaScript. No build step, no frameworks. Open it and it runs.

## Folder structure

```
kda-website/
├── index.html          ← home page (this is the one browsers open by default)
├── services.html
├── pricing.html
├── process.html
├── contact.html
├── css/
│   └── style.css       ← every page uses this one stylesheet
├── js/
│   └── main.js         ← every page uses this one script
├── images/             ← put your photos here
└── README.md           ← this file
```

Two rules keep it tidy:

1. **HTML files stay in the root folder.** If you move `services.html` into a
   subfolder, every link and every `css/style.css` path breaks.
2. **Everything else gets a folder by type** — `css/`, `js/`, `images/`.

## How the linking works

Paths are *relative* — they're read starting from the file doing the linking.
Since all the HTML sits in the root:

| What you want | What you write |
|---|---|
| Another page | `href="pricing.html"` |
| The stylesheet | `href="css/style.css"` |
| The script | `src="js/main.js"` |
| An image | `src="images/face.jpg"` |
| An outside site | `href="https://facebook.com/..."` |

`css/style.css` means "the css folder next to me, then style.css inside it."
If you ever nest a page one folder deep, that same link becomes
`../css/style.css` — `..` means "go up one folder."

## Adding your images

Drop the files into `images/`, then replace the grey placeholder blocks.
Every placeholder in the HTML already shows the filename it expects, e.g.:

```html
<div class="thumb">images/face.jpg</div>
```

becomes

```html
<div class="thumb"><img src="images/face.jpg" alt="Digital portrait, face only"></div>
```

The CSS already handles the cropping. Filenames to prepare:

- `hero-desk.jpg` — the workspace photo
- `service-custom.jpg`, `service-prints.jpg`, `service-hardcopy.jpg`
- `face.jpg`, `half-body.jpg`, `full-body.jpg`
- `packaging.jpg` — the boxed artwork
- `archiving.jpg` — the tablet drawing photo

Keep filenames lowercase with hyphens, no spaces. Spaces in filenames cause
broken images on real web servers even when they work on your laptop.

## Running it in VS Code

1. `File → Open Folder` and pick `kda-website` (the whole folder, not a single file).
2. Install the **Live Server** extension from the Extensions panel.
3. Right-click `index.html` → **Open with Live Server**.

Live Server reloads the browser every time you save, which beats pressing F5.

## Editing the nav

The header is copy-pasted into all five pages. When you add a page, add the
`<li>` to every page's `.nav-links`, and put `class="active"` on the link that
matches the page you're editing. That's the trade-off with plain HTML — no
includes, so shared parts get duplicated.
