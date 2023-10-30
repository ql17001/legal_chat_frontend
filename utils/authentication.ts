const key = 'authentication';

interface IAuthentication {
  token: string;
  refreshToken: string;
  role: string;
}

export const persistAuthentication = (authentication:IAuthentication) => {

  const stringyfiedData = JSON.stringify(authentication);

  localStorage.setItem(key, stringyfiedData);
}

export const retrieveAuthentication = ():IAuthentication | undefined => {
  const stringyfiedData = localStorage.getItem(key);

  if(stringyfiedData){
    const data = JSON.parse(stringyfiedData);

    return data;
  }
}

export const deleteAuthentication = () => {
  localStorage.removeItem(key);
}