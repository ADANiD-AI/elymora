// Mock expo-local-authentication
jest.mock('expo-local-authentication', () => ({
  hasHardwareAsync: jest.fn(() => Promise.resolve(true)),
  isEnrolledAsync: jest.fn(() => Promise.resolve(true)),
  authenticateAsync: jest.fn(() => Promise.resolve({ success: true })),
}), { virtual: true });

// Mock react-native-keychain
jest.mock('react-native-keychain', () => ({
  setGenericPassword: jest.fn(() => Promise.resolve(true)),
  getGenericPassword: jest.fn(() =>
    Promise.resolve({ username: 'did:adan:0x123', password: 'mocked_jwt_token' })
  ),
  resetGenericPassword: jest.fn(() => Promise.resolve(true)),
  ACCESS_CONTROL: { BIOMETRY_ANY: 'BIOMETRY_ANY' },
  ACCESSIBLE: { WHEN_UNLOCKED_THIS_DEVICE_ONLY: 'WHEN_UNLOCKED' },
}), { virtual: true });
