/* global it, describe */
const { expect } = require('chai');
const sinon = require('sinon');
const { Command } = require('simple-command-bus');
const CreateGame = require('../../../../src/application/useCases/createGame');
const CreateGameHandler = require('../../../../src/application/useCases/createGame/handler');
const PlayerRepository = require('../../../../src/infrastructure/persistence/repository/sequelizePlayerRepository');
const GameRepository = require('../../../../src/infrastructure/persistence/repository/sequelizeGameRoundRepository');
const GameRoundRepository = require('../../../../src/infrastructure/persistence/repository/sequelizeGameRepository');

describe('Testing CreateGame UseCase', function() {
	it('Testing command constructor', function() {
		const createGame = new CreateGame('abc123', 'cdf345', 2);

		expect(createGame.getPlayerA()).to.be.equal('abc123');
		expect(createGame.getPlayerB()).to.be.equal('cdf345');
		expect(createGame.getMaxRounds()).to.be.equal(2);
		expect(createGame).to.be.an.instanceof(Command);
	});

	it('Testing handler constructor', function() {
		var playerRepository = sinon.mock(PlayerRepository);
		var gameRepository = sinon.mock(GameRepository);
		var gameRoundRepository = sinon.mock(GameRoundRepository);

		var config = { game: { max_rounds: 3 } };

		const createGameHandler = new CreateGameHandler({ config, gameRepository, playerRepository, gameRoundRepository });

		expect(createGameHandler.maxRounds).to.be.equal(config.game.max_rounds);
	});

	it('Testing running handler success', async () => {
		var playerRepository = sinon.createStubInstance(PlayerRepository);
		var gameRepository = sinon.createStubInstance(GameRepository);
		var gameRoundRepository = sinon.createStubInstance(GameRoundRepository);

		var playerA = { id: 1, uuid: 'abc1234', name: 'John', slug: 'john', gamesWon: 0, createdAt: new Date };
		var playerB = { id: 2, uuid: 'cdf345', name: 'Mike', slug: 'mike', gamesWon: 0, createdAt: new Date };
		var game = {
			id: 1,
			uuid: 'abc1234',
			playerA,
			playerB,
			name: 'John',
			slug: 'john',
			gamesWon: 0,
			winner: null,
			maxRounds: 3,
			currentRound: 1,
			createdAt: new Date,
			finishedAt: null
		};

		var gameRound = {
			id: 1,
			uuid: 'abc1234',
			index: 1,
			game,
			winner: null,
			selectionA: null,
			selectionB: null,
			createdAt: new Date,
		};

		playerRepository.findByUuid.withArgs('abc123').resolves(playerA);
		playerRepository.findByUuid.withArgs('cdf345').resolves(playerB);
		gameRepository.create.resolves(game);
		gameRoundRepository.create.resolves(gameRound);

		var config = { game: { max_rounds: 3 } };

		const createGame = new CreateGame('abc123', 'cdf345', 3);

		const createGameHandler = new CreateGameHandler({ config, gameRepository, playerRepository, gameRoundRepository });

		const result = await createGameHandler.handle(createGame);

		expect(result).to.be.equal(game);
	});
});
