"use client";

// Libs
import Link from "next/link";
import { useForm, Controller } from "react-hook-form";

// Constant
import { ROUTES, REGEX, MESSAGES_ERROR } from "@/constants";

// Components
import { TextInput, Button, Flex, Text, Title } from "@tremor/react";
import CheckBox from "../checkbox/Checkbox";

// Types
import { User } from "@/types";

const SignUpForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<User>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  // note TODO: handle submit signup form
  const handleSignUp = (data: User) => console.log(data);

  const { name, email, password } = errors || {};
  const nameErrorMessage = name?.message?.toString();
  const emailErrorMessage = email?.message?.toString();
  const passwordErrorMessage = password?.message?.toString();
  const isNameError = Boolean(name);
  const isEmailError = Boolean(email);
  const isPasswordError = Boolean(password);
  const isDisableSubmit = isEmailError || isPasswordError;

  return (
    <Flex className="flex-col w-[80%] sm:w-full mx-auto bg-white max-w-sm rounded-xl -mt-36 sm:-mt-32 shadow-dark-tremor-card 2xl:max-w-xl">
      <div className="w-full p-4">
        <Flex className="bg-gradient-primary rounded-xl -mt-11 justify-center flex-col mb-7 pb-7 shadow-[rgba(52,71,103,0.15)_0rem_0.1875rem_0.1875rem_0rem,rgba(52,71,103,0.2)_0rem_0.1875rem_0.0625rem_-0.125rem,rgba(52,71,103,0.15)_0rem_0.0625rem_0.3125rem_0rem]">
          <Title className="font-bold pt-8 pb-2 px-8 md:text-2xl text-white">
            Join us today
          </Title>
          <Text className="text-white font-light max-w-xs px-6 sm:px-8 text-center">
            Enter your email and password to register
          </Text>
        </Flex>
        <div className="w-full p-2 sm:p-3">
          <Controller
            control={control}
            rules={{
              required: MESSAGES_ERROR.NAME_REQUIRED,
              minLength: { value: 4, message: MESSAGES_ERROR.NAME_MIN_LENGTH },
            }}
            render={({ field }) => (
              <div className="h-[65px] w-full">
                <TextInput
                  id="name"
                  placeholder="Name"
                  error={isNameError}
                  errorMessage={nameErrorMessage}
                  autoFocus
                  className="py-1 w-full rounded-none border-0 border-b-2 shadow-none hover:bg-transparent ring-0"
                  {...field}
                />
              </div>
            )}
            name="name"
          />
          <Controller
            control={control}
            rules={{
              required: MESSAGES_ERROR.EMAIL_REQUIRED,
              pattern: {
                value: REGEX.EMAIL,
                message: MESSAGES_ERROR.EMAIL_INVALID,
              },
            }}
            render={({ field }) => (
              <div className="h-[70px] w-full">
                <TextInput
                  id="email"
                  placeholder="Email"
                  error={isEmailError}
                  errorMessage={emailErrorMessage}
                  type="email"
                  autoFocus
                  className="py-1 w-full rounded-none border-0 border-b-2 shadow-none hover:bg-transparent ring-0"
                  {...field}
                />
              </div>
            )}
            name="email"
          />
          <Controller
            control={control}
            rules={{
              required: MESSAGES_ERROR.PASSWORD_REQUIRED,
              pattern: {
                value: REGEX.PASSWORD,
                message: MESSAGES_ERROR.PASSWORD_INVALID,
              },
            }}
            render={({ field }) => (
              <div className="h-[70px] w-full">
                <TextInput
                  id="password"
                  placeholder="Password"
                  error={isPasswordError}
                  errorMessage={passwordErrorMessage}
                  type="password"
                  autoFocus
                  className="py-1 w-full rounded-none border-0 border-b-2 shadow-none hover:bg-transparent ring-0"
                  {...field}
                />
              </div>
            )}
            name="password"
          />
          <div className="flex items-center space-x-3 mt-1">
            <CheckBox id="checkbox" />
            <Text className="text-sm text-secondary font-light">
              I agree the{" "}
              <Link
                href={ROUTES.HOME}
                className="hover:underline no-underline text-gray-800 text-sm font-semibold">
                Terms and conditions
              </Link>
            </Text>
          </div>
          <Button
            className="w-full font-normal bg-gradient-primary py-[9px] mt-9 uppercase border-transparent hover:border-transparent hover:shadow-[rgba(52,71,103,0.15)_0rem_0.1875rem_0.1875rem_0rem,rgba(52,71,103,0.2)_0rem_0.1875rem_0.0625rem_-0.125rem,rgba(52,71,103,0.15)_0rem_0.0625rem_0.3125rem_0rem]"
            size="xs"
            onClick={handleSubmit(handleSignUp)}
            disabled={isDisableSubmit}>
            Sign Up
          </Button>
          <Flex className="mt-8 mb-2 justify-center items-center">
            <Text className="text-secondary font-light">
              Already have an acccount?
            </Text>
            <Link
              className="text-black-300 font-semibold text-sm ml-2"
              href={ROUTES.SIGN_IN}>
              Sign In
            </Link>
          </Flex>
        </div>
      </div>
    </Flex>
  );
};

export default SignUpForm;
