import { renderHook, waitFor } from '@/lib/test/test-utils'
import { useQueryWithToast } from './use-query-with-toast'
import { queryClient } from '@/lib/react-query'
import { toast } from 'sonner'

jest.mock('sonner', () => ({
  toast: {
    error: jest.fn(),
  },
}))

describe('useQueryWithToast', () => {
  beforeEach(() => {
    queryClient.clear()
    jest.clearAllMocks()
  })

  it('handles successful queries', async () => {
    const mockData = { id: 1, name: 'Test' }
    const mockQueryFn = jest.fn().mockResolvedValue(mockData)

    const { result } = renderHook(() =>
      useQueryWithToast(['test'], mockQueryFn)
    )

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true)
    })

    expect(result.current.data).toEqual(mockData)
    expect(toast.error).not.toHaveBeenCalled()
  })

  it('handles query errors with toast', async () => {
    const mockError = new Error('Test error')
    const mockQueryFn = jest.fn().mockRejectedValue(mockError)

    const { result } = renderHook(() =>
      useQueryWithToast(['test'], mockQueryFn)
    )

    await waitFor(() => {
      expect(result.current.isError).toBe(true)
    })

    expect(toast.error).toHaveBeenCalledWith('Test error')
  })

  it('respects custom error messages', async () => {
    const mockError = new Error('Test error')
    const mockQueryFn = jest.fn().mockRejectedValue(mockError)
    const customErrorMessage = 'Custom error message'

    const { result } = renderHook(() =>
      useQueryWithToast(['test'], mockQueryFn, {
        errorMessage: customErrorMessage,
      })
    )

    await waitFor(() => {
      expect(result.current.isError).toBe(true)
    })

    expect(toast.error).toHaveBeenCalledWith(customErrorMessage)
  })
})
