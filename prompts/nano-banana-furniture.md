# פרומפטים ל־Nano Banana — סדרת רהיטים, נגריית אלון

מטרה: סדרת תמונות שנראות כאילו צולמו באותו יום, באותו סטודיו, באותה מצלמה.
העיקרון: **הסצנה נעולה, רק הרהיט מתחלף.**

---

## חלק א׳ — בלוק הסגנון הנעול (להעתיק בכל פרומפט, ללא שינוי)

```
Photorealistic interior product photograph, shot on a Canon EOS R5 with an 35mm
lens at f/5.6, ISO 200. Single large north-facing window on the left casting soft
directional daylight, with a subtle warm bounce fill from the right. Late morning
light, slightly overcast, no harsh shadows, no visible artificial lighting.

Setting: a quiet minimal room with off-white lime-plastered walls (#F5F0E8), a
pale wide-plank oak floor, and a plain matte wall behind. No wall art, no plants,
no clutter, no text, no branding, no people.

Camera: eye-level, straight-on to slightly angled three-quarter view, tripod
height 120cm, furniture centered with generous negative space around it. Full
piece visible, nothing cropped.

Colour and finish: natural warm neutral palette, muted linen and wood tones.
Visible wood grain, matte hand-oiled finish, no gloss, no varnish sheen.
Realistic material imperfections in the grain.

Rendering: true-to-life colour, natural depth of field with the whole piece in
focus, fine detail in the joinery, subtle film grain. Editorial furniture
catalogue aesthetic. Absolutely photorealistic, not a 3D render, not CGI,
not illustration.
```

**Negative prompt (בכל תמונה):**
```
3D render, CGI, illustration, cartoon, painting, oversaturated, HDR, glossy,
plastic look, fisheye, wide angle distortion, people, hands, text, watermark,
logo, signage, clutter, plants, rugs, dramatic shadows, studio strobe,
blue tint, cool white light, blurry, low resolution, warped perspective,
extra legs, floating furniture, impossible joinery
```

---

## חלק ב׳ — שורת הנושא לכל תמונה

מדביקים את השורה הזאת **לפני** בלוק הסגנון.

### 1. שולחן אוכל
```
A solid walnut dining table for six, 200cm long, rectangular top with a 4cm
thick edge, clean straight legs set slightly inboard, visible mortise and tenon
joinery, hand-oiled matte finish. Bare tabletop, nothing on it.
```

### 2. שולחן סלון
```
A low solid oak coffee table, 110cm long, rectangular top with softly eased
edges, slim tapered legs, visible grain running lengthwise, hand-oiled matte
finish. Bare top, nothing on it.
```

### 3. ארון
```
A floor-standing solid oak wardrobe, 200cm tall and 120cm wide, two full-height
flat-panel doors with a fine even reveal between them, recessed finger pulls
instead of handles, plain plinth base, hand-oiled matte finish. Doors closed.
```

### 4. מזנון
```
A long low solid walnut sideboard, 180cm wide and 75cm tall, four flat drawer
fronts in a row with recessed finger pulls, slim straight legs lifting it off
the floor, continuous grain running across the drawer fronts, hand-oiled matte
finish. Nothing on top.
```

### 5. ספרייה
```
A freestanding solid pine bookshelf, 180cm tall and 90cm wide, five open
shelves with visible through-tenon joinery at the sides, no back panel, slim
uprights, hand-oiled matte finish. Shelves empty.
```

### 6. קיר אחסון
```
A full-height built-in solid oak storage wall, floor to ceiling, a grid of
closed flat-panel doors and two open niches, recessed finger pulls, fine even
reveals between panels, hand-oiled matte finish. Shot straight-on.
```

---

## חלק ג׳ — איך לשמור על אחידות בפועל

1. **קודם מייצרים את תמונה 1** ומאשרים אותה. היא הופכת לתמונת הייחוס.
2. לשאר התמונות, מוסיפים בסוף הפרומפט:
   `Same room, same window, same light, same floor, same wall, same camera
   height and same lens as the reference image. Only the furniture changes.`
3. אם הכלי תומך בתמונת ייחוס, מעלים את תמונה 1 כ־reference בכל שאר הריצות.
4. **לא לשנות** את בלוק הסגנון בין תמונה לתמונה. כל שינוי קטן שם שובר את האחידות.
5. לייצר הכל באותו יחס גובה־רוחב: 16:9 לדסקטופ, או 4:3 אם התמונה תשמש גם בנייד.

## חלק ד׳ — מה לבדוק לפני שמשתמשים

- ספירת רגליים ומדפים. מודלים נוטים להוסיף או להשמיט.
- חיבורי נגרות שנראים אפשריים פיזית.
- כיוון הסיב עקבי על פני משטח אחד.
- פרספקטיבה: קווים ישרים באמת ישרים.
- אין טקסט או לוגו שהמודל המציא.
