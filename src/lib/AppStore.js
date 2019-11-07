import { observable, action } from "mobx";
import { Stitch, RemoteMongoClient, UserApiKeyCredential } from 'mongodb-stitch-browser-sdk';

class AppStore {
	db;
	dbUser;
	
	@observable settingsMenuVisible = false;
	@observable showWinnerDialog = false;

	constructor() {
		// Instantiate DB connection, save as instance variable
		const client = Stitch.initializeDefaultAppClient(process.env.REACT_APP_MONGO_APP_ID);
		this.db = client.getServiceClient(
			RemoteMongoClient.factory,
			"mongodb-atlas"
		).db('minesweeper');

		client.auth.loginWithCredential(new UserApiKeyCredential(process.env.REACT_APP_STITCH_API_KEY)).then(user => {
			this.dbUser = user;
		}).catch(console.error);
	}

	/**
	 * Explicitly sets value if passed a boolean
	 * Otherwise toggles value
	 * @param {boolean} visible 
	 */
	@action
	toggleSettingsMenu(visible) {
		if(typeof visible === 'boolean') {
			this.settingsMenuVisible = visible;
		} else {
			this.settingsMenuVisible = !this.settingsMenuVisible;
		}
	}

	@action
	toggleWinnerDialog(visible) {
		if(typeof visible === 'boolean') {
			this.showWinnerDialog = visible;
		} else {
			this.showWinnerDialog = !this.showWinnerDialog;
		}
	}

	async saveScore(data) {
		return await this.db.collection('scores').insertOne(Object.assign({
			owner_id: this.dbUser.id,
			createdAt: new Date()
		}, data));
	}

	async getScores(difficulty) {
		return await this.db.collection('scores').find({ difficulty }, { sort: { score: 1, createdAt: -1 } }).toArray();
	}
}

export default AppStore;