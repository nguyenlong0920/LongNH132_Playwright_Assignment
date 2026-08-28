import { env } from '../../utils/env';

export const users = {
  	admin: {
    	username: env.adminUsername,
    	password: env.adminPassword,
  	},

  	invalidPassword: {
    	username: 'admin1',
    	password: 'wrongpassword',
  	},
};