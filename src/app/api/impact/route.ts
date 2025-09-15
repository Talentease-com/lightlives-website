import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  const supabase = await createClient();
  try {
    const { data, error } = await supabase
      .from("impact")
      .select(
        "value, format, label, description, decimals, usePointer, icon"
      );

    if (error) {
      throw error;
    }

    return NextResponse.json(data);
  } catch (error: unknown) {
    console.error('Error reading impact data:', error);
    return NextResponse.json(
      { error: 'Failed to load impact data' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const supabase = await createClient();

  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (
      !user ||
      !Array.isArray(user.user_metadata?.roles) ||
      !user.user_metadata.roles.includes("website_admin")
    ) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await request.json();

    // Validate that the data is an array
    if (!Array.isArray(data)) {
      return NextResponse.json(
        { error: 'Invalid data format. Expected an array.' },
        { status: 400 }
      );
    }

    // Validate each impact item
    for (const item of data) {
      if (
        !item.value ||
        !item.label ||
        !item.format ||
        !item.description ||
        !item.icon
      ) {
        return NextResponse.json(
          {
            error:
              "Each impact item must have value, label, format, description, and icon properties.",
          },
          { status: 400 }
        );
      }
    }

    // Clear existing data
    const { error: deleteError } = await supabase.from('impact').delete().neq('id', -1); // Deletes all rows
    if (deleteError) throw deleteError;

    // Insert new data
    const { error: insertError } = await supabase.from('impact').insert(data);
    if (insertError) throw insertError;

    // Trigger homepage revalidation
    revalidatePath('/');

    return NextResponse.json({ message: 'Impact data updated successfully' });
  } catch (error: unknown) {
    console.error('Error updating impact data:', error);
    return NextResponse.json(
      { error: 'Failed to update impact data' },
      { status: 500 }
    );
  }
}