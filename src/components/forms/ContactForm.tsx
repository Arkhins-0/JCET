"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useSubmitFeedback } from "@/lib/queries/useMisc";
import { contactSchema, type ContactFormValues } from "@/lib/validations";

export function ContactForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({ resolver: zodResolver(contactSchema) });

  const { mutateAsync, isPending } = useSubmitFeedback();

  const onSubmit = async (values: ContactFormValues) => {
    try {
      const res = await mutateAsync({
        name: values.name,
        email: values.email,
        phone: values.phone || undefined,
        subject: values.subject || undefined,
        message: values.message,
        type: "GENERAL",
      });
      toast.success(res.message ?? "Message sent! We'll get back to you soon.");
      reset();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to send message");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Name" error={errors.name?.message} htmlFor="name">
          <Input id="name" {...register("name")} placeholder="Your name" />
        </Field>
        <Field label="Email" error={errors.email?.message} htmlFor="email">
          <Input id="email" type="email" {...register("email")} placeholder="you@email.com" />
        </Field>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Phone" error={errors.phone?.message} htmlFor="phone" optional>
          <Input id="phone" {...register("phone")} placeholder="+91 …" />
        </Field>
        <Field label="Subject" error={errors.subject?.message} htmlFor="subject" optional>
          <Input id="subject" {...register("subject")} placeholder="How can we help?" />
        </Field>
      </div>
      <Field label="Message" error={errors.message?.message} htmlFor="message">
        <Textarea id="message" {...register("message")} placeholder="Write your message…" />
      </Field>
      <Button type="submit" disabled={isPending} className="w-full sm:w-auto">
        {isPending ? "Sending…" : "Send message"}
        <Send className="h-4 w-4" />
      </Button>
    </form>
  );
}

function Field({
  label,
  htmlFor,
  error,
  optional,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={htmlFor}>
        {label}
        {optional && <span className="ml-1 text-xs text-muted">(optional)</span>}
      </Label>
      {children}
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}
