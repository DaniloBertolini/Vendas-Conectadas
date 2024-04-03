import vine from '@vinejs/vine'

export const createProductValidator = vine.compile(
  vine.object({
    name: vine.string().minLength(3).maxLength(30),
    price: vine.number().min(1),
    description: vine.string().optional(),
    quantity: vine.number().min(1),
  })
)
