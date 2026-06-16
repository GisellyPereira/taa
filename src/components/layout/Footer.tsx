import { env } from "@/config/env";

export function Footer() {
  return (
    <footer className="border-t border-border py-6 text-text-muted">
      <div className="container">
        <small>
          &copy; {new Date().getFullYear()} {env.appName}
        </small>
      </div>
    </footer>
  );
}
