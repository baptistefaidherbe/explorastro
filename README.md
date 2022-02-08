# Explorastro 
Explorastro est une plate-forme de meetup de l'espace où les utilisateurs peuvent organiser et rejoindre des sorties astronomiques dans toute la France.

## Fonctionnalités

L'application permets :

- Aux utilisateurs de pouvoir se connecter et ainsi accéder à leur espace personnel,
- aux utilisateurs connectés de voir les sorties astronomiques en fonction de leur localisation ou du périmètre choisi,
- aux utilisateurs connectés de modifier leurs informations personnelles (adresse, password, avatar, description...),
- aux utilisateurs connectés d'accéder aux différentes sorties astronomiques via un système de filtre et ou de géolocalisation,
- aux utilisateurs connectés de rejoindre une sortie astronomique et échanger avec les participants de la sortie via un système de commentaire propre à la sortie,
- aux utilisateurs connectés de créer une sortie astronomique. A la création de la sortie, l'utilisateur devra renseigner les champs suivants : titre de la sortie,   description de la sortie, l'adresse de la sortie, le nombre de participants, si la sortie est publiée, ajouter une image,
- aux utilisateurs connectés de pouvoir ajouter leurs contacts préférés dans leur liste d'amis,
- aux utilisateurs connectés d'accéder au profil des autres membres et pouvoir ainsi visualiser le profil (descriptions, photos, sorties...),
- aux utilisateurs connectés d'accéder au « petit routard » expliquant comment réaliser une exploration astronomique dans de bonnes conditions et ce que l'on peut     voir,
- aux utilisateurs connectés d'accéder à différents widget (météo, détection ISS, calendrier lunaire, résumé de ses sorties en cours),
- aux utilisateurs non connectés d'accéder à la page de présentation du site expliquant le fonctionnement,
  d'être responsive sur mobile,
- aux utilisateurs connectés de communiquer avec tous les participants via un système de chat en temps réel,
  de visualiser qui est connecté.

 ### Côté front :
J'ai utilisé la librairie React dans le but de faciliter la création d'interface web via la création de composants. Afin de pouvoir organiser au mieux l'application, j'ai également choisi de centraliser le state pour cela, j'ai utilisé la bibliothèque Redux qui est couplée avec React. Le but étant que tous les composants React puissent accéder aux mêmes state et éviter ainsi la gestion des props entre composants ce qui alourdit la gestion. Pour ce qui est de la mise en forme du site et toujours dans une optique d'organisation et de facilité, j'ai utilisé SCSS dans le but de pouvoir étendre les fonctionnalités de base du CSS (utilisation de variables, l'imbrication de code...). Les échanges entre le front et l'API se font via le client HTTP Axios. J'ai utilisé la librairie Leaflet comme outil de cartographie qui permet de localiser (via des markers) des sorties astronomiques sur une carte. La librairie OpenstreeMap est utilisée pour les layers. Pour pouvoir utiliser des groupements de markers sur la carte, j'ai utilisé la librairie Marker Clustering plugin for Leaflet.

### Côté back :
Pour la partie back j'ai utilisé Node.js couplée avec le framework Express.js pour la construction de l'API. Concernant le SGBD, je suis parti sur PostgreSQL et mongoDB pour le stockage des messages de la messagerie. Pour ce qui est de la gestion de l'authentification, j'ai utilisé l'authentification via un token (jwt) qui permet ainsi de garder la session de l'utilisateur active. Les mots de passe utilisateurs sont cryptés avec le module bcrypt. Enfin pour le système de messagerie, j'ai utilisé socket.io afin que les messages soient envoyés en tant réel.
