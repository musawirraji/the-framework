export function Footer() {
  return (
    <footer className="tf-foot">
      <div className="tf-mkt__wrap">
        <p className="tf-foot__word">The Framework</p>
        <div className="tf-foot__row">
          <nav className="tf-foot__nav" aria-label="Footer">
            <a href="#how">How it works</a>
            <a href="#engine">The engine</a>
            <a href="#pricing">Pricing</a>
            <a href="/signup">Create account</a>
            <a href="/login">Log in</a>
          </nav>
          <span className="tf-foot__legal">© {new Date().getFullYear()} The Framework — made for photographers</span>
        </div>
      </div>
    </footer>
  );
}
