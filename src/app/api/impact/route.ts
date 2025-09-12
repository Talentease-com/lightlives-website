import { NextRequest, NextResponse } from 'next/server';
import { readFile, writeFile } from 'fs/promises';
import path from 'path';
import { revalidatePath } from 'next/cache';

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'public', 'impact.json');
    const fileContents = await readFile(filePath, 'utf8');
    const data = JSON.parse(fileContents);
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error reading impact data:', error);
    return NextResponse.json(
      { error: 'Failed to load impact data' },
      { status: 500 }
    );
  }
}


export async function POST(request: NextRequest) {
  try {
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
      if (!item.value || !item.label) {
        return NextResponse.json(
          { error: 'Each impact item must have value and label properties.' },
          { status: 400 }
        );
      }
    }

    // Write to the impact.json file
    const filePath = path.join(process.cwd(), 'public', 'impact.json');
    await writeFile(filePath, JSON.stringify(data, null, 2));

    // Trigger homepage revalidation
    revalidatePath('/');

    return NextResponse.json({ message: 'Impact data updated successfully' });
  } catch (error) {
    console.error('Error updating impact data:', error);
    return NextResponse.json(
      { error: 'Failed to update impact data' },
      { status: 500 }
    );
  }
}