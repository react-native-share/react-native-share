import 'react-native';
import React from 'react';
import {render} from 'react-native-testing-library';

import Failed from '../components/Failed';

it('renders correctly', () => {
  const x = render(<Failed />).toJSON();
  expect(x).toMatchSnapshot();
});
