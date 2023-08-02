import { ArticleExample } from "@prisma/client";
import prisma from "@/prisma-client";

class ArticleExampleService {
  async create(title: string, content: string, published: boolean): Promise<ArticleExample> {
    const article = await prisma.articleExample.create({
      data: {
        title,
        content,
        published,
      },
    });
    return article;
  }

  async get(id: string): Promise<ArticleExample | null> {
    const article = await prisma.articleExample.findUnique({
      where: {
        id,
      },
    });
    return article;
  }

  async getAll(): Promise<ArticleExample[]> {
    const articles = await prisma.articleExample.findMany();
    return articles;
  }

  async update(id: string, title?: string, content?: string, published?: boolean): Promise<ArticleExample | null> {
    const article = await prisma.articleExample.update({
      where: {
        id,
      },
      data: {
        title,
        content,
        published,
      },
    });
    return article;
  }

  async delete(id: string): Promise<ArticleExample | null> {
    const article = await prisma.articleExample.delete({
      where: {
        id,
      },
    });
    return article;
  }
}

export const articleService = new ArticleExampleService();
