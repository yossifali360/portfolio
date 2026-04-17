import { PortfolioCard } from '@/types/portfolio'
import Image from 'next/image'

type ProjectImageProps = {
  project: PortfolioCard
}

export default function ProjectImage({ project }: ProjectImageProps) {
  return (
    <div className={'flex min-h-0 flex-1 flex-col'}>
      {project?.image ? (
        <div className={`relative mb-0 w-full min-h-48 flex-1 overflow-hidden rounded-none border-b border-white/10 md:min-h-56`}>
          <Image
            src={project?.image}
            alt={project?.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition duration-300 group-hover:scale-[1.02]"
          />
        </div>
      ) : (
        <div
          className={`
            relative mb-5 flex aspect-video items-center justify-center overflow-hidden rounded-xl border border-white/15 bg-linear-to-br from-indigo-500/35 via-violet-500/20 to-cyan-500/35
          `}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.22),transparent_50%),radial-gradient(circle_at_80%_80%,rgba(255,255,255,0.1),transparent_45%)]" />
          <div className="relative z-10 flex h-20 w-20 items-center justify-center rounded-2xl border border-white/30 bg-black/30 text-3xl font-semibold tracking-wide text-white shadow-xl">
            {project?.title?.slice(0, 1).toUpperCase()}
          </div>
        </div>
      )}
    </div>
  )
}
