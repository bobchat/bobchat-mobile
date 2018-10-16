import { SecureStore } from 'expo';
import uuidv4 from 'uuid/v4';
import {
  STAGE
} from './../../env';

const KEY_NAME = `BOBCHAT_AUTH_TOKEN_${STAGE}`;

export const getdeviceUniqueId = async function getToken() {
  let token = await SecureStore.getItemAsync(KEY_NAME);
  console.log(token);
  
  if(token) return token;

  await createdeviceUniqueId();
  return await getdeviceUniqueId();
}

// Random String
const createdeviceUniqueId = async function() {
  let token = uuidv4();  
  return await SecureStore.setItemAsync(KEY_NAME, token);
}