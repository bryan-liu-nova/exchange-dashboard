import React from 'react';

const ExternalSite = ({
  img,
  href,
  authorizationUrl,
  responseType,
  clientId,
  getToken,
}) => {
  const onSuccess = (response) => {
    // let result = { ...user, accessToken: response.access_token };
    // console.log(response);
    // saveUserToDB(result);
    // setAccessToken(response.access_token);
    getToken(response.access_token);
  };
  const onFailure = (response) => {
    console.log(response);
    // setAccessToken("Failed to get token");
  };

  return (
    <div>
      asdfasf
    </div>
  );
};

export default ExternalSite;
