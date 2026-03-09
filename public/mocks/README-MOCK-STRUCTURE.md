# Mock JSON structure overview

How each mock file is shaped and what each ID represents.

## Summary table

| File                | Top-level shape         | Top-level key   | IDs inside              |
|---------------------|-------------------------|-----------------|-------------------------|
| eventCategories     | `{ items: [...] }`      | —               | Category id (string)    |
| eventCategoryDetail | `{ "0": {...}, ... }`   | Category id     | Event id (number) in items |
| event               | `{ "0": {...}, ... }`   | Event id        | Song id in `songs[]`    |
| songs               | `{ items: [...] }`     | —               | Song id (string)        |

---

## 1. `eventCategories.json`

```json
{
  "items": [
    { "id": "0", "name": "Adventné obdobie" },
    { "id": "1", "name": "Vianočné obdobie" },
    ...
  ]
}
```

- **Structure:** Single object with one array `items`.
- **IDs:** Each item has `id` (string `"0"`–`"8"`) = **category ID**.
- **Used by:** `CalendarSidebar` (sidebar links `?category=0`, etc.).

---

## 2. `eventCategoryDetail.json`

```json
{
  "0": { "items": [ { "id": 0, "name": "...", "description": "...", "date": {...} }, ... ] },
  "1": { "items": [ { "id": 2, "name": "...", ... }, ... ] },
  ...
}
```

- **Structure:** Top-level keys are **category IDs** (`"0"`, `"1"`, …). Each value is `{ items: [...] }`.
- **IDs:** Top-level key = **category ID**. Each item in `items` has `id` (number 0–17) = **event ID**.
- **Used by:** `EventsList`: `data[categoryId].items` for the selected category.

---

## 3. `event.json`

```json
{
  "0": { "id": 0, "name": "...", "description": "...", "date": {...}, "songs": [ { "id": "1", "eventPart": "Introit", ... }, ... ] },
  "1": { "id": 1, ... },
  ...
}
```

- **Structure:** Top-level keys are **event IDs** (string `"0"`–`"17"`). Each value is the full event (name, description, date, songs).
- **IDs:** Top-level key = **event ID**. Each entry in `songs` has `id` (string) = **song ID** (references `songs.json`).
- **Used by:** `useEventDetail` / `useEventDetails`: `events[id]` for event detail; song ids are merged with `songs.json`.

---

## 4. `songs.json`

```json
{
  "items": [
    { "id": "1", "title": "...", "author": "...", "hymnal": "JKS", "tags": [...] },
    ...
  ]
}
```

- **Structure:** Single object with one array `items`.
- **IDs:** Each item has `id` (string) = **song ID** (referenced from `event.json` `songs`).
- **Used by:** `useEventDetail` / `useEventDetails` (merged with event songs for title, author, hymnal, tags).

---
