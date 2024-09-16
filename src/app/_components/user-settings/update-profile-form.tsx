"use client";

import { toast } from "@/hooks/use-toast";
import {
  updateProfileSchema,
  type UpdateProfileSchema,
} from "@/server/api/routers/user/user.types";
import { upload } from "@/server/image";
import { api } from "@/trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { TRPCClientError } from "@trpc/client";
import type { User } from "lucia";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { isJSON } from "@/lib/utils";
import { env } from "@/env";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Avatar, AvatarImage } from "../ui/avatar";

export default function UpdateProfileForm({ user }: { user: User }) {
  const baseUrl = env.NEXT_PUBLIC_BASE_URL;

  const inputFileRef = useRef<HTMLInputElement | null>(null);

  const [file, setFile] = useState<File | null>();
  const [preview, setPreview] = useState<string>(user.picture);

  const mutation = api.user.updateProfile.useMutation();

  const form = useForm<UpdateProfileSchema>({
    resolver: zodResolver(updateProfileSchema),
    values: {
      firstName: user.firstName,
      lastName: user.lastName,
      picture: user.picture,
      bio: user.bio ?? undefined,
    },
  });

  const handleChangeFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || event.target.files.length == 0) setFile(null);
    else setFile(event.target.files[0]);
  };

  useEffect(() => {
    if (!file) {
      return setPreview(user.picture);
    }

    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
    //eslint-disable-next-line
  }, [file]);

  const onSubmit = async (values: UpdateProfileSchema) => {
    try {
      let url: string = user.picture;
      if (file) {
        const formData = new FormData();
        formData.append("file", file);

        const resUpload = await upload(formData);
        if (resUpload.error || !resUpload.url)
          return form.setError("picture", {
            message: resUpload.error ?? "Something went wrong",
          });

        form.setValue("picture", resUpload.url);

        url = resUpload.url;
      }

      await mutation.mutateAsync({
        ...values,
        picture: url,
      });

      toast({ title: "Success to update profile" });
    } catch (error) {
      if (error instanceof TRPCClientError) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const formatErr: Array<{
          message: string;
          path: Parameters<typeof form.setError>;
        }> = isJSON(error.message);

        if (!formatErr) form.setError("root", { message: error.message });
        else
          formatErr.forEach((err) => {
            form.setError(err.path[0] || "root", { message: error.message });
          });

        toast({ title: "Something went wrong", variant: "destructive" });
      }
    }
  };

  const handleCancel = () => {
    setFile(null);
    setPreview(user.picture);
    form.reset();
  };

  return (
    <div className="rounded-lg border bg-background p-6">
      <Form {...form}>
        <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex w-full flex-col gap-3 md:flex-row md:gap-10">
            <div className="basis-1/3 space-y-2">
              <h3 className="text-xl font-semibold">Edit Profile Picture</h3>
              <p className="text-balance text-sm text-gray-400">
                Upload a profile picture of yourself, or the character, you
                always wanted to be.
              </p>
            </div>
            <FormField
              control={form.control}
              name="picture"
              render={() => (
                <div className="flex grow flex-col gap-y-3 md:flex-row md:gap-y-0">
                  <div className="flex flex-row gap-5">
                    <Avatar className="size-20 border">
                      <AvatarImage
                        src={
                          preview == user.picture
                            ? `${baseUrl}/${user.picture}`
                            : preview
                        }
                      />
                    </Avatar>
                    <div className="flex flex-col justify-center">
                      <h4 className="font-semibold">Upload new image</h4>
                      <p>Max file size - 10MB</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 md:ml-auto">
                    <Input
                      id="image"
                      ref={inputFileRef}
                      type="file"
                      onChange={handleChangeFile}
                      accept="image/*"
                      className="hidden"
                    />
                    <Button
                      type="button"
                      variant={"outline"}
                      onClick={() => inputFileRef.current?.click()}
                    >
                      Upload
                    </Button>
                    <Button
                      variant={"outline"}
                      className="text-red-500 hover:text-red-500"
                      onClick={() => {
                        setFile(null);
                        setPreview(user.picture);
                      }}
                    >
                      Remove
                    </Button>
                  </div>
                  <FormMessage />
                </div>
              )}
            />
          </div>
          <div className="flex w-full flex-col gap-3 md:flex-row md:gap-10">
            <div className="basis-1/3 space-y-2">
              <h3 className="text-xl font-semibold">
                Edit Personal Information
              </h3>
              <p className="text-balance text-sm text-gray-400">
                Manage your personal data with ease. Stay connected with
                accurate and relevant details.
              </p>
            </div>
            <div className="flex grow flex-col gap-y-5">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bio</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Tell the world about yourself"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="flex justify-end gap-3">
            <Button type="submit" disabled={mutation.isPending}>
              {mutation.isPending ? "Loading..." : "Save changes"}
            </Button>
            <Button type="button" variant={"outline"} onClick={handleCancel}>
              Cancel
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
