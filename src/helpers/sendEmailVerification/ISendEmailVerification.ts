interface ISendEmailVerificationDTO {
  email: string;
  user_id?: string;
  client_id?: string;
}

interface ISendEmailVerification {
  execute({
    email,
    client_id,
    user_id,
  }: ISendEmailVerificationDTO): Promise<void>;
}

export { ISendEmailVerification, ISendEmailVerificationDTO };
