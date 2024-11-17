# Voting-dApp
Application décentralisée sur le Smart Contract Voting

## Installation

cloner le projet : 
```
git clone https://github.com/JonaPlaz/Voting-dApp.git
```

Se placer sur la branche develop : 
```
git checkout develop
```

### Backend

Se placer sur backend : 
```
cd backend/
```

#### Installation des dépendances : 

Installer yarn avant dans le système si besoin
```
npm install -g yarn
```
puis : 
```
yarn install
```

### Frontend

Se placer sur frontend : 
```
cd ../frontend/
```

#### Installation des dépendances : 

puis : 
```
yarn install
```
#### Lancement du front : 

```
yarn run dev
```

## Consignes et Notation

### Consignes
-   Smart Contract (Backend)
    -   ajouter NatSpecs au Smart Contract
    -   faille sur Smart Contract à détecter et corriger
-   dApp (Frontend)
    -   l’enregistrement d’une liste blanche d'électeurs. 
    -   à l'administrateur de commencer la session d'enregistrement de la proposition.
    -   aux électeurs inscrits d’enregistrer leurs propositions.
    -   à l'administrateur de mettre fin à la session d'enregistrement des propositions.
    -   à l'administrateur de commencer la session de vote.
    -   aux électeurs inscrits de voter pour leurs propositions préférées.
    -   à l'administrateur de mettre fin à la session de vote.
    -   à l'administrateur de comptabiliser les votes.
    -   à tout le monde de consulter le résultat.
-   Git
    -   tirer des branches de features depuis "develop" et à merger sur develop
    -   à la fin, merge sur main et déploiement de main sur Vercel


### Notation
-   appel des fonctions sur Smart Contract via la dApp
-   revoir code solidity (faille, NatSpec)
-   utilisation d'event
-   Affichage du compte utilisé et des proposals
-   Video du workflow
-   Déployer sur serveur public
-   Affichage adapté au compte utilisé
-   Front travaillé


## Liens

### Videos
https://www.loom.com/share/9a2e5d7b0e1a44319da0ff2491a19353?sid=cf7b702b-75f0-4a0d-ab03-a1c02b03635d

winningId (pb d'affichage)
https://www.loom.com/share/778c3bc3cfde43c0be888c23c4846172?sid=67373648-fc8d-4d6e-8be4-fc9131cf71ee

### Frontend déployé
https://github.com/JonaPlaz/Deploy-Voting-Frontend

### Contrat (natspecs + faille)
https://github.com/JonaPlaz/Voting-dApp/blob/main/backend/contracts/Voting.sol
