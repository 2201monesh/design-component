"use client";

import React, { useState } from "react";

export default function SignupForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    username: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="w-full max-w-sm rounded-lg border border-neutral-200 bg-white shadow-xs font-sans">
      <div className="px-6 pt-6 pb-4 border-b border-neutral-100">
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 rounded-sm bg-neutral-900" />
          <span className="text-xs font-semibold tracking-widest text-neutral-400 uppercase">Acme</span>
        </div>
        <h1 className="mt-3 text-lg font-semibold tracking-tight text-neutral-900">
          Create an account
        </h1>
        <p className="mt-0.5 text-sm text-neutral-500">
          Enter your details below to get started.
        </p>
      </div>

      <div className="px-6 py-4">
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <Field label="Full name" name="name" type="text" placeholder="John Doe" value={form.name} onChange={handleChange} />
          <Field label="Username" name="username" type="text" placeholder="johndoe" value={form.username} onChange={handleChange} />
          <Field label="Email" name="email" type="email" placeholder="john@example.com" value={form.email} onChange={handleChange} />
          <Field label="Password" name="password" type="password" placeholder="••••••••" value={form.password} onChange={handleChange} />
          <Field label="Confirm password" name="confirmPassword" type="password" placeholder="••••••••" value={form.confirmPassword} onChange={handleChange} />

          <button
            type="submit"
            className="mt-0.5 w-full rounded-md bg-neutral-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-neutral-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900"
          >
            Create account
          </button>
        </form>
      </div>

      <div className="border-t border-neutral-100 px-6 py-3">
        <p className="text-center text-sm text-neutral-500">
          Already have an account?{" "}
          <a href="#" className="font-medium text-neutral-900 underline underline-offset-4 hover:text-neutral-600">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
}

function Field({
  label,
  name,
  type,
  placeholder,
  value,
  onChange,
}: {
  label: string;
  name: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name} className="text-xs font-medium text-neutral-600">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="h-8 w-full rounded-md border border-neutral-200 bg-white px-3 text-sm text-neutral-900 placeholder:text-neutral-400 outline-none transition-colors focus:border-neutral-400 focus:ring-2 focus:ring-neutral-200"
      />
    </div>
  );
}
