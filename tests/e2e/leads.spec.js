//import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
const { test, expect } = require('../support')
import { executeSQL } from '../support/database';

test.beforeAll(async () => {
    await executeSQL(`DELETE from public.leads`)
})

test('TC 01: Deve cadastrar um lead na fila de espera', async ({ page }) => {
  const leadName = faker.person.fullName()
  const leadEmail = faker.internet.email()
  await page.leads.visit()
  await page.leads.openLeadModal()
  await page.leads.submitLeadForm(leadName, leadEmail)
  const message = "Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato."
  await page.popup.haveText(message)
  //await page.toast.containText(message) //vai morrer


  //await page.waitForTimeout(6000)
  //ESTRATEGIA PARA VER UM ELEMENTO DINAMICO NA UI DO PLAYWRIGHT: NPX PLAYWRIGHT TEST --UI
  // await page.getByText('seus dados conosco').click()
  // const content = await page.content()
  // console.log(content)

});

test('TC 02: Não deve cadastrar quando o email já existe', async ({ page, request }) => {
  const leadName = faker.person.fullName()
  const leadEmail = faker.internet.email()

  // await landingPage.visit()
  // await landingPage.openLeadModal()
  // await landingPage.submitLeadForm(leadName, leadEmail)

  //consumindo API: - criando o user pela API
  const newLead = await request.post('http://localhost:3333/leads', {
    data: {
      name: leadName,
      email: leadEmail
    }
  })

  expect(newLead.ok()).toBeTruthy()

  await page.leads.visit()
  await page.leads.openLeadModal()
  await page.leads.submitLeadForm(leadName, leadEmail)

  const message = "Verificamos que o endereço de e-mail fornecido já consta em nossa lista de espera. Isso significa que você está um passo mais perto de aproveitar nossos serviços."
  await page.popup.haveText(message)

});

test('TC 03: Não deve cadastrar com email incorreto', async ({ page }) => {
  await page.leads.visit()
  await page.leads.openLeadModal()
  await page.leads.submitLeadForm('Name 2', 'Test.test1.com')
  const message = "Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato!"
  await page.leads.alertHaveText('Email incorreto')

});

test('TC 03: Não deve cadastrar quando o nome não é preenchido', async ({ page }) => {

  await page.leads.visit()
  await page.leads.openLeadModal()
  await page.leads.submitLeadForm('', 'Test@test1.com')
  //const message = "Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato!"
  await page.leads.alertHaveText('Campo obrigatório')

});

test('TC 04: Não deve cadastrar quando o email não é preenchido', async ({ page }) => {
  //const landingPage = new LandingPage()
  await page.leads.visit()
  await page.leads.openLeadModal()
  await page.leads.submitLeadForm('Name 3', '')
  //const message = "Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato!"
  await page.leads.alertHaveText('Campo obrigatório')

});

test('TC 05: Não deve cadastrar quando o nenhum campo é preenchido', async ({ page }) => {
  //const landingPage = new LandingPage()
  await page.leads.visit()
  await page.leads.openLeadModal()
  await page.leads.submitLeadForm('Name 2', 'Test.test1.com')
  //const message = "Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato!"
  await page.leads.alertHaveText(['Campo obrigatório', 'Campo obrigatório'])

  //await expect(page.locator('.alert')).toHaveText(['Campo obrigatório', 'Campo obrigatório'])

});

