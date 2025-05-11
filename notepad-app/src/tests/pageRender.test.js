import { render } from '@testing-library/react';
import TestConnectionPage from '../pages/test-connection';

export default async function testPageRender() {
  const { getByText } = render(<TestConnectionPage />);

  if (!getByText('Test Connection')) {
    throw new Error('Failed to render Test Connection Page');
  }

  return 'Test Connection Page rendered successfully';
}
