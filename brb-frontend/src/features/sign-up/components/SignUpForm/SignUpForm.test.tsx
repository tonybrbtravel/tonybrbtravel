import { render } from '@testing-library/react';
import SignUpForm from '.';

describe('<NotFoundPage />', () => {
  it('should match snapshot', () => {
    const { container } = render(<SignUpForm />);
    expect(container).toMatchSnapshot();
  });
});
