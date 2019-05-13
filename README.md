# Game of Drones API
This project responds to UruIT's challenge.

This is a REST API that provides endpoints to manage games and players.

## Requirements
- node v10+
- npm 6.4.1
- mysql 5+

## Installation
This project uses an environment file, so create a copy of `.env.base` and rename it as `.env`.

## Install Packages
- `npm install`

### Database
This project contains a base schema.sql file which needs to be imported in a blank database. Next, please change the `.env` and set up the `DB_*` variables.

### Sequelize
Sequelize is the library that handles database connections in this project. So it allows to create migrations, seeders, models, etc. Currently the project does not have any migration in favor to use the base `schema.sql` by default.

To setup the database for enviroments like production, development and test, you will need to edit the file `config/database.js` which uses the `DB_*` variables by default.

## Run
- Development Mode: `npm run start:dev`
- Production Mode: `npm run start:prod`

## Test
- `npm run test`

### TODO
- Add Presenter for Models.
- More Tests

### Endpoints

#### Creates Game
```
POST /api/game
{
    "playerA": "playerUuid",
     "playerB": "playerUuid"
}
```

#### Gets all games
```
GET api/game
```

#### Gets a game
```
GET api/game/{gameId}
```

#### Adds Movement
```
PUT api/game/{gameId}/player/{playerId}
{
    "movement": "paper|rock|scissors"
}
```

#### Gets all game's rounds
```
GET api/game/{gameId}/round
```

#### Creates Player
If the player already exists with the provided name, then it will use the existing.
```
POST /api/player
{
    "name": "string",
}
```

#### Gets all player
```
GET /api/player?search=<string>&page=<integer>&pageSize=<integer>
```

#### Gets player's games
If isWinner is passed, the api will return those games where the player was the winner.
```
GET /api/player/{playerId}/game?isWinner
```

