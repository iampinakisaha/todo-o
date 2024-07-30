const useLoadingSlice = ((set) => ({
  loading: false,
  setLoading: (loading) => set({loading}),
}))

export default useLoadingSlice;