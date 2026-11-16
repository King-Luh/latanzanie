import React from 'react'
import Link from 'next/link'
import { getTranslations } from 'next-intl/server'
import TopicCard from '@/components/ui/TopicCard'
import '../../../tailgrid.css'
import ClientWrapper from './ClientWrapper'

const ids = ['overview','mental-importance','face-fatigue','manage-stress','maintain-motivation','decision-making','enjoy-experience','guide-tip']

const FR_TITLES: Record<string,string> = {
  overview: "Pourquoi la préparation mentale est importante pour le Kilimandjaro",
  'mental-importance': 'La préparation mentale : un pilier de l’ascension',
  'face-fatigue': 'Faire face à la fatigue et à l’inconfort',
  'manage-stress': "Gérer le stress lié à l'altitude",
  'maintain-motivation': 'Maintenir la motivation sur plusieurs jours',
  'decision-making': 'Prendre de bonnes décisions',
  'enjoy-experience': 'Profiter pleinement de l’expérience',
  'guide-tip': 'Conseil du guide local 🏔️'
}

const FR_SECTIONS: Record<string,string> = {
  overview: `Gravir le Mont Kilimandjaro n'est pas seulement un défi physique, c'est aussi un véritable défi mental. Même les randonneurs en excellente condition physique peuvent se retrouver fatigués, démotivés ou stressés face à l'altitude, aux conditions météo et à l'effort prolongé. La préparation mentale joue donc un rôle clé pour réussir l'ascension et profiter pleinement de l'expérience.`,
  'mental-importance': `La préparation mentale aide à accepter la lenteur, la solitude parfois et les difficultés du terrain. Elle transforme l'effort en une suite d'objectifs progressifs plutôt qu'un mur infranchissable.`,
  'face-fatigue': `Chaque journée sur le Kilimandjaro demande de marcher plusieurs heures sur des sentiers souvent raides. S'entraîner mentalement à gérer la douleur, la lassitude et le froid avant le départ aide à avancer régulièrement.`,
  'manage-stress': `Le manque d'oxygène provoque des symptômes inhabituels qui peuvent créer de l'anxiété. Comprendre que ces sensations sont normales aide à rester calme et concentré.`,
  'maintain-motivation': `La préparation mentale aide à garder une attitude positive, à se concentrer sur chaque étape et à célébrer les petites victoires quotidiennes.`,
  'decision-making': `La fatigue peut altérer le jugement; un esprit préparé sait écouter le corps, reconnaître les signaux d'alerte et consulter le guide quand nécessaire.`,
  'enjoy-experience': `Accepter la lenteur et les difficultés permet d'apprécier davantage les paysages et la camaraderie du groupe.`,
  'guide-tip': `> « La montagne n'est pas conquise par la force seule. La patience, la confiance et la préparation mentale sont les véritables clés pour atteindre le sommet du Kilimandjaro. »`
}

const EN_TITLES: Record<string,string> = {
  overview: "Why mental preparation matters for Kilimanjaro",
  'mental-importance': 'Mental preparation: a pillar of the climb',
  'face-fatigue': 'Facing fatigue and discomfort',
  'manage-stress': 'Managing altitude-related stress',
  'maintain-motivation': 'Maintaining motivation over several days',
  'decision-making': 'Making good decisions',
  'enjoy-experience': 'Enjoying the mountain experience',
  'guide-tip': 'Guide tip 🏔️'
}

const EN_SECTIONS: Record<string,string> = {
  overview: `Climbing Kilimanjaro is as much a mental challenge as a physical one. Even very fit trekkers can feel demotivated or stressed by altitude, weather and prolonged effort. Mental preparation plays a key role in summit success and enjoying the experience.`,
  'mental-importance': `Mental preparation helps accept the slow pace and tough moments, turning the climb into a sequence of manageable goals rather than an insurmountable wall.`,
  'face-fatigue': `Each day requires hours of walking on steep, muddy or rocky trails. Practicing coping with discomfort before departure helps maintain steady progress.`,
  'manage-stress': `Reduced oxygen causes unusual symptoms that can create anxiety; knowing these are normal helps remain calm and focused.`,
  'maintain-motivation': `Mental training helps keep a positive outlook, focus on each stage and celebrate small daily wins.`,
  'decision-making': `Fatigue impairs judgement; a prepared mind listens to the body, recognizes warning signs and consults the guide when needed.`,
  'enjoy-experience': `Accepting the slow pace and challenges increases appreciation of the landscape and group camaraderie.`,
  'guide-tip': `> "Patience, confidence and mental preparation are the true keys to reaching Kilimanjaro's summit."`
}

