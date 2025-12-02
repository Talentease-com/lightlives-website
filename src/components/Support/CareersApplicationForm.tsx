'use client';

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { TurnstileWidget } from "@/components/ui/TurnstileWidget";
import { useTurnstile } from "@/hooks/useTurnstile";
import { cn } from "@/lib/utils";

interface CareersApplicationFormValues {
  name: string;
  email: string;
  mobile: string;
  comment: string;
  resume: FileList;
}

type SubmissionState = "idle" | "submitting" | "success" | "error";

const inputBaseStyles =
  "w-full border border-foreground/20 bg-background/60 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 disabled:cursor-not-allowed disabled:opacity-70";

export function CareersApplicationForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CareersApplicationFormValues>();
  const [submissionState, setSubmissionState] = useState<SubmissionState>("idle");
  const [message, setMessage] = useState<string>("");

  const {
    turnstileToken,
    turnstileRef,
    handleTurnstileSuccess,
    handleTurnstileError,
    handleTurnstileExpire,
    resetTurnstile,
    isTurnstileValid,
  } = useTurnstile({
    onError: (errorMessage) => {
      setSubmissionState("error");
      setMessage(errorMessage);
    },
  });

  const onSubmit = handleSubmit(async (values) => {
    if (!isTurnstileValid()) {
      setSubmissionState("error");
      setMessage("Please complete the security verification.");
      return;
    }

    try {
      setSubmissionState("submitting");
      setMessage("");

      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("email", values.email);
      formData.append("mobile", values.mobile);
      formData.append("comment", values.comment);
      formData.append("turnstileToken", turnstileToken!);
      const resumeFile = values.resume && values.resume[0];
      if (resumeFile) {
        formData.append("resume", resumeFile, resumeFile.name);
      }

      // Submit to Payload CMS API
      const response = await fetch('/api/careers/apply', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Submission failed');
      }

      setSubmissionState("success");
      setMessage(result.message || "Thanks! We've received your application and will be in touch within 5-7 business days.");
      reset();
      resetTurnstile();
    } catch (error) {
      console.error("Career application submission failed", error);
      setSubmissionState("error");

      if (error instanceof Error) {
        setMessage(error.message);
      } else {
        setMessage("Something went wrong while submitting. Please try again.");
      }
      resetTurnstile();
    } finally {
      setTimeout(() => {
        setSubmissionState("idle");
      }, 5000); // Show message for longer since it's more important
    }
  });

  const isSubmitting = submissionState === "submitting";

  return (
    <form className="space-y-6" onSubmit={onSubmit} noValidate>
      <div className="space-y-2">
        <label htmlFor="name" className="text-sm font-medium text-foreground">
          Full name <span className="text-red-500">*</span>
        </label>
        <input
          id="name"
          type="text"
          autoComplete="name"
          className={inputBaseStyles}
          placeholder="Enter your name"
          {...register("name", { required: "Please enter your name." })}
        />
        {errors.name && (
          <p className="text-sm text-destructive">{errors.name.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium text-foreground">
          Email address <span className="text-red-500">*</span>
        </label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          className={inputBaseStyles}
          placeholder="your@email.com"
          {...register("email", {
            required: "Please enter an email address.",
            pattern: {
              value: /[^\s@]+@[^\s@]+\.[^\s@]+/,
              message: "Please enter a valid email address.",
            },
          })}
        />
        {errors.email && (
          <p className="text-sm text-destructive">{errors.email.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="mobile" className="text-sm font-medium text-foreground">
          Mobile number <span className="text-red-500">*</span>
        </label>
        <input
          id="mobile"
          type="tel"
          autoComplete="tel"
          className={inputBaseStyles}
          placeholder="Include country code if outside India"
          {...register("mobile", {
            required: "Please share a contact number.",
            minLength: {
              value: 8,
              message: "Please enter a valid phone number.",
            },
          })}
        />
        {errors.mobile && (
          <p className="text-sm text-destructive">{errors.mobile.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="comment" className="text-sm font-medium text-foreground">
          Why do you think you&apos;d be a good fit for Light Lives? <span className="text-red-500">*</span>
        </label>
        <textarea
          id="comment"
          rows={4}
          className={inputBaseStyles}
          placeholder="Tell us why you'd like to join our team and what you can bring to Light Lives..."
          {...register("comment", {
            required: "Please share why you'd be a good fit.",
            minLength: {
              value: 50,
              message: "Please provide at least 50 characters.",
            },
            maxLength: {
              value: 1000,
              message: "Please keep your response under 1000 characters.",
            },
          })}
        />
        {errors.comment && (
          <p className="text-sm text-destructive">{errors.comment.message}</p>
        )}
        <p className="text-xs text-muted-foreground">
          Minimum 50 characters, maximum 1000 characters.
        </p>
      </div>

      <div className="space-y-2">
        <label htmlFor="resume" className="text-sm font-medium text-foreground">
          Resume / CV <span className="text-red-500">*</span>
        </label>
        <input
          id="resume"
          type="file"
          accept=".pdf,.doc,.docx"
          className={cn(
            inputBaseStyles,
            "file:mr-4 file:border-0 file:bg-primary file:px-4 file:py-2 file:text-primary-foreground file:uppercase file:tracking-wide"
          )}
          {...register("resume", {
            validate: (files) => {
              if (!files || files.length === 0) {
                return "Please attach your resume.";
              }
              const file = files[0];
              if (file.size > 5 * 1024 * 1024) {
                return "Please upload a file smaller than 5MB.";
              }
              return true;
            },
          })}
        />
        {errors.resume && (
          <p className="text-sm text-destructive">{errors.resume.message}</p>
        )}
        <p className="text-xs text-muted-foreground">
          Accepted formats: PDF, DOC, DOCX (max 5MB).
        </p>
      </div>

      {/* Turnstile Widget */}
      <TurnstileWidget
        ref={turnstileRef}
        action="career-application"
        onSuccess={handleTurnstileSuccess}
        onError={handleTurnstileError}
        onExpire={handleTurnstileExpire}
      />

      {message && (
        <div
          className={cn(
            "border px-4 py-3 text-sm",
            submissionState === "success"
              ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-400"
              : submissionState === "error"
                ? "border-destructive/40 bg-destructive/10 text-destructive"
                : "border-primary/40 bg-primary/10 text-primary"
          )}
        >
          {message}
        </div>
      )}

      <Button
        type="submit"
        className="w-full uppercase tracking-wide disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={isSubmitting || !isTurnstileValid()}
      >
        {isSubmitting ? "Submitting..." : "Submit Application"}
      </Button>
    </form>
  );
}
