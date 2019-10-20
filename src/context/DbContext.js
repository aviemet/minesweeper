import React, { createContext, useContext } from 'react';
import { Stitch, RemoteMongoClient } from 'mongodb-stitch-browser-sdk';

const APP_ID = '5dabe06cd5ec1302f9c40636';
const app = Stitch.hasAppClient(APP_ID) ? Stitch.getAppClient(APP_ID) : Stitch.initializeAppClient(APP_ID);
	
export const mongoClient = app.getServiceClient(
	RemoteMongoClient.factory,
	"mongodb-atlas"
);

export const DbContext = createContext();

export const DbProvider = ({ children }) => (
	<DbContext.Provider value={mongoClient}>
		{children}
	</DbContext.Provider>
);

export const useDb = () => useContext(DbContext);