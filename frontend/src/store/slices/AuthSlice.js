
const useAuthSlice = ((set) => ({
  userInfo: undefined,
  setUserInfo: (userInfo) => set({userInfo}),
}))

export default useAuthSlice;