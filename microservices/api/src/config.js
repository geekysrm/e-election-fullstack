let projectConfig = {
    url: {
        data: 'http://data.artfully11.hasura-app.io/v1/query',
    }
}

function getSavedToken()
{
  return window.localStorage.getItem('authToken');
}

if (process.env.ENVIRONMENT === 'dev') {
  projectConfig.url.data = 'http://127.0.0.1:6432/v1/query';
}

module.exports = {
  projectConfig
};
