'use client';

import { useState, useCallback, useRef, type FormEvent } from 'react';

interface EmailFormProps {
  inputId: string;
}

export default function EmailForm({ inputId }: EmailFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const handleSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const input = form.querySelector('input[type="email"]') as HTMLInputElement;
    if (!input?.value) return;

    setSubmitted(true);
    input.value = '';

    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setSubmitted(false), 4000);
  }, []);

  return (
    <form className="email-form" action="#" method="POST" aria-label="Email signup form" onSubmit={handleSubmit}>
      <label htmlFor={inputId} className="sr-only">Email address</label>
      <input
        type="email"
        id={inputId}
        name="email"
        placeholder={submitted ? 'Check your inbox' : 'Enter your email'}
        required
        autoComplete="email"
        aria-required="true"
        disabled={submitted}
      />
      <button
        type="submit"
        className="btn btn-primary"
        disabled={submitted}
        style={submitted ? { opacity: 0.7 } : undefined}
      >
        {submitted ? "You're In!" : 'Claim My Offer'}
      </button>
    </form>
  );
}
