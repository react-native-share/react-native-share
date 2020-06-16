---
id: testing
title: Testing
---

To mock when using Jest, add the bellow code on your `__mock__` directory:

```js
jest.mock('react-native-share', () => ({
  default: jest.fn(),
}));
```