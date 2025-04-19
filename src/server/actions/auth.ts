'use server';

import { isRedirectError } from 'next/dist/client/components/redirect-error';

import bcrypt from 'bcryptjs';

import { type SignUpSchema, SignUpValidator } from '@/lib/validators';

import { signIn } from '../auth';
import { db } from '../db';
import { users } from '../db/schema';

export const signUpWithCredentials = async (data: SignUpSchema) => {
  try {
    const parsedData = SignUpValidator.safeParse(data).data;
    if (!parsedData) {
      return {
        success: false,
        message: 'Invalid input',
      };
    }

    const { email, password, name } = parsedData;

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.insert(users).values({
      name,
      email,
      password: hashedPassword,
    });

    await signIn('credentials', {
      password,
      email,
      redirect: true,
      redirectTo: '/platform',
    });
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }

    console.log('Credentials sign in error:', error);
    return { success: false };
  }
};
