# skill-progress

A microservice that generates composite SVG images from a skill icon/logo and a progress bar showing proficiency level (1–5). Optimized for [skill-icons](https://github.com/tandpfun/skill-icons) but supports arbitrary image URLs. Icons can be SVG, PNG, or JPG.

Example:

![JavaScript – level 4](https://skill-progress.netlify.app/.netlify/functions/progress?skill=js&level=4&size=48)
![TypeScript – level 5](https://skill-progress.netlify.app/.netlify/functions/progress?skill=ts&level=5&size=48)
![React – level 4](https://skill-progress.netlify.app/.netlify/functions/progress?skill=react&level=4&size=48)
![Convex – level 3](https://skill-progress.netlify.app/.netlify/functions/progress?skill=convex&level=3&size=48)

## Parameters

| Parameter     | Type   | Required | Description |
| ------------- | ------ | -------- | ----------- |
| `skill`       | string | one of   | Skill name from [skill-icons](https://github.com/tandpfun/skill-icons) or a custom skill (e.g. `convex`). Either `skill` or `image` must be provided. |
| `image`       | string | one of   | URL of an arbitrary icon image. Either `skill` or `image` must be provided. |
| `level`       | number | yes      | Proficiency level from **1** to **5**. |
| `size`        | number | no       | Output size in pixels. **16–512**, default **48**. |
| `style`       | string | no       | Progress bar style. One of `rounded` (default) or `flat`. |
| `startColor`  | string | no*      | Progress bar gradient start color: 3 or 6 digit hex **without** `#`. Must be used together with `endColor`. |
| `endColor`    | string | no*      | Progress bar gradient end color: 3 or 6 digit hex **without** `#`. Must be used together with `startColor`. |

\* `startColor` and `endColor` must both be provided or both omitted.

## Usage

### Deploy on Netlify (recommended)

The app runs as a Netlify Function. Deploy by connecting this repo to [Netlify](https://netlify.com); build command and functions are configured in `netlify.toml`.

- **Function URL:** `/.netlify/functions/progress`
- **Example:** `https://your-site.netlify.app/.netlify/functions/progress?skill=js&level=5`

Test locally with Netlify CLI:

```bash
npm run netlify:dev
# Then open http://localhost:8888/.netlify/functions/progress?skill=js&level=5
```

### Local Express server

Run the classic Express server for local development:

```bash
npm run dev
# Then open http://localhost:3000/progress?skill=js&level=5
```

Base route (Express): **`GET /progress`** · Netlify: **`GET /.netlify/functions/progress`**

### Basic: skill + level

Using a skill name from [skill-icons](https://github.com/tandpfun/skill-icons):

```
https://skill-progress.netlify.app/.netlify/functions/progress?skill=js&level=5
```

![JavaScript – level 5](https://skill-progress.netlify.app/.netlify/functions/progress?skill=js&level=5&size=48)

Other examples:

```
https://skill-progress.netlify.app/.netlify/functions/progress?skill=ts&level=3
https://skill-progress.netlify.app/.netlify/functions/progress?skill=react&level=4
https://skill-progress.netlify.app/.netlify/functions/progress?skill=convex&level=2
```

![TypeScript – level 3](https://skill-progress.netlify.app/.netlify/functions/progress?skill=ts&level=3&size=48)
![React – level 4](https://skill-progress.netlify.app/.netlify/functions/progress?skill=react&level=4&size=48)
![Convex – level 2](https://skill-progress.netlify.app/.netlify/functions/progress?skill=convex&level=2&size=48)

### Custom image URL

Use any image URL instead of a named skill:

```
https://skill-progress.netlify.app/.netlify/functions/progress?image=https://example.com/my-icon.svg&level=3
```

### Custom output size

Control the output size (16–512 px, default 48):

```
https://skill-progress.netlify.app/.netlify/functions/progress?skill=js&level=4&size=64
https://skill-progress.netlify.app/.netlify/functions/progress?skill=react&level=5&size=128
```

![JavaScript – level 4, size 64](https://skill-progress.netlify.app/.netlify/functions/progress?skill=js&level=4&size=64)
![React – level 5, size 128](https://skill-progress.netlify.app/.netlify/functions/progress?skill=react&level=5&size=128)

### Custom progress bar colors

Override the default yellow-to-green gradient. Pass 3- or 6-digit hex **without** the `#`; both colors are required:

```
https://skill-progress.netlify.app/.netlify/functions/progress?skill=js&level=5&startColor=ff6b6b&endColor=4ecdc4
https://skill-progress.netlify.app/.netlify/functions/progress?skill=ts&level=3&startColor=f00&endColor=00f
```

![JavaScript – custom colors](https://skill-progress.netlify.app/.netlify/functions/progress?skill=js&level=5&startColor=ff6b6b&endColor=4ecdc4&size=48)
![TypeScript – custom colors](https://skill-progress.netlify.app/.netlify/functions/progress?skill=ts&level=3&startColor=f00&endColor=00f&size=48)

### Progress bar style

Choose between rounded and flat styles. Default is `rounded`:

```
https://skill-progress.netlify.app/.netlify/functions/progress?skill=js&level=5&style=flat
https://skill-progress.netlify.app/.netlify/functions/progress?skill=react&level=4&style=rounded
```

![JavaScript – flat style](https://skill-progress.netlify.app/.netlify/functions/progress?skill=js&level=5&style=flat&size=48)
![React – rounded style](https://skill-progress.netlify.app/.netlify/functions/progress?skill=react&level=4&style=rounded&size=48)

### Combined example

```
https://skill-progress.netlify.app/.netlify/functions/progress?skill=convex&level=4&size=96&startColor=667eea&endColor=764ba2
```

![Convex – combined example](https://skill-progress.netlify.app/.netlify/functions/progress?skill=convex&level=4&size=96&startColor=667eea&endColor=764ba2)

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
- [ ] Skill level 0? (potential use case is for generating icon without a progress bar at all - this could allow people to contribute icons to my library since the skill-icons maintainers no longer accept new icons)
- [ ] Add more custom icons (can scrape the PRs on the skill-icons repo and add all the icons that the maintainer won't accept on that project)
- [ ] Allow for labels, and to use emojis as progress bar (https://stackoverflow.com/questions/24768630/is-there-a-way-to-show-a-progressbar-on-github-wiki/61857070#61857070)
- [ ] Generate SVGs from scratch so that any percentage can be used, instead of just the 1-5 steps.
- [ ] Add support for additional input iamge types (webp, etc.)
- [ ] Vertical progress bar to left/right of image.