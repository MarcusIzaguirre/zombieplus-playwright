const data = require('../support/fixtures/movies.json')
import { executeSQL } from '../support/database'
import { expect, test } from '../support'

test.beforeAll(async () => {
    await executeSQL(`DELETE from public.movies`)
})

test('TC 01: Deve poder cadastrar um novo filme', async ({ page }) => {
    const movie = data.create //GUERRA MUNDIAL Z
    
    await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin')
    await page.movies.create(movie)
    await page.popup.haveText(`O filme '${movie.title}' foi adicionado ao catálogo.`)
})

test('TC 02: Deve poder remover um filme', async ({ page, request }) => {
    const movie = data.to_remove //A NOITE DOS MORTOS-VIVOS
    await request.api.postMovie(movie)

    await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin')
    await page.movies.remove(movie.title)
    await page.popup.haveText('Filme removido com sucesso.')
})

test('TC 03: Não deve cadastrar quando o título é duplicado', async ({ page, request }) => {
    const movie = data.duplicate //Resident Evil: O Hóspede Maldito
    
    await request.api.postMovie(movie)
    
    await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin')
    await page.movies.create(movie)
    await page.popup.haveText(
        `O título '${movie.title}' á consta em nosso catálogo. Por favor, verifique se há necessidade de atualizações ou correções para este item.`)
    
})

test('TC 04: Não deve cadastrar quando os campos obrigatórios não são preenchidos', async ({ page }) => {
    await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin')
    await page.movies.goForm()
    await page.movies.submit()
    await page.movies.alertHaveText(['Campo obrigatório',
        'Campo obrigatório',
        'Campo obrigatório',
        'Campo obrigatório'
    ])
})


test('TC 05: Deve realizar busca pelo termo zumbi', async ({ page, request }) => {
    const movies = data.search
    //m = um filme por vez
    //for each = vai percorrer pelos dados que tem na massa
    movies.data.forEach(async (m) => {
        //console.log(m.title)
        await request.api.postMovie(m)
    })
    await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin')
    await page.movies.search(movies.input)
    await page.movies.tableHave(movies.outputs)
})