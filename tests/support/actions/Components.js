import { expect } from '@playwright/test';

export class Popup {

    constructor(page){
        this.page = page
    }


    async haveText(message) {
        //const toast = this.page.locator('.toast')
        const element = this.page.locator('.swal2-html-container')
        await expect(element).toHaveText(message)
        //await expect(toast).toBeHidden({ timeout: 6000 }) //fica invisivel em ate 6 segundos, nao faz parte do HTML
        //await expect(toast).not.toBeVisible({ timeout: 5000 }) //garante que o elemento nao esta visivel, mas ele pode existir no HTML
    }
}