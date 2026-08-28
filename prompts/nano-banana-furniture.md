# פרומפטים ל־Nano Banana — סדרת רהיטים, נגריית אלון

מטרה: תמונות שנראות כמו צילום פנים אמיתי של בית, לא כמו קטלוג מוצרים.
הרהיט הוא הנושא, אבל הוא חייב לחיות בתוך חדר מלא.

## שלושת העקרונות

1. **החדר מלא, לא ריק.** רהיטים נוספים, כלים על מדפים, ספרים, קרמיקה,
   צמח, שטיח, וילון. חלק מהרהיטים נחתכים בקצה הפריים. חדר ריק נראה מזויף.
2. **בן אדם בתנועה, מטושטש.** אדם אחד חוצה את הפריים, מטושטש בגלל
   מהירות תריס איטית. המצלמה ממוקדת על הרהיט, לא עליו. זה מה שנותן
   תחושת בית אמיתי ולא סטודיו.
3. **הסצנה נעולה.** בלוק הסגנון מועתק זהה בכל תמונה. רק הרהיט מתחלף.

---

## חלק א׳ — בלוק הסגנון הנעול (להעתיק בכל פרומפט, ללא שינוי)

```
Editorial interior photograph of a real lived-in family home, in the style of
an architectural digest feature. Shot on a Canon EOS R5, 24mm lens at f/4,
ISO 400, shutter 1/15s on a tripod.

A person walks through the frame and is rendered as a soft motion blur, their
face and body indistinct, caught mid-stride. The furniture stays perfectly
sharp and in focus; only the person is blurred. They are incidental to the
shot, not posed, not looking at the camera, positioned off to one side.

The room is genuinely lived in and full: other furniture visible and partly
cropped by the edges of the frame, a sofa or chairs in the foreground, ceramics
books plants and small objects styled naturally on surfaces, a rug, curtains,
pendant lighting. Layered depth from foreground through to background. Nothing
looks staged or empty.

Light: large windows with soft diffused daylight, bright and airy, gentle
shadows, warm neutral white balance. Pale oak floor, off-white walls.

Colour: muted natural palette, warm neutrals, soft greens and wood tones.
Photorealistic, true-to-life colour, fine detail in the wood grain and joinery,
natural film grain. Absolutely not a 3D render, not CGI, not an illustration.
```

**Negative prompt (בכל תמונה):**
```
empty room, bare walls, minimal, sterile, showroom, product shot on white
background, floating furniture, isolated object, staged, 3D render, CGI,
illustration, oversaturated, HDR, glossy, plastic, sharp face, posed person
looking at camera, portrait, text, watermark, logo, blurry furniture,
warped perspective, extra legs, impossible joinery, distorted hands
```

---

## חלק ב׳ — שורת הנושא לכל תמונה

מדביקים **לפני** בלוק הסגנון.

### 1. שולחן אוכל
```
The subject is a solid walnut dining table for six in a bright open dining area,
200cm long, thick rectangular top, clean straight legs, visible mortise and
tenon joinery, hand-oiled matte finish. Mismatched chairs around it, a ceramic
vase with branches and a stack of plates on the table, a sideboard behind,
a pendant lamp hanging above.
```

### 2. שולחן סלון
```
The subject is a low solid oak coffee table in a warm living room, 110cm long,
softly eased edges, slim tapered legs, hand-oiled matte finish. Art books,
a ceramic bowl and a mug on top, a large linen sofa cropped by the foreground
edge of the frame, a rug underneath, a plant beside it.
```

### 3. ארון
```
The subject is a solid oak wardrobe in a bedroom, 200cm tall, two full-height
flat-panel doors with fine even reveals, recessed finger pulls, hand-oiled matte
finish. A made bed with linen bedding cropped in the foreground, a bedside table
with a lamp and books, folded textiles, morning light across the floor.
```

### 4. מזנון
```
The subject is a long low solid walnut sideboard in a living room, 180cm wide,
four flat drawer fronts, recessed finger pulls, slim straight legs, continuous
grain across the fronts, hand-oiled matte finish. Ceramics, a table lamp and
framed pictures arranged on top, a sofa partly visible in the foreground,
a mirror on the wall above.
```

### 5. ספרייה
```
The subject is a freestanding solid pine bookshelf in a study corner, 180cm
tall, five open shelves with visible through-tenon joinery, hand-oiled matte
finish. Shelves genuinely full of books, folders, ceramics and a small plant,
an armchair and floor lamp beside it, a desk cropped at the frame edge.
```

### 6. קיר אחסון
```
The subject is a full-height built-in solid oak storage wall in an open plan
living space, floor to ceiling, a grid of flat-panel doors with two open niches,
recessed finger pulls, fine even reveals, hand-oiled matte finish. The open
niches styled with books, ceramics and a small plant, a sofa in the foreground
cropped by the frame, a dining table visible to one side.
```

---

## חלק ג׳ — נוהל אחידות

1. מייצרים את תמונה 1, מאשרים אותה. היא תמונת הייחוס.
2. בכל שאר התמונות מוסיפים בסוף:
   `Same house, same light quality, same colour palette, same lens and camera
   height as the reference image. Only the room and the furniture change.`
3. אם הכלי תומך בתמונת ייחוס, מעלים את תמונה 1 בכל ריצה.
4. לא לשנות את בלוק הסגנון בין תמונה לתמונה.
5. יחס אחיד לכל התמונות: 16:9 לרצועה הרחבה, או 4:3 לנייד.

## חלק ד׳ — אם התוצאה עדיין נראית ריקה

- להוסיף `busy, layered, full of objects, cluttered shelves` לפרומפט.
- להוסיף `shot from the doorway of the room` — זה מכריח עומק ופריים מלא.
- להוריד את הטשטוש אם האדם יוצא מעוות: `subtle motion blur` במקום.

## חלק ה׳ — בדיקה לפני שימוש

- ספירת רגליים, מדפים ומגירות.
- חיבורי נגרות אפשריים פיזית.
- כיוון סיב עקבי על משטח אחד.
- האדם מטושטש מספיק שלא רואים פנים או אצבעות מעוותות.
- הרהיט עצמו חד לגמרי. אם הוא מטושטש, התמונה נפסלת.
- אין טקסט או לוגו שהמודל המציא.
