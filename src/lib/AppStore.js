import { observable, action } from "mobx";
import { Stitch, RemoteMongoClient } from 'mongodb-stitch-browser-sdk';

const APP_ID = process.env.REACT_APP_MONGO_API_KEY;

class AppStore {
	mongoClient;
	
	@observable settingsMenuVisible = false;

	constructor() {
		// Instantiate DB connection, save as instance variable
		const app = Stitch.hasAppClient(APP_ID) ? Stitch.getAppClient(APP_ID) : Stitch.initializeAppClient(APP_ID);
		this.mongoClient = app.getServiceClient(
			RemoteMongoClient.factory,
			"mongodb-atlas"
		);
	}

	/**
	 * Explicitly sets value if passed a boolean
	 * Otherwise toggles value
	 * @param {boolean} visible 
	 */
	@action
	toggleSettingsMenu(visible) {
		console.log({ this: this });
		if(typeof visible === 'boolean') {
			this.settingsMenuVisible = visible;
		} else {
			this.settingsMenuVisible = !this.settingsMenuVisible;
		}
	}
}

export default AppStore;