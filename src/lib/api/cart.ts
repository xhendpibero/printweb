// Cart API client - matches the API endpoints specified in docs/cart/cartPage.md

export interface CartApiResponse<T> {
  ok: true
  data: T
}

export interface CartApiError {
  ok: false
  error: {
    code: string
    message: string
    details?: unknown
  }
}

export type ApiResult<T> = CartApiResponse<T> | CartApiError

// Cart API response types
export interface CartData {
  items: unknown[]
  currency: string
  printingNet: number
  deliveryNet: number
  totalNet: number
  totalGross: number
  discountCode?: string
}

export interface DiscountData {
  message: string
  discountAmount?: number
  discountPercent?: number
  code: string
}

export interface GenericResponse {
  message: string
  currency?: 'PLN' | 'EUR'
}

// API endpoint functions (will be implemented when backend is ready)
export const cartApi = {
  // GET /api/order/cart → Cart
  async getCart(): Promise<ApiResult<CartData>> {
    // TODO: Replace with actual API call
    throw new Error('Cart API not implemented - backend required')
  },

  // POST /api/order/cart/items/:id/duplicate → Cart
  async duplicateItem(itemId: string): Promise<ApiResult<GenericResponse>> {
    // TODO: Replace with actual API call
    console.log('API: Duplicate item', itemId)
    throw new Error('Cart API not implemented - backend required')
  },

  // PUT /api/order/cart/items/:id → edit configuration; returns Cart
  async updateItem(itemId: string, configuration: unknown): Promise<ApiResult<GenericResponse>> {
    // TODO: Replace with actual API call
    console.log('API: Update item', itemId, configuration)
    throw new Error('Cart API not implemented - backend required')
  },

  // DELETE /api/order/cart/items/:id → Cart
  async removeItem(itemId: string): Promise<ApiResult<GenericResponse>> {
    // TODO: Replace with actual API call
    console.log('API: Remove item', itemId)
    throw new Error('Cart API not implemented - backend required')
  },

  // POST /api/order/cart/items/:id/name → set order name; returns Cart
  async setOrderName(itemId: string, orderName: string): Promise<ApiResult<GenericResponse>> {
    // TODO: Replace with actual API call
    console.log('API: Set order name', itemId, orderName)
    throw new Error('Cart API not implemented - backend required')
  },

  // POST /api/order/cart/discount → apply discount code; returns Cart
  async applyDiscount(code: string): Promise<ApiResult<DiscountData>> {
    // TODO: Replace with actual API call
    console.log('API: Apply discount', code)
    throw new Error('Cart API not implemented - backend required')
  },

  // POST /api/order/cart/currency → set currency; returns Cart
  async setCurrency(currency: 'PLN' | 'EUR'): Promise<ApiResult<GenericResponse>> {
    // TODO: Replace with actual API call
    console.log('API: Set currency', currency)
    throw new Error('Cart API not implemented - backend required')
  }
}

// Mock API responses for development (matches docs specification)
export const mockCartApi = {
  async getCart(): Promise<ApiResult<CartData>> {
    return {
      ok: true,
      data: {
        items: [], // Will be populated from Zustand store for now
        currency: 'PLN',
        printingNet: 0,
        deliveryNet: 15.00,
        totalNet: 15.00,
        totalGross: 18.45,
        discountCode: undefined
      }
    }
  },

  async duplicateItem(itemId: string): Promise<ApiResult<GenericResponse>> {
    console.log('Mock API: Duplicate item', itemId)
    return {
      ok: true,
      data: { message: 'Item duplicated successfully' }
    }
  },

  async updateItem(itemId: string, configuration: unknown): Promise<ApiResult<GenericResponse>> {
    console.log('Mock API: Update item', itemId, configuration)
    return {
      ok: true,
      data: { message: 'Item updated successfully' }
    }
  },

  async removeItem(itemId: string): Promise<ApiResult<GenericResponse>> {
    console.log('Mock API: Remove item', itemId)
    return {
      ok: true,
      data: { message: 'Item removed successfully' }
    }
  },

  async setOrderName(itemId: string, orderName: string): Promise<ApiResult<GenericResponse>> {
    console.log('Mock API: Set order name', itemId, orderName)
    return {
      ok: true,
      data: { message: 'Order name set successfully' }
    }
  },

  async applyDiscount(code: string): Promise<ApiResult<DiscountData>> {
    console.log('Mock API: Apply discount', code)
    
    // Mock discount validation with multiple codes
    const discounts: Record<string, { amount?: number; percent?: number; message: string }> = {
      'SAVE10': { percent: 10, message: 'Save 10% on your order!' },
      'WELCOME': { amount: 15.00, message: 'Welcome discount applied!' },
      'FREESHIP': { amount: 15.00, message: 'Free shipping applied!' },
      'STUDENT': { percent: 15, message: 'Student discount applied!' },
      'BULK20': { percent: 20, message: 'Bulk order discount applied!' }
    }
    
    const discount = discounts[code]
    if (discount) {
      return {
        ok: true,
        data: { 
          message: discount.message,
          discountAmount: discount.amount,
          discountPercent: discount.percent,
          code
        }
      }
    }
    
    return {
      ok: false,
      error: {
        code: 'invalid_discount',
        message: 'Invalid discount code. Try SAVE10, WELCOME, FREESHIP, STUDENT, or BULK20.'
      }
    }
  },

  async setCurrency(currency: 'PLN' | 'EUR'): Promise<ApiResult<GenericResponse>> {
    console.log('Mock API: Set currency', currency)
    return {
      ok: true,
      data: { 
        message: 'Currency updated successfully',
        currency 
      }
    }
  }
}
