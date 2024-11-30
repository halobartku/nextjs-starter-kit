export default function UnauthorizedPage() {
  return (
    <div className="flex items-center justify-center min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-destructive mb-4">Unauthorized</h1>
        <p className="text-muted-foreground mb-8">
          You don't have permission to access this page.
        </p>
        <div className="space-x-4">
          <a
            href="/"
            className="text-primary hover:text-primary/90 font-medium"
          >
            Return Home
          </a>
          <a
            href="/sign-in"
            className="text-primary hover:text-primary/90 font-medium"
          >
            Sign In
          </a>
        </div>
      </div>
    </div>
  );
}
