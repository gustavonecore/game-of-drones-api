const keyBy = require('lodash/keyBy');
const transform = require('lodash/transform');
const isObject = require('lodash/isObject');
const toPlainObject = require('lodash/toPlainObject');
const isDate = require('lodash/isDate');
const { NotFound } = require('./errors');

/**
 * Hight Order Function a handle http request and response.
 *
 * @param {*} controller
 */
const createHttpRequestResponseHandler = (controller) => new Proxy (controller, {
	get(target, propKey) {
		return (request, response, next) => {
			if (typeof target[propKey] !== 'function') {
				next(new NotFound(`Action"${propKey}" not found.`));
			}

			const result = target[propKey](request);

			response.set('Content-Type', 'application/json');

			if (result instanceof global.Promise) {
				result.then(({ body, statusCode }) => response.status(statusCode).json(body))
					.catch(e => next(e));
			} else {
				response.status(result.statusCode).json(result.body || {});
			}
		};
	}
});

/**
 * Removes blacklisted keys in an object or array.
 *
 * @param {*} obj
 * @param {*} key
 */
function deepOmit(obj, keys) {
	const keysToOmit = keyBy(keys);
	const omitKeys = (obj) => transform(obj, (carry, value, key) => {
		if (key in keysToOmit) {
			return carry; // Omit value
		}

		switch (true) {
			case isDate(value): carry[key] = value; break;
			case Array.isArray(value): carry[key] = omitKeys(value); break;
			case isObject(value): carry[key] = omitKeys(toPlainObject(value)); break;
			default: carry[key] = value; break;
		}

		return carry;
	});
	return omitKeys(obj);
}

module.exports.deepOmit = deepOmit;
module.exports.createHttpRequestResponseHandler = createHttpRequestResponseHandler;

