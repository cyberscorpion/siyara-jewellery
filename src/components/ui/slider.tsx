"use client"

import { ComponentProps, useMemo } from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"

import { cn } from "@/lib/utils"

function Slider({
  className,
  defaultValue,
  value,
  min = 0,
  max = 100,
  ...props
}: ComponentProps<typeof SliderPrimitive.Root>) {
  const _values = useMemo(
    () =>
      Array.isArray(value)
        ? value
        : Array.isArray(defaultValue)
          ? defaultValue
          : [min, max],
    [value, defaultValue, min, max]
  )

  return (
    <SliderPrimitive.Root
      data-slot="slider"
      defaultValue={defaultValue}
      value={value}
      min={min}
      max={max}
      className={cn(
        "relative flex w-full touch-none items-center select-none cursor-pointer py-4",
        "data-[disabled]:opacity-50 data-[disabled]:cursor-not-allowed",
        "data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-44 data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col",
        className
      )}
      {...props}
    >
      <SliderPrimitive.Track
        data-slot="slider-track"
        className={cn(
          "bg-muted/80 relative grow overflow-hidden rounded-full",
          "data-[orientation=horizontal]:h-2 data-[orientation=horizontal]:w-full",
          "data-[orientation=vertical]:h-full data-[orientation=vertical]:w-2",
          "transition-colors hover:bg-muted"
        )}
      >
        <SliderPrimitive.Range
          data-slot="slider-range"
          className={cn(
            "bg-amber-600 absolute transition-colors",
            "data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full"
          )}
        />
      </SliderPrimitive.Track>
      {Array.from({ length: _values.length }, (_, index) => (
        <SliderPrimitive.Thumb
          data-slot="slider-thumb"
          key={index}
          className={cn(
            "border-2 border-amber-600 bg-background shadow-lg",
            "block size-5 shrink-0 rounded-full cursor-grab active:cursor-grabbing",
            "transition-all duration-150 ease-out",
            "hover:size-6 hover:shadow-xl hover:border-amber-500",
            "focus-visible:size-6 focus-visible:shadow-xl focus-visible:border-amber-500",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-600/20 focus-visible:ring-offset-2",
            "active:size-6 active:shadow-xl active:border-amber-500",
            "disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed",
            "touch-manipulation" // Better touch handling on mobile
          )}
        />
      ))}
    </SliderPrimitive.Root>
  )
}

export { Slider }
