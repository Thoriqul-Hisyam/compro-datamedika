import { getCategories } from "@/actions/category";
import { createArticle } from "@/actions/article";
import ArticleForm from "@/components/admin/article-form";

export default async function NewArticlePage() {
  const categories = await getCategories();

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Tulis <span className="text-gradient">Artikel Baru</span>
        </h1>
        <p className="text-slate-500 font-medium">Buat konten baru yang informatif bagi pembaca.</p>
      </div>
      <ArticleForm action={createArticle} categories={categories} />
    </div>
  );
}
