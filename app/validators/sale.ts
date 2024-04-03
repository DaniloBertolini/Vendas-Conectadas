import vine from '@vinejs/vine'

export const createSaleValidator = vine.compile(
  vine.object({
    quantity: vine.number().min(1),
    unitPrice: vine.number().positive().decimal([0, 2]),
    totalPrice: vine.number().positive().decimal([0, 2]),
    clientId: vine.number().min(1),
    productId: vine.number().min(1),
  })
)
