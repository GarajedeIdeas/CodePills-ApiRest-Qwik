import { type RequestHandler, z } from "@builder.io/qwik-city";
import { PrismaClient } from "@prisma/client";

/**
 * http://locaholst:3000/api GET
 */
export const onGet: RequestHandler = async ({ json }) => {
    json(200, { data: [1, 2, 3, 4, 5, 6, 7] })
}


const schemaInsert = z.object({
    email: z.string().email(),
    name: z.string()
})

export const onPost: RequestHandler = async ({ request, json }) => {
    try {
        const prisma = new PrismaClient()
        const body = await request.json()
        const data = schemaInsert.parse(body)
        const user = await prisma.user.create({ data })
        json(200, { user })
    } catch (error) {
        json(400, { error })
    }
}