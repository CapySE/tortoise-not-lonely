"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/utils/tailwind-merge";
import * as React from "react";
import { useEffect, useState } from "react";
import { z } from "zod";
import { type User } from "../interfaces";

interface EmailPasswordBoxProps {
  setValid: (valid: boolean) => void;
  formRef: React.RefObject<HTMLFormElement>;
  data: User;
}

const emailSchema = z.string().email();

export default function EmailPasswordBox(props: EmailPasswordBoxProps) {
  const { setValid, formRef, data } = props;
  const [emailText, setEmailText] = useState(data.Email ? data.Email : "");
  const [passwordText, setPasswordText] = useState(
    data.Password ? data.Password : "",
  );
  const [cfPasswordText, setCfPasswordText] = useState(
    data.Password ? data.Password : "",
  );

  const [emailNotice, setEmailNotice] = useState<string>("");

  const [passwordNotice, setPasswordNotice] = useState<string>("");

  const [confirmPasswordNotice, setConfirmPasswordNotice] =
    useState<string>("");

  useEffect(() => {
    formCheck();
  });

  const formCheck = () => {
    setEmailNotice("");
    setPasswordNotice("");
    setConfirmPasswordNotice("");
    if (!formRef.current) {
      return;
    }
    const formData = new FormData(formRef.current);
    const email = formData.get("Email") as string | null;
    const password = formData.get("Password") as string | null;
    const confirmPassword = formData.get("Confirm Password") as string | null;

    let valid = true;

    if (email && !emailSchema.safeParse(email).success) {
      setValid(false);
      setEmailNotice("Invalid email");
      valid = false;
    }

    if (password && password.length < 8) {
      setValid(false);
      setPasswordNotice("Password must be at least 8 characters");
      valid = false;
    }

    if (password !== confirmPassword) {
      setValid(false);
      setConfirmPasswordNotice("Passwords do not match");
      valid = false;
    }

    if (!email || !password || !confirmPassword) {
      console.log("Invalid");
      setValid(false);
    }

    setValid(valid);
  };

  return (
    <Card className="w-fit justify-center rounded-3xl border-solid border-primary-500 bg-white p-12">
      <CardContent className="flex h-full w-full justify-center p-0">
        <form className="flex h-full w-[420px] flex-col gap-y-6" ref={formRef}>
          <div className="flex w-full flex-col gap-y-1.5">
            <Label htmlFor="Email" className="font-semibold">
              Email
            </Label>
            <Input
              value={emailText}
              type="text"
              name="Email"
              placeholder="Enter your Email"
              onKeyUp={formCheck}
              onChange={(e) => {
                setEmailText(e.currentTarget.value);
              }}
            />
            <span className="text-sm text-red-500">{emailNotice}</span>
          </div>
          <div className="flex w-full flex-col gap-y-1.5">
            <Label htmlFor="Password" className="font-semibold">
              Password
            </Label>
            <Input
              value={passwordText}
              type="password"
              name="Password"
              placeholder="Enter your password"
              onKeyUp={formCheck}
              onChange={(e) => {
                setPasswordText(e.currentTarget.value);
              }}
            />
            <div
              className={cn("text-sm text-placeholder ", {
                "text-red-500": passwordNotice,
              })}
            >
              The password must be at least 8 characters
            </div>
          </div>
          <div className="flex w-full flex-col gap-y-1.5">
            <Label htmlFor="Confirm Password" className="font-semibold">
              Confirm Password
            </Label>
            <Input
              value={cfPasswordText}
              type="password"
              name="Confirm Password"
              placeholder="Enter your password"
              onKeyUp={formCheck}
              onChange={(e) => {
                setCfPasswordText(e.currentTarget.value);
              }}
            />
            <span className="text-sm text-red-500">
              {confirmPasswordNotice}
            </span>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
