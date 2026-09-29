# Blog Images Folder

Place department images here to automatically use them in your blog posts.

## Folder Structure

```
public/
  Blog/
    Oncology/
      hero.jpg        ← Main full-width banner image
      secondary.jpg   ← In-article secondary image
    Cardiology/
      hero.jpg
      secondary.jpg
    General/
      hero.jpg
      secondary.jpg
    [AnyDepartment]/
      hero.jpg
      secondary.jpg
```

## How It Works

- The **hero image** (`hero.jpg`) shows as the full-width top banner on the post page AND as the cover card image on the Blogs listing page.
- The **secondary image** (`secondary.jpg`) shows in the middle of the article body.
- Supported formats: `.jpg`, `.jpeg`, `.png`, `.webp`
- If no image is found in the folder, the post will fall back to the default Unsplash image.

## Adding a New Department

1. Create a subfolder with the **exact same name** as the `.tsx` file in `pages/Post/` (e.g., `Neurology`)
2. Drop your `hero.jpg` and `secondary.jpg` inside it
3. The blog system will automatically pick them up — no code changes needed!
