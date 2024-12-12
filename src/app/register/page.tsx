"use client";

import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { register } from "../../../actions/register";
import { FormSuccess } from "@/components/form-success";
import { FormError } from "@/components/form-error";
import { RegisterSchema } from "../../../schemas";
// type FormDataType = {
//   name: string;
//   email: string;
//   phoneNumber: string;
//   policeStation: string;
//   designation: string;
//   governmentId: string;
//   password: string;
// };

const policeStations = [
  { name: "TT Nagar Police Station", lat: 23.23725, long: 77.39984 },
  { name: "Kamla Nagar Police Station", lat: 23.21554, long: 77.39552 },
  { name: "Shyamla Hills Police Station", lat: 23.2457, long: 77.4107 },
  { name: "Habibganj Police Station", lat: 23.2295, long: 77.4381 },
  { name: "Piplani Police Station", lat: 23.2289, long: 77.4718 },
  { name: "Govindpura Police Station", lat: 23.2587, long: 77.4935 },
  { name: "Ashoka Garden Police Station", lat: 23.2494, long: 77.4631 },
  { name: "MP Nagar Police Station", lat: 23.2332, long: 77.4272 },
  { name: "Bhopal Kotwali Police Station", lat: 23.2689, long: 77.4012 },
  { name: "Hanumanganj Police Station", lat: 23.2812, long: 77.4135 },
  { name: "Chhola Mandir Police Station", lat: 23.2856, long: 77.4343 },
  { name: "Shahpura Police Station", lat: 23.1945, long: 77.4423 },
  { name: "Misrod Police Station", lat: 23.1734, long: 77.4802 },
  { name: "Kolar Police Station", lat: 23.1678, long: 77.4187 },
  { name: "Jahangirabad Police Station", lat: 23.2635, long: 77.4273 },
  { name: "Mangalwara Police Station", lat: 23.2721, long: 77.4224 },
  { name: "Talaiya Police Station", lat: 23.2685, long: 77.4152 },
  { name: "Ayodhya Nagar Police Station", lat: 23.2467, long: 77.4823 },
  { name: "Bagh Sewania Police Station", lat: 23.2118, long: 77.4756 },
  { name: "Khajuri Sadak Police Station", lat: 23.1245, long: 77.5712 },
  { name: "Ratibad Police Station", lat: 23.1101, long: 77.3865 },
  { name: "Berasia Police Station", lat: 23.6352, long: 77.4323 },
];

const designations = ["Incharge", "User"];

const Register = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
      number: "",
      role: "",
      govId: "",
      location: "",
    },
  });

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      register(values).then((data) => {
        setError(data.error);
        setSuccess(data.success);

        if (data.success) {
          form.reset();
        }
      });
    });
  };

  return (
    <div className="mx-auto w-auto p-4 md:p-6 2xl:p-10">
      <Breadcrumb pageName="REGISTER" />
      <div className="rounded-sm border border-stroke bg-white px-5  pb-5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        {/* <div className="flex h-[100vh] items-center justify-center"> */}
        {/* <CardWrapper
          headerLabel="Create an account"
          backButtonLabel="Already have an account"
          backButtonHref="/auth/login"
        > */}
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="md:grid md:grid-cols-1 gap-9 flex flex-col"
        >
          {/* Name Field */}
          <div>
            <label className="mb-2 block text-sm font-medium text-black dark:text-white">
              Name
            </label>
            <input
              type="text"
              // name="name"
              placeholder="Enter your name"
              {...form.register("name")}
              disabled={isPending}
              className="w-full rounded-lg border border-stroke px-4 py-2 dark:border-strokedark dark:bg-boxdark"
              required
            />
          </div>

          {/* Email Field */}
          <div>
            <label className="mb-2 block text-sm font-medium text-black dark:text-white">
              Email
            </label>
            <input
              type="email"
              // name="email"
              placeholder="Enter your email"
              {...form.register("email")}
              disabled={isPending}
              className="w-full rounded-lg border border-stroke px-4 py-2 dark:border-strokedark dark:bg-boxdark"
              required
            />
          </div>

          {/* Phone Number Field */}
          <div>
            <label className="mb-2 block text-sm font-medium text-black dark:text-white">
              Phone Number
            </label>
            <input
              type="text"
              // name="number"
              placeholder="Enter your phone number"
              {...form.register("number")}
              disabled={isPending}
              className="w-full rounded-lg border border-stroke px-4 py-2 dark:border-strokedark dark:bg-boxdark"
              required
            />
          </div>

          {/* Location Field */}
          <div>
            <label className="mb-2 block text-sm font-medium text-black dark:text-white">
              Location (Police Station)
            </label>
            <select
              // name="location"
              {...form.register("location")}
              disabled={isPending}
              className="w-full rounded-lg border border-stroke px-4 py-2 dark:border-strokedark dark:bg-boxdark"
              required
            >
              <option value="" disabled>
                Select a police station
              </option>
              {policeStations.map((station) => (
                <option key={station.name} value={station.name}>
                  {station.name}
                </option>
              ))}
            </select>
          </div>

          {/* Designation Field */}
          <div>
            <label className="mb-2 block text-sm font-medium text-black dark:text-white">
              Designation
            </label>
            <select
              // name="role"
              {...form.register("role")}
              disabled={isPending}
              className="w-full rounded-lg border border-stroke px-4 py-2 dark:border-strokedark dark:bg-boxdark"
              required
            >
              <option value="" disabled>
                Select a designation
              </option>
              {designations.map((role, index) => (
                <option key={index} value={role}>
                  {role}
                </option>
              ))}
            </select>
          </div>

          {/* Government ID Field */}
          <div>
            <label className="mb-2 block text-sm font-medium text-black dark:text-white">
              Government ID
            </label>
            <input
              type="text"
              // name="govId"
              placeholder="Enter your government ID"
              {...form.register("govId")}
              disabled={isPending}
              className="w-full rounded-lg border border-stroke px-4 py-2 dark:border-strokedark dark:bg-boxdark"
              required
            />
          </div>

          {/* Password Field */}
          <div>
            <label className="mb-2 block text-sm font-medium text-black dark:text-white">
              Password
            </label>
            <input
              type="password"
              // name="password"
              placeholder="Enter your password"
              {...form.register("password")}
              disabled={isPending}
              className="w-full rounded-lg border border-stroke px-4 py-2 dark:border-strokedark dark:bg-boxdark"
              required
            />
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />

          {/* Submit Button */}
          <div className="col-span-2 flex justify-end">
            <button
              type="submit"
              className="mb-6 rounded-lg bg-primary px-6 py-3 text-white hover:bg-opacity-90"
              disabled={isPending}
            >
              Submit
            </button>
          </div>
        </form>
        {/* </CardWrapper> */}
      </div>
    </div>
  );
};

export default Register;
