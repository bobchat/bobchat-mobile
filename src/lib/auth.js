import { SecureStore } from 'expo';
import uuidv4 from 'uuid/v4';
import {
  STAGE
} from './../../env';

const KEY_NAME = `BOBCHAT_AUTH_TOKEN_${STAGE}`;

export const getDeviceToken = async function getToken() {
  let token = await SecureStore.getItemAsync(KEY_NAME);
  console.log(token);
  
  if(token) return token;

  await createDeviceToken();
  return await getDeviceToken();
}

// Random String
const createDeviceToken = async function() {
  let token = uuidv4();  
  return await SecureStore.setItemAsync(KEY_NAME, token);
}