'use client';
import Image from 'next/image';
import RegistrationModel from './_components/registrationModel';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import AuthLayout from './_layout/authLayout';
import Hero from './_components/Hero';

export default function Home() {
  return (
    <AuthLayout>
      <Hero />
    </AuthLayout>
  );
}
