import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const hostname = req.headers.get('host');

  if (hostname?.startsWith('motolog.')) {
    return NextResponse.rewrite(new URL('/motolog', req.url));
  }
}
