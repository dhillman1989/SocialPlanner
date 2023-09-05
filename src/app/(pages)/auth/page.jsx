import HeaderBlock from "../../_components/HeaderBlock";

export default function Auth() {
  return (
    <>
      <HeaderBlock heading="Login or Signup Now!" />
      <div className="auth-options login-buttons bordered">
        <a className="button button--primary">Login</a>
        <a className="button button--secondary">Sign Up Now</a>
      </div>
    </>
  );
}
