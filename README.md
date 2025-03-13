
# Melee API 

Ett RESTful API för att hantera karaktärer och användare från Super Smash Bros. Melee.  
API:et gör det möjligt att hämta, lägga till, uppdatera och ta bort karaktärer samt hantera användare.  


## Objektmodell

### Characters

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
  "notable_players": ["Leffen", "Mang0"]
}
```

### Users 



```json
{
  "id": 1,
  "username": "Void",
  "email": "v0idl1ng@yahoo.com",  
  "password": "hashed_password"
}
````

## API Endpoints

### Resource URIs (Endpoints)** 



| Metod  | Resurs-URI            | Beskrivning |
|--------|-----------------------|-------------|
| **GET**    | `/api/characters`        | Hämta alla karaktärer |
| **GET**    | `/api/characters/:id`    | Hämta en specifik karaktär via ID |
| **POST**   | `/api/characters`        | Lägg till en ny karaktär |
| **PUT**    | `/api/characters/:id`    | Uppdatera en karaktär via ID |
| **DELETE** | `/api/characters/:id`    | Ta bort en karaktär |

### User Endpoints

| Metod  | Resurs-URI            | Beskrivning |
|--------|-----------------------|-------------|
| **GET**    | `/api/users`      | Hämta alla users|
| **GET**    | `/api/user/:id`    | Hämta en specifik user via ID |
| **POST**   | `/api/users`        | Skapa ny user |
| **PUT**    | `/api/users/:id`    | Uppdatera en user via ID |
| **DELETE** | `/api/user/:id`    | Ta bort en user |

| Metod  | Resurs-URI            | Beskrivning |
|--------|-----------------------|-------------|
| **POST**    | `/api/auth/login`      | Logga in user|
| **POST**    | `/api/auth/logout`    | Logga ut user|


### Endpoint testing with curl

#### Get all characters
curl -X GET http://localhost:4000/characters

#### Get specific character
curl -X GET http://localhost:4000/characters/1

#### Add new character 

curl -X POST http://localhost:4000/characters \
     -H "Content-Type: application/json" \
     -d '{
           "id": 3,
           "name": "Pikachu",
           "weight_class": "light",
           "movement_speed": 9,
           "original_game_series": "Pokémon",
           "icon": "url-to-icon",
           "image": "url-to-image",
           "model": "url-to-3d-model",
           "tier_ranking": "A",
           "notable_players": ["Axe, Jchu"]
         }'

#### Update character 

curl -X PUT http://localhost:4000/characters/3 \
     -H "Content-Type: application/json" \
     -d '{
           "name": "Pikachu",
           "tier_ranking": "S"
         }'

#### Delete character
curl -X DELETE http://localhost:4000/characters/3


### Thing to add 


User handling middleware 