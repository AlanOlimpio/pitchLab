"use client";

import React from "react";
import { ModeToggle } from "./theme-toggle";

export default function Header() {
  return (
    <header className="flex h-16 w-full items-center">
      <div className="mx-auto max-w-7xl flex w-full items-center px-4 md:px-6 justify-end">
        <ModeToggle />
      </div>
    </header>
  );
}
