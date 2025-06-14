//import { test, expect } from '@playwright/test'
const { test, expect } = require('../support')

test('Deve logar como administrador', async ({ page }) => {
    await page.login.visit()
    await page.login.submit('admin@zombieplus.com', 'pwd123')
    await page.login.isLoggedIn('Admin')

})

test('Não deve logar com senha incorreta', async ({ page }) => {
    await page.login.visit()
    await page.login.submit('admin@zombieplus.com', 'abc123')
    const message = 'Ocorreu um erro ao tentar efetuar o login. Por favor, verifique suas credenciais e tente novamente.'
    await page.popup.haveText(message)

})

test('Não deve logar quando o email é inválido', async ({ page }) => {
    await page.login.visit()
    await page.login.submit('www.test.com.br', 'abc123')
    await page.login.alertHaveText('Email incorreto')

})

test('Não deve logar quando o email não é preenchido', async ({ page }) => {
    await page.login.visit()
    await page.login.submit('', 'abc123')
    await page.login.alertHaveText('Campo obrigatório')

})

test('Não deve logar quando a senha não é preenchido', async ({ page }) => {
    await page.login.visit()
    await page.login.submit('papito@gmail.com', '')
    await page.login.alertHaveText('Campo obrigatório')

})

test('Não deve logar quando nenhum campo é preenchido', async ({ page }) => {
    await page.login.visit()
    await page.login.submit('', '')
    await page.login.alertHaveText(['Campo obrigatório', 'Campo obrigatório'])

})

