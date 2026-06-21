# Image prompts — The Framework landing (v2)

Drop every file into `public/marketing/`. Until a file exists, its slot shows a
graceful fallback (no broken images).

## Global style (append to EVERY prompt for cohesion)
> Editorial wedding photography, **warm-toned black & white** (not cold/grey — keep a
> faint sepia warmth), high dynamic range, fine **35mm film grain**, shallow depth of
> field, natural available light, candid and unposed, timeless and expensive-looking.
> Consistent couple and palette across all images so they read as one photographer's
> portfolio. No text, no watermark, no logos.

Export: optimized JPG, 72–82% quality, aim < 400 KB each (hero/CTA < 600 KB).

---

## Hero
| File | Size (px) | Aspect | Prompt |
|---|---|---|---|
| `hero.jpg` | 2400 × 1500 | 16:10 landscape | A couple embracing in an open field at golden hour, strong backlight rim-lighting their silhouettes, vast soft sky, lots of empty space at top and sides for a big centered word. Cinematic, distant, romantic. |

## Explore-the-day markers (small thumbs, keep faces mid-frame)
| File | Size (px) | Aspect | Prompt |
|---|---|---|---|
| `day-01.jpg` | 700 × 880 | 4:5 | Flat-lay of wedding details on linen — rings, invitation suite, perfume — soft window light. |
| `day-02.jpg` | 700 × 880 | 4:5 | Bride getting ready by a window, hairstylist's hands, soft morning light, candid. |
| `day-03.jpg` | 700 × 880 | 4:5 | First-look moment, one partner reacting, emotional, secluded garden. |
| `day-04.jpg` | 700 × 880 | 4:5 | Wedding party laughing together outdoors, candid group, movement. |
| `day-05.jpg` | 700 × 880 | 4:5 | Outdoor ceremony — couple at the altar, guests soft-focus foreground. |
| `day-06.jpg` | 700 × 880 | 4:5 | Family portrait moment, multi-generation, warm afternoon. |
| `day-07.jpg` | 700 × 880 | 4:5 | Reception room before guests — tables, candles, string lights bokeh. |
| `day-08.jpg` | 700 × 880 | 4:5 | Couple portrait at sunset, dreamy backlight, silhouette-leaning, golden. |
| `day-09.jpg` | 700 × 880 | 4:5 | First dance, dark room, spotlight + string-light bokeh, motion. |

## Section full-bleeds
| File | Size (px) | Aspect | Prompt |
|---|---|---|---|
| `problem.jpg` | 2200 × 1400 | 11:7 | Quiet getting-ready scene, dress hanging in soft light, calm and a little lonely — "the unbilled hours" mood. Negative space left. |
| `how-1.jpg` | 2000 × 1400 | 10:7 | A couple at a laptop/phone filling a form at a kitchen table, candid, warm. (Stands in for "intake".) |
| `how-2.jpg` | 2000 × 1400 | 10:7 | Photographer reviewing the day on the back of a camera, behind-the-scenes, focused. (Stands in for "the engine".) |
| `how-3.jpg` | 2000 × 1400 | 10:7 | Couple looking at a phone together, delighted, soft evening light. (Stands in for "the portal".) |
| `sample-card.jpg` | 1400 × 1750 | 4:5 | Elegant venue + golden-hour couple in one frame, used behind the timeline list. |

## Gallery (portrait, stack-reveal)
| File | Size (px) | Aspect | Prompt |
|---|---|---|---|
| `gallery-1.jpg` | 1200 × 1500 | 4:5 | Getting ready — dress detail, candid hands. |
| `gallery-2.jpg` | 1200 × 1500 | 4:5 | First look — raw reaction. |
| `gallery-3.jpg` | 1200 × 1500 | 4:5 | Ceremony — the vows, emotional. |
| `gallery-4.jpg` | 1200 × 1500 | 4:5 | Golden hour — couple portrait, backlit. |
| `gallery-5.jpg` | 1200 × 1500 | 4:5 | Reception — first dance / celebration. |

## Proof (testimonial)
| File | Size (px) | Aspect | Prompt |
|---|---|---|---|
| `proof-main.jpg` | 1400 × 1600 | 7:8 | A working wedding photographer mid-shoot, slight **motion blur**, B&W, alive and candid. |
| `proof-1.jpg` | 800 × 1000 | 4:5 | Photographer portrait, calm, B&W. |
| `proof-2.jpg` | 800 × 1000 | 4:5 | Second photographer portrait, different person, B&W. |

## Final CTA
| File | Size (px) | Aspect | Prompt |
|---|---|---|---|
| `cta.jpg` | 2400 × 1400 | 12:7 | Intimate close wide shot of a couple in a quiet moment, lots of room on the left for a big headline, warm B&W, filmic. |

---

### Generation tips
- Generate the **hero, cta, and gallery** first — they carry the page.
- Ask your image tool to keep **the same couple** in hero / gallery / cta for continuity.
- Keep faces out of the bottom-left of `hero.jpg` and left of `cta.jpg` (text sits there).
- If your tool supports it, add: *"shot on Portra 400, 35mm, f/1.8"* for consistent film look.
