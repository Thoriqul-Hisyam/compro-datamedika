import { prisma } from "@/lib/prisma";
import { getCategories } from "@/actions/category";
import { updateArticle } from "@/actions/article";
import ArticleForm from "@/components/admin/article-form";

export default async function EditArticlePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const article = await prisma.article.findUnique({
    where: { id },
    include: { categories: true },
  });

  const categories = await getCategories();

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Edit <span className="text-gradient">Artikel</span>
        </h1>
        <p className="text-slate-500 font-medium">Lakukan perubahan pada artikel yang sudah dipublikasikan.</p>
      </div>
      <ArticleForm
        action={updateArticle.bind(null, article!.id)}
        categories={categories}
        defaultValues={article}
      />
    </div>
  );
}
