"use client";
import { ArticleExampleCard } from "@/components/CRUD.example/article_card.example";
import { CreateExampleForm } from "@/components/CRUD.example/create_form.example";
import { ArticleExample } from "@prisma/client";
import { useEffect, useState } from "react";
import { ArticleExampleSchema } from "@/zod/schema.example";

export default function Articles() {
  const [articlesExample, setArticlesExample] = useState<ArticleExample[]>([]);

  async function getArticles() {
    const response = await fetch("api/crud.example");
    if (response.ok) {
      const rawArticles = await response.json();
      const articles = ArticleExampleSchema.array().parse(rawArticles.articles);
      setArticlesExample(articles);
    }
  }

  useEffect(() => {
    getArticles();
  }, []);

  return (
    <>
      <div className="flex items-center justify-center py-5">
        <CreateExampleForm getArticles={getArticles} />
      </div>
      <div className="flex flex-row flex-wrap gap-5 items-center justify-center py-5">
        {articlesExample.map((article) => (
          <div key={article.id}>
            <ArticleExampleCard article={article} getArticles={getArticles} />
          </div>
        ))}
      </div>
    </>
  );
}
