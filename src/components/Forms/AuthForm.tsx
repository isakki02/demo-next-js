'use client'

import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { useLogin, useRegister } from "@/hooks/userQueries";

export interface LoginFormCompProps {
  header?: string;
}

export interface RegisterFormCompProps {
  header?: string;   
}

//testing

export const LoginForm = ({ header }: LoginFormCompProps) => {
  const loginQuery = useLogin();

  // Define the Zod schema for validation
  const loginFormSchema = z.object({
    email: z.string().nonempty("Email is required"),
    password: z.string().nonempty("Password is required"),
  });

  type authFormProps = z.infer<typeof loginFormSchema>;

  const { register, handleSubmit, formState: { errors } } = useForm<authFormProps>({
    resolver: zodResolver(loginFormSchema),
  });

  // Form submission handler
  const onSubmit: SubmitHandler<authFormProps> = async (data) => {
    const res = await loginQuery.mutateAsync(data);
  };

  return (
    <div className="container w-25 bg-primary-subtle p-4">
      <h3 className="mb-4 text-center">{header}</h3>
      <form onSubmit={handleSubmit(onSubmit)} className="d-flex flex-column gap-3">
        <input {...register("email")} className={`form-control ${errors.email ? "is-invalid" : ""}`} placeholder="Email" />
        {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}

        <input {...register("password")} className={`form-control ${errors.password ? "is-invalid" : ""}`} placeholder="Password" />
        {errors.password && <div className="invalid-feedback">{errors.password.message}</div>}

        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export const RegisterForm = ({ header }: RegisterFormCompProps) => {
  const registerQuery = useRegister();

  // Define the Zod schema for validation
  const registerFormSchema = z.object({
    name: z.string().nonempty("Password is required"),
    email: z.string().nonempty("Email is required"),
    password: z.string().nonempty("Password is required"),
  });

  type authFormProps = z.infer<typeof registerFormSchema>;

  const { register, handleSubmit, formState: { errors } } = useForm<authFormProps>({
    resolver: zodResolver(registerFormSchema),
  });

  // Form submission handler
  const onSubmit: SubmitHandler<authFormProps> = async (data) => {
    const res = await registerQuery.mutateAsync(data);
  };

  return (
    <div className="container w-25 bg-primary-subtle p-4">
      <h3 className="mb-4 text-center">{header}</h3>
      <form onSubmit={handleSubmit(onSubmit)} className="d-flex flex-column gap-3">
        <input {...register("name")} className={`form-control ${errors.name ? "is-invalid" : ""}`} placeholder="Name" />
        {errors.name && <div className="invalid-feedback">{errors.name.message}</div>}

        <input {...register("email")} className={`form-control ${errors.email ? "is-invalid" : ""}`} placeholder="Email" />
        {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}

        <input {...register("password")} className={`form-control ${errors.password ? "is-invalid" : ""}`} placeholder="Password" />
        {errors.password && <div className="invalid-feedback">{errors.password.message}</div>}

        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};
