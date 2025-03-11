## Objektmodell

```json
{
  "id": 1,
  "name": "Fox",
  "weight_class": "light",
  "movement_speed": 10,
  "original_game_series": "Star Fox",
  "icon": "url-to-icon",
  "image": "url-to-image",
  "model": "url-to-3d-model",
  "tier_ranking": "S",
  "notable_players": ["Leffen", "Mango"]
}

```

```md

## API Endpoints

### Resource URIs (Endpoints)** 



| Metod  | Resurs-URI            | Beskrivning |
|--------|-----------------------|-------------|
| **GET**    | `/api/characters`        | Hämta alla karaktärer |
| **GET**    | `/api/characters/:id`    | Hämta en specifik karaktär via ID |
| **POST**   | `/api/characters`        | Lägg till en ny karaktär |
| **PUT**    | `/api/characters/:id`    | Uppdatera en karaktär via ID |
| **DELETE** | `/api/characters/:id`    | Ta bort en karaktär |