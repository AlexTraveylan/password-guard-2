// Example of server side component + dynamic router

import { ArticleExample } from "@prisma/client";
import Link from "next/link";
import Icons from "@/components/Icons";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface ArticleCardProps {
  article: ArticleExample;
  getArticles: () => void;
}

export const ArticleExampleCard: React.FC<ArticleCardProps> = ({ article, getArticles }) => {
  async function handleToogle() {
    const response = await fetch("api/crud.example/" + article.id, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ published: !article.published }),
    });

    if (!response.ok) {
      console.error("Create fail");
    } else {
      console.log("Create succes");
      getArticles();
    }
  }

  async function handleDelete() {
    const response = await fetch(`api/crud.example/${article.id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      console.error("Delete fail");
    } else {
      console.log("Delete succes");
      getArticles();
    }
  }

  return (
    <Card className="w-[360px]">
      <CardHeader>
        <CardTitle>
          <Link href={`crud/${article.id}`}>{article.title}</Link>
        </CardTitle>
        <CardDescription>Publié le {new Date(article.createdAt).toLocaleDateString()}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-center">{article.content}</p>
      </CardContent>
      <CardFooter className="flex flex-row justify-between">
        <p
          onClick={handleToogle}
          className={`cursor-pointer px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
            article.published ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
          }`}
        >
          {article.published ? "Publié" : "Non publié"}
        </p>
        <p>
          <Icons.Trash className="cursor-pointer text-red-400" onClick={handleDelete} />
        </p>
      </CardFooter>
    </Card>
  );
};
