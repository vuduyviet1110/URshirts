import { NextResponse } from 'next/server';
import { FetchProductById } from '@/app/actions/getStripProductsById';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const product = await FetchProductById(params.id);
    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch product' }, { status: 500 });
  }
}
