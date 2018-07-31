interface IRecoveryFormData {
  confirm_password: string;
  new_password: string;
}

interface ILoginFormData {
  email: string;
  password: string;
  company: string;
}

interface IFogotPasswordData {
  email: string;
}
