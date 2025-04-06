import { type SchemaTypeDefinition } from 'sanity'
import { product } from './schemas/product'
import { productCategory } from './schemas/product-category'
import { order, shippingAddress, orderItem } from './schemas/order'
import { promotionCampaign } from './schemas/promotion-campaign'
import { promotionCode } from './schemas/promotion-codes'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    product,
    productCategory,
    order,
    shippingAddress,
    orderItem,
    promotionCampaign,
    promotionCode
  ],
}
