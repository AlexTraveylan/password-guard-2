import { articleService } from "@/services/article-example.service";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const article = await articleService.get(params.id);

  return NextResponse.json({ article });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { published } = await request.json();

  const newArticle = await articleService.update(
    params.id,
    undefined,
    undefined,
    published
  );

  return NextResponse.json(newArticle);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const newArticle = await articleService.delete(params.id);

  return NextResponse.json(newArticle);
}
