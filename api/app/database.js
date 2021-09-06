const { Client } = require('pg');

// on crée un client (qui récupère les infos de connexion à la BDD dans les variables d'environment : le fichier .env)
const client = new Client();

client.connect();

module.exports = client;