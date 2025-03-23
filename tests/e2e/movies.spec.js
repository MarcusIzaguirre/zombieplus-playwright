// import { LoginPage } from '../pages/LoginPage'
// import { Toast } from '../pages/Components'
// import { MoviesPage } from '../pages/MoviesPage'
const data = require ('../support/fixtures/movies.json')
import { executeSQL } from '../support/database'
import { test } from '../support'

// let moviesPage
// let loginPage
// let toast

// test.beforeEach(({ page }) => {
//     loginPage = new LoginPage(page)
//     moviesPage = new MoviesPage(page)
//     toast = new Toast(page)
// })

test('Deve poder cadastrar um novo filme', async ({ page }) => {
    const movieZ = data.create
    await executeSQL(`DELETE from public.movies WHERE title = '${movieZ.title}';`)

    await page.login.visit()
    await page.login.submit('admin@zombieplus.com', 'pwd123')
    await page.movies.isLoggedIn()
    await page.movies.create(movieZ.title, movieZ.overview, movieZ.company, movieZ.release_year)
    await page.toast.containText('Cadastro realizado com sucesso!')
})