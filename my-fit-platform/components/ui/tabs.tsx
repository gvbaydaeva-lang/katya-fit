"use client";

import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";
import { dsTabTrack } from "@/lib/ds-theme";

type TabsContextValue = {
  value: string;
  onValueChange: (value: string) => void;
};

const TabsContext = createContext<TabsContextValue | null>(null);

function useTabsContext() {
  const ctx = useContext(TabsContext);
  if (!ctx) {
    throw new Error("TabsTrigger and TabsContent must be used within Tabs");
  }
  return ctx;
}

type TabsProps = {
  defaultValue: string;
  value?: string;
  onValueChange?: (value: string) => void;
  className?: string;
  children: ReactNode;
};

export function Tabs({
  defaultValue,
  value: controlledValue,
  onValueChange,
  className = "",
  children,
}: TabsProps) {
  const [uncontrolled, setUncontrolled] = useState(defaultValue);
  const value = controlledValue ?? uncontrolled;

  function handleChange(next: string) {
    onValueChange?.(next);
    if (controlledValue === undefined) {
      setUncontrolled(next);
    }
  }

  return (
    <TabsContext.Provider value={{ value, onValueChange: handleChange }}>
      <div className={className}>{children}</div>
    </TabsContext.Provider>
  );
}

type TabsListProps = {
  className?: string;
  children: ReactNode;
};

export function TabsList({ className = "", children }: TabsListProps) {
  return (
    <div role="tablist" className={`inline-flex h-10 items-center gap-1 ${dsTabTrack} ${className}`}>
      {children}
    </div>
  );
}

type TabsTriggerProps = {
  value: string;
  className?: string;
  children: ReactNode;
};

export function TabsTrigger({
  value,
  className = "",
  children,
}: TabsTriggerProps) {
  const { value: active, onValueChange } = useTabsContext();
  const isActive = active === value;

  return (
    <button
      type="button"
      role="tab"
      aria-selected={isActive}
      onClick={() => onValueChange(value)}
      className={`inline-flex items-center justify-center rounded-lg px-4 py-1.5 text-sm font-medium transition-colors duration-200 ${
        isActive
          ? "bg-ds-bg text-ds-heading shadow-sm"
          : "text-ds-muted hover:text-ds-text"
      } ${className}`}
    >
      {children}
    </button>
  );
}

type TabsContentProps = {
  value: string;
  className?: string;
  children: ReactNode;
};

export function TabsContent({
  value,
  className = "",
  children,
}: TabsContentProps) {
  const { value: active } = useTabsContext();
  if (active !== value) return null;

  return (
    <div role="tabpanel" className={`mt-3 ${className}`}>
      {children}
    </div>
  );
}
