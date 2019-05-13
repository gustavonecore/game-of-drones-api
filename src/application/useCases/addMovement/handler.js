const GameRound = require('../../../domain/GameRound');
const NotFoundError = require('../../errors/notFoundError');
const InvalidArgumentError = require('../../errors/InvalidArgumentError');

class AddMovementHandler {
	constructor({ gameRepository, playerRepository, gameRoundRepository }) {
		this.playerRepository = playerRepository;
		this.gameRepository = gameRepository;
		this.gameRoundRepository = gameRoundRepository;
	}

	async handle(command) {
		const game = await this.gameRepository.findByUuid(command.getGameId());

		if (!game) {
			throw new NotFoundError('Game', command.getGameId());
		}

		const player = await this.playerRepository.findByUuid(command.getPlayerId());

		if (!player) {
			throw new NotFoundError('Player', command.getPlayerId());
		}

		// Check if player is part of the game
		if (game.playerA.id !== player.id && game.playerB.id !== player.id) {
			throw new InvalidArgumentError(`Player with id "${command.getPlayerId()}" is not part of the game.`);
		}

		if (game.finishedAt !== null) {
			throw new InvalidArgumentError(`Game with id "${command.getGameId()}" finished.`);
		}

		const currentRound = await this.gameRoundRepository.findOneBy({
			index: game.currentRound,
			game_id: game.id
		});

		if (!currentRound) {
			throw new NotFoundError('Game Round for game ', command.getGameId());
		}

		const movement = command.getMovement();

		const roundData = {
			selectionA: currentRound.selectionA,
			selectionB: currentRound.selectionB
		};

		let winner;
		const gameData = { finishedAt: null };

		// Select who is the player in turn
		const playerInTurn = roundData.selectionA === null ? game.playerA : game.playerB;

		// Select which player is the owner of the movement
		if (roundData.selectionA === null) {
			roundData.selectionA = movement;
		} else {
			roundData.selectionB = movement;
		}

		if (playerInTurn.id !== player.id) {
			throw new InvalidArgumentError(`Invalid movement for player with id "${command.getGameId()}": It's not the turn.`);
		}

		let roundDone = false;

		// Both player sent his/her selection, then calculate the winner for the round.
		if (roundData.selectionA !== null && roundData.selectionB !== null) {
			const winIndex = this.getWinner(roundData.selectionA, roundData.selectionB);

			winner = winIndex === 1 ? game.playerA : (
				winIndex === -1 ? game.playerB : null // Null, means draw
			);

			roundData.winner = winner;

			// the current round is done, create a new one, and continue.
			if (game.currentRound < game.maxRounds) {
				gameData.currentRound = game.currentRound + 1;
				await this.gameRoundRepository.create(GameRound.create(gameData.currentRound, game));
			}

			roundDone = true;
		}

		// Update round
		await this.gameRoundRepository.update(currentRound.id, roundData);

		// The game has achived the maximun round. Finish it.
		if (roundDone && game.currentRound === game.maxRounds) {
			gameData.finishedAt = new Date();

			const gameWinner = await this.calculateGameWinner(game);

			gameData.winner = gameWinner.id;

			// Increment flag in the player record.
			await this.playerRepository.update(gameData.winner, { gamesWon: gameWinner.gamesWon + 1 });
		}

		// Update game data.
		await this.gameRepository.update(game.id, gameData);

		return {
			currentRound: {
				round: currentRound.index,
				createdAt: currentRound.createdAt,
				selectionA: roundData.selectionA,
				selectionB: roundData.selectionB,
				winner: winner || null,
				player: playerInTurn,
			}
		};
	}

	/**
	 * Get winner between two moves.
	 *
	 * @param {*} selectionA
	 * @param {*} selectionB
	 */
	getWinner(selectionA, selectionB) {
		const movementTable = {
			paper: {
				rock: 1, // Paper beats Rock
				scissors: -1, // Paper loses against Scissors
				papper: 0 // Paper against Paper, Draw
			},
			rock: {
				scissors: 1, // Rock beats Scissors
				paper: -1, // Rock loses against paper
				rock: 0 // Rock against Rock, Draw
			},
			scissors: {
				paper: 1, // Scissors beats Paper
				rock: -1, // Scissors loses against Rock
				scissors: 0, // Scissors against Scissors, Draw
			}
		};

		return movementTable[selectionA][selectionB];
	}

	/**
	 * Calculate who was the winner in the game
	 *
	 * @param {*} game
	 */
	async calculateGameWinner(game) {
		const rounds = await this.gameRoundRepository.getRoundsByGame(game);

		const wins = rounds.reduce((result, round) => {
			if (!round.winner) return result;

			if (game.playerA.uuid === round.winner.uuid) {
				result.playerA++
			} else {
				result.playerB++
			}

			return result;
		}, { playerA: 0, playerB: 0 });

		if (wins.playerA > wins.playerB) {
			return game.playerA;
		} else if (wins.playerA < wins.playerB) {
			return game.playerB;
		}

		return null; // Draw!
	}
}

module.exports = AddMovementHandler;
