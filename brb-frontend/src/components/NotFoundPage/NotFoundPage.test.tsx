import { render } from '@testing-library/react';
import NotFoundPage from '.';

describe('<NotFoundPage />', () => {
  it('should match snapshot', () => {
    const { container } = render(<NotFoundPage />);
    expect(container).toMatchSnapshot();
  });
});
