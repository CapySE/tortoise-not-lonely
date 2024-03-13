"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { api } from "@/trpc/react";
import {
  faChevronLeft,
  faLock,
  faUnlockKeyhole,
  faCircleInfo
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const validationSchema = z.object({
  password: z
    .string()
    .min(8, { message: "Password must be atleast 8 characters" }),
  confirmPassword: z
    .string()
    .min(1, { message: "Confirm Password is required" }),
});

type ValidationSchema = z.infer<typeof validationSchema>;

export default function ResetPassword({
  params,
}: {
  params: { token: string };
}) {
  api.auth.me.useQuery(undefined, {
    onSuccess: (data) => {
      if (data) {
        redirect("/");
      }
    },
  });
  const [error, setError] = useState<string | null>(null);
  const [criticalError, setCriticalError] = useState<string | null>(null);
  const [passwordNotice, setPasswordNotice] = useState<string | null>(null);
  const { isLoading: isDataLoading } = api.auth.validatingEmailToken.useQuery(
    {
      emailToken: params.token,
    },
    {
      onSuccess(data) {
        switch (data.status) {
          case "valid":
            break;
          case "not_found":
            setCriticalError("Your Link has Expired");
            break;
          case "expired":
            setCriticalError("Your Link has Expired");
            break;
        }
      },
    },
  );

  const mutate = api.auth.changePasswordByEmailToken.useMutation({});

  const submitHandler = async (e: FormData) => {
    let valid = true;
    const password = e.get("password") as string;
    const confirm_password = e.get("confirm_password") as string;
    if (password && password.length < 8) {
      setPasswordNotice("Password must be at least 8 characters");
      valid = false;
      return;
    }

    if (password !== confirm_password) {
      setError("Passwords do not match");
      return;
    }
    try {
      await mutate.mutateAsync({
        emailToken: params.token,
        newPassword: password,
      });
    } catch (e: unknown) {
      if (e instanceof Error) {
        setError(`Error: ${e.message}`);
      } else {
        setError("Unknown error");
      }
    }
    redirect("/signin");
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ValidationSchema>({
    resolver: zodResolver(validationSchema),
  });

  const onSubmit: SubmitHandler<ValidationSchema> = (data) => console.log(data);

  return (
    <main
      className="flex h-screen bg-white p-6 lg:p-14"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex h-full w-full flex-1 flex-col gap-2">
        {criticalError ? (
          <></>
        ) : (
          <Link href="/reset-password" className="absolute">
            <button className="absolute flex h-6 w-6 items-center justify-center">
              <FontAwesomeIcon
                icon={faChevronLeft}
                className="absolute text-high"
                size="lg"
              />
            </button>
          </Link>
        )}
        <div className="flex h-full w-full flex-col items-center p-6 lg:justify-center">
          {criticalError ? (
            <div className="flex h-full w-full flex-col items-center gap-8 lg:h-fit lg:w-[415px] lg:gap-3">
              <div className="flex h-20 w-20 flex-none items-center justify-center rounded-full bg-secondary-400 lg:h-[60px] lg:w-[60px]">
                <FontAwesomeIcon
                  icon={faLock}
                  className=" text-white lg:text-[32px]"
                  size="3x"
                />
              </div>
              <div className="flex h-full w-full flex-col justify-between gap-8 lg:h-fit lg:gap-9 ">
                <div className="flex flex-col items-center gap-3">
                  <div className="h3 lg:h2 font-extrabold text-primary-900 lg:font-extrabold">
                    {criticalError}
                  </div>
                  <div className="h6 text-medium">
                    Oops! It seems the link you're trying to use has expired.
                    Please return to the reset password page to generate a fresh
                    link
                  </div>
                </div>
                <Button variant={"secondary"} disabled={isDataLoading} asChild>
                  <Link href="/reset-password">Forgot password</Link>
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex h-full w-full flex-col items-center gap-8 lg:h-fit lg:w-[415px] lg:gap-3">
              <div className="flex h-20 w-20 flex-none items-center justify-center rounded-full bg-secondary-400 lg:h-[60px] lg:w-[60px]">
                <FontAwesomeIcon
                  icon={faUnlockKeyhole}
                  className="text-white lg:text-[32px]"
                  size="3x"
                />
              </div>
              <div className="flex h-full w-full flex-col gap-8 lg:gap-9">
                <div className="flex flex-col items-center gap-3">
                  <div className="h3 lg:h2 font-extrabold text-primary-900 lg:font-extrabold">
                    New Password
                  </div>
                  <div className="h6 text-medium">Please set New Password</div>
                </div>
                <div className="flex w-full flex-1 flex-col items-center gap-2 lg:flex-none lg:gap-9">
                  <form
                    action={submitHandler}
                    className="flex h-full w-full flex-col justify-between gap-9 text-black lg:h-fit lg:justify-normal"
                  >
                    <div className="flex w-full flex-col gap-3">
                      <div className="flex w-full flex-col gap-1">
                        <Label htmlFor="email" className="body5">
                          Enter New Passoword
                        </Label>
                        <Input
                          className="w-full"
                          type="password"
                          id="password"
                          placeholder="Enter new password"
                          {...register("password")}
                        />
                        {errors.password ? (
                          <div className="flex items-center">
                            <FontAwesomeIcon icon={faCircleInfo} className="text-red-500" size="xs" />
                            <p className="px-1 text-xs text-red-500">
                              {errors.password.message}
                            </p>
                          </div>
                        ) : (
                          <div className="flex items-center">
                            <FontAwesomeIcon icon={faCircleInfo} className="text-medium" size="xs" />
                            <p className="px-1 text-xs text-medium">
                              {"Password must be at least 8 characters"}
                            </p>
                          </div>
                        )}
                      </div>
                      <div className="flex w-full flex-col gap-1">
                        <Label htmlFor="email" className="body5">
                          Confirm Passoword
                        </Label>
                        <Input
                          className="w-full"
                          type="password"
                          id="confirm_password"
                          placeholder="Confirm password"
                          {...register("confirmPassword")}
                        />
                        {errors.confirmPassword && (
                          <div className="flex items-center">
                          <FontAwesomeIcon icon={faCircleInfo} className="text-red-500" size="xs" />
                          <p className="px-1 text-xs text-red-500">
                            {errors.confirmPassword.message}
                          </p>
                        </div>
                        )}
                      </div>
                    </div>
                    {error && <p className="text-red-500">{error}</p>}
                    <Button
                      variant={"secondary"}
                      type="submit"
                      disabled={isDataLoading}
                    >
                      Login
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
