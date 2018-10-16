import { Location, Permissions } from "expo";

export async function getLocation(){
  let { status } = await Permissions.askAsync(Permissions.LOCATION);
  if (status !== 'granted') {
    console.log('DENIED LOCATION');
  }
  return await Location.getCurrentPositionAsync({});;
}
