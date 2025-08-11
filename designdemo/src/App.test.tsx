// src/App.vitest.test.tsx
import { render, screen } from '@testing-library/react';
import { describe, test, expect, vi, beforeEach } from 'vitest';
import App from './App';

// Mock auth selector so we can flip auth on/off
let isAuthed = false;
vi.mock('./store/hooks', () => ({
  useAppSelector: (sel: any) => sel({ auth: { isAuthenticated: isAuthed } }),
}));

// Stub pages for stable assertions (optional)
vi.mock('./components/Home/Home', () => ({ default: () => <div>Home Page</div> }));
vi.mock('./components/Public/Public', () => ({ default: () => <div>Public Page</div> }));
vi.mock('./components/Login/Login', () => ({ default: () => <div>Login Page</div> }));
vi.mock('./components/Secure/Secure', () => ({ default: () => <div>Secure Page</div> }));

describe('App Router (no nested Router)', () => {
  beforeEach(() => {
    isAuthed = false;
  });

  test('renders Home at "/"', () => {
    window.history.pushState({}, '', '/');
    render(<App />);
    expect(screen.getByText(/Home Page/i)).toBeInTheDocument();
  });

  test('renders Public at "/public"', () => {
    window.history.pushState({}, '', '/public');
    render(<App />);
    expect(screen.getByText(/Public Page/i)).toBeInTheDocument();
  });

  test('redirects unauthenticated "/secure" to "/login"', async () => {
    window.history.pushState({}, '', '/secure');
    render(<App />);
    expect(await screen.findByText(/Login Page/i)).toBeInTheDocument();
  });

  test('shows Secure when authenticated', () => {
    isAuthed = true;
    window.history.pushState({}, '', '/secure');
    render(<App />);
    expect(screen.getByText(/Secure Page/i)).toBeInTheDocument();
  });
});