function renderContent(content: string, locale: string){
  // Add markers for terms we want to link
  const processedContent = content
    .replace(/\bphysique\b/g, '###PHYSIQUE_LINK###')
    .replace(/\bcondition physique\b/g, '###CONDITION_PHYSIQUE_LINK###')
    .replace(/\baltitude\b/g, '###ALTITUDE_LINK###');
  
  return processedContent.split('\n\n').map((b,i)=> {
    if (b.trim().startsWith('>')) {
      // Process blockquotes
      let processedBlock = b.replace(/^>\s?/, '');
      
      // Convert our custom markers to links
      processedBlock = processedBlock
        .replace(/###PHYSIQUE_LINK###/g, `<a href="/${locale}/travel-blogs/niveau-physique-kilimandjaro" className="text-[#00A896] hover:text-[#008576] font-medium font-medium">physique</a>`)
        .replace(/###CONDITION_PHYSIQUE_LINK###/g, `<a href="/${locale}/travel-blogs/niveau-physique-kilimandjaro" className="text-[#00A896] hover:text-[#008576] font-medium font-medium">condition physique</a>`)
        .replace(/###ALTITUDE_LINK###/g, `<a href="/${locale}/travel-blogs/preparer-son-corps-altitude-kilimandjaro" className="text-[#00A896] hover:text-[#008576] font-medium font-medium">altitude</a>`);
      
      return <blockquote key={i} className="pl-4 border-l-4 italic text-black" dangerouslySetInnerHTML={{__html: processedBlock}}></blockquote>;
    } else {
      // Process paragraphs
      let processedParagraph = b;
      
      // Convert our custom markers to links
      processedParagraph = processedParagraph
        .replace(/###PHYSIQUE_LINK###/g, `<a href="/${locale}/travel-blogs/niveau-physique-kilimandjaro" className="text-[#00A896] hover:text-[#008576] font-medium font-medium">physique</a>`)
        .replace(/###CONDITION_PHYSIQUE_LINK###/g, `<a href="/${locale}/travel-blogs/niveau-physique-kilimandjaro" className="text-[#00A896] hover:text-[#008576] font-medium font-medium">condition physique</a>`)
        .replace(/###ALTITUDE_LINK###/g, `<a href="/${locale}/travel-blogs/preparer-son-corps-altitude-kilimandjaro" className="text-[#00A896] hover:text-[#008576] font-medium font-medium">altitude</a>`);
      
      return <p key={i} className="my-4 text-black" dangerouslySetInnerHTML={{__html: processedParagraph}}></p>;
    }
  });
}

export default async function MentalPrepPage({ params }: { params: Promise<{ locale?: string }> }) {
  const awaitedParams = await params;
  const locale = awaitedParams?.locale || 'fr';
  const t = await getTranslations('BlogPosts.preparation-mentale-kilimandjaro');
  
  const sections = ids.map((id) => ({
    id,
    title: locale === 'fr' ? FR_TITLES[id] || EN_TITLES[id] : EN_TITLES[id] || FR_TITLES[id],
    content: locale === 'fr' ? FR_SECTIONS[id] || EN_SECTIONS[id] : EN_SECTIONS[id] || FR_SECTIONS[id]
  }));

  return (
    <div className="min-h-screen bg-white">
      <section className="relative hero-wavy bg-cover bg-center text-white py-20 pt-32 md:pt-40" style={{ backgroundImage: "url('/images/preparation-hero.jpg')" }}>
        <div className="absolute inset-0 -z-10">
          <img src="/images/preparation-hero.jpg" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="container mx-auto px-4">
          <Link href={`/${locale}/travel-blogs/climb-kilimanjaro#all-topics`} className="text-white mb-6 inline-flex items-center text-sm font-medium">← {locale === 'fr' ? 'Retour aux blogs' : 'Back to blogs'}</Link>
        </div>
      </section>

      <ClientWrapper 
        locale={locale}
        sections={sections}
        FR_TITLES={FR_TITLES}
        EN_TITLES={EN_TITLES}
        FR_SECTIONS={FR_SECTIONS}
        EN_SECTIONS={EN_SECTIONS}
      />

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{locale === 'fr' ? 'Prêt pour une aventure ?' : 'Ready for an adventure?'}</h2>
            <p className="text-gray-600 text-lg">Explorez nos meilleures routes du Kilimandjaro</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Trip cards similar to other pages */}
            <div className="bg-gray-50 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300">
              <div className="h-40 bg-cover bg-center" style={{ backgroundImage: "url('/images/marangu-route.jpg')" }}></div>
              <div className="p-6">
                <h3 className="text-xl font-bold">Marangu Route</h3>
                <p className="text-gray-700 mb-4">Conquérir le Toit de l'Afrique : L'Ascension du Kilimandjaro par la Route Marangu en 5 Jours</p>
                <Link href={`/${locale}/trips/marangu-route`} className="bg-[#00A896] hover:bg-[#008576] text-white px-6 py-2 rounded-lg font-medium">En savoir plus</Link>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300">
              <div className="h-40 bg-cover bg-center" style={{ backgroundImage: "url('/images/lemosho-route.jpg')" }}></div>
              <div className="p-6">
                <h3 className="text-xl font-bold">Lemosho Route</h3>
                <p className="text-gray-700 mb-4">L'Aventure Panoramique : Itinéraire Lemosho en 7 Jours</p>
                <Link href={`/${locale}/trips/lemosho-route`} className="bg-[#00A896] hover:bg-[#008576] text-white px-6 py-2 rounded-lg font-medium">En savoir plus</Link>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300">
              <div className="h-56 bg-cover bg-center" style={{ backgroundImage: "url('/images/kilimanjaro-umbwe.jpg')" }}></div>
              <div className="p-6">
                <h3 className="text-xl font-bold">Umbwe Route</h3>
                <p className="text-gray-700 mb-4">L'Itinéraire Umbwe : Le Défi Vertical du Kilimandjaro (6 Jours)</p>
                <Link href={`/${locale}/trips/umbwe-route`} className="bg-[#00A896] hover:bg-[#008576] text-white px-6 py-2 rounded-lg font-medium">En savoir plus</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}