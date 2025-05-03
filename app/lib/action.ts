'use server';

import { z } from 'zod'; //data validate kütüphanesi
import postgres from 'postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' })

const FormScheme = z.object({
    id: z.string(),
    customerId: z.string(),
    amount: z.coerce.number(),
    status: z.enum(['pending', 'paid']),
    date: z.string(),
})
//id ve date db de tanımlanacağı için omit fonks. ile bu iki değişkeni hariç tutuyoruz.
const CreateInvoice = FormScheme.omit({ id: true, date: true })

export async function createInvoice(formData: FormData) {
    const { customerId, amount, status } = CreateInvoice.parse({
        customerId: formData.get('customerId'),
        amount: formData.get('amount'), //noktalı sayılar bozulmasın diye kurusa cevirip db ye gonderiyoruz.
        status: formData.get('status'),
    })
    const amountAsKurus = amount * 100; //kurusa ceviriyoruz.
    const date = new Date().toISOString().split("T")[0] // split sebebi cikti : 2025-05-02T18:12:13.622Z
    await sql`
    insert into invoices (customer_id, amount, status, date) 
    values (${customerId}, ${amountAsKurus}, ${status}, ${date} )
    `;
    revalidatePath('/dashboard/invoices'); //nextjs özelligi cache veri tuttugu için, tekrar fetchlemesini saglıyoruz.
    redirect('/dashboard/invoices');
}

const UpdateInvoice = FormScheme.omit({ date: true, id: true })

export async function updateInvoice(id: string, formData: FormData) {
    const { customerId, amount, status } = UpdateInvoice.parse(
        {
            customerId: formData.get('customerId'),
            amount: formData.get('amount'),
            status: formData.get('status'),
        }
    )
    const amountAsKurus = amount * 100;
    await sql`
    update invoices set customer_id = ${customerId}, amount = ${amountAsKurus}, status = ${status}
    where id = ${id}
    `
    revalidatePath('/dashboard/invoices');
    redirect('/dashboard/invoices');
}

export async function deleteInvoice(id: string) {
    await sql`
    delete from invoices where id = ${id}
    `
    revalidatePath('/dashboard/invoices');
}