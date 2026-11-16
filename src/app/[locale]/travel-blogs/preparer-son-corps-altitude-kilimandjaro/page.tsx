import Link from 'next/link'
import '../../../tailgrid.css'
import { getTranslations } from 'next-intl/server'
import Image from 'next/image'
import AuthorMeta from '@/components/ui/AuthorMeta'
import TOC from '@/components/ui/TOC'
import TopicCard from '@/components/ui/TopicCard'
import FAQ from '@/components/ui/faq'
import RelatedArticles from '@/components/ui/RelatedArticles'
import ClientWrapper from './ClientWrapper'

// Helper function to process itinerary links in text
function processItineraryLinks(text: string, keyPrefix: string = ''): string {
  const parts = text.split('###ITINERAIRE_LINK###');
  
  if (parts.length <= 1) {
    return text; // Return the original string if no itinerary found
  }
  
  // Join the parts with a temporary placeholder that won't conflict with other markers
  let result = '';
  for (let j = 0; j < parts.length; j++) {
    result += parts[j];
    if (j < parts.length - 1) {
      // Add a temporary marker that we'll replace later with the actual link
      result += `###ITINERAIRE_TEMP_LINK_${keyPrefix}${j}###`;
    }
  }
  
  return result;
}

// Helper function to convert temporary itinerary markers to actual links
function convertItineraryTempMarkersToLinks(text: string | (string | JSX.Element)[]): (string | JSX.Element)[] {
  if (typeof text === 'string') {
    // If it's a string, convert any temporary markers to links
    const parts = text.split(/(###ITINERAIRE_TEMP_LINK_[^#]+###)/);
    const result: (string | JSX.Element)[] = [];
    
    for (const part of parts) {
      if (part.startsWith('###ITINERAIRE_TEMP_LINK_') && part.endsWith('###')) {
        // Extract the key prefix from the temporary marker
        const keyMatch = part.match(/###ITINERAIRE_TEMP_LINK_(.+?)###/);
        const keyPrefix = keyMatch ? keyMatch[1] : 'default-';
        
        result.push(
          <Link 
            key={`itinerary-${keyPrefix}`} 
            href="http://localhost:3000/fr/trips/climb-kilimanjaro" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-[#00A896] hover:text-[#008576] font-medium font-medium"
          >
            l'itinéraire
          </Link>
        );
      } else {
        result.push(part);
      }
    }
    return result;
  } else {
    // If it's already an array, process each element
    const result: (string | JSX.Element)[] = [];
    for (const element of text) {
      if (typeof element === 'string') {
        const converted = convertItineraryTempMarkersToLinks(element);
        result.push(...converted);
      } else {
        result.push(element);
      }
    }
    return result;
  }
}

const ids = [
  'overview',
  'how-body-reacts',
  'slow-pace',
  'choose-itinerary',
  'hydrate-eat',
  'listen-guide',
  'guide-tip'
];

const FR_TITLES: Record<string, string> = {
  overview: "Comment préparer son corps à l’altitude du Kilimandjaro ?",
  'how-body-reacts': 'Comprendre comment le corps réagit à l’altitude',
  'slow-pace': 'Adopter un rythme lent et régulier',
  'choose-itinerary': "Choisir un itinéraire favorable à l’acclimatation",
  'hydrate-eat': 'Bien s’hydrater et bien s’alimenter',
  'listen-guide': "Écouter son corps et communiquer avec le guide",
  'guide-tip': "Conseil du guide local 🏔️"
};

const FR_SECTIONS: Record<string, string> = {
  overview: `L’altitude est le principal défi lors de l’ascension du Kilimandjaro et le facteur qui influence le plus la réussite du sommet. À partir de 3 000 mètres, la quantité d’oxygène dans l’air diminue progressivement. Le corps est alors obligé de s’adapter à ce manque d’oxygène pour continuer à fonctionner normalement.

Contrairement à la condition physique, l’altitude ne se « travaille » pas en salle de sport. On peut être très sportif et malgré tout rencontrer des difficultés en altitude. La réussite sur le Kilimandjaro repose donc sur une bonne acclimatation, un rythme adapté, une hydratation rigoureuse et un comportement responsable en montagne.

En tant que guide local, je constate chaque saison que les personnes qui respectent l’altitude ont beaucoup plus de chances d’atteindre le sommet que celles qui la sous-estiment.`,
  
  'how-body-reacts': `En altitude, le corps reçoit moins d'oxygène à chaque respiration. Pour compenser, le cœur bat plus vite et la respiration devient plus rapide. C'est une réaction naturelle et normale, mais cette adaptation demande du temps.

Si l'on monte trop rapidement, le corps n'a pas le temps de s'adapter correctement. Cela peut provoquer des symptômes comme des maus de tête, des nausées, une fatigue intense, une perte d'appétit ou des troubles du sommeil. Ces signes indiquent que l'organisme est en difficulté face à l'altitude.

La préparation commence donc par une règle fondamentale : monter lentement n'est pas un choix, c'est une nécessité.`,
  
  'slow-pace': `Sur le Kilimandjaro, une règle s’applique à tous, sans exception : « pole pole », ce qui signifie marcher lentement. Ce rythme permet au corps d’économiser de l’énergie et d’améliorer l’oxygénation des muscles et du cerveau.

Même les personnes très sportives doivent accepter cette lenteur. L’altitude ne fait aucune différence entre un athlète et un débutant. Marcher trop vite augmente le risque de mal aigu des montagnes et réduit les capacités de récupération.

Un rythme lent et régulier, maintenu jour après jour, est l’un des facteurs les plus efficaces pour atteindre le sommet en sécurité.`,
  
  'choose-itinerary': `La préparation à l’altitude commence avant même de poser le pied sur la montagne. Le choix de l’itinéraire est essentiel. Certains parcours du Kilimandjaro proposent une montée plus progressive et incluent des journées ou des montées d’acclimatation, ce qui permet au corps de s’adapter plus efficacement.

Passer davantage de nuits en altitude aide l’organisme à produire plus de globules rouges, améliorant ainsi le transport de l’oxygène dans le sang. Un bon guide local adapte l’itinéraire en fonction du niveau, du rythme et des réactions du groupe.`,
  
  'hydrate-eat': `En altitude, le corps se déshydrate plus rapidement, même lorsque la sensation de soif est faible. Boire régulièrement tout au long de la journée est indispensable pour soutenir l’acclimatation et limiter les effets négatifs de l’altitude.

Une alimentation équilibrée, riche en glucides, permet de fournir l’énergie nécessaire à l’effort et aide le corps à mieux gérer le manque d’oxygène. Manger suffisamment, même sans appétit, fait partie intégrante de la préparation à l’altitude.`,
  
  'listen-guide': `Chaque personne réagit différemment à l’altitude. Certains s’adaptent rapidement, d’autres ont besoin de plus de temps. Il est donc essentiel d’écouter les signaux de son corps et d’informer le guide dès l’apparition de symptômes inhabituels.

Une communication rapide permet d’ajuster le rythme, de prendre des mesures préventives et, si nécessaire, d’éviter des complications plus graves. Un guide local expérimenté surveille quotidiennement l’état de santé du groupe et agit avant que la situation ne s’aggrave.`,
  
  'guide-tip': `> « Sur le Kilimandjaro, l’altitude ne se défie pas. Celui qui la respecte, marche lentement et écoute son corps arrive plus haut et plus sereinement. »`
};

const EN_TITLES: Record<string, string> = {
  overview: "How to prepare your body for Kilimanjaro's altitude",
  'how-body-reacts': 'How the body reacts to altitude',
  'slow-pace': 'Adopt a slow, steady pace',
  'choose-itinerary': 'Choose an itinerary that aids acclimatization',
  'hydrate-eat': 'Stay hydrated and eat well',
  'listen-guide': 'Listen to your body and communicate with the guide',
  'guide-tip': 'Guide tip 🏔️'
};

const EN_SECTIONS: Record<string, string> = {
  overview: `Altitude is the main challenge when climbing Kilimanjaro and the biggest factor affecting summit success. From around 3,000 meters, the amount of oxygen in the air decreases gradually. The body must adapt to this lower oxygen level to continue functioning normally.

Unlike physical fitness, altitude cannot be "trained" in a gym. A very fit person can still struggle at altitude. Success on Kilimanjaro therefore depends on good acclimatization, a suitable pace, strict hydration, and responsible behaviour in the mountains.

As a local guide I see each season that people who respect the altitude have far greater chances of reaching the summit than those who underestimate it.`,
  
  'how-body-reacts': `At altitude, the body receives less oxygen with each breath. To compensate, the heart rate increases and breathing becomes faster. This is a natural and normal reaction, but it takes time for the body to adapt.

If you ascend too quickly, the body does not have time to adapt properly. This can cause symptoms like headaches, nausea, severe fatigue, loss of appetite or sleep disturbances. These signs indicate the body is struggling with altitude.

Preparation therefore starts with a fundamental rule: ascending slowly is not a choice—it's a necessity.`,
  
  'slow-pace': `On Kilimanjaro one rule applies to everyone without exception: "pole pole", which means to walk slowly. This pace conserves energy and improves oxygenation of the muscles and brain.

Even very fit people must accept this slowness. Altitude makes no distinction between an athlete and a beginner. Walking too fast increases the risk of acute mountain sickness and reduces recovery capacity.

A slow, steady pace maintained day after day is one of the most effective factors for safely reaching the summit.`,
  
  'choose-itinerary': `Preparing for altitude starts before you set foot on the mountain. The choice of itinerary is essential. Some Kilimanjaro routes offer a more gradual ascent and include acclimatization days or climbs, helping the body adapt more effectively.

Spending more nights at altitude helps the body produce more red blood cells, improving oxygen transport in the blood. A good local guide adapts the itinerary to the group's level, pace, and reactions.`,
  
  'hydrate-eat': `At altitude the body dehydrates faster, even when thirst is low. Drinking regularly throughout the day is essential to support acclimatization and limit negative effects of altitude.

A balanced diet rich in carbohydrates provides the energy needed for the effort and helps the body manage reduced oxygen. Eating enough, even without appetite, is an integral part of altitude preparation.`,
  
  'listen-guide': `Everyone reacts differently to altitude. Some adapt quickly, others need more time. It's therefore essential to listen to your body's signals and inform the guide as soon as unusual symptoms appear.

Quick communication allows pace adjustments, preventive measures and, if necessary, avoids more serious complications. An experienced local guide monitors the group's health daily and acts before situations worsen.`,
  
  'guide-tip': `> "On Kilimanjaro, altitude is not to be challenged. Those who respect it, walk slowly and listen to their body, reach higher and more calmly."`
};

function renderContent(content: string) {
  // Replace 'l'itinéraire' and 'l’itinéraire' (with both straight and curly apostrophes) with a special marker that we'll convert to links
  const markedContent = content.replace(/l['’]itinéraire/g, '###ITINERAIRE_LINK###');
  
  const blocks = markedContent.split('\n\n')
  return (
    <>
      {blocks.map((block, i) => {
        if (block.trim().startsWith('>')) {
          // Process the block to convert itinerary markers to temporary markers, then to links
          const processedBlockWithTempMarkers = processItineraryLinks(block, `block-${i}-`);
          const processedBlock = convertItineraryTempMarkersToLinks(processedBlockWithTempMarkers);
          return (
            <blockquote key={i} className="pl-4 border-l-4 italic text-sm text-black">{processedBlock}</blockquote>
          )
        }
        // Process the block to convert itinerary markers to temporary markers, then to links
        const processedBlockWithTempMarkers = processItineraryLinks(block, `p-${i}-`);
        const processedBlock = convertItineraryTempMarkersToLinks(processedBlockWithTempMarkers);
        return <p key={i} className="my-4 leading-relaxed text-black">{processedBlock}</p>
      })}
    </>
  )
}

export default async function PrepareBodyAltitudePage({ params }: { params: Promise<{ locale?: string }> }) {
  const awaitedParams = await params;
  const locale = awaitedParams?.locale || 'fr';
  const t = await getTranslations('BlogPosts.preparer-son-corps-altitude-kilimandjaro');
  
  const sections = [
    { id: 'overview', title: locale === 'fr' ? FR_TITLES.overview : EN_TITLES.overview, content: locale === 'fr' ? FR_SECTIONS.overview : EN_SECTIONS.overview },
    { id: 'how-body-reacts', title: locale === 'fr' ? FR_TITLES['how-body-reacts'] : EN_TITLES['how-body-reacts'], content: locale === 'fr' ? FR_SECTIONS['how-body-reacts'] : EN_SECTIONS['how-body-reacts'] },
    { id: 'slow-pace', title: locale === 'fr' ? FR_TITLES['slow-pace'] : EN_TITLES['slow-pace'], content: locale === 'fr' ? FR_SECTIONS['slow-pace'] : EN_SECTIONS['slow-pace'] },
    { id: 'choose-itinerary', title: locale === 'fr' ? FR_TITLES['choose-itinerary'] : EN_TITLES['choose-itinerary'], content: locale === 'fr' ? FR_SECTIONS['choose-itinerary'] : EN_SECTIONS['choose-itinerary'] },
    { id: 'hydrate-eat', title: locale === 'fr' ? FR_TITLES['hydrate-eat'] : EN_TITLES['hydrate-eat'], content: locale === 'fr' ? FR_SECTIONS['hydrate-eat'] : EN_SECTIONS['hydrate-eat'] },
    { id: 'listen-guide', title: locale === 'fr' ? FR_TITLES['listen-guide'] : EN_TITLES['listen-guide'], content: locale === 'fr' ? FR_SECTIONS['listen-guide'] : EN_SECTIONS['listen-guide'] },
    { id: 'guide-tip', title: locale === 'fr' ? FR_TITLES['guide-tip'] : EN_TITLES['guide-tip'], content: locale === 'fr' ? FR_SECTIONS['guide-tip'] : EN_SECTIONS['guide-tip'] },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero section with back-link */}
      <section className="hero-wavy bg-cover bg-center text-white py-20 pt-32 md:pt-40" style={{ backgroundImage: "url('/images/hero-bg.webp')" }}>
        <div className="container mx-auto px-4">
          <Link href={`/${locale}/travel-blogs/climb-kilimanjaro#all-topics`} className="text-[#E8F8F5] hover:text-white mb-6 inline-flex items-center text-sm font-medium animate-slideInLeft">
            {locale === 'fr' ? '← Retour aux blogs' : '← Back to blogs'}
          </Link>
        </div>
      </section>

      <ClientWrapper locale={locale} sections={sections} FR_TITLES={FR_TITLES} EN_TITLES={EN_TITLES} FR_SECTIONS={FR_SECTIONS} EN_SECTIONS={EN_SECTIONS} />

      {/* FAQ section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold mb-8 text-center">{locale === 'fr' ? 'Questions fréquentes' : 'Frequently Asked Questions'}</h2>
          <FAQ items={[]} />
        </div>
      </section>

      {/* Related Articles */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <RelatedArticles articles={[]} locale={locale} />
        </div>
      </section>

      {/* Canonical route cards section (after notes) */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{locale === 'fr' ? 'Prêt pour une aventure ?' : 'Ready for an adventure ?'}</h2>
            <p className="text-gray-600 text-lg">{locale === 'fr' ? 'Explorez nos meilleures routes du Kilimandjaro' : 'Explore our best Kilimanjaro routes'}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300">
              <div className="h-40 bg-cover bg-center" style={{ backgroundImage: "url('/images/hero-bg.webp')" }}></div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">Marangu Route</h3>
                    <p className="text-[#00A896] font-semibold">{locale === 'fr' ? 'À partir de 1 800 €' : 'From 1,800 €'}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-500">⏱️5 {locale === 'fr' ? 'jours' : 'days'}</div>
                    <div className="text-yellow-400">★★★★★ (5.0)</div>
                  </div>
                </div>
                <p className="text-gray-700 mb-4">Conquérir le Toit de l&apos;Afrique : L&apos;Ascension du Kilimandjaro par la Route Marangu en 5 Jours</p>
                <p className="text-gray-600 text-sm mb-4">{locale === 'fr' ? 'Envie de vous tenir sur le toit de l&apos;Afrique ? Grimpez le Kilimandjaro avec nous et créez des souvenirs inoubliables !' : 'Want to stand on the roof of Africa? Climb Kilimanjaro with us and create unforgettable memories!'}</p>
                <Link href={`/${locale}/trips/marangu-route`} className="bg-[#00A896] hover:bg-[#008576] text-white px-6 py-2 rounded-lg font-medium transition-colors inline-block">
                  {locale === 'fr' ? 'En savoir plus' : 'Learn more'}
                </Link>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300">
              <div className="h-40 bg-cover bg-center" style={{ backgroundImage: "url('/images/hero-bg.webp')" }}></div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">Lemosho Route</h3>
                    <p className="text-[#00A896] font-semibold">{locale === 'fr' ? 'À partir de 2 200 €' : 'From 2,200 €'}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-500">⏱️7 {locale === 'fr' ? 'jours' : 'days'}</div>
                    <div className="text-yellow-400">★★★★★ (5.0)</div>
                  </div>
                </div>
                <p className="text-gray-700 mb-4">L&apos;Aventure Panoramique : Itinéraire Lemosho en 7 Jours</p>
                <p className="text-gray-600 text-sm mb-4">{locale === 'fr' ? 'La voie Lemosho est réputée comme l&apos;un des itinéraires les plus spectaculaires. Elle offre des vues imprenables sur les flancs ouest et sud du Kilimandjaro.' : 'The Lemosho route is renowned as one of the most spectacular routes. It offers breathtaking views of the western and southern flanks of Kilimanjaro.'}</p>
                <Link href={`/${locale}/trips/lemosho-route`} className="bg-[#00A896] hover:bg-[#008576] text-white px-6 py-2 rounded-lg font-medium transition-colors inline-block">
                  {locale === 'fr' ? 'En savoir plus' : 'Learn more'}
                </Link>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300">
              <div className="h-56 bg-cover bg-center" style={{ backgroundImage: "url('/images/hero-bg.webp')" }}></div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">Umbwe Route</h3>
                    <p className="text-[#00A896] font-semibold">{locale === 'fr' ? 'À partir de 1 900 €' : 'From 1,900 €'}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-500">⏱️6 {locale === 'fr' ? 'jours' : 'days'}</div>
                    <div className="text-yellow-400">★★★★☆ (4.5)</div>
                  </div>
                </div>
                <p className="text-gray-700 mb-4">L&apos;Itinéraire Umbwe : Le Défi Vertical du Kilimandjaro (6 Jours)</p>
                <p className="text-gray-600 text-sm mb-4">{locale === 'fr' ? 'Souvent décrite comme la voie la plus courte et la plus ardue du Kilimandjaro, l&apos;itinéraire Umbwe est parfait pour les randonneurs expérimentés.' : 'Often described as the shortest and most challenging route on Kilimanjaro, the Umbwe route is perfect for experienced hikers.'}</p>
                <Link href={`/${locale}/trips/umbwe-route`} className="bg-[#00A896] hover:bg-[#008576] text-white px-6 py-2 rounded-lg font-medium transition-colors inline-block">
                  {locale === 'fr' ? 'En savoir plus' : 'Learn more'}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Simple CTA block at the end, canonical format */}
      <section className="py-16 text-white relative">
        <div className="absolute inset-0 z-0">
          <Image src="/images/kilimanjaro-summit.jpg" alt="Kilimanjaro background" fill className="object-cover" />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-2xl font-semibold mb-4">{locale === 'fr' ? 'Prêt à commencer ?' : 'Ready to start?'}</h2>
          <h3 className="text-2xl font-bold mb-6">{locale === 'fr' ? 'Rejoignez-nous pour l&apos;aventure' : 'Join us for the adventure'}</h3>
          <p className="text-xl md:text-2xl max-w-2xl mx-auto mb-8">{locale === 'fr' ? 'Contactez-nous pour en savoir plus sur nos routes' : 'Contact us to learn more about our routes'}</p>
          <div className="max-w-md mx-auto flex flex-col sm:flex-row gap-4 w-full">
            <input
              type="text"
              placeholder={locale === 'fr' ? 'Prénom' : 'First name'}
              className="flex-grow px-4 py-3 rounded-lg text-gray-800 focus:outline-none bg-white w-full"
            />
            <input
              type="email"
              placeholder={locale === 'fr' ? 'Votre adresse email' : 'Your email address'}
              className="flex-grow px-4 py-3 rounded-lg text-gray-800 focus:outline-none bg-white w-full"
            />
            <button className="bg-[#00A896] hover:bg-[#008576] text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200 w-full sm:w-auto">
              {locale === 'fr' ? 'S&apos;abonner' : 'Subscribe'}
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}