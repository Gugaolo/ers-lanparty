import { render, screen } from '@testing-library/react';
import Home from '@/app/page';
import '@testing-library/jest-dom';
import { SCHEDULE } from '@/app/data/schedule';

// Mock Next.js Image and Link
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => <img {...props} />,
}));

jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, href }: any) => <a href={href}>{children}</a>,
}));

// Mock Supabase client
jest.mock('@/lib/supabase', () => ({
  supabase: {
    auth: {
      onAuthStateChange: jest.fn(() => ({ data: { subscription: { unsubscribe: jest.fn() } } })),
    },
  },
}));

describe('Landing page', () => {
  beforeEach(() => {
    render(<Home />);
  });

  it('renders without crashing', () => {
    // Just rendering is enough
  });

  it('renders main heading including "LAN Party"', () => {
    // match just "LAN Party" to avoid unicode issues with š
    expect(
      screen.getByRole('heading', { name: /lan party/i })
    ).toBeInTheDocument();
  });

  it('contains main navigation links', () => {
    // Use getAllByRole because there are duplicates (desktop + mobile)
    const igreLinks = screen.getAllByRole('link', { name: /igre/i });
    expect(igreLinks.length).toBeGreaterThan(0);
    expect(igreLinks.some(link => link.getAttribute('href') === './#igre')).toBe(true);

    const ekipeLinks = screen.getAllByRole('link', { name: /ekipe/i });
    expect(ekipeLinks.length).toBeGreaterThan(0);
    expect(ekipeLinks.some(link => link.getAttribute('href') === '/teams')).toBe(true);

    const urnikLinks = screen.getAllByRole('link', { name: /urnik/i });
    expect(urnikLinks.length).toBeGreaterThan(0);
    expect(urnikLinks.some(link => link.getAttribute('href') === '/urnik')).toBe(true);

    const pravilaLinks = screen.getAllByRole('link', { name: /pravila/i });
    expect(pravilaLinks.length).toBeGreaterThan(0);
    expect(pravilaLinks.some(link => link.getAttribute('href') === '#pravila')).toBe(true);
  });
});
