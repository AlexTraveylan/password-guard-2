import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { articleService } from "@/services/article-example.service";

async function getArticleExemple(params: { id: string }) {
  const articleExemple = await articleService.get(params.id);

  if (!articleExemple) {
    throw new Error("failed to get article");
  }

  return articleExemple;
}

export default async function ArticlePage({ params }: { params: { id: string } }) {
  const article = await getArticleExemple(params);

  return (
    <Card className="w-[360px]">
      <CardHeader>
        <CardTitle>{article.title}</CardTitle>
        <CardDescription>Publié le {new Date(article.createdAt).toLocaleDateString()}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-center">{article.content}</p>
      </CardContent>
      <CardFooter className="flex flex-row justify-between">
        <p
          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
            article.published ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
          }`}
        >
          {article.published ? "Publié" : "Non publié"}
        </p>
      </CardFooter>
    </Card>
  );
}
