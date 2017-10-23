'use strict';
const Sequelize = require('sequelize');

const DB_NAME = 'fofware';
const DB_USERNAME = 'www-data';
const DB_PASSWORD = null;
const DB_HOST = '127.0.0.1';
const DB_DIALECT = 'mysql';

const MODELS = {}
MODELS.mediaposter = {
	id: { primaryKey: true, type: Sequelize.INTEGER },
	media_id: { type: Sequelize.INTEGER },
	order: { type: Sequelize.INTEGER },
	data: { type: Sequelize.STRING }
}
MODELS.cosa = {
	id: { primaryKey: true, type: Sequelize.INTEGER },
	media_id: { type: Sequelize.INTEGER },
	order: { type: Sequelize.INTEGER },
	data: { type: Sequelize.STRING }
}
MODELS.poster_new = {
	id: { primaryKey: true, type: Sequelize.INTEGER },
	media_id: { type: Sequelize.INTEGER },
	order: { type: Sequelize.INTEGER },
	id_data: { type: Sequelize.INTEGER },
	data: { type: Sequelize.STRING }
}
MODELS.media = {		
	id: { primaryKey: true, type: Sequelize.INTEGER },
	date: Sequelize.DATE,
	name: Sequelize.STRING,
	type: Sequelize.STRING,
	size: Sequelize.INTEGER,
	height: Sequelize.INTEGER,
	width: Sequelize.INTEGER,
	duration: { type: Sequelize.INTEGER, allowNull: true },
	titulo: { type: Sequelize.STRING, allowNull: true },
	description: { type: Sequelize.STRING, allowNull: true },
	tags: { type: Sequelize.STRING },
	idioma: { type: Sequelize.INTEGER },
	clave: { type: Sequelize.STRING, allowNull: true },
	srcType: { type: Sequelize.STRING },
	srcData: { type: Sequelize.BLOB },
	thumb_type: { type: Sequelize.STRING, allowNull: true },
	thumb: { type: Sequelize.BLOB, allowNull: true },
	data_type: { type: Sequelize.STRING },
	data: { type: Sequelize.BLOB, allowNull: true},
	owner: { type: Sequelize.INTEGER },
	group: { type: Sequelize.INTEGER },
	adult: { type: Sequelize.INTEGER },
	private: { type: Sequelize.INTEGER },
	userid: { type: Sequelize.INTEGER },
	username : { type: Sequelize.STRING }
}

class SequelizeService {
	constructor() {
		this.sequelize = new Sequelize(
			DB_NAME, DB_USERNAME, DB_PASSWORD, {
				define: {
					freezeTableName: true
					,timestamps: false
				},
				host: DB_HOST,
				dialect: DB_DIALECT,
				pool: {
					max: 5,
					min: 0,
					idle: 10000
				}
			}
		)
		this.init();
	}
	init() {
		this.defineModels();
		this.defineAssociations();
	}

	defineModels() {
		for (const model in MODELS) {
			this.sequelize.define(model, MODELS[model], {
				timestamps: false
				,underscored: true
			});
		}
	}

	getModelByName(name) {
		if (this.sequelize.isDefined(name)) {
			return this.sequelize.models[name];
		}
		return false;

	}
	defineAssociations() {
				const Media = this.getModelByName('media');
				const Poster = this.getModelByName('poster_new');
				Media.hasMany(Poster);
	}
};

module.exports = new SequelizeService;
