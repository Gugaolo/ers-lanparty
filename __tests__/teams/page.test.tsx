import { render, screen, act } from '@testing-library/react';
import React from 'react';
import TeamsPage from '@/app/teams/page';

// mock next/link
jest.mock('next/link', () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => {
    return <a href={href}>{children}</a>;
  };
});

// mock supabase browser client
jest.mock('@/lib/supabase.ts', () => ({
  supabase: {
    auth: {
      onAuthStateChange: jest.fn(() => ({
        data: { subscription: { unsubscribe: jest.fn() } },
      })),
      getUser: jest.fn(() => ({
        data: { user: { id: '123', email: 'test@example.com' } },
      })),
    },
  },
}));

// mock supabase
jest.mock('@/lib/supabaseServerClient.ts', () => ({
  createSupabaseServerClient: jest.fn(() => ({
    auth: {
      getUser: jest.fn(() => ({
        data: { user: { id: '123', email: 'test@example.com' } },
      })),
    },
    from: jest.fn(() => ({
      select: jest.fn().mockReturnThis(),
      order: jest.fn().mockResolvedValue({
        data: [
          {
            id: 1,
            group_name: 'Test Team',
            members: 'Alice, Bob',
            games: 'CS:GO',
            created_at: '2026-01-13T10:00:00.000Z',
            logo_path: null,
            owner_id: '123',
            owner_email: 'test@example.com',
          },
        ],
        error: null,
      }),
    })),
  })),
}));

beforeEach(() => {
  jest.resetModules();
  jest.clearAllMocks();
});

describe('TeamsPage', () => {
  it('renders without crashing and shows group data', async () => {
    let container: HTMLElement;

    await act(async () => {
      container = render(await TeamsPage()).container;
    });

    expect(screen.getByRole('heading', { level: 1, name: /LAN Party/i })).toBeInTheDocument();
    expect(screen.getByText(/Test Team/i)).toBeInTheDocument();
    expect(screen.getByText(/Alice, Bob/i)).toBeInTheDocument();
    expect(screen.getByText(/CS:GO/i)).toBeInTheDocument();
  });
});
