"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Check, ArrowRight, ArrowLeft, PartyPopper } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useProgrammes } from "@/lib/queries/useProgrammes";
import { useSubmitAdmission } from "@/lib/queries/useMisc";
import { admissionSchema, type AdmissionFormValues } from "@/lib/validations";
import { cn } from "@/lib/utils";

const STEPS = ["Personal Info", "Academic Info", "Documents & Review"];

const STEP_FIELDS: (keyof AdmissionFormValues)[][] = [
  ["applicantName", "email", "phone", "dob", "address"],
  ["programmeId", "category", "keamRank", "plusTwoPercent"],
  [],
];

export function AdmissionForm() {
  const [step, setStep] = useState(0);
  const [appNumber, setAppNumber] = useState<string | null>(null);
  const { data: programmes } = useProgrammes();
  const { mutateAsync, isPending } = useSubmitAdmission();

  const {
    register,
    handleSubmit,
    trigger,
    watch,
    formState: { errors },
  } = useForm<AdmissionFormValues>({
    resolver: zodResolver(admissionSchema),
    mode: "onTouched",
    defaultValues: { category: "GENERAL" },
  });

  const next = async () => {
    const valid = await trigger(STEP_FIELDS[step]);
    if (valid) setStep((s) => Math.min(s + 1, STEPS.length - 1));
  };
  const prev = () => setStep((s) => Math.max(s - 1, 0));

  const onSubmit = async (values: AdmissionFormValues) => {
    try {
      const res = await mutateAsync({
        applicantName: values.applicantName,
        email: values.email,
        phone: values.phone,
        dob: values.dob,
        address: values.address,
        programmeId: values.programmeId,
        category: values.category,
        keamRank: values.keamRank === "" ? undefined : values.keamRank,
        plusTwoPercent:
          values.plusTwoPercent === "" ? undefined : values.plusTwoPercent,
      });
      setAppNumber(res.data.applicationNumber);
      toast.success("Application submitted successfully!");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Submission failed");
    }
  };

  if (appNumber) {
    return (
      <div className="rounded-2xl bg-white p-8 text-center shadow-card ring-1 ring-border/60">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-secondary/15 text-secondary-dark">
          <PartyPopper className="h-8 w-8" />
        </div>
        <h2 className="mt-4 font-display text-2xl font-bold text-primary">
          Application Received!
        </h2>
        <p className="mt-2 text-muted">
          Thank you for applying to JCET. Please save your application number.
        </p>
        <p className="mt-4 inline-block rounded-xl bg-surface px-6 py-3 font-display text-xl font-bold tracking-wide text-primary">
          {appNumber}
        </p>
        <p className="mt-4 text-sm text-muted">
          Our admission team will contact you shortly. For queries, call{" "}
          <span className="font-medium text-primary">+91 96057 71555</span>.
        </p>
      </div>
    );
  }

  const values = watch();

  return (
    <div className="rounded-2xl bg-white p-6 shadow-card ring-1 ring-border/60 sm:p-8">
      {/* Stepper */}
      <ol className="mb-8 flex items-center">
        {STEPS.map((label, i) => (
          <li key={label} className="flex flex-1 items-center last:flex-none">
            <div className="flex flex-col items-center">
              <span
                className={cn(
                  "flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold transition-colors",
                  i < step
                    ? "bg-secondary text-secondary-foreground"
                    : i === step
                    ? "bg-primary text-white"
                    : "bg-surface text-muted"
                )}
              >
                {i < step ? <Check className="h-4 w-4" /> : i + 1}
              </span>
              <span className="mt-1.5 hidden text-xs font-medium text-muted sm:block">
                {label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div
                className={cn(
                  "mx-2 h-0.5 flex-1 rounded transition-colors",
                  i < step ? "bg-secondary" : "bg-border"
                )}
              />
            )}
          </li>
        ))}
      </ol>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        {/* Step 1 */}
        {step === 0 && (
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Full Name" error={errors.applicantName?.message} className="sm:col-span-2">
              <Input {...register("applicantName")} placeholder="As per certificates" />
            </Field>
            <Field label="Email" error={errors.email?.message}>
              <Input type="email" {...register("email")} placeholder="you@email.com" />
            </Field>
            <Field label="Phone" error={errors.phone?.message}>
              <Input {...register("phone")} placeholder="+91 …" />
            </Field>
            <Field label="Date of Birth" error={errors.dob?.message}>
              <Input type="date" {...register("dob")} />
            </Field>
            <Field label="Address" error={errors.address?.message} className="sm:col-span-2">
              <Textarea {...register("address")} placeholder="Full postal address" />
            </Field>
          </div>
        )}

        {/* Step 2 */}
        {step === 1 && (
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Programme" error={errors.programmeId?.message} className="sm:col-span-2">
              <Select {...register("programmeId")} defaultValue="">
                <option value="" disabled>
                  Select a programme
                </option>
                {programmes?.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} ({p.degree})
                  </option>
                ))}
              </Select>
            </Field>
            <Field label="Category" error={errors.category?.message}>
              <Select {...register("category")}>
                {["GENERAL", "OBC", "SC", "ST", "EWS"].map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </Select>
            </Field>
            <Field label="KEAM Rank" error={errors.keamRank?.message} optional>
              <Input type="number" {...register("keamRank")} placeholder="e.g. 4521" />
            </Field>
            <Field label="+2 Percentage" error={errors.plusTwoPercent?.message} optional>
              <Input
                type="number"
                step="0.01"
                {...register("plusTwoPercent")}
                placeholder="e.g. 89.5"
              />
            </Field>
          </div>
        )}

        {/* Step 3 — documents (client-side note) + review */}
        {step === 2 && (
          <div className="space-y-6">
            <div>
              <h3 className="font-display text-lg font-semibold text-primary">
                Documents
              </h3>
              <p className="mt-1 text-sm text-muted">
                Keep these ready (PDF, max 5MB each). You can upload them during
                verification at the campus or admission centre.
              </p>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                {[
                  "10th Certificate",
                  "12th Certificate",
                  "Transfer Certificate",
                  "ID Proof (Aadhaar)",
                ].map((doc) => (
                  <label
                    key={doc}
                    className="flex cursor-pointer items-center justify-between rounded-xl border border-dashed border-border bg-surface px-4 py-3 text-sm text-muted hover:border-secondary"
                  >
                    <span>{doc}</span>
                    <input type="file" accept="application/pdf" className="hidden" />
                    <span className="text-xs font-medium text-secondary-dark">
                      Choose file
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div className="rounded-xl bg-surface p-5">
              <h3 className="font-display text-base font-semibold text-primary">
                Review your details
              </h3>
              <dl className="mt-3 grid gap-x-6 gap-y-2 text-sm sm:grid-cols-2">
                <Review label="Name" value={values.applicantName} />
                <Review label="Email" value={values.email} />
                <Review label="Phone" value={values.phone} />
                <Review label="Date of Birth" value={values.dob} />
                <Review
                  label="Programme"
                  value={
                    programmes?.find((p) => p.id === values.programmeId)?.name
                  }
                />
                <Review label="Category" value={values.category} />
              </dl>
            </div>
          </div>
        )}

        {/* Nav buttons */}
        <div className="mt-8 flex items-center justify-between">
          <Button
            type="button"
            variant="ghost"
            onClick={prev}
            disabled={step === 0}
            className={step === 0 ? "invisible" : ""}
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </Button>

          {step < STEPS.length - 1 ? (
            <Button type="button" onClick={next}>
              Next <ArrowRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button type="submit" variant="gold" disabled={isPending}>
              {isPending ? "Submitting…" : "Submit Application"}
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}

function Field({
  label,
  error,
  optional,
  className,
  children,
}: {
  label: string;
  error?: string;
  optional?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("space-y-1.5", className)}>
      <Label>
        {label}
        {optional && <span className="ml-1 text-xs text-muted">(optional)</span>}
      </Label>
      {children}
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}

function Review({ label, value }: { label: string; value?: string }) {
  return (
    <div className="flex justify-between gap-2 border-b border-border/60 py-1">
      <dt className="text-muted">{label}</dt>
      <dd className="text-right font-medium text-primary">{value || "—"}</dd>
    </div>
  );
}
