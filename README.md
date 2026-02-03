# skill-progress
This package is a microservice that generate composite svg images from a given skill icon/logo and augments them with a progress bar to show your proficiency level in that skill. It is optimized to work with the [skill-icons](https://github.com/tandpfun/skill-icons) library, but also supports arbitrary image urls. It supports SVG, PNG, and JPG images for the icons.

# Usage
Simply call the `progress` route supplying a skill or image, and a proficiency level from 1-5:

Using skill name from [skill-icons](https://github.com/tandpfun/skill-icons) or any of the provided custom skill icons:

```
GET /progress?skill=js&level=5
```

## Custom skill icons
These are skill icons I had to create myself since are not included in the official skill-icons repo - the maintainers have stopped accepting any PR's and have not added any new icons in several years. I would love to accept PRs in this repo for additional icons.

| Name | Image |
| ---- | ----- |
| `convex` | <img src="img/Convex-Dark.svg" width="48"></img> |

Arbitray image:
```
GET/progress?image=<image_url>&level=3
```

# Planned improvements
[ ] - Allow for custom progress bar colors
[ ] - Rasterize to png/jpg instead of svg
[ ] - Custom output size
[ ] - Cache skill-icons
[ ] - Native support for [simple-icons](https://github.com/simple-icons/simple-icons)
[ ] - Skill level 0? What are the potential use cases for this?