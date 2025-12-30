// components/news/NewsCard.tsx
import Image from "next/image";

export const NewsCard = ({ article }: { article: any }) => (
  <div className="group bg-white rounded-[2rem] border border-gray-100 overflow-hidden hover:shadow-xl transition-all">
    <div className="relative h-48">
      <Image
        src={article.image || "/placeholder-news.jpg"}
        alt={article.title}
        fill
        className="object-cover group-hover:scale-105 transition-transform"
      />
    </div>
    <div className="p-6">
      <span className="text-primary text-xs font-bold uppercase tracking-widest">
        News Update
      </span>
      <h3 className="text-lg font-bold mt-2 line-clamp-2">{article.title}</h3>
      <p className="text-gray-500 text-sm mt-2 line-clamp-2">
        {article.excerpt}
      </p>
      <a
        href={article.link}
        target="_blank"
        className="inline-block mt-4 text-sm font-bold border-b-2 border-primary"
      >
        Read More
      </a>
    </div>
  </div>
);
