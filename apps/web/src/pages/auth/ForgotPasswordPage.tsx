import { Link } from 'react-router-dom';

export default function ForgotPasswordPage() {
  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="font-heading text-2xl font-bold text-text-primary">Forgot password</h1>
        <p className="text-text-secondary">
          Password reset will be available soon. Contact your district administrator for help.
        </p>
      </header>
      <Link
        to="/auth/login"
        className="inline-flex h-10 w-full items-center justify-center rounded-md border border-border-default bg-surface-card px-4 text-sm font-medium text-text-primary transition-colors hover:bg-surface-card-hover"
      >
        Back to sign in
      </Link>
    </div>
  );
}
