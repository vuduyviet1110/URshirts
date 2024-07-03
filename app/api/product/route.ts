import { NextRequest, NextResponse } from 'next/server';
import { FetchProducts } from '@/app/actions/getStripProducts';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const q = searchParams.get('q');
    const products = await FetchProducts();
    const filteredProducts = products
      .filter(product => product.name.toLowerCase().includes(q?.toLowerCase() || ''))
      .filter(product => product.metadata?.custome !== 'true');
    return NextResponse.json(filteredProducts, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch product' }, { status: 500 });
  }
}
