# Meilisearch-Appwrite Integration
[![Open Source Love svg1](https://badges.frapsoft.com/os/v1/open-source.svg?v=103)](https://github.com/ellerbrock/open-source-badges/)

# What are we building? 🛠️
A simple search application using Appwrite and Meilisearch.

# Prerequisites 🗒️
- An IDE of your choice
- [Git installed](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
- Latest version of [Node.js](https://nodejs.org/en/download/)
- [Docker](https://docs.docker.com/get-docker/)
- [Appwrite installed](https://appwrite.io/docs/installation)
- [Meilisearch installed](https://docs.meilisearch.com/learn/cookbooks/running_production.html#step-1-install-meilisearch)

# Getting Started 🛞
- Fork the repository and once that is done copy the link under `Code`. It should be something like `https://github.com/yourGitHubusername/Meili-integration.git`

- On your IDE paste `git clone https://github.com/yourGitHubusername/Meili-integration.git`

- Create an [Appwrite project](https://youtu.be/aO4mw8smXkI)

- Copy the Appwrite secrets and paste them to the `.env.template` file [Make sure to remove `.template` from the env file]

- Intsall the [Appwrite CLI](https://appwrite.io/docs/command-line#installation) and deploy the [add-to-meilisearch](https://github.com/Haimantika/Meili-integration/tree/master/functions/add-to-meilisearch) function

- Once everything is up and running, type `node dataWriter.js` and see the magic happening in [http://localhost:7700](http://localhost:7700)

- Follow the detailed steps in this [blog](blog link)

# Resources 📚

- [Appwrite Docs](https://appwrite.io/docs)
- [Appwrite GitHub](https://github.com/appwrite/appwrite)
- [Meilisearch Docs](https://docs.meilisearch.com/)
- [Meilisearch GitHub](https://github.com/meilisearch/meilisearch)

# Contributing 🤝
Feel something is missing? Want to add something? Feel free to raise a PR! 

