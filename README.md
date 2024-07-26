
<h1 align="center">
  
</h1>

<p align="center">
<img src="https://i.imgur.com/pV1nEai.png" alt="Texto alternativo" >

</p>


## :memo: Requisitos

| Ferramenta| Versão  | Descrição                                    |
|-----------|---------|----------------------------------------------|
| [NodeJS](https://nodejs.org/en/)              | 16.14.0 | Ambiente de execução Javascript server-side  |
| [Yarn](https://yarnpkg.com/)                 | 1.22.17 | Gerenciador de pacotes JS                    |
| [Git](https://git-scm.com/)           | | |


## :rocket: Tecnologias

Este projeto está sendo desenvolvido com as seguintes tecnologias:

-  Linguagem: [Typescript](https://www.typescriptlang.org/);
-  Biblioteca JS para front-end: [ReactJS](https://reactjs.org/);
-  HTTP client: [Axios](https://github.com/axios/axios);
-  Estilização: [Styled-Components](https://www.styled-components.com/) + [React-Icons](https://react-icons.github.io/react-icons/) + [Polished](https://polished.js.org/docs/);
-  Rotas: [react-router-dom v6](https://reactrouter.com/docs/en/v6/getting-started/overview);
-  Padronização: [EditorConfig](https://editorconfig.org/) + [ESLint](https://eslint.org/) + [Prettier](https://prettier.io/);
-  Git Hook: [Husky](https://typicode.github.io/husky/#/) + [Lint-Staged](https://github.com/okonet/lint-staged) + [Commit lint](https://commitlint.js.org/#/);
-  Testes: [Jest](https://jestjs.io/) + [React-Testing-Library](https://testing-library.com/docs/react-testing-library/intro/);
-  Documentação: [Storybook](https://storybook.js.org/);

## :information_source: Como usar

É necessário criar o ```.env``` seguindo o padrão das variáveis de ambiente do ```.env.example```

```bash
# Clonar este repositório
$ git clone https://github.com/Guilherme-Farias/vaccine-scheduler-frontend
# Ir para o repositório
$ cd vaccine-scheduler-frontend
# Instalar as dependências
$ yarn install
# Rodar a aplicação em ambiente de desenvolvimento
$ yarn start
```
## :scroll: Scripts disponíveis

- `start`: Inicia a aplicação;
- `build`: Build da aplicação;
- `test`: Realiza os testes de toda a aplicação;
- `test:watch`: Realiza os testes e fica assistindo por mudanças nos arquivos;
- `test:coverage`: Realiza todos os testes verificando a cobertura de testes em todos os arquivos;
- `eject`: Ejeta o CRA;
- `generate`: Utilitário para criar componente com os seus devidos arquivos (Teste, Documentação, Estilo e exportador);
- `prepare`:  Inicializa o Husky;
- `lint`: Escaneia a aplicação verificando e consertando erros nas aplicação;
- `sb`: Inicializa a documentação do Storybook no `localhost:6006`;
- `sb:build`: Build do Storybook;
