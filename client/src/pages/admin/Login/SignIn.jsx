import PageMeta from "../../../components/common/PageMeta";
import AuthLayout from "./AuthPageLayout";
import SignInForm from "../../../components/auth/SignInForm.jsx";

export default function SignIn() {
  return (
    <>
      <PageMeta
        title="Dashboard"
      />
      <AuthLayout>
        <SignInForm />
      </AuthLayout>
    </>
  );
}
