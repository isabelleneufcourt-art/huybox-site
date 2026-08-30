import Link from "next/link";
import { Inbox, Package, HelpCircle, Newspaper, ExternalLink, Sparkles, CheckCircle2, AlertTriangle } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { seedDemoDataAction } from "@/app/admin/(protected)/actions";

async function getStats() {
  try {
    const [newLeads, totalLeads, boxes, faqItems, blogPosts] = await Promise.all([
      prisma.lead.count({ where: { status: "NEW" } }),
      prisma.lead.count(),
      prisma.boxType.count({ where: { active: true } }),
      prisma.faqItem.count({ where: { published: true } }),
      prisma.blogPost.count({ where: { published: true } }),
    ]);
    const recentLeads = await prisma.lead.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
    });
    return { newLeads, totalLeads, boxes, faqItems, blogPosts, recentLeads };
  } catch {
    return { newLeads: 0, totalLeads: 0, boxes: 0, faqItems: 0, blogPosts: 0, recentLeads: [] };
  }
}

const dateFormatter = new Intl.DateTimeFormat("fr-BE", { day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" });

export default async function AdminDashboardPage({
  searchParams,
}: {
  searchParams: { seed?: string };
}) {
  const stats = await getStats();

  const cards = [
    { label: "Nouveaux messages", value: stats.newLeads, icon: Inbox, href: "/admin/leads" },
    { label: "Box actifs", value: stats.boxes, icon: Package, href: "/admin/box" },
    { label: "Questions FAQ", value: stats.faqItems, icon: HelpCircle, href: "/admin/faq" },
    { label: "Articles publiés", value: stats.blogPosts, icon: Newspaper, href: "/admin/blog" },
  ];

  return (
    <div>
      <h1 className="text-2xl">Tableau de bord</h1>
      <p className="mt-1 text-sm text-neutral-500">Vue d'ensemble de l'activité du site.</p>

      {searchParams.seed === "ok" && (
        <div className="mt-4 flex items-center gap-2 rounded-xl bg-accent/10 px-4 py-3 text-sm font-medium text-accent">
          <CheckCircle2 className="h-4 w-4" /> Contenu de démonstration initialisé avec succès.
        </div>
      )}
      {searchParams.seed === "error" && (
        <div className="mt-4 flex items-center gap-2 rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          <AlertTriangle className="h-4 w-4" /> Échec de l'initialisation — vérifie que la base de
          données est bien migrée (voir README), puis réessaie.
        </div>
      )}

      {stats.boxes === 0 && (
        <div className="mt-4 flex flex-col items-start gap-3 rounded-xl border border-secondary/30 bg-secondary/5 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-secondary" />
            <div>
              <p className="text-sm font-semibold text-neutral-900">Aucun box configuré pour le moment</p>
              <p className="text-sm text-neutral-600">
                Initialise le contenu de démonstration (3 box, FAQ, articles de blog, réglages) en
                un clic — pratique juste après un premier déploiement.
              </p>
            </div>
          </div>
          <form action={seedDemoDataAction}>
            <button
              type="submit"
              className="whitespace-nowrap rounded-xl bg-secondary px-4 py-2.5 text-sm font-semibold text-white hover:brightness-95"
            >
              Initialiser le contenu de démonstration
            </button>
          </form>
        </div>
      )}

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map(({ label, value, icon: Icon, href }) => (
          <Link key={label} href={href} className="rounded-2xl border border-neutral-200 bg-white p-5 hover:shadow-card">
            <Icon className="h-6 w-6 text-primary" aria-hidden />
            <p className="mt-3 text-3xl font-bold text-neutral-900">{value}</p>
            <p className="mt-1 text-sm text-neutral-500">{label}</p>
          </Link>
        ))}
      </div>

      <div className="mt-8 rounded-2xl border border-neutral-200 bg-white p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-heading font-semibold text-neutral-900">Derniers messages reçus</h2>
          <Link href="/admin/leads" className="text-sm font-medium text-primary hover:underline">
            Voir tout
          </Link>
        </div>
        {stats.recentLeads.length === 0 ? (
          <p className="text-sm text-neutral-500">Aucun message pour le moment.</p>
        ) : (
          <ul className="divide-y divide-neutral-100">
            {stats.recentLeads.map((lead) => (
              <li key={lead.id} className="flex items-center justify-between py-3">
                <div>
                  <p className="text-sm font-medium text-neutral-900">
                    {lead.firstName} {lead.lastName}
                  </p>
                  <p className="text-xs text-neutral-500">{lead.email}</p>
                </div>
                <p className="text-xs text-neutral-400">{dateFormatter.format(lead.createdAt)}</p>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="mt-8 rounded-2xl border border-neutral-200 bg-neutral-50 p-6 text-sm text-neutral-600">
        <p className="font-medium text-neutral-800">Statistiques de trafic & clics téléphone</p>
        <p className="mt-1">
          Les visites, pages vues et clics sur le numéro de téléphone sont mesurés via Google
          Analytics 4 (voir{" "}
          <a
            href="https://analytics.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-medium text-primary hover:underline"
          >
            Google Analytics <ExternalLink className="h-3 w-3" />
          </a>
          ). L'identifiant GA4 se configure dans{" "}
          <Link href="/admin/parametres" className="font-medium text-primary hover:underline">
            Paramètres
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
