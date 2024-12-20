"use client";
import { useForm } from "react-hook-form";
import { useEffect, useState, useTransition } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

import {
  Form,
  FormControl,
  FormField,
  FormLabel,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import CardWrapper from "./card-wrapper";
import { Button } from "../ui/button";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";

import { register } from "../../../actions/register";
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




// Define Zod Schema
const RegisterSchema = z.object({


  name: z.string().min(1, "Name is required"), // Name validation
  email: z.string().email("Please enter a valid email"), // Email validation
  number: z
    .string()
    .regex(/^\d{10}$/, "Phone number must be exactly 10 digits"), // Phone number validation
  role: z
    .string()
    .regex(/^(Admin|Incharge|User)$/i, "Role must be Admin, Incharge, or User"), // Role validation
  govId: z
    .string()
    .regex(/^\d{12}$/, "Government ID must be exactly 12 digits"), // Gov ID validation
  password: z.string().min(6, "Password must be at least 6 characters"), // Password validation
  location: z.string().min(1, "Location is required"), // Location validation
});

export const RegisterForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  

  
const [token, setToken] = useState<string>("");




useEffect(() => {
  // Load the reCAPTCHA script dynamically and ensure it loads fully before calling `grecaptcha`
  const script = document.createElement("script");
  script.src = `https://www.google.com/recaptcha/enterprise.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`;
  script.async = true;
  script.defer = true;
  script.onload = getRecaptcha; // Call the function once the script is loaded
  document.head.appendChild(script);

  return () => {
    // Clean up the script if the component unmounts
    document.head.removeChild(script);
  };
}, []);

const getRecaptcha = async () => {
  grecaptcha.enterprise.ready(async () => {
    const token = await grecaptcha.enterprise.execute(
      process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY
    );
    setToken(token);
  });
};

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
      });
    });
  };

  return (
    <div className="flex h-[100vh] items-center justify-center">
      <CardWrapper
        headerLabel="Create an account"
        backButtonLabel="Already have an account"
        backButtonHref="/auth/login"
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="Abcd"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="abcd.18@example.com"
                        type="email"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex flex-row gap-5">
                <FormField
                  control={form.control}
                  name="number"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isPending}
                          placeholder="9878987690"
                          type="text"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={(value) => field.onChange(value)}
                          disabled={isPending}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select a police station" />
                          </SelectTrigger>
                          <SelectContent>
                            {policeStations.map((station) => (
                              <SelectItem
                                key={station.name}
                                value={station.name}
                              >
                                {station.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Designation</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="Admin | Incharge | User"
                        type="text"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="govId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Government ID</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="Gov ID"
                        type="text"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="******"
                        type="password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormError message={error} />
            <FormSuccess message={success} />
            <Button
              type="submit"
              className="w-full bg-black-2 text-white"
              disabled={isPending}
            >
              Create an account
            </Button>
          </form>
        </Form>
      </CardWrapper>
    </div>
  );
};
