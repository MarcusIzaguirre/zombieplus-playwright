import { expect } from '@playwright/test';
import { Faker } from '@faker-js/faker';

export class Leads {

    constructor(page){
        this.page = page
    }
    async visit() {
        await this.page.goto('/')
    }

    async openLeadModal() {
        await this.page.getByRole('button', { name: /Aperte o play/ }).click()
        await expect(page.getByTestId('modal').getByRole('heading')).toHaveText('Fila de espera')
    }

    async submitLeadForm(name, email) {
        await this.page.getByPlaceholder('Seu nome completo').fill(name)
        await this.page.getByPlaceholder('Seu email principal').fill(email)
        await this.page.getByTestId('modal').getByText('Quero entrar na fila!').click()
    }

    // async toastHaveText(message) {
    //     const toast = this.page.locator('.toast')
    //     await expect(toast).toHaveText(message)
    //     //await expect(toast).toBeHidden({ timeout: 6000 }) //fica invisivel em ate 6 segundos, nao faz parte do HTML
    //     await expect(toast).not.toBeVisible({ timeout: 5000 }) //garante que o elemento nao esta visivel, mas ele pode existir no HTML
    // }

    async alertHaveText(target){
        await expect(this.page.locator('.alert')).toHaveText(target)
    }
}