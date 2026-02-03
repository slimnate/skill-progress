# skill-progress

A microservice that generates composite SVG images from a skill icon/logo and a progress bar showing proficiency level (1–5). Optimized for [skill-icons](https://github.com/tandpfun/skill-icons) but supports arbitrary image URLs. Icons can be SVG, PNG, or JPG.

## Parameters

| Parameter     | Type   | Required | Description |
| ------------- | ------ | -------- | ----------- |
| `skill`       | string | one of   | Skill name from [skill-icons](https://github.com/tandpfun/skill-icons) or a custom skill (e.g. `convex`). Either `skill` or `image` must be provided. |
| `image`       | string | one of   | URL of an arbitrary icon image. Either `skill` or `image` must be provided. |
| `level`       | number | yes      | Proficiency level from **1** to **5**. |
| `size`        | number | no       | Output size in pixels. **16–512**, default **48**. |
| `startColor`  | string | no*      | Progress bar gradient start color: 3 or 6 digit hex **without** `#`. Must be used together with `endColor`. |
| `endColor`    | string | no*      | Progress bar gradient end color: 3 or 6 digit hex **without** `#`. Must be used together with `startColor`. |

\* `startColor` and `endColor` must both be provided or both omitted.

## Usage

### Production (Netlify)

The function is deployed on Netlify as:

- **Base URL**: `https://skill-progress.netlify.app/.netlify/functions/progress`

Examples:

```text
# Basic JS skill, level 4, default size
https://skill-progress.netlify.app/.netlify/functions/progress?skill=js&level=4

# Explicit size 48
https://skill-progress.netlify.app/.netlify/functions/progress?skill=js&level=4&size=48

# Custom colors
https://skill-progress.netlify.app/.netlify/functions/progress?skill=js&level=5&startColor=ff6b6b&endColor=4ecdc4
```

### Local (Express dev server)

Run the local server:

```bash
npm run dev
# Then open http://localhost:3000/progress?skill=js&level=4&size=48
```

Base route (Express): **`GET /progress`** · Netlify: **`GET /.netlify/functions/progress`**

### Basic: skill + level

Using a skill name from [skill-icons](https://github.com/tandpfun/skill-icons):

```
GET /progress?skill=js&level=5
```

Other examples:

```
GET /progress?skill=ts&level=3
GET /progress?skill=react&level=4
GET /progress?skill=convex&level=2
```

### Custom image URL

Use any image URL instead of a named skill:

```
GET /progress?image=https://example.com/my-icon.svg&level=3
```

### Custom output size

Control the output size (16–512 px, default 48):

```
GET /progress?skill=js&level=4&size=64
GET /progress?skill=react&level=5&size=128
```

### Custom progress bar colors

Override the default yellow-to-green gradient. Pass 3- or 6-digit hex **without** the `#`; both colors are required:

```
GET /progress?skill=js&level=5&startColor=ff6b6b&endColor=4ecdc4
GET /progress?skill=ts&level=3&startColor=f00&endColor=00f
```

### Combined example

```
GET /progress?skill=convex&level=4&size=96&startColor=667eea&endColor=764ba2
```

## Custom skill icons

Custom icons are those not in the official skill-icons repo (maintainers have stopped accepting PRs). Additional icons are welcome via PRs to this repo.

| Name    | Image |
| ------- | ----- |
| `convex` | <img src="img/Convex-Dark.svg" width="48"></img> |

## Planned improvements

- [x] Allow custom progress bar colors
- [x] Custom output size (generate at 48×48 then resize)
- [x] Cache skill-icons
- [x] Native support for [simple-icons](https://github.com/simple-icons/simple-icons)
- [ ] Rasterize to PNG/JPEG instead of SVG
- [ ] Skill level 0? (potential use cases TBD)
- [ ] Add more custom icons (can scrape the PRs on the skill-icons repo and add all the icons that the maintainer won't accept on that project)