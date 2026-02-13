// src/app/api/products/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { CreateProductDTO } from '@/types';

const API_BASE_URL = 'https://api.escuelajs.co/api/v1';

// GET - Fetch all products
export async function GET() {
  try {
    const response = await fetch(`${API_BASE_URL}/products`);
    
    if (!response.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch products' },
        { status: 500 }
      );
    }
    
    const products = await response.json();
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST - Create new product
export async function POST(request: NextRequest) {
  try {
    const body: CreateProductDTO = await request.json();
    
    // Validation
    if (!body.title || !body.price || !body.description || !body.categoryId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    const response = await fetch(`${API_BASE_URL}/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: body.title,
        price: body.price,
        description: body.description,
        categoryId: body.categoryId,
        images: body.images || ['https://placehold.co/600x400'],
      }),
    });
    
    if (!response.ok) {
      return NextResponse.json(
        { error: 'Failed to create product' },
        { status: 500 }
      );
    }
    
    const newProduct = await response.json();
    
    // Trigger revalidation untuk ISR
    try {
      await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/revalidate?path=/&secret=${process.env.REVALIDATE_TOKEN || 'revoshop-secret'}`);
    } catch (revalidateError) {
      console.log('Revalidation skipped in development');
    }
    
    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}