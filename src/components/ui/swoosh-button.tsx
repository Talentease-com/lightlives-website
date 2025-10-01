'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import React from 'react';

interface SwooshButtonProps {
  href?: string;
  text?: string;
  children?: React.ReactNode;
  className?: string;
  type?: 'button' | 'submit';
  onClick?: () => void;
}

export default function SwooshButton({
  href,
  text,
  children,
  className,
  type = 'button',
  onClick,
}: SwooshButtonProps) {
  const content = children || text || 'Get Started';

  const buttonContent = (
    <>
      <i className="absolute left-0 top-0 bottom-0 grid w-0 place-items-center transition-all duration-700 ease-in-out bg-secondary group-hover:w-full group-active:scale-95 text-black-500"></i>
      <span className="transition-opacity duration-500 z-10">{content}</span>
    </>
  );

  if (href) {
    return (
      <Button
        type={type}
        asChild
        className={cn('group relative overflow-hidden hover:text-tertiary', className)}
        size="xl"
      >
        <Link href={href}>{buttonContent}</Link>
      </Button>
    );
  }

  return (
    <Button
      type={type}
      onClick={onClick}
      className={cn('group relative overflow-hidden hover:text-tertiary', className)}
      size="xl"
    >
      {buttonContent}
    </Button>
  );
}