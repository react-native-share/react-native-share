import 'react-native';
import React from 'react';
import {render} from 'react-native-testing-library';

import Succeed from '../components/Succeed';

it('renders correctly', () => {
  const x = render(<Succeed />).toJSON();
  expect(x).toMatchSnapshot();
});
