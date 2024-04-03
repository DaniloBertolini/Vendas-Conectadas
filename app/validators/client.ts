import vine from '@vinejs/vine'

export const createClientValidator = vine.compile(
  vine.object({
    name: vine.string().minLength(3).maxLength(30),
    cpf: vine.string().fixedLength(11),
    userId: vine.number().min(1),
    addressId: vine.number().min(1),
  })
)
