import { Button } from "./ui/button";

const EmailResetPassword = ({ link }: { link: string }) => {
  return (
    <div className="flex h-full w-full items-center justify-center space-y-3">
      <div className="my-10 w-full max-w-sm space-y-3 text-center">
        <h1 className="text-xl font-bold">Reset your password</h1>
        <p>Don&apos;t share this link!</p>
        <p>Please click button below to reset password</p>
        <Button asChild className="w-full">
          <a href={link}>Reset Password</a>
        </Button>
        <p>
          If the button not work, please click this link{" "}
          <a href={link} className="text-blue-500 underline">
            {link}
          </a>
        </p>
      </div>
    </div>
  );
};

export default EmailResetPassword;
