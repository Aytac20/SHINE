"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { createNewAddressAction } from "@/app/actions";
import toast from "react-hot-toast";

const schema = z.object({
  country: z.string().min(1, "Country or region is required"),
  fullName: z.string().min(3, "Name must be at least 3 characters"),
  streetAddress: z.string().min(3, "Address must be at least 3 characters"),
  city: z.string().min(3, "City must be at least 3 characters"),
  postalCode: z.string().min(3, "Postal code must be at least 3 characters"),
  phone: z
    .string()
    .min(1, "Phone number is required")
    .regex(/^\+?\d{7,15}$/, "Invalid phone number"),
});

type FormData = z.infer<typeof schema>;

const ShippingAddressForm = () => {
  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      country: "",
      fullName: "",
      streetAddress: "",
      city: "",
      postalCode: "",
      phone: "",
    },
  });
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const onSubmit: SubmitHandler<FormData> = (values) => {
    startTransition(async () => {
      try {
        await createNewAddressAction(values);
        router.push("/payment-details");
        toast.success("Address saved successfully 🚗");
      } catch (error) {
        const message =
          error instanceof Error
            ? error.message
            : "Something went wrong while saving the address";
        toast.error(message);
      }
    });
  };

  return (
    <div className="min-h-screen px-6 py-8 xl:w-[60%] md:w-[80%] w-full mx-auto ">
      <h2 className="flex items-center text-zinc-800  font-semibold tracking-wider mb-6 py-4 text-lg ">
        Shipping Address
      </h2>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          noValidate
          className="gap-4 flex flex-col text-xs"
        >
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name*</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="First Name"
                    className="border-zinc-400 text-xs  "
                  />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="streetAddress"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Street Address*</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Street Address"
                    className="border-zinc-400 text-xs  "
                  />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Country*</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Country"
                    className="border-zinc-400 text-xs  "
                  />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>City*</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="City"
                    className="border-zinc-400 text-xs  "
                  />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="postalCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Zip / Postal</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Zip / Postal"
                    className="border-zinc-400 text-xs  "
                  />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone*</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="tel"
                    placeholder="Phone Number"
                    className="border-zinc-400 text-xs  "
                  />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={isPending}
              className="uppercase font-semibold tracking-wider px-6 py-3 bg-black hover:bg-gray-900 text-white text-xs rounded-none"
            >
              {isPending ? "Saving..." : "Continue"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ShippingAddressForm;
