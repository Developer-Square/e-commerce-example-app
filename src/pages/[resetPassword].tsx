import { useRouter } from "next/router";
import React from "react";

import { ErrorBoundary } from "@/lib/error-handling";
import { SignInPage } from "@/lib/signin-page";

const ResetPassword = () => {
  const { query } = useRouter();

  return (
    <ErrorBoundary>
      <SignInPage
        type={query.resetPassword === "verify-email" ? "verify" : "reset"}
        token={query.token}
      />
    </ErrorBoundary>
  );
};

export default ResetPassword;
