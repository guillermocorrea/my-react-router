import {
  cleanup,
  render,
  waitFor,
  fireEvent,
} from '@testing-library/react';
import { Mock, beforeEach, describe, expect, it, vi } from 'vitest';
import { Router } from './Router';
import { getCurrentPath } from './utils';
import { Link } from './Link';
import { Route } from './Route';

vi.mock('./utils', () => ({
  getCurrentPath: vi.fn(),
}));

function Default404() {
  return <div>404</div>;
}

describe('Router', () => {
  beforeEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it('should work', () => {
    render(<Router paths={[]} />);
  });

  it("should render default component when there's no match", () => {
    const { getByText } = render(
      <Router paths={[]} defaultComponent={<Default404 />} />
    );
    expect(getByText('404')).toBeTruthy();
  });

  it('should render the matched component', () => {
    (getCurrentPath as Mock).mockReturnValueOnce('/about');
    const About = () => <div>About</div>;
    const { getByText } = render(
      <Router paths={[{ path: '/about', component: About }]} />
    );
    expect(getByText('About')).toBeTruthy();
  });

  it('should render the matched component with route params', () => {
    (getCurrentPath as Mock).mockReturnValueOnce('/search/abc');
    const Search = ({ routeParams }: any) => (
      <div>Search results for: {routeParams.query}</div>
    );
    const { getByText } = render(
      <Router paths={[{ path: '/search/:query', component: Search }]} />
    );
    expect(getByText('Search results for: abc')).toBeTruthy();
  });

  it('should navigate using Links', async () => {
    const getCurrentPathMock = () => {
      let counter = 0;
      return () => {
        counter++;
        if (counter === 1) {
          return '/';
        }
        return '/about';
      };
    };
    (getCurrentPath as Mock).mockImplementation(getCurrentPathMock());
    const Home = () => (
      <div>
        Home <Link href="/about">Go to About</Link>
      </div>
    );
    const About = () => <div>About</div>;
    const { getByText, getByRole } = render(
      <Router>
        <Route path="/" component={Home} />
        <Route path="/about" component={About} />
      </Router>
    );
    fireEvent.click(getByRole('link'));
    await waitFor(() => expect(getByText('About')).toBeTruthy());
  });
});
