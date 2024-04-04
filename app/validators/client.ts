import vine from '@vinejs/vine'

export const createClientValidator = vine.compile(
  vine.object({
    name: vine.string().minLength(3).maxLength(30),
    cpf: vine.string().fixedLength(11),
    sellerId: vine.number().min(1),
    numberPhone: vine.number().min(1),
    country: vine.string().minLength(3),
    state: vine.string().minLength(3),
    city: vine.string().minLength(3),
    neighborhood: vine.string().minLength(3),
    numberHouse: vine.number().min(1),
  })
)
