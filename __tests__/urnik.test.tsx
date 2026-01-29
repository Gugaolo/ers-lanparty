import { render, screen } from '@testing-library/react';
import UrnikPage from '@/app/urnik/page';
import '@testing-library/jest-dom';
import { SCHEDULE } from '@/app/data/schedule';
import React from 'react';

// mock next/link
jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, href }: any) => <a href={href}>{children}</a>,
}));

// mock Header (THIS IS THE MAIN FIX)
jest.mock('@/app/components/header', () => () => <div>Header</div>);

// mock Footer just in case
jest.mock('@/app/components/footer', () => () => <div>Footer</div>);

// mock supabase
jest.mock('@/lib/', () => ({
  supabase: {
    from: jest.fn().mockReturnThis(),
    select: jest.fn().mockResolvedValue({ data: [], error: null }),
  },
}));

// mock auth
jest.mock('@/lib/auth', () => ({
  onAuthStateChange: jest.fn(),
}));

describe('UrnikPage', () => {
  beforeEach(() => {
    render(<UrnikPage />);
  });

  it('renders without crashing', () => {
    expect(true).toBe(true);
  });

  it('renders main heading', () => {
    expect(screen.getByText(/urnik dogodka/i)).toBeInTheDocument();
  });

  it('renders all schedule days', () => {
    SCHEDULE.forEach(day => {
      expect(screen.getByText(day.name)).toBeInTheDocument();
    });
  });

  it('renders all slots for each day', () => {
    SCHEDULE.forEach(day => {
      day.slots.forEach(slot => {
        expect(screen.getAllByText(slot.time).length).toBeGreaterThan(0);
      });
    });
  });

  it('renders disclaimer at the bottom', () => {
    expect(
      screen.getByText(/urnik se lahko spremeni glede na število prijavljenih ekip/i)
    ).toBeInTheDocument();
  });
});
