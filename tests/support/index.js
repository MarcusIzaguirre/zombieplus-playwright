const { test: base, expect } = require('@playwright/test')
const { LoginPage } = require ('../pages/LoginPage')
const { Toast } = require ('../pages/Components')
const { MoviesPage } = require ('../pages/MoviesPage')
const { LandingPage } = require('../pages/LandingPage')

//CAMADA PAGE OBJECTS INJETADA DENTRO DO CONTEXTO DO PLAYWRIGHT:
const test = base.extend({
    page: async ({page}, use) =>{
        await use({
            ...page,
            landing: new LandingPage(page),
            login: new LoginPage(page),
            movies: new MoviesPage(page),
            toast: new Toast(page)
        })
    }
})

export { test, expect }

//ESTE NOVO MODULO TEM UMA EXTENSAO CHAMADA "TEST" 
// NO QUAL ESTAMOS INJETANDO UM NOVO CONTEXTO CHAMADO "PLAY"